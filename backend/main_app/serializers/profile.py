from rest_framework import serializers
from main_app.models import Profile
from main_app import mixins
from django.conf import settings

def get_last_name(self, obj):
    if obj.last_name:
        return obj.last_name[:1]
    return ""

class ProfileSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    calculated_level = serializers.SerializerMethodField()
    avatar_url = serializers.ImageField(use_url=True, required=False)
    is_favorite = serializers.SerializerMethodField()
    
    class Meta:
        model = Profile
        exclude = ['user']

    # def to_representation(self, instance):
    #     # Quand on fait une lecture (GET), on modifie `last_name` pour n'afficher que la première lettre
    #     representation = super().to_representation(instance)
    #     if instance.last_name:
    #         representation['last_name'] = instance.last_name[0].upper()  # Affiche seulement la première lettre
    #     return representation

    def get_calculated_level(self, obj):
        return obj.calculate_level()
    
    def get_is_favorite(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return request.user.favorite_users.filter(id=obj.user.id).exists()
        return False
    

    # def get_last_name(self, obj):
    #     return get_last_name(self, obj)


class MinimalProfileSerializer(serializers.ModelSerializer):
    avatar_url = serializers.ImageField(use_url=True, required=False)
    last_name = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'avatar_url']

    def get_last_name(self, obj):
        return get_last_name(self, obj)