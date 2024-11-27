from rest_framework import viewsets
from main_app.serializers import MatchSerializer, MatchDetailSerializer
from main_app.models import Match
from main_app import permissions, mixins
from main_app.filters import MatchFilter


class MatchViewSet(mixins.CustomModelViewSet, viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    detail_serializer_class = MatchDetailSerializer

    filterset_class = MatchFilter
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, permissions.IsOwnerOrReadOnly]


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
