<template>
  <layout-wrapper>
    <layout-normal-popup
      v-if="loginFinished"
      message="Successfully logged in!"
      pulse-char="💪"
      @close-popup="closePopup"
    />
    <div class="mr-10">
      <div v-if="!isLoggedin" class="m-6 my-8">
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
            <div v-show="isLoggedin" class="overflow-hidden px-4 flex">
              <img :src="photourl" class="rounded-full w-12 mr-2" />
              <div>
                <p key="isLoggedin" class="w-full text-sm whitespace-nowrap">
                  <a :href="twitterurl">@{{ screenName }}</a>
                </p>
                <p :key="score">{{ score }} pts</p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full mx-auto px-auto">
          <div class="ml-2">
            <div class="m-6 my-8">
              <p class="text-white text-2xl my-2">PNWED</p>
              <layout-solves-table :solves="solvesDetail" />
            </div>
          </div>
          <div class="ml-2">
            <div class="m-6 my-8 w-4/5">
              <p class="text-white text-2xl my-8">HISTORY</p>
              <layout-solves-chart v-if="chartReady" :props-data="chartData" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'
import LayoutSolvesTable from '~/components/LayoutSolvesTable.vue'
import { getChartData } from '~/static/js/solveChart'

export default Vue.extend({
  components: { LayoutSolvesTable },
  data() {
    return {
      loginFinished: false,
      solvesDetail: [],
      chartData: [],
    }
  },
  computed: {
    solves() {
      if (this.$store.getters.solves) {
        return this.$store.getters.solves
      } else {
        return []
      }
    },
    chartReady() {
      return this.chartData.length !== 0
    },
    isLoggedin() {
      return this.$store.getters.loggedin
    },
    twitterurl() {
      if (this.$store.getters.user) {
        return `https://twitter.com/${this.screenName}`
      } else {
        return ''
      }
    },
    screenName() {
      if (this.$store.getters.user) {
        return this.$store.getters.user.twitter_screenName
      } else {
        return ''
      }
    },
    score() {
      if (this.$store.getters.solves) {
        return this.$store.getters.solves.reduce((total, solve) => {
          const chall = this.$store.getters.challs.find(
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
      if (this.$store.getters.user) {
        return this.$store.getters.user.photourl
      } else {
        return ''
      }
    },
  },
  mounted() {
    this.solvesDetail = this.$store.getters.solvesDetail
    this.chartData = getChartData(this.solvesDetail)
    console.log(this.chartData)
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
