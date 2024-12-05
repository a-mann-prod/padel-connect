from rest_framework import serializers
from main_app.models import Team, TeamInvite, Match, enums
from main_app import mixins
from main_app.serializers.match_team_invite import MinimalMatchTeamInviteSerializer
from main_app.serializers.profile import ProfileSerializer
from main_app.serializers.match_team_invite import MatchTeamInviteSerializer


class MatchTeamListSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()
    match = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Match.objects.all())
    calculated_level = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ['id', 'participants', 'user', 'match', 'calculated_level', 'status']

    def get_calculated_level(self, obj):
        return obj.calculate_level()


    def get_participants(self, obj):
        invites = TeamInvite.objects.filter(team=obj, status=enums.RequestStatus.ACCEPTED)
        users = [invite.user.profile for invite in invites]
        if invites.exists(): 
            return ProfileSerializer(users, many=True, context=self.context).data
        return []


class MatchTeamRequestSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    invitations = MatchTeamInviteSerializer(read_only=True, many=True)
    match = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Match.objects.all())

    class Meta:
        model = Team
        fields = '__all__'
    

class MatchTeamSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()
    match = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Match.objects.all())

    class Meta:
        model = Team
        fields = ['id', 'participants', 'match']
        read_only_fields = ['user']

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