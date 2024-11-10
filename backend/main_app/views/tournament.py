from rest_framework import viewsets
from main_app.serializers.tournament import TournamentSerializer, TournamentDetailSerializer
from main_app.models.tournament import Tournament
from main_app import permissions, mixins
from main_app.filters import TournamentFilter

class TournamentViewSet(mixins.CustomModelViewSet, viewsets.ModelViewSet):
    """
    API endpoint that allows tournaments to be viewed or edited.
    """
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    detail_serializer_class = TournamentDetailSerializer
    permission_classes = [permissions.IsSuperAdminOrReadOnly]
    filterset_class = TournamentFilter
