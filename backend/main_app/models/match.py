from django.db import models
from django.conf import settings
from . import enums, Complex
from .team import Team

class Match(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    complex = models.ForeignKey(Complex, on_delete=models.CASCADE)
    datetime = models.DateTimeField()
    duration = models.IntegerField()
    is_private = models.BooleanField(default=False)
    level = models.IntegerField()
    type = models.CharField(max_length=20, choices=enums.MatchType.choices)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def current_players(self):
        return MatchPlayer.objects.filter(match=self, status=MatchPlayer.Status.ACCEPTED)

    def current_players_count(self):
        return sum([team.get_members().count() for team in self.current_players()])


    # def can_accept_team(self, team):
    #     """
    #     Vérifie si une équipe peut rejoindre le match.
    #     """
    #     participants_count = self.current_participants_count()
    #     if self.type == enums.MatchType.COMPETITION:
    #         return participants_count + team.get_members().count() == 4 and team.get_members().count() == 2
    #     else:
    #         return participants_count + team.get_members().count() <= 4

    class Meta:
        verbose_name = 'Match' 
        verbose_name_plural = 'Matches'


class MatchPlayer(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name='participations')
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='match_participations')
    status = models.CharField(max_length=20, choices=enums.RequestStatus.choices, default=enums.RequestStatus.PENDING)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    unique_together = ('match', 'team')  # Une équipe ne peut postuler qu'une seule fois à un match.

    class Meta:
        verbose_name = 'MatchPlayer' 
        verbose_name_plural = 'MatchPlayers'

