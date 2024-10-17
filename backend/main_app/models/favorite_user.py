from django.db import models
from . import Profile

class FavoriteUser(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='favorite_users')
    favorite_user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='favorited_by')