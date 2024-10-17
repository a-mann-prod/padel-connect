from django.db import models
from . import enums, Profile, Complex

class MatchFilter(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    complex = models.ForeignKey(Complex, on_delete=models.SET_NULL, null=True, blank=True)
    level_min = models.IntegerField()
    level_max = models.IntegerField()
    type = models.CharField(max_length=20, choices=enums.MatchType.choices, null=True, blank=True)