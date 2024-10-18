from rest_framework import viewsets, permissions as rf_permissions
from main_app.serializers import MatchFilterSerializer
from main_app.models import MatchFilter
from main_app import permissions, mixins

class MatchFilterViewSet(mixins.BlockCreateDestroyMixin, viewsets.ModelViewSet):
    queryset = MatchFilter.objects.all()
    serializer_class = MatchFilterSerializer
    permission_classes = [permissions.IsOwner, permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Only current user can show their own match filter
        """
        return MatchFilter.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        """
        Only current user can update his match filter
        """
        serializer.save(user=self.request.user)
