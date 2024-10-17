from django.db import models
from . import enums, Complex

class Match(models.Model):
    complex = models.ForeignKey(Complex, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    datetime = models.DateTimeField()
    duration = models.IntegerField()
    is_private = models.BooleanField(default=False)
    level = models.IntegerField()
    type = models.CharField(max_length=20, choices=enums.MatchType.choices)