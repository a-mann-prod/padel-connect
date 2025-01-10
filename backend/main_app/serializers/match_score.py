from rest_framework import serializers
from main_app.models import Score
from main_app import mixins


class MatchScoreSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
    team_1_id = serializers.ReadOnlyField(source='team_1.id')
    team_2_id = serializers.ReadOnlyField(source='team_2.id')

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

    # A metttre dans le business ?
    def validate(self, data):
        """Validation personnalisée pour vérifier que les scores sont cohérents"""
        if len(data['sets_team_1']) != len(data['sets_team_2']):
            raise serializers.ValidationError("Le nombre de sets doit être identique pour les deux équipes.")
        if 'tie_breaks_team_1' in data and 'tie_breaks_team_2' in data:
            if len(data['tie_breaks_team_1']) != len(data['tie_breaks_team_2']):
                raise serializers.ValidationError("Le nombre de tie-breaks doit être identique pour les deux équipes.")
        return data