from celery import shared_task
from .utils import send_push_notification, archive_match
from datetime import timedelta
from django.utils.timezone import now
from main_app.models.match import Match
from main_app.services import elo
from django.db.models import Q
from main_app.constants import SETS
import logging

logger = logging.getLogger('django')

@shared_task
def async_send_notification(push_token, instance_data):
    send_push_notification(push_token, instance_data)


@shared_task
def archive_past_matches():
    matches_to_archive = Match.objects.filter(
    Q(
        datetime__lt=now() - timedelta(hours=2),
        is_competitive=False
    ) |
    Q(
        datetime__lt=now() - timedelta(hours=2),
        is_competitive=True,
    )
)
    for match in matches_to_archive:
        if match.is_booked:
            logger.info(f"Archiving booked match {match.id}")
            
            if match.is_competitive and not match.is_score_complete():
                logger.info(f"Cannot archive booked match {match.id}: Score is not completed")
                continue
            archive_match(match)
        else:
            logger.info(f"Deleting match {match.id}")
            match.delete()

@shared_task
def test_elo():
    match = Match.objects.filter(pk=77).first()
    elo.main(match)


@shared_task
def test_match_archive():
    match = Match.objects.filter(pk=79).first()
    archive_match(match)
