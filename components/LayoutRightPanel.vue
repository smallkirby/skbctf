<template>
  <layout-wrapper>
    <div>
      <div v-show="isLoggedin" class="overflow-hidden px-2 flex mt-2">
        <a :href="twitterurl"
          ><img :key="photourl" :src="photourl" class="rounded-full w-12 mr-2"
        /></a>
        <div>
          <p key="isLoggedin" class="w-full text-sm whitespace-nowrap">
            <a :href="twitterurl">@{{ screenName }}</a>
          </p>
          <p>{{ score }} pts</p>
        </div>
      </div>

      <div v-show="!isLoggedin" class="px-4">
        <p>not logged in</p>
      </div>
    </div>

    <div class="my-8">
      <p class="text-lg text-pink-200">Notifications</p>
      <div class="px-4">nothing</div>
    </div>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutRightPanel',
  data() {
    return {
      photourl: '',
    }
  },
  computed: {
    screenName() {
      if (this.$store.getters.user) {
        return this.$store.getters.user.twitter_screenName
      } else {
        return ''
      }
    },
    isLoggedin() {
      return this.$store.getters.loggedin
    },
    userinfo() {
      return this.$store.getters.user
    },
    twitterurl() {
      if (this.$store.getters.user) {
        return `https://twitter.com/${this.screenName}`
      } else {
        return ''
      }
    },
    score() {
      if (this.$store.getters.solves) {
        return '0' // XXX
      } else {
        return '?'
      }
    },
  },
  mounted() {
    if (this.$store.getters.user) {
      this.$data.photourl = this.$store.getters.user.photourl
    }
  },
})
</script>
