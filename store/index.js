import { signinTwitter, signOut } from '~/plugins/firebase'

export const strict = false

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  unsetUser(state) {
    state.user = null
  },
}

export const actions = {
  async signin({ commit }) {
    const payload = await signinTwitter()
    const { additionalUserInfo } = payload
    const screenName = additionalUserInfo.profile.screen_name
    const twitterId = additionalUserInfo.profile.id_str
    const displayName = payload.user.displayName
    const uid = payload.user.uid
    const user = {
      twitter_screenName: screenName,
      twitter_displayName: displayName,
      twitter_id: twitterId,
      registered_at: new Date(),
      uid,
      solves: [],
    }
    commit('setUser', user)
  },
  signout({ commit }) {
    signOut()
    commit('unsetUser')
  },
}

export const getters = {
  user(state) {
    return state.user
  },

  loggedin(state) {
    return !!state.user
  },
}
