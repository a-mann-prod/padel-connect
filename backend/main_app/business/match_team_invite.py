from rest_framework.exceptions import PermissionDenied, ValidationError
from main_app.models.team import TeamInvite, enums
from main_app.models import enums
from main_app.exceptions import ErrorCode
from django.db.models import Q


def get_team_invite_requests(request, team):
    current_user = request.user

    if (current_user != team.user):
        raise PermissionDenied()
    
    return TeamInvite.objects.filter(
        team=team
    ).filter(
        Q(status=enums.RequestStatus.PENDING) | Q(status=enums.RequestStatus.ACCEPTED)
    ).exclude(user=current_user)



def validate_team_invite_creation(request, team_invite):
    current_user = request.user

    if (current_user != team_invite.user):
        raise PermissionDenied()
    

def team_invite_request_answer(request, match, team_invite, next_status):
    current_user = request.user
    
    if (team_invite.user != current_user):
        raise ValidationError(detail="Only invited user can accept/refuse team invitation")
    
    if (team_invite.status != enums.RequestStatus.PENDING):
        raise ValidationError(detail="Team invitation has already been accepted/refused")
    
    if match.is_competitive and team_invite.team.get_users() > 1:
        raise ValidationError(detail="There are not enough places left in this match.", code=ErrorCode.MATCH_FULL.value)

    team_invite.status = next_status
    team_invite.save()

    # Si la demande est acceptée, supprime toutes les autres demandes en attente
    if next_status == 'accept':
        TeamInvite.objects.filter(
           team__match=match,
           status=enums.RequestStatus.PENDING 
        ).delete()


def validate_team_invite_destruction(request, team_invite):
    current_user = request.user

    if team_invite.user != current_user and team_invite.team.user != current_user:
        raise PermissionDenied()
    

def validate_team_invite_match_creation():
    return True