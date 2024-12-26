from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from main_app.models import CustomUser, Match, Notification, enums, Team, TeamInvite
from chat.models import Message

from django.utils import translation
from django.utils.translation import gettext as _
from django.db.models import Q


@receiver(post_save, sender=Match)
def handle_match_creation(sender, instance, created, **kwargs):
    if created:                
        if instance.is_private:
            return

        users = CustomUser.objects.filter(is_new_match_notification_enabled=True).exclude(id=instance.user.id)

        for user in users:
            match_filter = user.match_filter

            if match_filter.level_min != None and match_filter.level_max != None:
                if not (match_filter.level_min <= instance.level <= match_filter.level_max) and not instance.is_open_to_all_level:
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
        team_captain = instance.user
        send_invitations = getattr(instance, "_send_invitations", [])
        match = instance.match


        if not send_invitations:
            return

        users = CustomUser.objects.filter(pk__in=send_invitations)

        for user in users:
            user_language = user.language
            with translation.override(user_language):
                Notification.objects.create(
                    title=_("New invitation! 🎉"),
                    message=_("%(team_captain_name)s has invited you to play 💪. Respond as soon as possible!") % {'team_captain_name': team_captain.profile.first_name},
                    type= enums.NotificationType.NEW_MATCH_INVITATION,
                    user=user,
                    associated_data={"url": f"/match/{match.pk}"}
                )



# FONCTIONNE MAIS BANCAL UN PEU


# Permet de récupérer l'état précédent de la Team
@receiver(pre_save, sender=Team)
def previous_team(sender, instance, **kwargs):
    if instance.pk:
        previous_instance = Team.objects.filter(pk=instance.pk).first()
        if previous_instance:
            instance._previous_is_ready = previous_instance.is_ready
    else:
        instance._previous_is_ready = None
@receiver(post_save, sender=Team)
def handle_team_ready(sender, instance, created, **kwargs):
    match = instance.match
    match_captain = match.user      

    previous_is_ready = getattr(instance, '_previous_is_ready', None)

    if previous_is_ready is False and instance.is_ready:
        with translation.override(match_captain.language):
            Notification.objects.create(
                title=_("New players! 🎉"),
                message=_("New players have joined your match 💪"),
                type= enums.NotificationType.NEW_PLAYERS,
                user=match_captain,
                associated_data={"url": f"/match/{match.pk}"}
            )


# Permet de récupérer l'état précédent de la TeamInvite
@receiver(pre_save, sender=TeamInvite)
def previous_team_invite(sender, instance, **kwargs):
    if instance.pk:
        previous_instance = TeamInvite.objects.filter(pk=instance.pk).first()
        if previous_instance:
            instance._previous_status = previous_instance.status
    else:
        instance._previous_status = None
@receiver(post_save, sender=TeamInvite)
def handle_team_invite(sender, instance, created, **kwargs):
    if not created:
        team = instance.team
        team_captain = team.user  
        match = team.match

        previous_status = getattr(instance, '_previous_status', enums.RequestStatus.PENDING)

        if previous_status != instance.status:
            status = 'refused' if instance.status == enums.RequestStatus.REFUSED else 'accepted'
            user = instance.user
            with translation.override(team_captain.language):
                Notification.objects.create(
                    title=_("New invitation response !"),
                    message=_("%(user_first_name)s has %(status)s your invitation") % {'user_first_name': user.profile.first_name, 'status': status},
                    type= enums.NotificationType.INVITATION_RESPONSE,
                    user=team_captain,
                    associated_data={"url": f"/match/{match.pk}"}
                )



# handle message notifications (if >3 in x secondes, do not send anymore and send "you have many messages")
# @receiver(post_save, sender=Message)
# def handle_new_message(sender, instance, created, **kwargs):
#     sender = instance.user
#     match = instance.conversation.match

#     users = CustomUser.objects.filter(
#             Q(teaminvite__team__match=match) &  
#             Q(teaminvite__status=enums.RequestStatus.ACCEPTED) &  
#             Q(teaminvite__team__is_ready=True)  
#         ).distinct()  

#     for user in users:
#         with translation.override(user.language):
#             Notification.objects.create(
#                 title=_(sender.profile.first_name),
#                 message=_(instance.content),
#                 type= enums.NotificationType.NEW_MESSAGE,
#                 user=user,
#                 associated_data={"url": f"/match/{match.pk}/chat"}
#             )