from rest_framework import serializers
from main_app.models import TeamInvite
from main_app import mixins


class MinimalMatchTeamInviteSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    id = serializers.IntegerField(source='user.id', read_only=True)
    avatar_url = serializers.ImageField(source='user.profile.avatar_url', use_url=True, read_only=True)

    class Meta:
        model = TeamInvite
        fields = ['id', 'avatar_url']
        

class MatchTeamInviteSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = TeamInvite
        fields = ['user']