from django.db import models
from . import enums
from django.conf import settings

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    defense_level = models.IntegerField(null=True, blank=True)
    offense_level = models.IntegerField(null=True, blank=True)
    service_level = models.IntegerField(null=True, blank=True)
    side_preference = models.CharField(max_length=10, choices=enums.SidePreference.choices, null=True, blank=True)
    is_onboarding_completed = models.BooleanField(default=False)
    is_new_match_notification_enabled = models.BooleanField(default=False)
    is_new_message_notification_enabled = models.BooleanField(default=False)
    language = models.CharField(max_length=10, null=True, blank=True)
    manual_preference = models.CharField(max_length=20, choices=enums.ManualPreference.choices, null=True, blank=True)
    push_token = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.user.email 
    
    class Meta:
        verbose_name = 'Profile' 
        verbose_name_plural = 'Profiles'
