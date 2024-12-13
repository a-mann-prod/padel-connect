from rest_framework import serializers
from main_app.models import TeamInvite, Team
from main_app import mixins
from main_app.serializers import ProfileSerializer, MatchDetailSerializer

class FullMatchTeamSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    match = MatchDetailSerializer(read_only=True)

    class Meta:
        model = Team
        fields = '__all__'

class MeMatchTeamInviteSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    # user = ProfileSerializer(read_only=True, source='user.profile')
    team = FullMatchTeamSerializer(read_only=True)

    class Meta:
        model = TeamInvite
        fields = '__all__'


