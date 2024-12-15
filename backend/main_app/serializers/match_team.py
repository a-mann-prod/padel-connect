from rest_framework import serializers
from main_app.models import Team, TeamInvite, Match, enums
from main_app import mixins
from .match_team_invite import MatchTeamInviteSerializer
from .profile import MinimalProfileSerializer


def get_participants(self, obj):
    invites = TeamInvite.objects.filter(team=obj, status=enums.RequestStatus.ACCEPTED)
    if invites.exists(): 
        users = [invite.user.profile for invite in invites]
        return MinimalProfileSerializer(users, many=True, context=self.context).data
    return []


class MatchTeamSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()
    match = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Match.objects.all())

    class Meta:
        model = Team
        fields = ['id', 'participants', 'match']
        read_only_fields = ['user']

    def get_participants(self, obj):
        return get_participants(self, obj)


class MatchTeamRequestSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    invitations = MatchTeamInviteSerializer(read_only=True, many=True)
    match = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Match.objects.all())

    class Meta:
        model = Team
        fields = '__all__'
    
    
class MinimalMatchTeamSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ['id', 'user', 'participants']

    def get_participants(self, obj):
        return get_participants(self, obj)

    