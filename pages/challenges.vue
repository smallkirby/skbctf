<template>
  <layout-wrapper>
    <div class="w-full">
      <div class="container w-full mx-10 my-5 pr-20">
        <div class="flex flex-wrap">
          <layout-challenge-panel
            v-for="(chall, index) in challs"
            :key="index"
            :name="chall.name"
            :description="chall.description"
            :isSolved="chall.isSolved"
            :genre="chall.genre"
            :score="chall.score"
            :challid="chall.dataid"
          />
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ $config }) {
    console.log($config.microCmsApiKey)
    const { data } = await axios.get(`${$config.microCmsApiUrl}/challenges`, {
      headers: {
        'X-API-KEY': $config.microCmsApiKey,
      },
    })
    const challs = data.contents
    challs.sort((a, b) => {
      if (a.dataid < b.dataid) {
        return -1
      } else if (a.dataid === b.dataid) {
        return 0
      } else {
        return 1
      }
    })
    return {
      challs,
    }
  },
}
</script>
