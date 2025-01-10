from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from main_app.models import Match, Score, Team
from main_app.serializers import MatchScoreSerializer
from django.shortcuts import get_object_or_404
from main_app.business.match_score import validate_score_creation_or_update
from main_app.exceptions import handle_exception
from main_app.permissions import IsAuthenticatedOrReadOnly


class MatchScoreView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        """Récupérer le score d'un match"""
        score = Score.objects.get(match_id=pk)
        serializer = MatchScoreSerializer(score)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request, pk):
        """Créer ou mettre à jour le score d'un match"""

        match = get_object_or_404(Match, pk=pk)

        try:
            validate_score_creation_or_update(request, match)
        except Exception as e:
            return handle_exception(e)
        

        serializer = MatchScoreSerializer(data=request.data)
        if serializer.is_valid():
            score, created = Score.objects.update_or_create(
                match=match,
                defaults={
                    "team_1": team_1.pk,
                    "team_2": team_2.pk,
                    "sets_team_1": request.data.get("sets_team_1"),
                    "sets_team_2": request.data.get("sets_team_2"),
                    "tie_breaks_team_1": request.data.get("tie_breaks_team_1"),
                    "tie_breaks_team_2": request.data.get("tie_breaks_team_2"),
                },
            )
            return Response(MatchScoreSerializer(score).data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
