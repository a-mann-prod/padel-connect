from rest_framework import viewsets
from main_app.serializers.tournament import TournamentSerializer, TournamentDetailSerializer
from main_app.models.tournament import Tournament
from main_app import permissions, mixins
from main_app.filters import TournamentFilter
from django.utils.timezone import now


class TournamentViewSet(mixins.CustomModelViewSet, viewsets.ModelViewSet):
    """
    API endpoint that allows tournaments to be viewed or edited.
    """
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    detail_serializer_class = TournamentDetailSerializer
    permission_classes = [permissions.IsSuperAdminOrReadOnly]
    filterset_class = TournamentFilter

    def get_queryset(self):
        return Tournament.objects.filter(datetime__gte=now())
