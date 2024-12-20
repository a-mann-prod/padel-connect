from django.db import models


class ManualPreference(models.TextChoices):
    LEFT_HANDED = "LEFT_HANDED"
    RIGHT_HANDED = "RIGHT_HANDED"

class RequestStatus(models.TextChoices):
    ACCEPTED = "ACCEPTED"
    REFUSED = "REFUSED"
    PENDING = "PENDING"

class MatchType(models.TextChoices):
    LEISURE = "LEISURE"
    COMPETITION = "COMPETITION"

class NotificationType(models.TextChoices):
    NEW_MESSAGE = "NEW_MESSAGE"
    NEW_MATCH = "NEW_MATCH"
    NEW_MATCH_INVITATION = "NEW_MATCH_INVITATION"
    MATCH_REQUEST_RESPONSE_ACCEPTED = "MATCH_REQUEST_RESPONSE_ACCEPTED"
    MATCH_REQUEST_RESPONSE_REFUSED = "MATCH_REQUEST_RESPONSE_REFUSED"
    NEW_PLAYERS = "NEW_PLAYERS"
    INVITATION_RESPONSE = "INVITATION_RESPONSE"

class SidePreference(models.TextChoices):
    LEFT = "LEFT"
    RIGHT = "RIGHT"
    BOTH = "BOTH"

class Language(models.TextChoices): 
    EN = "EN"
    FR = "FR"
