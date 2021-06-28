import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';

firebase.initializeApp();

const db = firebase.firestore();
// const usersRef = db.collection('users');
const flagsRef = db.collection('flags');

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
          return {ok: true, message: 'correct'};
        } else {
          return {ok: true, message: 'wrong'};
        }
      } else {
        return {ok: false, message: `chall not exists: ${challid}`};
      }
    }).catch((_) => {
      return {ok: false, message: 'failed to fetch flag'};
    });
  }
);
