from django.db import models
from . import Profile
from django.conf import settings


class FavoriteUser(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='favorite_users')
    favorite_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='favorited_by')

    class Meta:
        verbose_name = 'Favorite user' 
        verbose_name_plural = 'Favorite users'