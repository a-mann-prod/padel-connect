from rest_framework import viewsets, status
from main_app.models.match import Match
from main_app.models.team import Team
from main_app.serializers import MatchTeamSerializer, MatchTeamRequestSerializer
from django.shortcuts import get_object_or_404
from main_app import permissions, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from main_app.business.match_team import validate_match_team_creation, get_team_request_current_user, delete_team_request_current_user
from main_app.exceptions import handle_exception

class MatchTeamModelViewSet(mixins.CustomModelViewSet, mixins.ExcludeDatesFieldsMixin, mixins.BlockCRUDMixin, viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = MatchTeamSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsOwner]

    block_create = False
    block_destroy = False


    def create(self, request, match_pk=None):
        match = get_object_or_404(Match, pk=match_pk)
        request.data['match'] = match
        send_invitations = request.data.get('send_invitations', [])

        if 'send_invitations' in request.data:
            del request.data['send_invitations']

        try:
            validate_match_team_creation(request, match, send_invitations)
        except Exception as e:
            return handle_exception(e)

        team_instance = Team(**request.data, user=self.request.user)
        team_instance._send_invitations = send_invitations
        team_instance.save()

        return Response(MatchTeamRequestSerializer(team_instance, context={'request': request}).data, status=status.HTTP_201_CREATED)
    
    def destroy(self, request, match_pk=None, pk=None):

        try:
            team = get_object_or_404(Team, pk=pk)
            delete_team_request_current_user(request, team)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return handle_exception(e)
        # return super().destroy(request,  match_pk=None, pk=pk)
    

    @action(detail=False, methods=['get'], url_path='request', permission_classes=[permissions.IsAuthenticated])
    def request(self, request, match_pk=None):
        """
        Récupère la requête pour l'utilisateur courant.
        """

        try:
            match = get_object_or_404(Match, pk=match_pk)
            team = get_team_request_current_user(request, match)
            if team is None: 
                return Response(status=status.HTTP_200_OK)
            serializer = MatchTeamRequestSerializer(team, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return handle_exception(e)
        

