
from rest_framework.exceptions import ValidationError, NotFound
from main_app.models import Team, enums, TeamInvite, CustomUser
from main_app.models import Team, TeamInvite, enums


def get_team_request_current_user(request, match):
    current_user = request.user
    
    accepted_invitations = TeamInvite.objects.filter(team__match=match, user=current_user, status=enums.RequestStatus.ACCEPTED)

    if not accepted_invitations:
        raise NotFound()
    
    team = accepted_invitations.first().team

    if not team:
        raise NotFound()
    
    return team

def delete_team_request_current_user(request, team):
    current_user = request.user

    # tant que la team n'est pas dans le match, on peut supprimer
    if not team.is_ready:
        team.delete()
        return
    
    team_members =  TeamInvite.objects.filter(team=team, status=enums.RequestStatus.ACCEPTED)
    
    invitation = team_members.filter(user=current_user)

    # Pas capitaine -> suppression de l'invitation
    if team.user != request.user:
        invitation.delete()
        return

    # Capitaine

    # Récupération des membres
    team_members_without_current_user = team_members.exclude(user=current_user)

    if not team_members_without_current_user.exists():
        # Pas d'autres utilisateurs dans l'équipe : suppression de l'équipe
        team.delete()
        return

    # Transfert du capitanat à un autre utilisateur
    new_captain = team_members.first().user
    team.user = new_captain
    team.save()
    invitation.delete()

    

def validate_match_team_creation(request, match, send_invitations = []):
    current_user = request.user

    # Vérifiez si l'utilisateur est le capitaine du match
    if match.user == current_user:
        raise ValidationError(detail="Match owner cannot create a team on is own match.")

    # Vérifie si l'utilisateur a déjà une équipe pour ce match ou est invité
    user_invitations = TeamInvite.objects.filter(
        team__match=match,
        status__in=[enums.RequestStatus.ACCEPTED, enums.RequestStatus.PENDING],
        user=current_user
    )
    if len(user_invitations) > 0:
        raise ValidationError(detail="Your already have a team or an invite for this match.", code="ALREADY_INVITED")    
    
    # Vérifie si l'utilisateur a le niveau pour ce match
    [min_level, max_level] = match.calculate_level_range()
    user_level = current_user.profile.calculate_level()
    if not match.is_open_to_all_level and not (min_level <= user_level <= max_level):
        raise ValidationError(detail="You do not have level to join this match", code="LEVEL_NOT_MATCH")
    
    # Vérifie qu'il reste des places disponibles
    players_count = TeamInvite.objects.filter(
        team__match=match,
        status=enums.RequestStatus.ACCEPTED 
    ).count()

    available_places = 4 - players_count - len(send_invitations)
    if available_places <= 0:
        raise ValidationError(detail="There are not enough places left in this match.", code="MATCH_FULL")

    # Vérifie le niveau des joueurs invités
    invited_users = CustomUser.objects.filter(pk__in=send_invitations).select_related('profile')
    for invited_user in invited_users:
        invited_user_level = invited_user.profile.calculate_level()
        if not (min_level <= invited_user_level <= max_level):
            raise ValidationError(detail="Invited players do not meet the level requirements for this match.")