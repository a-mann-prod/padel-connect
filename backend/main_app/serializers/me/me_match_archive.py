from rest_framework import serializers
from main_app.models import MatchArchive
from main_app import mixins
from main_app.serializers import MinimalProfileSerializer

def get_participants(self, obj):
    users = [user.profile for user in obj.user.all()]
    if users: 
        return MinimalProfileSerializer(users, many=True, context=self.context).data
    return []

class MeMatchArchiveSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()
    calculated_level_range = serializers.SerializerMethodField()

    class Meta:
        model = MatchArchive
        exclude = ['user']
    
    def get_participants(self, obj):
        return get_participants(self, obj)

    def get_calculated_level_range(self, obj):
        return obj.calculate_level_range()
