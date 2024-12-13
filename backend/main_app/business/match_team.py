
from rest_framework.exceptions import ValidationError, NotFound
from main_app.models import Team, enums, TeamInvite
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

    

def validate_match_team_creation(request, match):
    current_user = request.user

    # Vérifiez si l'utilisateur est le capitaine du match
        # Sert à rien car le capitaine créé automatiquement une team lors de la creation du match
    if match.user == current_user:
        raise ValidationError("Match owner cannot create a team on is own match.")

    # Vérifie si l'utilisateur a déjà une équipe pour ce match
    if Team.objects.filter(match=match, user=current_user).exists():
        raise ValidationError("Your already have a team for this match.")
    
    # Vérifie si l'utilisateur a le niveau pour ce match
    [min_level, max_level] = match.calculate_level_range()
    user_level = current_user.profile.calculate_level()

    if not match.is_open_to_all_level and not (min_level <= user_level <= max_level):
        raise ValidationError("You do not have level to join this match")