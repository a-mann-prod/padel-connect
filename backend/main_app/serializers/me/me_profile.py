from rest_framework import serializers
from main_app.models.profile import Profile
from main_app import mixins

class MeProfileSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    calculated_level = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()

    avatar_url = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = Profile
        exclude = ['user']

    def get_calculated_level(self, obj):
        return obj.calculate_level()
    
    def get_full_name(self, obj):
        return obj.get_full_name()