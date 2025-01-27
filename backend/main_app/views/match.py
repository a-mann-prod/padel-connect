from rest_framework import viewsets, status
from main_app.serializers import MatchSerializer, MatchDetailSerializer
from main_app.models.match import Match
from main_app.models.notification import Notification
from main_app.models.custom_user import CustomUser
from main_app.models import enums

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
from django.db.models import Q
from main_app.business.match_score import validate_score
from main_app.business.match_team_invite import validate_team_invite_match_creation


class MatchViewSet(mixins.CustomModelViewSet, viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    detail_serializer_class = MatchDetailSerializer

    filterset_class = MatchFilter
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, permissions.IsOwnerOrReadOnly]


    def get_queryset(self):
        current_user = self.request.user
        queryset = Match.objects.all()

        if self.action == 'retrieve':
            return queryset

        if current_user == AnonymousUser():
            return queryset.filter(is_private=False)
        
        # Si l'utilisateur est authentifié

        # pour le listing
        if self.action == 'list':
            return queryset.filter(
                Q(is_private=False) | 
                Q(
                    teams__invitations__user=current_user,
                    teams__invitations__status=enums.RequestStatus.ACCEPTED
                )
            ).distinct()
        
        # pour les actions d'edit
        return queryset.filter(user=current_user)
    

    def create(self, request, *args, **kwargs):
        current_user = request.user
        send_invitations = request.data.get('send_invitations', [])

        if 'send_invitations' in request.data:
            del request.data['send_invitations']

        try:
            validate_team_invite_match_creation()
        except Exception as e:
            return handle_exception(e)
        
        match_instance = Match(**request.data, user=current_user, elo=current_user.profile.elo)
        match_instance._send_invitations = send_invitations
        match_instance.save()

        return Response(MatchDetailSerializer(match_instance, context={'request': request}).data, status=status.HTTP_201_CREATED)


    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        # Validate score if necessary
        if request.data.get('score_data'):
            validate_score(request.data['score_data'], instance)

        return super().update(request, *args, **kwargs)
    

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
    

    # Utilisé pour afficher les invitations dans "Mes invitations recues"
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
