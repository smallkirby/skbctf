import {
  signinTwitter,
  signOut,
  registerNewUser,
  getUserData,
} from '~/static/js/firebase'

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

  async nuxtServerInit(context) {
    if (context.getters.challs.length === 0) {
      const { data } = await axios.get(`${config.microCmsApiUrl}/challenges`, {
        headers: {
          'X-API-KEY': config.microCmsApiKey,
        },
      })
      commit('setChalls', data.contents)
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

  challs(state) {
    return state.challs.sort((a, b) => {
      if (a.dataid > b.dataid) {
        return 1
      } else if (a.dataid < b.dataid) {
        return -1
      } else {
        return 0
      }
    })
  },

  loggedin(state) {
    return !!state.user
  },
}
