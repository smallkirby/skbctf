import firebase from 'firebase'
import moment from 'moment'

const config = {
  apiKey: 'AIzaSyCLSAMnca-aTSkRu425m_Mfr8TltdmNN5A',
  authDomain: 'skbctf.firebaseapp.com',
  projectId: 'skbctf',
  storageBucket: 'skbctf.appspot.com',
  messagingSenderId: '1045253230032',
  appId: '1:1045253230032:web:367297afc14ab62dfafdd5',
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
  firebase.auth()
}

export const getSolversForChall = async (challid) => {
  const solveDoc = firebase.firestore().collection('solves').doc(challid)
  return await solveDoc.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data()
      const solvers = data.solvers
      return solvers
    } else {
      return []
    }
  })
}

export const getRanks = async () => {
  const ranksRef = firebase.firestore().collection('ranks')
  const ranks = []
  await ranksRef
    .orderBy('score', 'desc')
    .get()
    .then((rankdata) => {
      rankdata.forEach((doc) => {
        ranks.push(doc.data())
      })
    })
  return ranks
}

export const getUserData = async (uid) => {
  const usersRef = firebase.firestore().collection('users')
  const userDoc = usersRef.doc(uid)
  return await userDoc.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data()
      const user = {
        solves: data.solves.map((solve) => {
          return {
            ...solve,
            solved_at: moment(solve.solved_at.toDate()).format(
              'YYYY/MM/DD HH:mm:SS'
            ),
          }
        }),
      }
      return user
    } else {
      return null
    }
  })
}

export const registerNewUser = async (user) => {
  const usersRef = firebase.firestore().collection('users')
  const userDoc = usersRef.doc(user.uid)
  await userDoc.get().then((doc) => {
    if (doc.exists) {
      console.log(
        'Somehow, data is already registered while you are new user...' // XXX should notify error and delete account
      )
    } else {
      userDoc
        .set(user)
        .then((_) => {
          console.log('successfully registered!')
        })
        .catch((err) => {
          console.log(err) // XXX should notify error and delete account
        })
    }
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
