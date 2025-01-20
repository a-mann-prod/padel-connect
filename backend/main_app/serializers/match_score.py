from rest_framework import serializers
from main_app.models.score import Score
from main_app import mixins


class MatchScoreSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    team_1_id = serializers.ReadOnlyField(source='team_1.id')
    team_2_id = serializers.ReadOnlyField(source='team_2.id')
    
    # Adaptation pour sérialiser les sets
    sets_team_1 = serializers.ReadOnlyField(source='score_data.team_1.sets')
    sets_team_2 = serializers.ReadOnlyField(source='score_data.team_2.sets')
    
    # Adaptation pour sérialiser les tie_breaks
    tie_breaks_team_1 = serializers.ReadOnlyField(source='score_data.team_1.tie_breaks')
    tie_breaks_team_2 = serializers.ReadOnlyField(source='score_data.team_2.tie_breaks')

    class Meta:
        model = Score
        fields = [
            'team_1_id',
            'team_2_id',
            'sets_team_1',
            'sets_team_2',
            'tie_breaks_team_1',
            'tie_breaks_team_2',
            'created_at',
            'updated_at',
        ]