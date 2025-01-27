from rest_framework import serializers
from main_app.models.team import TeamInvite, Team
from main_app import mixins
from .match_team import MatchTeamInviteSerializer


class InviteTeamSerializer(serializers.ModelSerializer):
    invitations = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ['id', 'user', 'invitations']

    def get_invitations(self, obj):
        """
        Récupère les invitations liées à l'équipe, 
        tout en excluant celle du current user.
        """
        current_user = self.context['request'].user
        invitations = obj.invitations.exclude(user=current_user)
        return MatchTeamInviteSerializer(invitations, many=True, context=self.context).data



class MatchInviteSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    team = InviteTeamSerializer()

    class Meta:
        model = TeamInvite
        fields = ['id', 'team']
        read_only_fields = ['user']


