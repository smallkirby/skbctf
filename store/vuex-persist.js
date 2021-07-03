import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'skbctf',
      storage: window.localStorage,
    })(store)
  })
}
