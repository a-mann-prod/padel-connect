from django.db import models
from django.conf import settings
from . import Complex

class Match(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    complex = models.ForeignKey(Complex, on_delete=models.CASCADE)
    datetime = models.DateTimeField()
    duration = models.IntegerField()
    is_private = models.BooleanField(default=False)
    is_competitive = models.BooleanField(default=False)
    is_open_to_all_level = models.BooleanField(default=False)
    level = models.FloatField()

    is_booked = models.BooleanField(default=False)

    is_decisive_point = models.BooleanField(default=False)
    is_super_tie_break = models.BooleanField(default=False)
    four_padel_field_id = models.IntegerField()
    four_padel_field_name = models.CharField(null=True)
    four_padel_booking_id = models.IntegerField(null=True)
    four_padel_field_price = models.FloatField()

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

        min_level = round(min_level, 1)
        max_level = round(max_level, 1)

        return [min_level, max_level]

    def __str__(self):
        return str(self.id)

    class Meta:
        ordering = ['id']
        verbose_name = 'Match' 
        verbose_name_plural = 'Matches'
