/* eslint-disable camelcase */
export interface Solve {
  challid: string
  solved_at: Date
}

export interface Users {
  twitter_screenName: string // without @ mark
  twitter_displayName: string
  twitter_id: string
  photourl: string
  registered_at: Date
  uid: string
  solves: Solve[]
}

export interface Flag {
  flag: string
}

export interface Rank {
  uid: string
  twitter_id: string
  twitter_screenName: string
  solves: Solve[]
  score: number
}
