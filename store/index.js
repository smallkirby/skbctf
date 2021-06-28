import { signinTwitter, signOut } from '~/plugins/firebase'

export const strict = false

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, payload) {
    console.log('store setUser')
    state.user = payload
  },
  unsetUser(state) {
    state.user = null
  },
  setScreenName(state, screenName) {
    state.screenName = screenName
  },
}

export const actions = {
  async signin({ commit }) {
    const payload = await signinTwitter()
    console.log(payload)
    const { additionalUserInfo } = payload
    const screenName = additionalUserInfo.profile.screen_name
    commit('setScreenName', screenName)
  },
  signout({ commit }) {
    commit('unsetUser')
    signOut()
  },
}

export const getters = {
  user(state) {
    return state.user
  },

  screenName(state) {
    return state.screenName
  },

  loggedin(state) {
    return !!state.user
  },
}
