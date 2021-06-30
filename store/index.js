import {
  signinTwitter,
  signOut,
  registerNewUser,
  getUserData,
} from '~/plugins/firebase'

export const strict = false

export const state = () => ({
  user: null,
  solves: [],
  challs: [],
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setSolves(state, solves) {
    state.solves = solves
  },
  setChalls(state, challs) {
    state.challs = challs
  },
  unsetUser(state) {
    state.user = null
  },
  unsetSolves(state) {
    state.solves = []
  },
}

export const actions = {
  async signin({ commit }) {
    const payload = await signinTwitter()
    const { additionalUserInfo } = payload
    const screenName = additionalUserInfo.profile.screen_name
    const twitterId = additionalUserInfo.profile.id_str
    const displayName = payload.user.displayName
    const photourl = payload.user.photoURL
    const uid = payload.user.uid
    const { isNewUser } = additionalUserInfo
    const user = {
      twitter_screenName: screenName,
      twitter_displayName: displayName,
      twitter_id: twitterId,
      registered_at: new Date(),
      photourl,
      uid,
      solves: [],
    }
    if (isNewUser) {
      console.log('registering as new user')
      await registerNewUser(user)
    } else {
      console.log('hello again to skbctf...!')
    }

    const data = await getUserData(uid)
    if (data) {
      commit('setSolves', data.solves)
    }
    commit('setUser', user)
  },
  signout({ commit }) {
    signOut()
    commit('unsetUser')
    commit('unsetSolves')
  },

  async updateSolves({ commit }, uid) {
    const data = await getUserData(uid)
    if (data) {
      commit('setSolves', data.solves)
    }
  },
}

export const getters = {
  user(state) {
    return state.user
  },

  solves(state) {
    return state.solves
  },

  loggedin(state) {
    return !!state.user
  },
}
