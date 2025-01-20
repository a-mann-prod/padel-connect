from rest_framework.exceptions import ValidationError
from main_app.models.team import Team
from main_app.models.match import Match
from main_app.models.score import Score

from main_app.exceptions import ErrorCode
from main_app.constants import SETS

MIN_GAMES = 0
MAX_GAMES = 7
WIN_GAMES = 6

MIN_SUPER_TIE_GAMES = 0
MAX_SUPER_TIE_GAMES = 10

MIN_TIE_GAMES = 0
MAX_TIE_GAMES = 7

GAME_DIFFERENCE = 2


def validate_sets(sets_team_1: list, sets_team_2: list, is_super_tie_break: bool):
    if len(sets_team_1) != SETS:
        raise ValidationError(f"Invalid set score in sets_team_1: should have {SETS} sets", code=ErrorCode.INVALID_SET_SCORE.value)
    
    if len(sets_team_2) != SETS:
        raise ValidationError(f"Invalid set score in sets_team_2: should have {SETS} sets", code=ErrorCode.INVALID_SET_SCORE.value)

    if len(sets_team_1) != len(sets_team_2):
        raise ValidationError(detail="The number of sets must be identical for both teams", code=ErrorCode.SETS_MUST_BE_IDENTICAL.value)
    
    for i, (set_team_1, set_team_2) in enumerate(zip(sets_team_1, sets_team_2)):
        # Si dernier set et super_tie_break
        if i == SETS - 1 and is_super_tie_break:
            if abs(set_team_1 - set_team_2) < GAME_DIFFERENCE and max(set_team_1, set_team_2) >= MAX_SUPER_TIE_GAMES:
                raise ValidationError(
                    detail=f"Super tie-break must have at least {GAME_DIFFERENCE} points difference if one team reaches {MAX_SUPER_TIE_GAMES} or above",
                    code=ErrorCode.INVALID_SET_SCORE.value
                )
        # Vérification normale
        else:
            if set_team_1 < MIN_GAMES or set_team_1 > MAX_GAMES:
                raise ValidationError(
                    detail=f"Invalid set score in sets_team_1: must be between {MIN_GAMES} and {MAX_GAMES}", 
                    code=ErrorCode.INVALID_SET_SCORE.value
                )
            
            if set_team_2 < MIN_GAMES or set_team_2 > MAX_GAMES:
                raise ValidationError(
                    detail=f"Invalid set score in sets_team_2: must be between {MIN_GAMES} and {MAX_GAMES}", 
                    code=ErrorCode.INVALID_SET_SCORE.value
                )
            
def validate_tie_breaks(tie_breaks_team_1: list, tie_breaks_team_2: list, sets_team_1: list, sets_team_2: list, is_super_tie_break: bool):
    if len(tie_breaks_team_1) != SETS:
        raise ValidationError(f"Invalid tie-break score in tie_breaks_team_1: should have {SETS} tie-breaks", code=ErrorCode.INVALID_TIE_BREAK_SCORE.value)
    
    if len(tie_breaks_team_2) != SETS:
        raise ValidationError(f"Invalid tie-break score in tie_breaks_team_2: should have {SETS} tie-breaks", code=ErrorCode.INVALID_TIE_BREAK_SCORE.value)
    
    if len(tie_breaks_team_1) != len(tie_breaks_team_2):
        raise ValidationError(detail="The number of tie breaks must be identical for both teams", code=ErrorCode.TIE_BREAKS_MUST_BE_IDENTICAL.value)
    
    for i, (tie_break_team_1, tie_break_team_2) in enumerate(zip(tie_breaks_team_1, tie_breaks_team_2)):
        set_team_1 = sets_team_1[i]
        set_team_2 = sets_team_2[i]

        if i == SETS - 1 and is_super_tie_break:
            if tie_break_team_1 != None :
                    raise ValidationError(
                        detail=f"Invalid tie-break score in tie_break_team_1: No tie-break needed", 
                        code=ErrorCode.INVALID_TIE_BREAK_SCORE.value
                    )
            if tie_break_team_2 != None:
                raise ValidationError(
                    detail=f"Invalid tie-break score in tie_break_team_2: No tie-break needed", 
                    code=ErrorCode.INVALID_TIE_BREAK_SCORE.value
                )
        else:
            # tie break needed
            if {set_team_1, set_team_2} == {WIN_GAMES, MAX_GAMES}:
                if tie_break_team_1 < MIN_TIE_GAMES or tie_break_team_1 > MAX_TIE_GAMES:
                    raise ValidationError(
                        detail=f"Invalid tie-break score in tie_breaks_team_1: must be between {MIN_TIE_GAMES} and {MAX_TIE_GAMES}", 
                        code=ErrorCode.INVALID_TIE_BREAK_SCORE.value
                    )
                
                if tie_break_team_2 < MIN_TIE_GAMES or tie_break_team_2 > MAX_TIE_GAMES:
                    raise ValidationError(
                        detail=f"Invalid tie-break score in tie_breaks_team_2: must be between {MIN_TIE_GAMES} and {MAX_TIE_GAMES}", 
                        code=ErrorCode.INVALID_TIE_BREAK_SCORE.value
                    )
                
                if abs(tie_break_team_1 - tie_break_team_2) < GAME_DIFFERENCE and max(tie_break_team_1, tie_break_team_2) >= MAX_TIE_GAMES:
                    raise ValidationError(
                        detail=f"Tie-break must have at least {GAME_DIFFERENCE} points difference if one team reaches {MAX_TIE_GAMES} or above",
                        code=ErrorCode.INVALID_SET_SCORE.value
                    )
            
            # tie break not needed, raise error if there is some a value
            else: 
                if tie_break_team_1 != None:
                    raise ValidationError(
                        detail=f"Invalid tie-break score in tie_break_team_1: No tie-break needed", 
                        code=ErrorCode.INVALID_TIE_BREAK_SCORE.value
                    )
                if tie_break_team_2 != None:
                    raise ValidationError(
                        detail=f"Invalid tie-break score in tie_break_team_2: No tie-break needed", 
                        code=ErrorCode.INVALID_TIE_BREAK_SCORE.value
                    )


def validate_score_creation_or_update(request, match: Match):
    current_user = request.user
    data = request.data
    
    teams = Team.objects.filter(match=match, is_ready=True)
    team_1 = teams.filter(user=match.user).first()
    team_2 = teams.exclude(user=match.user).first()

    if not team_1 or not team_2:
        raise ValidationError(detail="One or both teams could not be found")
    
    sets_team_1 = data['sets_team_1']
    sets_team_2 = data['sets_team_2']
    tie_breaks_team_1 = data['tie_breaks_team_1']
    tie_breaks_team_2 = data['tie_breaks_team_2']

    if not sets_team_1:
        raise ValidationError(detail="Param 'sets_team_1' is required")
    
    if not sets_team_2:
        raise ValidationError(detail="Param 'sets_team_2' is required")
    
    if not tie_breaks_team_1:
        raise ValidationError(detail="Param 'tie_breaks_team_1' is required")
    
    if not tie_breaks_team_2:
        raise ValidationError(detail="Param 'tie_breaks_team_2' is required")
    
    validate_sets(sets_team_1, sets_team_2, match.is_super_tie_break)
    validate_tie_breaks(tie_breaks_team_1, tie_breaks_team_2, sets_team_1, sets_team_2, match.is_super_tie_break)

    return Score.objects.update_or_create(
        match=match,
        defaults={
            "team_1": team_1,
            "team_2": team_2,
            "score_data": {
                "sets": {
                    "team_1": sets_team_1, 
                    "team_2": sets_team_2
                },
                "tie_breaks": {
                    "team_1": tie_breaks_team_1, 
                    "team_2": tie_breaks_team_2
                }
            },
        },
    )