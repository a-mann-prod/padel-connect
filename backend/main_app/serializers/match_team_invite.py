from rest_framework import serializers
from main_app.models.team import TeamInvite, Team
from main_app import mixins
from .profile import ProfileSerializer


class MatchTeamInviteSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    team = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Team.objects.all())
    user = ProfileSerializer(read_only=True, source='user.profile')

    class Meta:
        model = TeamInvite
        fields = '__all__'
