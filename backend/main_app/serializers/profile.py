from rest_framework import serializers
from main_app.models.profile import Profile
from main_app import mixins


class ProfileSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    calculated_level = serializers.SerializerMethodField()
    avatar_url = serializers.ImageField(use_url=True, required=False)
    is_favorite = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        exclude = ['user', 'elo']

    def get_calculated_level(self, obj):
        return obj.calculate_level()
    
    def get_is_favorite(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return request.user.favorite_users.filter(id=obj.user.id).exists()
        return False
    
    def get_full_name(self, obj):
        return obj.get_full_name()
    
    def get_last_name(self, obj):
        return obj.get_last_name()


class MinimalProfileSerializer(serializers.ModelSerializer):
    avatar_url = serializers.ImageField(use_url=True, required=False)
    full_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'full_name', 'avatar_url']

    def get_full_name(self, obj):
        return obj.get_full_name()
    
    def get_last_name(self, obj):
        return obj.get_last_name()