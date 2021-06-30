import { auth } from '~/plugins/firebase.js'

export default (context) => {
  const { store } = context

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    auth().onAuthStateChanged((user) => {
      // store.commit('setUser', user)
      resolve()
    })
  })
}
