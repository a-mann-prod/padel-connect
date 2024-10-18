from rest_framework import viewsets, permissions as rf_permissions
from main_app.serializers import MatchFilterSerializer
from main_app.models import MatchRequest
from main_app import permissions, mixins

class MatchRequestViewSet(mixins.BlockCreateDestroyMixin, viewsets.ModelViewSet):
    queryset = MatchRequest.objects.all()
    serializer_class = MatchFilterSerializer
    permission_classes = [permissions.IsOwner, permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Only current user can show their own match requests
        """
        return MatchRequest.objects.filter(user=self.request.user)

    # unable to update their match request
    def perform_update(self, serializer):
        """
        Only current user can update his match filter
        """
        serializer.save(user=self.request.user)
