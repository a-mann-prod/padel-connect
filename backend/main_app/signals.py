from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from main_app.models import Profile, MatchFilter, CustomUser, Match, Notification, enums
from chat.models import Conversation
from main_app.tasks import async_send_notification
from django.core.exceptions import ValidationError
from chat.models import Message

from django.utils import translation
from django.utils.translation import gettext as _


@receiver(post_save, sender=CustomUser)
def handle_user_creation(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        MatchFilter.objects.create(user=instance)

@receiver(post_save, sender=Match)
def handle_match_creation(sender, instance, created, **kwargs):
    if created:
        Conversation.objects.create(match=instance)
        
        if instance.is_private:
            return

        users = CustomUser.objects.filter(is_new_match_notification_enabled=True).exclude(id=instance.user.id)

        for user in users:
            match_filter = user.match_filter

            if match_filter.level_min != None and match_filter.level_max != None:
                if not (match_filter.level_min <= instance.level <= match_filter.level_max):
                        continue
                

            if match_filter.complex != None:
                if match_filter.complex != instance.complex:
                    continue

            user_language = user.profile.language
            with translation.override(user_language):
                Notification.objects.create(
                    title=_("New match available! 🎉"),
                    message=_("New match await you! Ready to give it your all? 💪"),
                    type= enums.NotificationType.NEW_MATCH_REQUEST,
                    user=user,
                    match=instance
                )
        

@receiver(post_save, sender=Notification)
def handle_notification(sender, instance, created, **kwargs):
    if created:
        if instance.user.push_token is not None:
            async_send_notification(instance.user.push_token, instance)

