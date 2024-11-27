from rest_framework import serializers
from main_app.models import Profile
from main_app import mixins
from django.conf import settings

class ProfileSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    calculated_level = serializers.SerializerMethodField()
    avatar_url = serializers.ImageField(use_url=True, required=False)
    is_favorite = serializers.SerializerMethodField()
    
    class Meta:
        model = Profile
        exclude = ['user']

    def get_calculated_level(self, obj):
        return obj.calculate_level()
    
    def get_is_favorite(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return request.user.favorite_users.filter(id=obj.user.id).exists()
        return False


class ProfileAvatarSerializer(serializers.ModelSerializer):
    avatar_url = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = Profile
        fields = ['id', 'avatar_url']

