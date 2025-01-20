from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from main_app.models.score import Score
from main_app.models.match import Match

from main_app.serializers import MatchScoreSerializer
from django.shortcuts import get_object_or_404
from main_app.business.match_score import validate_score_creation_or_update
from main_app.exceptions import handle_exception
from main_app.permissions import IsAuthenticatedOrReadOnly


class MatchScoreView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        """Récupérer le score d'un match"""
        score = Score.objects.filter(match_id=pk).first()
        serializer = MatchScoreSerializer(score)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request, pk):
        """Créer ou mettre à jour le score d'un match"""

        match = get_object_or_404(Match, pk=pk)

        try:
            score, created = validate_score_creation_or_update(request, match)
        except Exception as e:
            return handle_exception(e)
        
        return Response(MatchScoreSerializer(score).data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
