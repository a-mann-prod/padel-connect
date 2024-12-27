from django.db import models
from django.conf import settings

class MatchArchive(models.Model):
    datetime = models.DateTimeField()
    duration = models.IntegerField()
    complex = models.ForeignKey('Complex', on_delete=models.SET_NULL, null=True)
    user = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='archived_matches')
    level = models.FloatField()
    is_competitive = models.BooleanField(default=False)
    is_open_to_all_level = models.BooleanField(default=False)

    four_padel_field_id = models.IntegerField()
    four_padel_field_name = models.CharField()

    # score = models.JSONField(null=True, blank=True)  # Score du match

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def calculate_level_range(self):
        level = self.level
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

        return [min_level, max_level]

    def __str__(self):
        return f"Archived Match {self.id}"
    
    class Meta:
        ordering = ['-datetime']
