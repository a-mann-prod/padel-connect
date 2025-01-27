from rest_framework.response import Response
from rest_framework import viewsets, status
from main_app.models.team import Team, TeamInvite
from main_app.serializers import MatchTeamInviteSerializer
from django.shortcuts import get_object_or_404
from main_app import permissions, mixins
from main_app.business.match_team_invite import get_team_invite_requests, validate_team_invite_creation, validate_team_invite_destruction
from main_app.exceptions import handle_exception
from main_app.models.custom_user import CustomUser

class MatchTeamInviteModelViewSet(mixins.ExcludeDatesFieldsMixin, viewsets.ModelViewSet):
    queryset = TeamInvite.objects.all()
    serializer_class = MatchTeamInviteSerializer
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
    

    def create(self, request, match_pk=None, team_pk=None):
            team = get_object_or_404(Team, pk=team_pk)
            user = CustomUser.objects.get(pk=request.data['user'])

            # permet d'ajouter team car obligatoire (passage de queryparams en querydata)
            request.data['team'] = team.id
            request.data['user'] = user

            try:
                validate_team_invite_creation(request, team)
            except Exception as e:
                return handle_exception(e)
            
            return super().create(request)
    
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.data['user'])


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
            return handle_exception(e)

        return super().destroy(request, *args, **kwargs)
