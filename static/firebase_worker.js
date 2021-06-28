firebase.initializeApp({
  apiKey: 'AIzaSyCLSAMnca-aTSkRu425m_Mfr8TltdmNN5A',
  authDomain: 'skbctf.firebaseapp.com',
  projectId: 'skbctf',
  storageBucket: 'skbctf.appspot.com',
  messagingSenderId: '1045253230032',
  appId: '1:1045253230032:web:367297afc14ab62dfafdd5',
})

const getIdToken = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe()
      if (user) {
        user.getIdToken().then(
          (idToken) => resolve(idToken),
          (_) => resolve(null)
        )
      } else {
        resolve(null)
      }
    })
  })
}

const getOriginFromUrl = (url) => {
  const pathArray = url.split('/')
  const protocol = pathArray[0]
  const host = pathArray[2]
  return protocol + '//' + host
}

self.addEventListener('fetch', (event) => {
  const requestProcessor = (idToken) => {
    let req = event.request
    if (
      self.location.origin === getOriginFromUrl(event.request.url) &&
      (self.location.protocol === 'https:' ||
        self.location.hostname === 'localhost') &&
      idToken
    ) {
      // copy headers
      const headers = new Headers()
      for (const entry of req.headers.entries()) {
        headers.append(entry[0], entry[1])
      }
      headers.append('Authorization', 'Bearer ' + idToken)
      try {
        req = new Request(req.url, {
          method: req.method,
          headers,
          mode: 'same-origin',
          credentials: req.credentials,
          cache: req.cache,
          redirect: req.redirect,
          referrer: req.referrer,
          body: req.body,
          bodyUsed: req.bodyUsed,
          context: req.context,
        })
      } catch (e) {
        console.error(e)
      }
    }
    return fetch(req)
  }

  event.respondWith(getIdToken().then(requestProcessor, requestProcessor))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim())
})
