# main_app/utils.py

from django.conf import settings
from main_app.models import Match, MatchArchive, TeamInvite, enums
import requests


def send_push_notification(push_token, notification):
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": f"bearer {settings.PUSH_NOTIF_TOKEN}"
    }
    payload = {
        "to": push_token,
        "sound": "default",
        "title": notification.title,
        "body": notification.message,
        "data": {
            "id": notification.id, # used to make notification as read
            **notification.associated_data
        },
    }
    response = requests.post(settings.PUSH_NOTIF_URL, json=payload, headers=headers)
    return response.json()

def archive_match(match: Match):
    """
    Archive a single match by transferring its data to the MatchArchive model.
    """

    # Create a MatchArchive instance
    archived_match = MatchArchive.objects.create(
        datetime=match.datetime,
        complex=match.complex,
        level=match.level,
        is_competitive=match.is_competitive,
    )

    # Add users to the archived match
    team_invites = TeamInvite.objects.filter(
        team__match=match, 
        status=enums.RequestStatus.ACCEPTED
    )
    users = [invite.user for invite in team_invites]
    archived_match.user.set(users)

    # Save the archived match
    archived_match.save()

    # Delete the original match
    match.delete()
    print(f"Match {match.id} has been archived successfully.")