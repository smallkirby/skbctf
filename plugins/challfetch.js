import axios from 'axios'

export default async (context) => {
  const store = context.app.store
  const config = context.app.$config
  if (store.getters.challs.length === 0) {
    const { data } = await axios.get(`${config.microCmsApiUrl}/challenges`, {
      headers: {
        'X-API-KEY': config.microCmsApiKey,
      },
    })
    store.commit('setChalls', data.contents)
  }
}
