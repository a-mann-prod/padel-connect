from django.db import models
from django.conf import settings
from main_app.services.elo import get_level_from_elo

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

class MatchArchiveTeam(models.Model):
    user_1 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='user_1')
    user_2 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='user_2')

    def __str__(self):
        name_1 = self.user_1.profile.get_full_name() if self.user_1 else "Unknown"
        name_2 = self.user_2.profile.get_full_name() if self.user_2 else "Unknown"

        return f"{name_1} | {name_2}"

class MatchArchive(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    datetime = models.DateTimeField()
    duration = models.IntegerField()
    complex = models.ForeignKey('Complex', on_delete=models.SET_NULL, null=True)
    elo = models.FloatField()
    is_competitive = models.BooleanField(default=False)
    is_open_to_all_level = models.BooleanField(default=False)

    four_padel_field_id = models.IntegerField(null=True)
    four_padel_field_name = models.CharField(null=True)

    team_1 = models.ForeignKey(MatchArchiveTeam, on_delete=models.SET_NULL, null=True, related_name='team_1')
    team_2 = models.ForeignKey(MatchArchiveTeam, on_delete=models.SET_NULL, null=True, related_name='team_2')

    score_data = models.JSONField(default=default_score_data) 

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def calculate_level_range(self):
        level = get_level_from_elo(self.elo)
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

    def __str__(self):
        return f"Archived Match {self.id}"
    
    class Meta:
        ordering = ['-datetime']