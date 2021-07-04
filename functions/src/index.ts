import * as functions from 'firebase-functions'
import * as firebase from 'firebase-admin'
import axios from 'axios'
export interface Solve {
  challid: string
  solved_at: Date
}

export interface Rank {
  uid: string
  twitter_id: string
  twitter_screenName: string
  photourl: string,
  solves: Solve[]
  score: number
}

export interface Chall {
  name: string
  genre: string
  score: number
  dataid: string
  description: string
}

firebase.initializeApp()

const microcmsApikey: string = functions.config().microcms.apikey

const db = firebase.firestore()
const usersRef = db.collection('users')
const flagsRef = db.collection('flags')
const ranksRef = db.collection('ranks')
const solvesRef = db.collection('solves')

// no auth
const updateSolves = async (uid: string, challid: string) => {
  const userRef = usersRef.doc(uid)
  return userRef.get().then((userdata) => {
    if (userdata.exists) {
      const solves: Solve[] = userdata.get('solves')
      const newSolve: Solve = {
        challid,
        solved_at: new Date(),
      }
      if (solves.some((solve) => solve.challid === challid)) {
        return { ok: false, msg: "you've already solved this chall..." }
      }
      solves.push(newSolve)
      return userRef
        .update({
          solves,
        })
        .then((_) => {
          return { ok: true, msg: 'correct' }
        })
        .catch((_) => {
          return { ok: false, msg: 'failed to update solves...' }
        })
    } else {
      return { ok: false, msg: 'somehow, you are not registered...' }
    }
  })
}

export const ping = functions.https.onRequest((request, response) => {
  response.send('pong')
})

exports.updateAllSolves = functions.firestore
  .document('users/{userId}')
  .onWrite(async (change, context) => {
    const allSolves: {
      challid: string,
      solvers: {
        twitter_screenName: string,
        photourl: string,
      }[],
    }[] = []
    await usersRef.get().then((userdocs) => {
      userdocs.forEach((userdoc) => {
        const user = userdoc.data();
        const info = {
          twitter_screenName: user.twitter_screenName as string,
          photourl: user.photourl as string,
        };
        const solves: Solve[] = user.solves;
        solves.forEach((solve) => {
          const ix = allSolves.findIndex((s) => s.challid === solve.challid);
          if (ix === -1) {
            allSolves.push({
              challid: solve.challid,
              solvers: [info],
            });
          } else {
            allSolves[ix].solvers.push(info);
          }
        })
      });
    });

    allSolves.forEach((s) => {
      const solveRef = solvesRef.doc(s.challid)
      solveRef.set(s);
    });
  })

exports.updateRanking = functions.firestore
  .document('users/{userId}')
  .onWrite(async (change, context) => {
    const { data } = await axios.get(
      'https://skbctf.microcms.io/api/v1/challenges',
      {
        headers: {
          'X-API-KEY': microcmsApikey,
        },
      }
    )
    const challs = data.contents as Chall[]
    const userid: string = context.params.userId
    const rankRef = ranksRef.doc(userid)
    const userRef = usersRef.doc(userid)
    return userRef.get().then((userdata) => {
      const twitter_id = userdata.get('twitter_id')
      const twitter_screenName = userdata.get('twitter_screenName')
      const photourl = userdata.get('photourl')
      const solves: Solve[] = userdata.get('solves')

      let total_score = 0
      solves.forEach((solve) => {
        const chall = challs.find((_chall) => _chall.dataid === solve.challid)
        if (chall) {
          total_score += chall.score
        }
      })

      rankRef.set({
        twitter_id,
        twitter_screenName,
        solves,
        photourl,
        score: total_score,
        uid: userid,
      })
    })
  })

export const submit = functions.https.onCall(
  async ({ challid, flag }, context) => {
    if (typeof challid !== 'string' || typeof flag !== 'string') {
      return { ok: false, message: 'Bad parameter types.' }
    }
    const uid = context.auth?.uid
    if (!uid) {
      return { ok: false, message: 'Unauthorized' }
    }

    const flagRef = flagsRef.doc(challid)
    return flagRef
      .get()
      .then((flagdata) => {
        if (flagdata.exists) {
          const answerFlag: string = flagdata.get('flag')
          if (answerFlag === flag) {
            return updateSolves(uid, challid)
              .then((result) => {
                return result
              })
              .catch((_) => {
                return { ok: false, message: 'failed to update solves...' }
              })
          } else {
            return { ok: false, message: 'wrong' }
          }
        } else {
          return { ok: false, message: `chall not exists: ${challid}` }
        }
      })
      .catch((_) => {
        return { ok: false, message: 'failed to fetch flag' }
      })
  }
)
