/* eslint-disable camelcase */
import * as fs from 'fs'
import * as firebase from '@firebase/testing'
import { v4 as uuid } from 'uuid'
import * as userdata from 'type/storedata'
import { database } from 'firebase-admin'

const PROJECT_ID_BASE = 'skbctf-test'
const EMU_PORT = require('../firebase.json').emulators.firestore.port
const RULES_PATH = 'firestore.rules'

console.log(`Firestore emulator is running on port ${EMU_PORT}`)

const createAuthApp = (auth?: object): firebase.firestore.Firestore => {
  return firebase
    .initializeTestApp({ projectId: `${PROJECT_ID_BASE}-${uuid()}`, auth })
    .firestore()
}
const usersRef = (db: firebase.firestore.Firestore) => db.collection('users')
const flagsRef = (db: firebase.firestore.Firestore) => db.collection('flags')

jest.setTimeout(30000)

describe('users test', () => {
  beforeAll(async () => {
    await firebase.loadFirestoreRules({
      projectId: PROJECT_ID_BASE,
      rules: fs.readFileSync(RULES_PATH, 'utf8'),
    })
  })

  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: PROJECT_ID_BASE })
  })

  afterAll(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()))
  })

  test('user: read as unauthorized user', async () => {
    const db = createAuthApp()
    const user = usersRef(db).doc('test')
    await firebase.assertSucceeds(user.get())
  })

  test('user: create invalid data w/o auth', async () => {
    const db = createAuthApp()
    const user = usersRef(db).doc('test')
    await firebase.assertFails(user.set({ name: 'waiwai' }))
  })

  test('user: create valid data with auth', async () => {
    const data: userdata.Users = {
      uid: 'waiwaiwai',
      twitter_id: '123456789',
      twitter_screenName: 'i_love_delta',
      twitter_displayName: 'dont_commit',
      photourl: 'https://localhost',
      registered_at: new Date(),
      solves: [],
    }
    const db = createAuthApp({ uid: data.uid })
    const user = usersRef(db).doc(data.uid)
    await firebase.assertSucceeds(user.set(data))
  })

  test('user: create invalid data with auth: twitter_id', async () => {
    const data = {
      uid: 'waiwaiwai',
      twitter_id: 123456789, // invalid type
      twitter_screenName: 'i_love_delta',
      twitter_displayName: 'dont_commit',
      registered_at: new Date(),
      photourl: 'https://localhost',
      solves: [],
    }
    const db = createAuthApp({ uid: data.uid })
    const user = usersRef(db).doc(data.uid)
    await firebase.assertFails(user.set(data))
  })

  test('create invalid data with auth: solves', async () => {
    const chall: userdata.Solve = {
      challid: '34',
      solved_at: new Date(),
    }
    const data: userdata.Users = {
      uid: 'waiwaiwai',
      twitter_id: '123456789',
      twitter_screenName: 'i_love_delta',
      twitter_displayName: 'dont_commit',
      photourl: 'https://localhost',
      registered_at: new Date(),
      solves: [chall],
    }
    const db = createAuthApp({ uid: data.uid })
    const user = usersRef(db).doc(data.uid)
    await firebase.assertFails(user.set(data))
  })

  test('user: update contents by viewer', async () => {
    const data: userdata.Users = {
      uid: 'waiwaiwai',
      twitter_id: '123456789',
      twitter_screenName: 'i_love_delta',
      twitter_displayName: 'dont_commit',
      photourl: 'https://localhost',
      registered_at: new Date(),
      solves: [],
    }
    const db = createAuthApp({ uid: data.uid })
    const user = usersRef(db).doc(data.uid)
    await firebase.assertSucceeds(user.set(data))

    const newData: userdata.Users = {
      ...data,
      twitter_id: '345',
    }
    await firebase.assertFails(user.set(newData))
  })
})

describe('flags test', () => {
  beforeAll(async () => {
    await firebase.loadFirestoreRules({
      projectId: PROJECT_ID_BASE,
      rules: fs.readFileSync(RULES_PATH, 'utf8'),
    })
  })

  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: PROJECT_ID_BASE })
  })

  afterAll(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()))
  })

  test('flag: read as authed user', async () => {
    const db = createAuthApp({uid: 'waiwai'})
    const user = flagsRef(db).doc('0')
    await firebase.assertFails(user.get())
  })

  test('flag: create valid data with auth', async () => {
    const flag: userdata.Flag = {
      flag: 'skbctf{test}'
    }
    const db = createAuthApp({uid: 'waiwai'})
    const user = usersRef(db).doc('1')
    await firebase.assertFails(user.set(flag))
  })
})
