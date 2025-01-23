import { ScoreData } from '@/services/api/types'
import { isNilOrEmpty } from '../global'

export const isWinner = (team: 'team_1' | 'team_2', scoreData?: ScoreData) => {
  if (!scoreData || !isComplete(scoreData)) return false

  const setsTeam1 = scoreData?.sets?.team_1 || []
  const setsTeam2 = scoreData?.sets?.team_2 || []

  const team1Wins = setsTeam1.reduce<number>(
    (wins, score, index) =>
      (wins || 0) + ((score || 0) > (setsTeam2[index] || 0) ? 1 : 0),
    0
  )
  const team2Wins = setsTeam2.reduce<number>(
    (wins, score, index) =>
      (wins || 0) + ((score || 0) > (setsTeam1[index] || 0) ? 1 : 0),
    0
  )

  return team1Wins > team2Wins ? team === 'team_1' : team === 'team_2'
}

export const isComplete = (scoreData: ScoreData) => {
  const setsTeam1 = scoreData.sets?.team_1 || []
  const setsTeam2 = scoreData.sets?.team_2 || []

  const team1Sets = setsTeam1.reduce<number>(
    (nb, score) => (!isNilOrEmpty(score) ? nb + 1 : nb),
    0
  )

  const team2Sets = setsTeam2.reduce<number>(
    (nb, score) => (!isNilOrEmpty(score) ? nb + 1 : nb),
    0
  )
  return team1Sets === team2Sets && team2Sets === 3
}
