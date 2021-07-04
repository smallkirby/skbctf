import moment from 'moment'

export const getChartData = (_solves) => {
  if (_solves.length === 0) {
    return []
  }
  const solves = _solves.map((solve) => {
    return {
      ...solve,
      solved_at: moment(solve.solved_at),
    }
  })
  solves.sort((a, b) => a.solved_at.diff(b.solved_at, 'seconds'))

  // represents total score, earned in the same day (not accums)
  const scores = []
  for (const solve of solves) {
    const date = solve.solved_at
    if (scores.some((score) => date.isSame(score.date, 'day'))) {
      const ix = scores.findIndex((score) => date.isSame(score.date, 'day'))
      scores[ix].score += solve.score
    } else {
      scores.push({
        date,
        score: solve.score,
      })
    }
  }

  const zeroDate = moment(scores[0].date)
  const formatter = 'YY/MM/DD'
  let total = 0
  const data = [
    {
      x: zeroDate.subtract(1, 'days').toISOString(),
      y: total,
    },
  ]
  for (const score of scores) {
    total += score.score
    data.push({
      x: score.date.toISOString(),
      y: total,
    })
  }

  return data
}
