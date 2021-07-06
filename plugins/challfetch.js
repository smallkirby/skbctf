import axios from 'axios'

export default async (context) => {
  const store = context.app.store
  const config = context.app.$config
  // fetch challs
  {
    const { data } = await axios.get(`${config.microCmsApiUrl}/challenges`, {
      headers: {
        'X-API-KEY': config.microCmsApiKey,
      },
    })
    store.commit('setChalls', data.contents)
  }

  // fetch notifications
  {
    const { data } = await axios.get(`${config.microCmsApiUrl}/notifications`, {
      headers: {
        'X-API-KEY': config.microCmsApiKey,
      },
    })
    store.commit('setNotifications', data.contents)
  }
}
