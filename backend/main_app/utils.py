# main_app/utils.py

from django.conf import settings
from main_app.models.match import Match 
from main_app.models.match_archive import MatchArchive, MatchArchiveTeam
from django.db import transaction

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


def get_teams(match: Match):
    team_1_archive = None
    team_2_archive = None

    team_1_user_1 = None
    team_1_user_2 = None
    
    team_2_user_1 = None
    team_2_user_2 = None
    
    teams = match.get_teams()

    if (match.is_competitive):
        team_1_users = teams[0].get_users() if len(teams) > 0 else []
        team_2_users = teams[1].get_users() if len(teams) > 1 else []

        team_1_user_1 = team_1_users[0] if len(team_1_users) > 0 else None
        team_1_user_2 = team_1_users[1] if len(team_1_users) > 1 else None

        team_2_user_1 = team_2_users[0] if len(team_2_users) > 0 else None
        team_2_user_2 = team_2_users[1] if len(team_2_users) > 1 else None
    else:
        all_users = [user for team in teams for user in team.get_users()]
        middle_index = len(all_users) // 2

        team_1_user_1 = all_users[0] if len(all_users) > 0 else None
        team_1_user_2 = all_users[1] if len(all_users) > 1 else None
        team_2_user_1 = all_users[middle_index] if len(all_users) > middle_index else None
        team_2_user_2 = all_users[middle_index + 1] if len(all_users) > middle_index + 1 else None
        
    if team_1_user_1 or team_1_user_2: 
        team_1_archive = MatchArchiveTeam(
            user_1=team_1_user_1,
            user_2=team_1_user_2    
        )

    if team_2_user_1 or team_2_user_2: 
        team_2_archive = MatchArchiveTeam(
            user_1=team_2_user_1,
            user_2=team_2_user_2
        )

    return team_1_archive, team_2_archive
    
@transaction.atomic
def archive_match(match: Match):
    """
    Archive a single match by transferring its data to the MatchArchive model.
    """

    team_1, team_2 = get_teams(match)
    score = match.score_data if match.is_competitive else None

    # Create a MatchArchive instance
    archived_match = MatchArchive(
        user=match.user,
        duration=match.duration,
        datetime=match.datetime,
        complex=match.complex,
        elo=match.elo,
        is_competitive=match.is_competitive,
        is_open_to_all_level=match.is_open_to_all_level,
        four_padel_field_id = match.four_padel_field_id,
        four_padel_field_name = match.four_padel_field_name,
        team_1=team_1,
        team_2=team_2,
        score=score
    )

    # Save teams
    team_1.save()
    team_2.save()

    # Save the archived match
    archived_match.save()

    # Delete the original match
    # match.delete()
    print(f"Match {match.id} has been archived successfully.")