from rest_framework import serializers
from main_app.models import Match, Complex, Team, enums
from main_app import mixins
from main_app.serializers import ComplexSerializer
from main_app.serializers.match_team import MatchTeamSerializer, MinimalMatchTeamSerializer


class MatchSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    complex = serializers.PrimaryKeyRelatedField(read_only=True)
    complex_id = serializers.PrimaryKeyRelatedField(queryset=Complex.objects.all(), source='complex', write_only=True)
    teams = serializers.SerializerMethodField()

    class Meta:
        model = Match
        fields = '__all__'

    def get_teams(self, obj):
        teams = Team.objects.filter(match=obj, status=enums.RequestStatus.ACCEPTED) 
        if teams.exists(): 
            return MinimalMatchTeamSerializer(teams, many=True, context=self.context).data

        return []


class MatchDetailSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    complex = ComplexSerializer(read_only=True)
    complex_id = serializers.PrimaryKeyRelatedField(
        queryset=Complex.objects.all(), source='complex', write_only=True
    )
    teams = serializers.SerializerMethodField()

    class Meta:
        model = Match
        fields = '__all__'

    def get_teams(self, obj):
        teams = Team.objects.filter(match=obj, status=enums.RequestStatus.ACCEPTED) 
        if teams.exists(): 
            return MatchTeamSerializer(teams, many=True, context=self.context).data
        
        return []
