
from djoser.serializers import UserCreateSerializer, UserSerializer
from main_app.models import CustomUser
from main_app import mixins


class CustomUserCreateSerializer(mixins.ExcludeDatesFieldsMixin, UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = ['id', 'email', 'password']
        
class CustomUserSerializer(mixins.ExcludeDatesFieldsMixin, UserSerializer):
    class Meta(UserSerializer.Meta):
        model = CustomUser
        fields = ['id', 'email']
