from rest_framework import viewsets
from main_app.serializers import FavoriteUserSerializer
from main_app.models import FavoriteUser
from main_app import permissions

class FavoriteUserViewSet(viewsets.ModelViewSet):
    queryset = FavoriteUser.objects.all()
    serializer_class = FavoriteUserSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsOwner]