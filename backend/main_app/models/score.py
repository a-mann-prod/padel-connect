from django.db import models
from main_app.constants import SETS

def default_score_data():
    return {
        "sets": {
            "team_1": [], 
            "team_2": []
        },
        "tie_breaks": {
            "team_1": [], 
            "team_2": []
        }
    }

class Score(models.Model):
    team_1 = models.OneToOneField('main_app.team', on_delete=models.CASCADE, related_name='score_team_1')
    team_2 = models.OneToOneField('main_app.team', on_delete=models.CASCADE, related_name='score_team_2')

    score_data = models.JSONField(default=default_score_data) 

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def is_score_complete(self):
        sets_team_1 = self.score_data.get('sets.team_1', [])
        sets_team_2 = self.score_data.get('sets.team_2', [])

        return len(sets_team_1) == SETS and len(sets_team_2) == SETS

    def calculate_winner(self):
        if not self.is_score_complete(): return None

        sets_team_1 = self.score_data.get('sets.team_1', [])
        sets_team_2 = self.score_data.get('sets.team_2', [])

        team_1_wins = sum(1 for t1, t2 in zip(sets_team_1, sets_team_2) if t1 > t2)
        team_2_wins = sum(1 for t1, t2 in zip(sets_team_1, sets_team_2) if t1 < t2)
        if team_1_wins > team_2_wins:
            return self.team_1
        else:
            return self.team_2
        

    def __str__(self):
        sets_team_1 = self.score_data.get('sets.team_1', [])
        sets_team_2 = self.score_data.get('sets.team_2', [])

        return f"Score: Sets {sets_team_1} - {sets_team_2}"

