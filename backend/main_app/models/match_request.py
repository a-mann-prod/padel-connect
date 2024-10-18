from django.db import models
from . import enums, Match
from django.conf import settings



class MatchRequest(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    has_payed = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=enums.MatchRequestStatus.choices)
    is_owner = models.BooleanField(default=False)
    is_guest = models.BooleanField(default=False)

    # TODO: later
    invite_status = models.CharField(max_length=20, choices=enums.MatchRequestStatus.choices)
    request_id = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Match request' 
        verbose_name_plural = 'Match requests'