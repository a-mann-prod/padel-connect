from rest_framework import viewsets
from main_app.models import MatchArchive
from main_app.serializers import MeMatchArchiveSerializer
from main_app.permissions import IsAuthenticated

class MeMatchArchiveModelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MatchArchive.objects.all()
    serializer_class = MeMatchArchiveSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        """
        Cette méthode permet de filtrer les matchs où l'utilisateur actuel est un des participants
        """
        user = self.request.user
        return MatchArchive.objects.filter(user=user)