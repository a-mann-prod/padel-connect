from rest_framework.exceptions import PermissionDenied, ValidationError
from main_app.models import Team, Score, Match
from main_app.exceptions import ErrorCode

def validate_sets(sets_team_1, sets_team_2):
    if len(sets_team_1) != len(sets_team_2):
        raise ValidationError(detail="The number of sets must be identical for both teams", code=ErrorCode.SETS_MUST_BE_IDENTICAL.value)

    if any(set_score > 7 or set_score < 0 for set_score in sets_team_1):
        raise ValidationError("Invalid set score in sets_team_1: must be between 0 and 7.", code=ErrorCode.INVALID_SET_SCORE.value)
    
    if any(set_score > 7 or set_score < 0 for set_score in sets_team_2):
        raise ValidationError("Invalid set score in sets_team_2: must be between 0 and 7.", code=ErrorCode.INVALID_SET_SCORE.value)

def validate_score_creation_or_update(request, match: Match):
    current_user = request.user
    data = request.data
    
    teams = Team.objects.filter(match=match, is_ready=True)
    team_1 = teams.filter(user=match.user).first()
    team_2 = teams.exclude(user=match.user).first()

    match.is_super_tie_break => 

    if not team_1 or not team_2:
        raise ValidationError(detail="One or both teams could not be found")
    
    sets_team_1 = data['sets_team_1']
    sets_team_2 = data['sets_team_2']


    
    validate_sets(sets_team_1, sets_team_2)
    
    if 'tie_breaks_team_1' in data and 'tie_breaks_team_2' in data:
        if len(data['tie_breaks_team_1']) != len(data['tie_breaks_team_2']):
            raise ValidationError("The number of tie breaks must be identical for both teams", code=ErrorCode.TIE_BREAKS_MUST_BE_IDENTICAL.value)

    score, created = Score.objects.update_or_create(
        match=match,
        defaults={
            "team_1": team_1.pk,
            "team_2": team_2.pk,
            "sets_team_1": sets_team_1,
            "sets_team_2": sets_team_2,
            "tie_breaks_team_1": data.get("tie_breaks_team_1"),
            "tie_breaks_team_2": data.get("tie_breaks_team_2"),
        },
    )
    
    return score