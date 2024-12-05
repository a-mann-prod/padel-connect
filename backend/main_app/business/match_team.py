
from rest_framework.exceptions import PermissionDenied, ValidationError, NotFound
from main_app.models import Team, enums
from main_app.serializers import MatchTeamRequestSerializer


def get_team_requests(request, match):
    current_user = request.user

    if current_user != match.user:
        raise PermissionDenied()
    
    return Team.objects.filter(match=match, status=enums.RequestStatus.PENDING).exclude(user=current_user)


def get_team_request_current_user(request, match):
    current_user = request.user
    
    team = Team.objects.filter(match=match, user=current_user).first()

    if not team:
        raise NotFound()

    serializer = MatchTeamRequestSerializer(team, context={'request': request})
    return serializer.data

    

def validate_match_team_creation(request, match):
    current_user = request.user

    # Vérifiez si l'utilisateur est le capitaine du match
        # Sert à rien car le capitaine créé automatiquement une team lors de la creation du match
    if match.user == current_user:
        raise ValidationError("Match owner cannot create a team on is own match.")

    # Vérifie si l'utilisateur a déjà une équipe pour ce match
    if Team.objects.filter(match=match, user=current_user).exists():
        raise ValidationError("Your already have a team for this match.")
    

def team_request_answer(request, match, team, next_status):
    current_user = request.user
    
    if (match.user != current_user):
        raise ValidationError("Only match owner can accept/refuse team")
    
    if (team.status != enums.RequestStatus.PENDING):
        raise ValidationError("Team has already been accepted/refused")
    
    team.status = next_status
    team.save()
    