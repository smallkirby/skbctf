import {
  signinTwitter,
  signOut,
  registerNewUser,
  getUserData,
  signinTwitterRedirect,
  updateUser,
} from '~/static/js/firebase'

export const strict = false

export const state = () => ({
  user: null,
  solves: [],
  challs: [],
  notifications: [],
})

export const mutations = {
  forgetAll(state) {
    state.user = null
    state.solves = []
  },
  setUser(state, user) {
    state.user = user
  },
  setSolves(state, solves) {
    state.solves = solves
  },
  setChalls(state, challs) {
    state.challs = challs
  },
  setNotifications(state, notifications) {
    state.notifications = notifications
  },
  unsetUser(state) {
    state.user = null
  },
  unsetSolves(state) {
    state.solves = []
  },
}

export const actions = {
  async signinRedirect({ commit }) {
    const payload = await signinTwitterRedirect()
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
      await updateUser(user)
    }

    const data = await getUserData(uid)
    if (data) {
      commit('setSolves', data.solves)
    }
    commit('setUser', user)
  },

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
      await updateUser(user)
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

  async updateUserInfo({ commit }, uid) {
    const user = await getUserData(uid)
    commit('setUser', user)
  },

  async updateSolves({ commit }, uid) {
    const data = await getUserData(uid)
    if (data) {
      commit('setSolves', data.solves)
    }
  },

  forgetAll({ commit }) {
    commit('forgetAll')
  },

  async nuxtServerInit(context, { $config, $axios }) {
    {
      const { data } = await $axios.get(
        `${$config.microCmsApiUrl}/challenges`,
        {
          headers: {
            'X-API-KEY': $config.microCmsApiKey,
          },
        }
      )
      context.commit('setChalls', data.contents)
    }
    {
      const { data } = await $axios.get(
        `${$config.microCmsApiUrl}/notifications`,
        {
          headers: {
            'X-API-KEY': $config.microCmsApiKey,
          },
        }
      )
      context.commit('setNotifications', data.contents)
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
    return state.challs.slice().sort((a, b) => {
      if (a.dataid > b.dataid) {
        return 1
      } else if (a.dataid < b.dataid) {
        return -1
      } else {
        return 0
      }
    })
  },

  notifications(state) {
    return state.notifications.slice().sort((a, b) => {
      const ad = new Date(a.revisedAt)
      const bd = new Date(b.revisedAt)
      return -(ad.getTime() - bd.getTime())
    })
  },

  loggedin(state) {
    return !!state.user
  },

  solvesDetail(state) {
    if (!state.challs || !state.solves) {
      return []
    } else {
      const challs = state.challs
      return state.solves.map((solve) => {
        const chall = challs.find((chall) => solve.challid === chall.dataid)
        if (!chall) {
          console.log(`Unknown challenge: ${solve.challid}`)
          return null
        }
        return {
          challid: solve.challid,
          solved_at: solve.solved_at,
          name: chall.name,
          genre: chall.genre,
          description: chall.description,
          score: chall.score,
        }
      })
    }
  },
}
