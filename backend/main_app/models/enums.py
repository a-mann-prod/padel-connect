from django.db import models


class ManualPreference(models.TextChoices):
    LEFT_HANDED = "LEFT_HANDED"
    RIGHT_HANDED = "RIGHT_HANDED"

class MatchRequestStatus(models.TextChoices):
    ACCEPTED = "ACCEPTED"
    REFUSED = "REFUSED"
    PENDING = "PENDING"

class MatchType(models.TextChoices):
    LEISURE = "LEISURE"
    COMPETITION = "COMPETITION"

class NotificationType(models.TextChoices):
    NEW_MESSAGE = "NEW_MESSAGE"
    NEW_MATCH = "NEW_MATCH"
    NEW_MATCH_REQUEST = "NEW_MATCH_REQUEST"
    MATCH_REQUEST_RESPONSE_ACCEPTED = "MATCH_REQUEST_RESPONSE_ACCEPTED"
    MATCH_REQUEST_RESPONSE_REFUSED = "MATCH_REQUEST_RESPONSE_REFUSED"

class SidePreference(models.TextChoices):
    LEFT = "LEFT"
    RIGHT = "RIGHT"
    BOTH = "BOTH"