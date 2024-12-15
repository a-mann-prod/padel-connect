from rest_framework import viewsets, status
from main_app.models import Match, Team, TeamInvite, enums
from main_app.serializers import MatchTeamInviteSerializer, MatchInviteSerializer
from django.shortcuts import get_object_or_404
from main_app import permissions, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from main_app.business.match_team_invite import team_invite_request_answer
from main_app.pagination import CustomPageNumberPagination
from django.conf import settings

class MatchInviteModelViewSet(mixins.CustomModelViewSet, mixins.ExcludeDatesFieldsMixin, mixins.BlockCRUDMixin, viewsets.ModelViewSet):
    queryset = TeamInvite.objects.all()
    serializer_class = MatchTeamInviteSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsOwner]

    block_destroy = False

    # /matches/1/invitations pour toutes les invitations d'un match
    # /matches/1/invitations/1/accept|refuse pour répondre

    # def get_queryset(self):
    #     queryset = TeamInvite.objects.all()
    #     match_pk = self.kwargs.get('match_pk')

    #     if self.action == 'list':
    #         return queryset.filter(team__match=match_pk, status=enums.RequestStatus.PENDING)

    #     return queryset


    @action(detail=False, methods=['get'], url_path='received', permission_classes=[permissions.IsAuthenticated])
    def received(self, request, match_pk=None):
        """Récupere les invitations pour un match."""

        current_user = self.request.user
        
        match_invitations = TeamInvite.objects.filter(team__match=match_pk, user=current_user)

        paginator = CustomPageNumberPagination()
        paginator.page_size = settings.REST_FRAMEWORK.get('PAGE_SIZE', 10)
        paginated_match_invitations = paginator.paginate_queryset(match_invitations, request)

        serializer = MatchInviteSerializer(paginated_match_invitations, many=True, context={'request': request})
        
        return paginator.get_paginated_response(serializer.data)
                


    @action(detail=True, methods=['post'], url_path=r'(?P<action>accept|refuse)')
    def response(self, request, pk, action=None):
        """Accepte ou refuse une invitation."""
        if action not in ['accept', 'refuse']:
            return Response({"detail": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST)
        
        team_invite = get_object_or_404(TeamInvite, pk=pk)
        
        next_status = enums.RequestStatus.ACCEPTED if action == 'accept' else enums.RequestStatus.REFUSED

        try:
            team_invite_request_answer(request, team_invite, action, next_status)
            if action == 'accept':
                return Response({"detail": "Team invitation has been accepted."}, status=status.HTTP_200_OK)

            elif action == 'refuse':
                return Response({"detail": "Team invitation has been refused."}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
