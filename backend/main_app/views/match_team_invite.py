from rest_framework.response import Response
from rest_framework import viewsets, status
from main_app.models import Match, Team, TeamInvite, enums
from main_app.serializers import MatchTeamSerializer
from django.shortcuts import get_object_or_404
from main_app import permissions, mixins
from main_app.business.match_team_invite import get_team_invite_requests, validate_team_invite_creation, team_invite_request_answer, validate_team_invite_destruction
from rest_framework.decorators import action


class MatchTeamInviteModelViewSet(mixins.ExcludeDatesFieldsMixin, viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = MatchTeamSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsOwner]


    def get_queryset(self):
        team_pk = self.kwargs.get('team_pk')
        team = get_object_or_404(Team, pk=team_pk)

        if self.action == 'list':
            return get_team_invite_requests(self.request, team)

        return TeamInvite.objects.filter(team=team)
    
    def get_permissions(self):
        """
        Override pour retirer les permissions générales sur `destroy`.
        """
        if self.action == 'destroy':
            return [permissions.IsAuthenticated()]
        return super().get_permissions()
    

    def create(self, request, team_pk=None):
            team = get_object_or_404(Team, pk=team_pk)
            request.data['team'] = team.id

            try:
                validate_team_invite_creation(request, team)
            except Exception as e:
                return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            return super().create(request)
    
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


    def update(self, request, *args, **kwargs):
        """
        Block update (403 Forbidden).
        """
        return Response({"detail": "Update is not allowed."}, status=status.HTTP_403_FORBIDDEN)
    
    def destroy(self, request, pk=None, *args, **kwargs):
        """
        Allow deletion only by the invitation's user or the team's user.
        """
        team_invite = get_object_or_404(TeamInvite, pk=pk)

        try:
            validate_team_invite_destruction(request, team_invite)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return super().destroy(request, *args, **kwargs)
    

    @action(detail=True, methods=['post'], url_path='accept', permission_classes=[permissions.IsAuthenticated])
    def accept_invitation(self, request, team_pk=None, pk=None):
        team_invite = get_object_or_404(TeamInvite, pk=pk)

        next_status = enums.RequestStatus.ACCEPTED

        try:
            team_invite_request_answer(request, team_invite, next_status)
            return Response({"detail": "Team invitation has been accepted."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

    @action(detail=True, methods=['post'], url_path='refuse', permission_classes=[permissions.IsAuthenticated])
    def refuse_invitation(self, request, team_pk=None, pk=None):
        team_invite = get_object_or_404(TeamInvite, pk=pk)

        next_status = enums.RequestStatus.REFUSED

        try:
            team_invite_request_answer(request, team_invite, next_status)
            return Response({"detail": "Team invitation has been refused."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
