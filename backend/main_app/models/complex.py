from django.db import models


class Complex(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    four_padel_id = models.IntegerField()

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Complex' 
        verbose_name_plural = 'Complexes'