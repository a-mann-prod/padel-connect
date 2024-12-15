from rest_framework import viewsets, status
from main_app.serializers import MatchSerializer, MatchDetailSerializer
from main_app.models import Match, enums, TeamInvite
from main_app import permissions, mixins
from main_app.filters import MatchFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.timezone import now
from main_app.business.match_team_invite import team_invite_request_answer
from django.shortcuts import get_object_or_404


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
    

    @action(detail=False, methods=['get'], url_path='invitations')
    def get_incoming_invitations(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=401)
        
        
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