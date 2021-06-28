import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'skbctf',
      storage: window.localStorage,
    })(store)
  })
}
