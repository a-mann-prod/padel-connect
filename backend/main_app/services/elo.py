from main_app.models.score import Score

EXPECTATION_SENSITIVITY_COEFF = 400

MAX_K = 32
MIN_K = 20

MATCH_K_TRESHOLD = 10

def get_k(MATCH_NB: int):
    if MATCH_NB == 0:
        return MAX_K
    if MATCH_NB >= MATCH_K_TRESHOLD:
        return MIN_K

    K_PER_MATCH = (MAX_K - MIN_K) / MATCH_K_TRESHOLD
    return MAX_K - K_PER_MATCH * MATCH_NB

def get_level_from_elo(elo):
    return round(float(1 + (float(elo) - 1.0) / 142.71), 1)

def get_elo_from_level(level):
    return float(1 + (float(level) - 1) * 142.71)

def get_team_expectation(winner_elo: float, loser_elo: float):
     return 1 / (1 + 10 ** ((loser_elo - winner_elo) / EXPECTATION_SENSITIVITY_COEFF))

def get_individual_expectation(team_expectation, user_elo, team_elo):
    return team_expectation * (user_elo / team_elo)

def calculate_next_elo(user, match_played_nb: int, user_expectation: float, is_winner: bool):
    user.elo = user.elo + get_k(match_played_nb) * (1 if is_winner else 0 - user_expectation)
    user.save()


class Team:
    def __init__(self, team, is_winner, opposing_team_elo):
        self.team = team
        self.users = team.get_users()
        self.elo = team.calculate_elo_average()
        self.is_winner = is_winner
        self.expectation = get_team_expectation(self.elo, opposing_team_elo)
        self.individual_expectations = [
            get_individual_expectation(self.expectation, user.profile.elo, self.elo)
            for user in self.users
        ]

    def update_elos(self):
        for user, user_expectation in zip(self.users, self.individual_expectations):
            calculate_next_elo(user.profile, 0, user_expectation, self.is_winner)


def main(score: Score):
    team_1 = score.team_1
    team_2 = score.team_2

    # Déterminer le gagnant
    winner = score.calculate_winner()

    # Initialiser les équipes avec leurs ELO et attentes
    team_1_obj = Team(team_1, winner == team_1, team_2.calculate_elo_average())
    team_2_obj = Team(team_2, winner == team_2, team_1.calculate_elo_average())

    # Mettre à jour les ELO des joueurs
    team_1_obj.update_elos()
    team_2_obj.update_elos()
