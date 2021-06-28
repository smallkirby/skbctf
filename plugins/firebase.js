import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCLSAMnca-aTSkRu425m_Mfr8TltdmNN5A',
  authDomain: 'skbctf.firebaseapp.com',
  projectId: 'skbctf',
  storageBucket: 'skbctf.appspot.com',
  messagingSenderId: '1045253230032',
  appId: '1:1045253230032:web:367297afc14ab62dfafdd5',
}

console.log(`firebase.app.length: ${firebase.app.length}`)

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      console.log('changed persistence')
    })
    .catch((error) => {
      console.log('failed to set persistence')
      console.log(error)
    })
}

export const signinTwitter = async () => {
  const auth = () => {
    return new Promise((resolve, reject) => {
      const authUI = new firebase.auth.TwitterAuthProvider()
      firebase
        .auth()
        .signInWithPopup(authUI)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  try {
    const result = await Promise.resolve()
    return auth(result)
  } catch (err) {
    return console.log(err)
  }
}

export const signOut = () => {
  firebase.auth().signOut()
}

export const firestore = firebase.firestore()
export const auth = firebase.auth
