import { auth } from '~/plugins/firebase.js'

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth().onAuthStateChanged((user) => {
      console.log('firebase.auth().onAuthStateChanged')
      store.commit('setUser', user)
      resolve()
    })
  })
}
