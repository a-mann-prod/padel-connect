from django.db import models
from . import enums, Complex
from django.conf import settings

class MatchFilter(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='match_filter')
    complex = models.ForeignKey(Complex, on_delete=models.SET_NULL, null=True, blank=True)
    level_min = models.IntegerField(default=0)
    level_max = models.IntegerField(default=10)
    type = models.CharField(max_length=20, choices=enums.MatchType.choices, null=True, blank=True)
    
    class Meta:
        verbose_name = 'Match filter' 
        verbose_name_plural = 'Match filters'