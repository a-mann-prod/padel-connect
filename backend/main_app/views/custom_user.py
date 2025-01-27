from rest_framework import viewsets
from main_app.models.custom_user import CustomUser
from main_app.serializers import CustomUserSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
