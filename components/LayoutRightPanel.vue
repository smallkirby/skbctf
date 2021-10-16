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
      <NuxtLink
        v-if="notificationsTooMany"
        to="/notifications"
        class="font-bold text-skblue-light hover:text-skblue text-sm"
      >
        (show all notifications)
      </NuxtLink>
      <div v-for="(notification, ix) in notificationsToShow" :key="ix">
        <layout-notification-badge
          :title="notification.title"
          :content="notification.content"
          :revised-at="new Date(notification.revisedAt)"
          :published-at="new Date(notification.publishedAt)"
          :is-last="ix == notifications.length - 1"
        />
      </div>
      <NuxtLink v-if="notificationsNotShownSize != 0" to="/notifications">
        and {{ notificationsNotShownSize }} more notifications...
      </NuxtLink>
    </div>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'LayoutRightPanel',

  data() {
    return {
      MAX_NOTIFICATION: 5,
    }
  },

  computed: {
    ...mapGetters(['notifications']),
    notificationsToShow() {
      return this.notifications.slice(0, 5)
    },
    notificationsTooMany() {
      return this.notifications.length > 5
    },
    notificationsNotShownSize() {
      if (this.notifications.length <= 5) {
        return 0
      } else {
        return this.notifications.length - 5
      }
    },
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
})
</script>
