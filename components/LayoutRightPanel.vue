<template>
  <layout-wrapper>
    <div>
      <div v-if="isLoggedin" class="overflow-hidden px-2 flex mt-2">
        <a :href="twitterurl"
          ><img :key="photourl" :src="photourl" class="rounded-full w-12 mr-2"
        /></a>
        <div>
          <p key="isLoggedin" class="w-full text-sm whitespace-nowrap">
            <a :href="twitterurl">@{{ screenName }}</a>
          </p>
          <p :key="score">{{ score }} pts</p>
        </div>
      </div>

      <div v-show="!isLoggedin" class="px-4">
        <p>not logged in</p>
      </div>
    </div>

    <div class="my-8">
      <p class="text-lg text-pink-200">Notifications</p>
      <div v-for="(notification, ix) in notifications" :key="ix">
        <layout-notification-badge
          :title="notification.title"
          :content="notification.content"
          :revisedAt="new Date(notification.revisedAt)"
          :publishedAt="new Date(notification.publishedAt)"
          :isLast="ix == notifications.length - 1"
        />
      </div>
    </div>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutRightPanel',
  data() {
    return {
      notifications: [],
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
    this.notifications = this.$store.getters.notifications
  },
})
</script>
