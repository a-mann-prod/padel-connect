from django.db import models
from . import enums, Profile, Match


class MatchRequest(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    request_id = models.CharField(max_length=255)
    has_payed = models.BooleanField(default=False)
    invite_status = models.CharField(max_length=20, choices=enums.MatchRequestStatus.choices)
    status = models.CharField(max_length=20, choices=enums.MatchRequestStatus.choices)
    is_owner = models.BooleanField(default=False)
    is_guest = models.BooleanField(default=False)