from rest_framework import serializers
from main_app.models import Team, TeamInvite, Match, enums
from main_app import mixins
from main_app.serializers.match_team_invite import MinimalMatchTeamInviteSerializer

class MatchTeamSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()
    match = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Match.objects.all())

    class Meta:
        model = Team
        fields = ['id', 'participants', 'user', 'match']

    def get_participants(self, obj):
        invites = TeamInvite.objects.filter(team=obj, status=enums.RequestStatus.ACCEPTED)
        users = invites.values_list('user', flat=True)
        return users
    

class MinimalMatchTeamSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ['id', 'user', 'participants']

    def get_participants(self, obj):
        invites = TeamInvite.objects.filter(team=obj, status=enums.RequestStatus.ACCEPTED)
        if invites.exists(): 
            return MinimalMatchTeamInviteSerializer(invites, many=True, context=self.context).data
        return []