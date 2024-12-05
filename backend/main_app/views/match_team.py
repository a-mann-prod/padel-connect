from rest_framework import viewsets, status
from main_app.models import Match, Team, enums
from main_app.serializers import MatchTeamSerializer, MatchTeamListSerializer, MatchTeamRequestSerializer
from django.shortcuts import get_object_or_404
from main_app import permissions, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from main_app.business.match_team import get_team_requests, validate_match_team_creation, team_request_answer, get_team_request_current_user

class MatchTeamModelViewSet(mixins.CustomModelViewSet, mixins.ExcludeDatesFieldsMixin, viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = MatchTeamSerializer
    list_serializer_class = MatchTeamListSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsOwner]


    def get_queryset(self):
        # Récupérer l'objet Match via le match_pk dans l'URL
        match_pk = self.kwargs.get('match_pk')
        match = get_object_or_404(Match, pk=match_pk)

        if self.action == 'list':
            return get_team_requests(self.request, match)

        return Team.objects.filter(match=match)


    def create(self, request, match_pk=None):
        match = get_object_or_404(Match, pk=match_pk)
        request.data['match'] = match

        try:
            validate_match_team_creation(request, match)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        send_invitations = request.data.get('send_invitations', [])

        if 'send_invitations' in request.data:
            del request.data['send_invitations']

        team_instance = Team(**request.data, user=self.request.user)
        team_instance._send_invitations = send_invitations
        team_instance.save()

        return Response(MatchTeamRequestSerializer(team_instance, context={'request': request}).data, status=status.HTTP_201_CREATED, )

    def update(self, request, *args, **kwargs):
        """
        Block update (403 Forbidden).
        """
        return Response({"detail": "Update is not allowed."}, status=status.HTTP_403_FORBIDDEN)
    

    @action(detail=False, methods=['get'], url_path='request', permission_classes=[permissions.IsAuthenticated])
    def request(self, request, match_pk=None):
        """
        Récupère la requête pour l'utilisateur courant.
        """

        try:
            match = get_object_or_404(Match, pk=match_pk)
            data = get_team_request_current_user(request, match)
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
    

    @action(detail=True, methods=['post'], url_path='accept', permission_classes=[permissions.IsAuthenticated])
    def accept_team(self, request, match_pk=None, pk=None):
        """
        Accepte une équipe pour un match donné.
        """
        match = get_object_or_404(Match, pk=match_pk)
        team = get_object_or_404(Team, pk=pk)

        next_status = enums.RequestStatus.ACCEPTED

        try:
            team_request_answer(request, match, team, next_status)
            return Response({"detail": "Team has been accepted."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['post'], url_path='refuse', permission_classes=[permissions.IsAuthenticated])
    def refuse_team(self, request, match_pk=None, pk=None):
        """
        Refuse une équipe pour un match donné.
        """
        match = get_object_or_404(Match, pk=match_pk)
        team = get_object_or_404(Team, pk=pk)

        next_status = enums.RequestStatus.REFUSED

        try:
            team_request_answer(request, match, team, next_status)
            return Response({"detail": "Team has been refused."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
