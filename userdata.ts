/* eslint-disable camelcase */
export interface Chall {
  name: string
  solved_at: Date
}

export interface UsersData {
  uid: string
  twitter_id: string
  registered_at: Date
  solves: Chall[]
  role: 'viewer' | 'admin'
  providerId: string
}
