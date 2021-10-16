<template>
  <layout-wrapper>
    <layout-normal-popup
      v-if="loginFinished"
      message="Successfully logged in!"
      pulse-char="💪"
      @close-popup="closePopup"
    />
    <div class="mr-10">
      <div v-if="!loggedin" class="m-6 my-8">
        <div>
          <p>Not logged in.</p>
          <p>
            Dive in now with
            <button @click="login">
              <img src="~/static/img/twitter.svg" class="w-6 inline ml-2" />
            </button>
          </p>
        </div>
      </div>
      <div v-else>
        <div class="m-6 my-8">
          <p class="text-pink-200 text-3xl my-2">Profile</p>
          <div class="mx-4">
            <div v-show="loggedin" class="overflow-hidden px-4 flex">
              <img :src="photourl" class="rounded-full w-12 mr-2" />
              <div>
                <p key="loggedin" class="w-full text-sm whitespace-nowrap">
                  <a :href="twitterurl" target="_blank">@{{ screenName }}</a>
                </p>
                <p :key="score">{{ score }} pts</p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-8">
          <div class="ml-2">
            <div class="ml-2 my-8">
              <p class="text-white text-2xl my-2">PNWED</p>
              <layout-solves-table :solves="solvesDetail" />
            </div>
          </div>
          <div class="ml-2">
            <div class="ml-2 my-8">
              <p class="text-white text-2xl my-8">HISTORY</p>
              <layout-solves-chart
                v-if="chartReady"
                :props-data="chartData"
                class="pl-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import LayoutSolvesTable from '~/components/LayoutSolvesTable.vue'
import { getChartData } from '~/static/js/solveChart'

export default Vue.extend({
  components: { LayoutSolvesTable },
  data() {
    return {
      loginFinished: false,
    }
  },
  computed: {
    ...mapGetters(['solves', 'loggedin', 'user', 'challs', 'solvesDetail']),
    chartReady() {
      return this.chartData.length !== 0
    },
    twitterurl() {
      if (this.user) {
        return `https://twitter.com/${this.user.screenName}`
      } else {
        return ''
      }
    },
    screenName() {
      if (this.user) {
        return this.user.twitter_screenName
      } else {
        return ''
      }
    },
    score() {
      if (this.solves && this.challs) {
        return this.solves.reduce((total, solve) => {
          const chall = this.challs.find(
            (chall) => chall.dataid === solve.challid
          )
          if (chall) {
            return total + chall.score
          } else {
            return total
          }
        }, 0)
      } else {
        return '?'
      }
    },
    photourl() {
      if (this.user) {
        return this.user.photourl
      } else {
        return ''
      }
    },
    chartData() {
      return getChartData(this.solvesDetail)
    },
  },
  methods: {
    async login() {
      this.loginFinished = false
      await this.$store.dispatch('signin')
      this.loginFinished = true
    },
    closePopup() {
      this.loginFinished = false
    },
  },
})
</script>
