from rest_framework.exceptions import PermissionDenied, ValidationError
from main_app.models import TeamInvite, enums
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
    

def team_invite_request_answer(request, team_invite, next_status):
    current_user = request.user
    
    if (team_invite.user != current_user):
        raise ValidationError("Only invited user can accept/refuse team invitation")
    
    if (team_invite.status != enums.RequestStatus.PENDING):
        raise ValidationError("Team invitation has already been accepted/refused")
    
    team_invite.status = next_status
    team_invite.save()


def validate_team_invite_destruction(request, team_invite):
    current_user = request.user

    if team_invite.user != current_user and team_invite.team.user != current_user:
        raise PermissionDenied()