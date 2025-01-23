# from rest_framework import serializers
# from main_app.models.score import Score
# from main_app import mixins


# class MatchScoreSerializer(mixins.ExcludeDatesFieldsMixin, serializers.ModelSerializer):
#     team_1_id = serializers.ReadOnlyField(source='team_1.id')
#     team_2_id = serializers.ReadOnlyField(source='team_2.id')
    
#     # sets_team_1 = serializers.ReadOnlyField(source='score_data.sets.team_1')
#     # sets_team_2 = serializers.ReadOnlyField(source='score_data.sets.team_2')
    
#     # tie_breaks_team_1 = serializers.ReadOnlyField(source='score_data.tie_breaks.team_1')
#     # tie_breaks_team_2 = serializers.ReadOnlyField(source='score_data.tie_breaks.team_2')

#     class Meta:
#         model = Score
#         fields = [
#             'team_1_id',
#             'team_2_id',
#             'score_data'
#             # 'sets_team_1',
#             # 'sets_team_2',
#             # 'tie_breaks_team_1',
#             # 'tie_breaks_team_2',
#             # 'created_at',
#             # 'updated_at',
#         ]