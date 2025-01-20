from rest_framework import serializers
from main_app.models.match_archive import MatchArchive, MatchArchiveTeam
from main_app.models.team import Team
from main_app import mixins
from main_app.serializers import MinimalProfileSerializer, ComplexSerializer

def get_team_users(self, team):
    if team is None:
        return []

    users = team.user_1, team.user_2  # Ceci est un exemple de la relation que vous pourriez avoir

    users = [user.profile for user in users if user is not None]  # Filtrer les utilisateurs valides
    if users: 
        return MinimalProfileSerializer(users, many=True, context=self.context).data
    return []


class MeMatchArchiveSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    calculated_level_range = serializers.SerializerMethodField()
    team_1_users = serializers.SerializerMethodField()
    team_2_users = serializers.SerializerMethodField()

    class Meta:
        model = MatchArchive
        exclude = ['team_1', 'team_2']
    
    def get_team_1_users(self, obj):
        print(obj.team_1)
        return get_team_users(self, obj.team_1)
    
    def get_team_2_users(self, obj):
        return get_team_users(self, obj.team_2)

    def get_calculated_level_range(self, obj):
        return obj.calculate_level_range()


class MeMatchArchiveDetailSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    calculated_level_range = serializers.SerializerMethodField()
    complex = ComplexSerializer(read_only=True)
    user = MinimalProfileSerializer(read_only=True, source='user.profile')

    team_1_users = serializers.SerializerMethodField()
    team_2_users = serializers.SerializerMethodField()

    class Meta:
        model = MatchArchive
        exclude = ['team_1', 'team_2']
    
    def get_team_1_users(self, obj):
        return get_team_users(self, obj.team_1)
    
    def get_team_2_users(self, obj):
        return get_team_users(self, obj.team_2)

    def get_calculated_level_range(self, obj):
        return obj.calculate_level_range()