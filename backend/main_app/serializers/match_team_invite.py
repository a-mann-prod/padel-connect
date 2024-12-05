from rest_framework import serializers
from main_app.models import TeamInvite, Team
from main_app import mixins
from main_app.serializers import ProfileSerializer


class MinimalMatchTeamInviteSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    id = serializers.IntegerField(source='user.id', read_only=True)
    avatar_url = serializers.ImageField(source='user.profile.avatar_url', use_url=True, read_only=True)

    class Meta:
        model = TeamInvite
        fields = ['id', 'avatar_url']
        

class MatchTeamInviteSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    team = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Team.objects.all())
    user = ProfileSerializer(read_only=True, source='user.profile')

    class Meta:
        model = TeamInvite
        fields = '__all__'