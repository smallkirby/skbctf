/* eslint-disable camelcase */
import * as fs from 'fs'
import * as firebase from '@firebase/testing'
import { v4 as uuid } from 'uuid'
import { UsersData, Chall } from '~/userdata'

const PROJECT_ID_BASE = 'skbctf-test'
const EMU_PORT = require('../firebase.json').emulators.firestore.port
const RULES_PATH = 'firestore.rules'

const createAuthApp = (auth?: object): firebase.firestore.Firestore => {
  return firebase
    .initializeTestApp({ projectId: `${PROJECT_ID_BASE}-${uuid()}`, auth })
    .firestore()
}
const usersRef = (db: firebase.firestore.Firestore) => db.collection('users')

jest.setTimeout(30000)

describe('test', () => {
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

  test('read as unauthorized user', async () => {
    const db = createAuthApp()
    const user = usersRef(db).doc('test')
    await firebase.assertSucceeds(user.get())
  })

  test('create invalid data w/o auth', async () => {
    const db = createAuthApp()
    const user = usersRef(db).doc('test')
    await firebase.assertFails(user.set({ name: 'waiwai' }))
  })

  test('create valid data with auth', async () => {
    const data: UsersData = {
      uid: 'waiwaiwai',
      twitter_id: 'ilove_twitter',
      registered_at: new Date(),
      solves: [],
      role: 'viewer',
      providerId: 'twitter.com',
    }
    const db = createAuthApp({ uid: data.uid })
    const user = usersRef(db).doc(data.uid)
    await firebase.assertSucceeds(user.set(data))
  })

  test('create invalid data with auth: role', async () => {
    const data: UsersData = {
      uid: 'waiwaiwai',
      twitter_id: 'ilove_twitter',
      registered_at: new Date(),
      solves: [],
      role: 'admin',
      providerId: 'twitter.com',
    }
    const db = createAuthApp({ uid: data.uid })
    const user = usersRef(db).doc(data.uid)
    await firebase.assertFails(user.set(data))
  })

  test('create invalid data with auth: solves', async () => {
    const chall: Chall = {
      name: 'chall-01',
      solved_at: new Date(),
    }
    const data: UsersData = {
      uid: 'waiwaiwai',
      twitter_id: 'ilove_twitter',
      registered_at: new Date(),
      solves: [chall],
      role: 'viewer',
      providerId: 'twitter.com',
    }
    const db = createAuthApp({ uid: data.uid })
    const user = usersRef(db).doc(data.uid)
    await firebase.assertFails(user.set(data))
  })

  test('update contents by viewer', async () => {
    const data: UsersData = {
      uid: 'waiwaiwai',
      twitter_id: 'ilove_twitter',
      registered_at: new Date(),
      solves: [],
      role: 'viewer',
      providerId: 'twitter.com',
    }
    const db = createAuthApp({ uid: data.uid })
    const user = usersRef(db).doc(data.uid)
    await firebase.assertSucceeds(user.set(data))

    const newData: UsersData = {
      ...data,
      twitter_id: 'uouo-fish-life',
    }
    await firebase.assertFails(user.set(newData))
  })
})
