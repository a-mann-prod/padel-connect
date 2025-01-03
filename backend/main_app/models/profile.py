from django.db import models
from . import enums
from django.conf import settings

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    avatar_url = models.ImageField(upload_to='avatars/', null=True, blank=True)
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    defense_level = models.FloatField(null=True, blank=True)
    offense_level = models.FloatField(null=True, blank=True)
    service_level = models.FloatField(null=True, blank=True)
    side_preference = models.CharField(max_length=10, choices=enums.SidePreference.choices, null=True, blank=True)
    manual_preference = models.CharField(max_length=20, choices=enums.ManualPreference.choices, null=True, blank=True)

    def calculate_level(self):
        levels = [self.defense_level, self.offense_level, self.service_level]
        valid_levels = [level for level in levels if level is not None]
        
        if not valid_levels:
            return None

        level_sum = sum(valid_levels)
        level_average = level_sum / len(valid_levels)
        
        return round(level_average, 1)
    
    def get_last_name(self, x=1):
        last_name = self.last_name
        formatted_last_name = '' if last_name is None else f"{last_name[:min(x, len(last_name))]}."
        
        return formatted_last_name
    
    def get_full_name(self, x=1):
        first_name = self.first_name
        formatted_last_name = self.get_last_name(x)
        formatted_first_name = '' if first_name is None else first_name
        
        return f"{formatted_first_name} {formatted_last_name}"

    def save(self, *args, **kwargs):
        if self.pk:
            old_avatar = Profile.objects.get(pk=self.pk).avatar_url
            if old_avatar and old_avatar != self.avatar_url:
                old_avatar.delete(save=False)
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.avatar_url:
            self.avatar_url.delete(save=False)
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.user.email
        
    class Meta:
        ordering = ['-id']
        verbose_name = 'Profile' 
        verbose_name_plural = 'Profiles'
