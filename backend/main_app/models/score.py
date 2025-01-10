from django.db import models
from . import Match, Team

class Score(models.Model):
    match = models.OneToOneField(Match, on_delete=models.CASCADE, related_name='score')
    team_1 = models.OneToOneField(Team, on_delete=models.CASCADE, related_name='score_team_1')
    team_2 = models.OneToOneField(Team, on_delete=models.CASCADE, related_name='score_team_2')

    sets_team_1 = models.JSONField(default=list) 
    sets_team_2 = models.JSONField(default=list) 
    tie_breaks_team_1 = models.JSONField(default=list, blank=True, null=True)
    tie_breaks_team_2 = models.JSONField(default=list, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def calculate_winner(self):
        team_1_wins = sum(1 for t1, t2 in zip(self.sets_team_1, self.sets_team_2) if t1 > t2)
        team_2_wins = sum(1 for t1, t2 in zip(self.sets_team_1, self.sets_team_2) if t1 < t2)
        if team_1_wins > team_2_wins:
            return self.team_1
        elif team_2_wins > team_1_wins:
            return self.team_2
        return None

    def __str__(self):
        return f"Match {self.match.id} Score: Sets {self.sets_team_1}-{self.sets_team_2}"

