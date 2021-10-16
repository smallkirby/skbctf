<template>
  <layout-wrapper>
    <!-- main -->
    <div class="md:mr-10">
      <div class="mx-5 md:m-6 my-2">
        <p class="text-pink-200 text-3xl my-2">Notifications</p>
      </div>

      <!-- Notifications -->
      <div class="mx-4 px-4 md:mx-10">
        <!-- Each Notification -->
        <div
          v-for="(notification, ix) in notificationsReadable"
          :key="ix"
          class="border-b-2 border-skblack-dark mb-5 mp-5"
        >
          <div class="flex justify-between my-2">
            <div>
              <p class="font-bold text-skwhite-light text-xl pr-2">
                {{ notification.title }}
              </p>
            </div>
            <div class="flex flex-col">
              <div class="text-sm text-skwhite-dark text-right">
                <p>revised at: {{ notification.revisedAt }}</p>
              </div>
              <div class="text-sm text-skwhite-dark text-right">
                <p>published at: {{ notification.revisedAt }}</p>
              </div>
            </div>
          </div>
          <div class="ml-4 mb-2 pb-1">
            <pre
              class="whitespace-pre-line"
              style="font-family: 'Ubuntu Mono'"
              >{{ notification.content }}</pre
            >
          </div>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default Vue.extend({
  computed: {
    ...mapGetters(['notifications']),

    notificationsReadable() {
      return this.notifications.slice().map((notif) => {
        return {
          ...notif,
          revisedAt: moment(notif.revisedAt).format('YYYY/MM/DD HH:mm'),
          publishedAt: moment(notif.publishedAt).format('YYYY/MM/DD HH:mm'),
        }
      })
    },
  },
})
</script>
