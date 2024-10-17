from rest_framework import viewsets
from main_app.serializers.tournament import TournamentSerializer
from main_app.models.tournament import Tournament
from main_app import permissions

class TournamentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tournaments to be viewed or edited.
    """
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = [permissions.IsSuperAdminOrReadOnly]