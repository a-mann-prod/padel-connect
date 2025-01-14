from rest_framework import viewsets, status
from main_app.serializers import MatchSerializer, MatchDetailSerializer
from main_app.models import Match, enums, Notification, CustomUser
from main_app import permissions, mixins
from main_app.filters import MatchFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.timezone import now
from django.utils import translation
from django.utils.translation import gettext as _
from main_app.exceptions import handle_exception
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import AnonymousUser

class MatchViewSet(mixins.CustomModelViewSet, viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    detail_serializer_class = MatchDetailSerializer

    filterset_class = MatchFilter
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, permissions.IsOwnerOrReadOnly]


    def get_queryset(self):
        current_user = self.request.user

        if current_user == AnonymousUser():
            return Match.objects.filter(is_private=False)
        
        # Si l'utilisateur est authentifié
        return Match.objects.filter(
            is_private=False
        ) | Match.objects.filter(
            is_private=True, user=current_user
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


    # def update(self, request, *args, **kwargs):
    #     # Cette méthode remplace la méthode `perform_update` pour effectuer la mise à jour
    #     instance = self.get_object()  # Récupérer l'instance de l'objet à mettre à jour

    #     # On met à jour l'objet avec les nouvelles données
    #     serializer = self.get_serializer(instance, data=request.data, partial=True)
    #     serializer.is_valid(raise_exception=True)

    #     # Sauvegarder l'objet avec les nouvelles données
    #     self.perform_update(serializer)

    #     # Retourner la réponse avec le sérialiseur complet pour inclure le champ `complex` complet
    #     return Response(MatchDetailSerializer(instance).data)
        

    @action(detail=False, methods=['get'], url_path='incoming')
    def get_incoming_matches(self, request):
        user = request.user
        if not user.is_authenticated:
            return handle_exception(ValidationError(detail="Authentication credentials were not provided"), default_status=401)    

        # matches = self.get_queryset()    
        
        incoming_matches = Match.objects.filter(
            teams__invitations__user=user,  # The current user has a team invite
            teams__invitations__status=enums.RequestStatus.ACCEPTED,
            datetime__gte=now()
        ).distinct()

        page = self.paginate_queryset(incoming_matches)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(incoming_matches, many=True)
        return Response(serializer.data)
    

    @action(detail=False, methods=['get'], url_path='invitations')
    def get_incoming_invitations(self, request):
        user = request.user
        if not user.is_authenticated:
            return handle_exception(ValidationError(detail="Authentication credentials were not provided"), default_status=401)        
        
        
        incoming_matches = Match.objects.filter(
            teams__invitations__user=user,  # The current user has a team invite
            teams__invitations__status=enums.RequestStatus.PENDING,
            datetime__gte=now()
        ).distinct()

        page = self.paginate_queryset(incoming_matches)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(incoming_matches, many=True)
        return Response(serializer.data)
    

    @action(detail=True, methods=['post'], url_path='share')
    def post_share_match(self, request, pk=None):
        user = request.user
        if not user.is_authenticated:
            return handle_exception(ValidationError(detail="Authentication credentials were not provided"), default_status=401)        
        
        user_ids = request.data.get('user_ids', [])
        
        if not user_ids:
            return handle_exception(ValidationError(detail="'user_ids' parameter is required"))        
        
        invited_users = CustomUser.objects.filter(pk__in=user_ids)
        
        for invited_user in invited_users:
            with translation.override(user.language):
                Notification.objects.create(
                    user=invited_user,
                    title=_("New share!"),
                    message=_("%(sender)s has shared a match with you") % {'sender': user.profile.first_name},
                    type=enums.NotificationType.MATCH_SHARE, 
                    associated_data={"url": f"/match/{pk}"}
                )

        return Response({"detail": "Match shared successfully."}, status=status.HTTP_200_OK)
