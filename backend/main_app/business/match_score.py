from rest_framework.exceptions import ValidationError
from main_app.models.team import Team
from main_app.models.match import Match

from main_app.constants import SETS

from django.core.exceptions import ValidationError
from django.utils.timezone import now


# Constants for Tennis Rules
SETS_TO_WIN = 2
MIN_GAMES = 0
MAX_GAMES = 7
WINNING_GAMES = 6
TIE_BREAK_WIN = 7
SUPER_TIE_BREAK_WIN = 10
MIN_TIE_BREAK_DIFF = 2
MIN_SUPER_TIE_BREAK_DIFF = 2

def _validate_data_presence(sets_team_1: list, sets_team_2: list, tie_breaks_team_1: list, tie_breaks_team_2: list):
    """
    Validates the presence of data and ensures correct structure.
    """
    if len(sets_team_1) != len(sets_team_2):
        raise ValidationError("Both teams must have the same number of sets.")

    if len(tie_breaks_team_1) != len(tie_breaks_team_2):
        raise ValidationError("Both teams must have the same number of tie-breaks.")

    if len(tie_breaks_team_1) != len(sets_team_1):
        raise ValidationError("The number of tie-breaks must match the number of sets.")

def _validate_sets(sets_team_1: list, sets_team_2: list, is_super_tie_break: bool):
    """
    Validates the rules for the sets in a 2 sets winning match format, including 7-5.
    """
    winning_sets_team_1 = 0
    winning_sets_team_2 = 0

    for i, (set_team_1, set_team_2) in enumerate(zip(sets_team_1, sets_team_2)):
        # Super tie-break logic for the last set
        if i == len(sets_team_1) - 1 and is_super_tie_break:
            if set_team_1 > SUPER_TIE_BREAK_WIN or set_team_2 > SUPER_TIE_BREAK_WIN:
                raise ValidationError(f"Invalid score for super tie-break: {set_team_1}-{set_team_2}. Max is {SUPER_TIE_BREAK_WIN}.")
            if abs(set_team_1 - set_team_2) < MIN_SUPER_TIE_BREAK_DIFF:
                raise ValidationError(f"Super tie-break must have at least {MIN_SUPER_TIE_BREAK_DIFF} points difference.")
            continue

        # Normal set validation
        if set_team_1 == WINNING_GAMES and set_team_2 <= WINNING_GAMES - 2:
            # Valid standard win (6-x)
            winning_sets_team_1 += 1
        elif set_team_2 == WINNING_GAMES and set_team_1 <= WINNING_GAMES - 2:
            # Valid standard win (x-6)
            winning_sets_team_2 += 1
        elif set_team_1 == MAX_GAMES and set_team_2 == WINNING_GAMES - 1:
            # Valid extended win (7-5)
            winning_sets_team_1 += 1
        elif set_team_2 == MAX_GAMES and set_team_1 == WINNING_GAMES - 1:
            # Valid extended win (5-7)
            winning_sets_team_2 += 1
        elif {set_team_1, set_team_2} == {WINNING_GAMES, MAX_GAMES}:
            # Valid tie-break set (6-7 or 7-6)
            continue
        else:
            raise ValidationError(f"Invalid set score: {set_team_1}-{set_team_2}. Valid scores are 6-x, 7-5, or 7-6.")

        if winning_sets_team_1 > SETS_TO_WIN or winning_sets_team_2 > SETS_TO_WIN:
            raise ValidationError("A team cannot win more than 2 sets in a match.")



def _validate_tie_breaks(tie_breaks_team_1: list, tie_breaks_team_2: list, sets_team_1: list, sets_team_2: list, is_super_tie_break: bool):
    """
    Validates tie-breaks and ensures their correctness according to tennis rules.
    """
    for i, (tie_break_team_1, tie_break_team_2, set_team_1, set_team_2) in enumerate(zip(tie_breaks_team_1, tie_breaks_team_2, sets_team_1, sets_team_2)):
        # Super tie-break validation
        if i == len(sets_team_1) - 1 and is_super_tie_break:
            if tie_break_team_1 is None or tie_break_team_2 is None:
                raise ValidationError("Super tie-break scores cannot be null.")
            if abs(tie_break_team_1 - tie_break_team_2) < MIN_SUPER_TIE_BREAK_DIFF:
                raise ValidationError(f"Super tie-break must have at least {MIN_SUPER_TIE_BREAK_DIFF} points difference.")
            continue

        # Tie-break validation for normal sets
        if {set_team_1, set_team_2} == {WINNING_GAMES, MAX_GAMES}:
            if tie_break_team_1 is None or tie_break_team_2 is None:
                raise ValidationError(f"Tie-break scores cannot be null for set {i + 1} with score 6-7 or 7-6.")
            if abs(tie_break_team_1 - tie_break_team_2) < MIN_TIE_BREAK_DIFF:
                raise ValidationError(f"Tie-break in set {i + 1} must have at least {MIN_TIE_BREAK_DIFF} points difference.")
        elif tie_break_team_1 is not None or tie_break_team_2 is not None:
            raise ValidationError(f"Tie-breaks are not allowed for set {i + 1} unless the score is 6-7 or 7-6.")


def validate_score(data, match: Match):
    teams = Team.objects.filter(match=match, is_ready=True)
    team_1 = teams.filter(user=match.user).first()
    team_2 = teams.exclude(user=match.user).first()

    if match.datetime > now():
        raise ValidationError("The match date has not passed yet. Score cannot be entered.")

    if not team_1 or not team_2:
        raise ValidationError(detail="One or both teams could not be found")
    
    sets = data.get('sets', dict)
    tie_breaks = data.get('tie_breaks', dict)
    
    sets_team_1 = sets.get('team_1', None)
    sets_team_2 = sets.get('team_2', None)
    tie_breaks_team_1 = tie_breaks.get('team_1', None)
    tie_breaks_team_2 = tie_breaks.get('team_2', None)

    if not sets_team_1:
        raise ValidationError(detail="'sets.team_1' is required")
    
    if not sets_team_2:
        raise ValidationError(detail="'sets.team_2' is required")
    
    if not tie_breaks_team_1:
        raise ValidationError(detail="'tie_breaks.team_1' is required")
    
    if not tie_breaks_team_2:
        raise ValidationError(detail="'tie_breaks.team_2' is required")
    
        # Step 1: Validate input presence
    _validate_data_presence(sets_team_1, sets_team_2, tie_breaks_team_1, tie_breaks_team_2)

    # Step 2: Validate tennis rules
    _validate_sets(sets_team_1, sets_team_2, match.is_super_tie_break)
    _validate_tie_breaks(tie_breaks_team_1, tie_breaks_team_2, sets_team_1, sets_team_2, match.is_super_tie_break)

    return True