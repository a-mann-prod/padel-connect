from django.db.models.signals import post_save
from django.dispatch import receiver
from main_app.models import Profile, MatchFilter, CustomUser, Match, MatchRequest, enums

@receiver(post_save, sender=CustomUser)
def handle_user_creation(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        MatchFilter.objects.create(user=instance)

@receiver(post_save, sender=Match)
def handle_match_creation(sender, instance, created, **kwargs):
    if created:
        MatchRequest.objects.create(user=instance, is_owner=True, status=enums.MatchRequestStatus.ACCEPTED)
