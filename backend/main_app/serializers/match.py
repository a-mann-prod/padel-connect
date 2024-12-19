from rest_framework import serializers
from main_app.models import Match, Complex, Team, TeamInvite
from main_app import mixins
from main_app.serializers import ComplexSerializer
from main_app.serializers.match_team import MatchTeamSerializer
from django.contrib.auth.models import AnonymousUser



def get_teams(self, obj):
    teams = Team.objects.filter(match=obj, is_ready=True) 
    if teams.exists(): 
        return MatchTeamSerializer(teams, many=True, context=self.context).data

    return []


class MatchSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    complex = serializers.PrimaryKeyRelatedField(read_only=True)
    complex_id = serializers.PrimaryKeyRelatedField(queryset=Complex.objects.all(), source='complex', write_only=True)
    teams = serializers.SerializerMethodField()
    calculated_level_range = serializers.SerializerMethodField()
    is_request = serializers.SerializerMethodField()

    class Meta:
        model = Match
        fields = '__all__'

    def get_teams(self, obj):
        return get_teams(self, obj)
    
    def get_calculated_level_range(self, obj):
        return obj.calculate_level_range()

    def get_is_request(self, obj):
        current_user = self.context['request'].user
        if current_user == AnonymousUser():
            return False

        # Vérifier si une invitation existe pour cet utilisateur avec une équipe dans le match
        has_pending_invitation = TeamInvite.objects.filter(
            team__match=obj,
            user=current_user,
            team__is_ready=False
        ).exists()

        return has_pending_invitation


class MatchDetailSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    complex = ComplexSerializer(read_only=True)
    complex_id = serializers.PrimaryKeyRelatedField(
        queryset=Complex.objects.all(), source='complex', write_only=True
    )
    teams = serializers.SerializerMethodField()
    calculated_level_range = serializers.SerializerMethodField()


    class Meta:
        model = Match
        fields = '__all__'

    def get_teams(self, obj):
        return get_teams(self, obj)

    def get_calculated_level_range(self, obj):
        return obj.calculate_level_range()
    