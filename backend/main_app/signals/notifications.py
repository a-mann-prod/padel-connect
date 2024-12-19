from django.db.models.signals import post_save
from django.dispatch import receiver
from main_app.models import CustomUser, Match, Notification, enums, Team

from django.utils import translation
from django.utils.translation import gettext as _


@receiver(post_save, sender=Match)
def handle_match_creation(sender, instance, created, **kwargs):
    if created:                
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

            user_language = user.language
            with translation.override(user_language):
                Notification.objects.create(
                    title=_("New match available! 🎉"),
                    message=_("New match await you! Ready to give it your all? 💪"),
                    type= enums.NotificationType.NEW_MATCH,
                    user=user,
                    associated_data={"url": f"/match/{instance.pk}"}
                )
        

@receiver(post_save, sender=Team)
def handle_team_creation(sender, instance, created, **kwargs):
    if created:
        captain_profile = instance.user.profile
        send_invitations = getattr(instance, "_send_invitations", [])

        if not send_invitations:
            return

        users = CustomUser.objects.filter(pk__in=send_invitations)

        for user in users:
            user_language = user.language
            with translation.override(user_language):
                Notification.objects.create(
                    title=_("New invitation! 🎉"),
                    message=_("%(captain_name)s has invited you to play 💪. Respond as soon as possible!") % {'captain_name': captain_profile.first_name},
                    type= enums.NotificationType.NEW_MATCH_INVITATION,
                    user=user,
                    associated_data={"url": f"/match/{instance.pk}"}
                )