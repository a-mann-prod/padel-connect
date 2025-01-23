from django.db import models
from main_app.models import enums 
from django.conf import settings
from main_app.services.elo import get_level_from_elo


class Team(models.Model):    
    match = models.ForeignKey("main_app.match", on_delete=models.CASCADE, related_name='teams')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    is_ready = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def get_users(self, append_pending = False):
        statuses = [enums.RequestStatus.ACCEPTED]

        if append_pending:
            statuses.append(enums.RequestStatus.PENDING)

        return [
            invite.user
            for invite in self.invitations.filter(status__in=statuses)
        ]

    def calculate_elo_average(self):
        accepted_invitations = self.invitations.filter(status=enums.RequestStatus.ACCEPTED)

        player_elos = [
            invite.user.profile.elo
            for invite in accepted_invitations
            if invite.user.profile.elo is not None
        ]

        if not player_elos:
            return None

        elo_average = sum(player_elos) / len(player_elos)

        return elo_average


    def calculate_level(self):
        return round(get_level_from_elo(self.calculate_elo_average()), 1)
    

    def __str__(self):
        return f"Team {self.id}"

    class Meta:
        verbose_name = 'Team' 
        verbose_name_plural = 'Teams'
        ordering = ['id']
        unique_together = ('match', 'user')  # Un utilisateur ne peut créer qu'une seule team par match

        

class TeamInvite(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='invitations')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='participants')
    status = models.CharField(choices=enums.RequestStatus.choices, default=enums.RequestStatus.PENDING)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        ordering = ['id']
        unique_together = ('team', 'user')  # Un utilisateur ne peut recevoir qu'une seule invitation pour une équipe.

    def __str__(self):
        return f"Invite to {self.user} (Status: {self.status})"
