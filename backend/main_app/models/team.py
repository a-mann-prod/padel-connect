from django.db import models
from . import enums
from django.conf import settings


class Team(models.Model):    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_members(self):
        """
        Retourne les membres de l'équipe en fonction des invitations acceptées.
        """
        return settings.AUTH_USER_MODEL.objects.filter(team_invites__team=self, team_invites__status=enums.RequestStatus.ACCEPTED)


    def __str__(self):
        return f"Team {self.id}"

    class Meta:
        verbose_name = 'Team' 
        verbose_name_plural = 'Teams'
        

class TeamInvite(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='invites')
    invited_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='team_invites')
    status = models.CharField(choices=enums.RequestStatus.choices, default=enums.RequestStatus.PENDING)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        unique_together = ('team', 'invited_user')  # Un utilisateur ne peut recevoir qu'une seule invitation pour une équipe.

    def __str__(self):
        return f"Invite to {self.invited_user.email} (Status: {self.status})"
