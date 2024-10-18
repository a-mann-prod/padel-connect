from rest_framework import viewsets, permissions as rf_permissions
from main_app.serializers import ProfileSerializer
from main_app.models import Profile
from main_app import permissions, mixins

class ProfileViewSet(mixins.BlockCreateDestroyMixin, viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsOwnerOrReadOnly, permissions.IsAuthenticatedOrReadOnly]


    def perform_update(self, serializer):
        """
        Only current user can update his profile
        """
        serializer.save(user=self.request.user)