import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
export interface Solve {
  challid: string
  solved_at: Date
}

firebase.initializeApp();

const db = firebase.firestore();
const usersRef = db.collection('users');
const flagsRef = db.collection('flags');

// no auth
const updateSolves = async (uid: string, challid: string) => {
  const userRef = usersRef.doc(uid);
  return userRef.get().then((userdata) => {
    if (userdata.exists) {
      const solves: Solve[]  = userdata.get('solves');
      const newSolve: Solve = {
        challid,
        solved_at: new Date()
      };
      if (solves.some((solve) => solve.challid === challid)) {
        return { ok: false, msg: 'you\'ve already solved this chall...' };
      }
      solves.push(newSolve);
      return userRef.update({
        solves
      }).then((_) => {
        return {ok: true, msg: 'correct'};
      }).catch((_) => {
        return {ok: false, msg: 'failed to update solves...'};
      });
    } else {
      return {ok: false, msg: 'somehow, you are not registered...'};
    }
  })
}

export const ping = functions.https.onRequest((request, response) => {
  response.send('pong');
});

export const submit = functions.https.onCall(
  async ({challid, flag}, context) => {
    if (
      typeof challid !== 'string' ||
      typeof flag !== 'string'
    ) {
      return {ok: false, message: 'Bad parameter types.'};
    }
    const uid = context.auth?.uid;
    if (!uid) {
      return {ok: false, message: 'Unauthorized'};
    }

    const flagRef = flagsRef.doc(challid);
    return flagRef.get().then((flagdata) => {
      if (flagdata.exists) {
        const answerFlag: string = flagdata.get('flag');
        if (answerFlag === flag) {
          return updateSolves(uid, challid).then((result) => {
            return result
          }).catch((_) => {
            return { ok: false, message: 'failed to update solves...' }
          });
        } else {
          return {ok: false, message: 'wrong'};
        }
      } else {
        return {ok: false, message: `chall not exists: ${challid}`};
      }
    }).catch((_) => {
      return {ok: false, message: 'failed to fetch flag'};
    });
  }
);

