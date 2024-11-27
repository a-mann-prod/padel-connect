from django.db import models
from . import enums, Match
from django.conf import settings


class Team(models.Model):    
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name='teams')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    status = models.CharField(choices=enums.RequestStatus.choices, default=enums.RequestStatus.CREATING)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"Team {self.id}"

    class Meta:
        verbose_name = 'Team' 
        verbose_name_plural = 'Teams'
        

class TeamInvite(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='invitations')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='participants')
    status = models.CharField(choices=enums.RequestStatus.choices, default=enums.RequestStatus.PENDING)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        unique_together = ('team', 'user')  # Un utilisateur ne peut recevoir qu'une seule invitation pour une équipe.

    def __str__(self):
        return f"Invite to {self.user} (Status: {self.status})"
