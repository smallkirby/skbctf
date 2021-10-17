<template>
  <layout-wrapper>
    <div>
      <div v-if="isLoggedin" class="overflow-hidden px-2 flex mt-2">
        <NuxtLink to="/profile"
          ><img :key="photourl" :src="photourl" class="rounded-full w-12 mr-2"
        /></NuxtLink>
        <div>
          <p key="isLoggedin" class="w-full text-sm whitespace-nowrap">
            <NuxtLink to="/profile">@{{ screenName }}</NuxtLink>
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
          :updated-at="new Date(notification.updatedAt)"
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
    ...mapGetters(['notifications', 'user', 'loggedin', 'solves']),
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
      if (this.user) {
        return this.user.twitter_screenName
      } else {
        return ''
      }
    },
    isLoggedin() {
      return this.$store.loggedin
    },
    userinfo() {
      return this.user
    },
    twitterurl() {
      if (this.user) {
        return `https://twitter.com/${this.screenName}`
      } else {
        return ''
      }
    },
    score() {
      if (this.solves) {
        return this.reduce((total, solve) => {
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
  },
})
</script>
