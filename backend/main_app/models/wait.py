from django.db import models

# Modèles pour chaque table












class Message(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    match = models.ForeignKey(Match, on_delete=models.SET_NULL, null=True, blank=True)
    sender = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, blank=True)


class Notification(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, null=True, blank=True)
    type = models.CharField(max_length=30, choices=NotificationType.choices)
    url = models.URLField(null=True, blank=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)


class Tournament(models.Model):
    complex = models.ForeignKey(Complex, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    datetime = models.DateTimeField()
    title = models.CharField(max_length=255)
    description = models.TextField()
    type = models.CharField(max_length=20, choices=MatchType.choices)
