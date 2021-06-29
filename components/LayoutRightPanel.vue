<template>
  <layout-wrapper>
    <div class="h-72">
      <p class="text-lg text-pink-200">Your Status</p>
      <div v-show="isLoggedin" class="overflow-hidden px-4">
        <p key="isLoggedin" class="w-full text-sm whitespace-nowrap">
          @{{ screenName }}
        </p>
      </div>

      <div v-show="!isLoggedin" class="px-4">
        <p>not logged in</p>
      </div>
    </div>

    <div class="h-72 mt-4">
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
    return {}
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
  },
})
</script>
