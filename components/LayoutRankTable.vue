<template>
  <layout-wrapper>
    <table class="w-4/5 table-fixed ml-2">
      <tr class="font-bold text-lg border-b border-skwhite">
        <th class="w-10">Rank</th>
        <th>Name</th>
        <th>Score</th>
      </tr>
      <tr
        v-for="(rank, ix) in ranks"
        :key="ix"
        class="text-center leading-relaxed"
      >
        <td>{{ rank.rank }}</td>
        <td>
          <div>
            <a
              :href="toTwitterURL(rank.twitter_screenName)"
              class="flex justify-center"
            >
              <img :src="rank.photourl" class="rounded-full w-8 mr-2" />
              <p>@{{ rank.twitter_screenName }}</p>
            </a>
          </div>
        </td>
        <td>{{ rank.score }}</td>
      </tr>
    </table>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutRankTable',
  props: {
    ranks: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  methods: {
    toTwitterURL(screenName) {
      return `https://twitter.com/${screenName}`
    },
  },
})
</script>
