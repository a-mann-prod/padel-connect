from rest_framework import viewsets
from main_app.serializers import MatchSerializer, MatchDetailSerializer
from main_app.models import Match, enums
from main_app import permissions, mixins
from main_app.filters import MatchFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.timezone import now


class MatchViewSet(mixins.CustomModelViewSet, viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    detail_serializer_class = MatchDetailSerializer

    filterset_class = MatchFilter
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, permissions.IsOwnerOrReadOnly]

    def get_queryset(self):
        return Match.objects.filter(is_private=False)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        

    # get incoming matches for a specific user, with an action or with filter ?

    @action(detail=False, methods=['get'], url_path='incoming')
    def get_incoming_matches(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=401)
        
        
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