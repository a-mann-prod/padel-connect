from celery import shared_task
from .utils import send_push_notification, archive_match
from datetime import timedelta
from django.utils.timezone import now
from main_app.models import Match

@shared_task
def async_send_notification(push_token, instance_data):
    send_push_notification(push_token, instance_data)


@shared_task
def archive_past_matches():
    matches_to_archive = Match.objects.filter(
        datetime__lt=now() - timedelta(hours=2),
        is_competitive=False
    )
    for match in matches_to_archive:
        if match.is_reserved:
            print(f"Archiving match {match.id}")
            archive_match(match)
        else:
            print(f"Deleting match {match.id}")
            match.delete()