from django.db import models
from . import enums, Complex

class Tournament(models.Model):
    complex = models.ForeignKey(Complex, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    datetime = models.DateTimeField()
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_competitive = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Tournament' 
        verbose_name_plural = 'Tournaments'
        ordering = ['-datetime']