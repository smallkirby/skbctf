import { auth } from '~/plugins/firebase.js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ store }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    auth().onAuthStateChanged((user) => {
      // store.commit('setUser', user)
      resolve()
    })
  })
}
