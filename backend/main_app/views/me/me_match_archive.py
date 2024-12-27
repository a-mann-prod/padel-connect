from rest_framework import viewsets
from main_app.models import MatchArchive
from main_app.serializers import MeMatchArchiveSerializer, MeMatchArchiveDetailSerializer
from main_app.permissions import IsAuthenticated
from main_app import mixins

class MeMatchArchiveModelViewSet(mixins.CustomModelViewSet, viewsets.ReadOnlyModelViewSet):
    queryset = MatchArchive.objects.all()
    serializer_class = MeMatchArchiveSerializer
    detail_serializer_class = MeMatchArchiveDetailSerializer

    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        """
        Cette méthode permet de filtrer les matchs où l'utilisateur actuel est un des participants
        """
        user = self.request.user
        return MatchArchive.objects.filter(user=user)