from django.db.models.signals import post_save
from django.dispatch import receiver
from main_app.models import Profile, MatchFilter, CustomUser, Match, Notification, enums, Team, TeamInvite, Score
from chat.models import Conversation
from main_app.tasks import async_send_notification

from django.utils.translation import gettext as _

@receiver(post_save, sender=TeamInvite)
def handle_team_update(sender, instance, created, **kwargs):

    if not created:
        team = instance.team
        accepted_invitations = team.invitations.filter(status=enums.RequestStatus.ACCEPTED)

        # Si il n'y a plus d'invitations en cours
        if not team.invitations.filter(status=enums.RequestStatus.PENDING).exists():
                
            # Si 2 invitations acceptées -> On passe la team à "is_ready" = True
            if accepted_invitations.count() >= 2:
                team.is_ready = True
                team.save(update_fields=['is_ready'])
            
            # Si seulement 1 invitation acceptée -> On supprime la team
            elif accepted_invitations.count() == 1:
                team.delete()

@receiver(post_save, sender=CustomUser)
def handle_user_creation(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        MatchFilter.objects.create(user=instance)

@receiver(post_save, sender=Team)
def handle_team_creation(sender, instance, created, **kwargs):    
    if created:
        TeamInvite.objects.create(team=instance, user=instance.user, status=enums.RequestStatus.ACCEPTED)

        send_invitations = getattr(instance, "_send_invitations", [])

        if not send_invitations:
            # Si aucune invitation n'est envoyée, l'équipe est prête
            instance.is_ready = True
            instance.save(update_fields=['is_ready'])
            return

        for user_id in send_invitations:
            user = CustomUser.objects.get(pk=user_id)
            TeamInvite.objects.create(
                team=instance,
                user=user,
                status=enums.RequestStatus.PENDING
            )


@receiver(post_save, sender=Match)
def handle_match_creation(sender, instance, created, **kwargs):
    if created:        
        Conversation.objects.create(match=instance)
        Team.objects.create(match=instance, user=instance.user, is_ready=True)
        

@receiver(post_save, sender=Notification)
def handle_notification(sender, instance, created, **kwargs):
    if created:
        if instance.user.push_token is not None:
            async_send_notification(instance.user.push_token, instance)

