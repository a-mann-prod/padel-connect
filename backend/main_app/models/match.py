from django.db import models
from django.conf import settings
from main_app.services.elo import get_level_from_elo
from main_app.constants import SETS

def default_score_data():
    return {
        "sets": {
            "team_1": [None, None, None], 
            "team_2": [None, None, None]
        },
        "tie_breaks": {
            "team_1": [None, None, None], 
            "team_2": [None, None, None]
        }
    }

class Match(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    complex = models.ForeignKey("main_app.complex", on_delete=models.CASCADE)
    datetime = models.DateTimeField()
    duration = models.IntegerField()
    is_private = models.BooleanField(default=False)
    is_competitive = models.BooleanField(default=False)
    is_open_to_all_level = models.BooleanField(default=False)
    elo = models.FloatField()

    is_booked = models.BooleanField(default=False)

    is_decisive_point = models.BooleanField(default=False)
    is_super_tie_break = models.BooleanField(default=False)
    four_padel_field_id = models.IntegerField()
    four_padel_field_name = models.CharField(null=True)
    four_padel_booking_id = models.IntegerField(null=True)
    four_padel_field_price = models.FloatField()

    score_data = models.JSONField(default=default_score_data) 

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_level(self):
        return get_level_from_elo(self.elo)

    def calculate_level_range(self):
        level = self.get_level()
        
        if level < 1:
            # Cas pour les niveaux entre 0 et 1 (1 non inclus)
            min_level = 0
            max_level = min(10, level + 1)
        elif level > 9:
            # Cas pour les niveaux entre 9 et 10 (10 inclus)
            min_level = max(0, level - 1)
            max_level = 10
        else:
            # Cas général pour les niveaux entre 1 et 9
            min_level = max(0, level - 1)
            max_level = min(10, level + 1)

        min_level = round(min_level, 1)
        max_level = round(max_level, 1)

        return [min_level, max_level]
    
    def is_score_complete(self):
        sets_team_1 = self.score_data.get('sets.team_1', [])
        sets_team_2 = self.score_data.get('sets.team_2', [])

        return (
            len(sets_team_1) == SETS and 
            len(sets_team_2) == SETS and 
            all(score is not None for score in sets_team_1) and 
            all(score is not None for score in sets_team_2)
        )

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
        
    def get_teams(self):
        return self.teams.filter(is_ready=True)

    def __str__(self):
        return str(self.id)

    class Meta:
        ordering = ['datetime']
        verbose_name = 'Match' 
        verbose_name_plural = 'Matches'
