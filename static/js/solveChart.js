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
  let total = 0
  const data = [
    {
      x: zeroDate.subtract(1, 'days').format(),
      y: total,
    },
  ]
  for (const score of scores) {
    total += score.score
    data.push({
      x: score.date.format(),
      y: total,
    })
  }

  // add today if last data is not today's
  if (!moment(data[data.length - 1].x).isSame(moment(), 'day')) {
    data.push({
      x: moment().format(),
      y: total,
    })
  }

  return data
}
