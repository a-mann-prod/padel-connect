from rest_framework import viewsets, status
from main_app.models import Match, Team, enums
from main_app.serializers import MatchTeamSerializer
from django.shortcuts import get_object_or_404
from main_app import permissions, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from main_app.business.match_team import get_team_requests, validate_match_creation, team_request_answer

class MatchTeamModelViewSet(mixins.ExcludeDatesFieldsMixin, viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = MatchTeamSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsOwner]

    def get_queryset(self):
        # Récupérer l'objet Match via le match_pk dans l'URL
        match_pk = self.kwargs.get('match_pk')
        match = get_object_or_404(Match, pk=match_pk)

        if self.action == 'list':
            try:
                return get_team_requests(self.request, match)
            except Exception as e:
                return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Team.objects.filter(match=match)


    def create(self, request, match_pk=None):
        match = get_object_or_404(Match, pk=match_pk)
        request.data['match'] = match.id

        try:
            validate_match_creation(request, match)
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
    
