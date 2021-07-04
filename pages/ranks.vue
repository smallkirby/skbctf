<template>
  <layout-wrapper>
    <div class="mr-10">
      <div class="m-6 my-8">
        <p class="text-pink-200 text-3xl my-2">Ranks</p>
        <div class="mx-4">
          <p>Praise their pwning...</p>
        </div>
      </div>
      <div class="mx-auto w-4/5">
        <layout-rank-table :ranks="ranks" />
      </div>
    </div>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'
import { getRanks } from '~/static/js/firebase'

export default Vue.extend({
  async asyncData() {
    const ranks = await getRanks()
    for (const [ix, rank] of ranks.entries()) {
      ranks[ix] = {
        ...rank,
        rank: ix + 1,
      }
    }
    return {
      ranks,
    }
  },
})
</script>
