
from djoser.serializers import UserCreateSerializer, UserSerializer
from main_app.models import CustomUser

class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'password')
        
class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email')
