
from djoser.serializers import UserCreateSerializer, UserSerializer
from main_app.models import CustomUser
from main_app import mixins
from .profile import ProfileSerializer


class CustomUserCreateSerializer(mixins.ExcludeDatesFieldsMixin, UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = ['id', 'email', 'password']

class CustomCurrentUserSerializer(mixins.ExcludeDatesFieldsMixin, UserSerializer):
    class Meta(UserSerializer.Meta):
        model = CustomUser
        fields = ['id', 'email', 'push_token', 'language', 'is_onboarding_completed', 'is_new_match_notification_enabled', 'is_new_message_notification_enabled']

class CustomUserSerializer(mixins.ExcludeDatesFieldsMixin, UserSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta(UserSerializer.Meta):
        model = CustomUser
        fields = ['id', 'email', 'profile']