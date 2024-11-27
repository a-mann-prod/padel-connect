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
    level = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = 'Match' 
        verbose_name_plural = 'Matches'
