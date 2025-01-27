from rest_framework import serializers
from main_app.models.match import Match
from main_app.models.complex import Complex
from main_app.models.team import Team, TeamInvite
from main_app.models import enums
from main_app import mixins
from main_app.serializers import ComplexSerializer, MinimalProfileSerializer
from django.contrib.auth.models import AnonymousUser


def get_team_users(self, obj: Match, get_pending_users: bool):
    current_user = self.context.get('request').user
    get_pending = get_pending_users and obj.is_competitive and obj.user == current_user
    teams = obj.get_teams()

    team_1_users = []
    team_2_users = []

    if len(teams) == 1:
        team_1_users = teams[0].get_users(get_pending)
    elif len(teams) == 2:
        team_1_users = teams[0].get_users(get_pending)
        team_2_users = teams[1].get_users(get_pending)
    else:
        # Agréger tous les utilisateurs des équipes
        all_users = []
        for team in teams:
            all_users.extend(team.get_users(get_pending))
        team_1_users = all_users[:2]
        team_2_users = all_users[-2:]

    team_1_profiles = [user.profile for user in team_1_users]
    team_2_profiles = [user.profile for user in team_2_users]
    
    return [MinimalProfileSerializer(team_1_profiles, many=True, context=self.context).data, MinimalProfileSerializer(team_2_profiles, many=True, context=self.context).data]

class MatchSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    complex = serializers.PrimaryKeyRelatedField(read_only=True)
    complex_id = serializers.PrimaryKeyRelatedField(queryset=Complex.objects.all(), source='complex', write_only=True)
    team_1_users = serializers.SerializerMethodField()
    team_2_users = serializers.SerializerMethodField()
    calculated_level_range = serializers.SerializerMethodField()
    is_request = serializers.SerializerMethodField()

    class Meta:
        model = Match
        exclude = ['elo', 'score_data']
    
    def get_team_1_users(self, obj):
        return get_team_users(self, obj, False)[0]

    def get_team_2_users(self, obj):
        return get_team_users(self, obj, False)[1]
    
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
    team_1_users = serializers.SerializerMethodField()
    team_2_users = serializers.SerializerMethodField()

    calculated_level_range = serializers.SerializerMethodField()
    pending_users = serializers.SerializerMethodField()


    class Meta:
        model = Match
        exclude = ['elo']
    
    def get_team_1_users(self, obj):
        return get_team_users(self, obj, True)[0]

    def get_team_2_users(self, obj):
        return get_team_users(self, obj, True)[1]
    
    def get_pending_users(self, obj):
        current_user = self.context.get('request').user
        if current_user != obj.user: 
            return []
        
        team = obj.teams.filter(user=current_user).first()
        if team is None:
            return []
    
        return [
            invite.user.profile.pk
            for invite in team.invitations.filter(status=enums.RequestStatus.PENDING)
        ]
    

    def get_calculated_level_range(self, obj):
        return obj.calculate_level_range()
    