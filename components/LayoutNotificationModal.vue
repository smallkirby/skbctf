<template>
  <layout-wrapper>
    <transition name="modal" appear>
      <div class="modal-overlay flex justify-center" @click.self="onClose">
        <div
          class="
            modal-window
            m-auto
            my-auto
            bg-skblack
            items-center
            h-full
            border-2 border-skwhite
            rounded-md
            p-4
          "
        >
          <div class="flex flex-col justify-between h-full">
            <div class="flex flex-col">
              <div class="text-2xl my-2 flex justify-between">
                <div class="text-pink-200 font-bold">
                  {{ title }}
                </div>
              </div>
              <div class="align-right text-right text-sm text-skwhite-dark">
                <p>published at : {{ publishedAtStr }}</p>
                <p>last modified at : {{ publishedAtStr }}</p>
              </div>
              <div class="mt-4 mx-2">
                <p v-for="(line, ix) in content_lines" :key="ix" class="mb-2">
                  {{ line }}
                </p>
              </div>
            </div>
            <div class="align-right text-right">
              <button
                class="
                  rounded-md
                  border-2 border-skwhite
                  hover:border-skwhite-dark hover:skblack-dark
                  p-2
                "
                @click="onClose"
              >
                got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'

export default Vue.extend({
  name: 'LayoutNotificationModal',
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Date,
      require: true,
      default: () => new Date('1990/01/01'),
    },
    revisedAt: {
      type: Date,
      require: true,
      default: () => new Date('1990/01/01'),
    },
    isLast: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    content_lines() {
      return this.content.split('\n')
    },
    publishedAtStr() {
      return moment(this.publishedAt).format('YYYY/MM/DD HH:mm')
    },
    revisedAtStr() {
      return moment(this.revisedAt).format('YYYY/MM/DD HH:mm')
    },
  },
  methods: {
    onClose() {
      this.$emit('close-notification-modal')
    },
  },
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  z-index: 40;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
}

.modal-window {
  position: relative;
  z-index: 41;
  width: 40em;
  height: 28em;
}

#solver-scroller {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

#solver-scroller::-webkit-scrollbar {
  display: none;
}
</style>
