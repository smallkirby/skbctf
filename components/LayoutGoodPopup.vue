<template>
  <layout-wrapper v-show="isOpen" class="fixed inset-0 z-50 h-11">
    <div
      class="
        notificaion
        bg-skblack-light
        border border-skwhite
        text-skwhite
        px-4
        rounded
        relative
        mx-6
        my-6
      "
    >
      <div class="flex justify-between h-11 m-auto py-2">
        <div class="flex">
          <p class="animate-ping mr-4">🎉</p>
          <p class="block sm:inline">{{ message }}</p>
        </div>

        <div @click="onClick">
          <svg
            class="fill-current h-6 w-6 text-skwhite"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            />
          </svg>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutGoodPopup',
  props: {
    message: {
      type: String,
      require: true,
      default: '',
    },
    duration: {
      type: Number,
      default: 8000,
      require: false,
    },
  },
  data() {
    return {
      isOpen: true,
    }
  },
  created() {
    if (this.message.length === 0) {
      this.isOpen = false
      return
    }
    setTimeout(() => (this.isOpen = false), this.duration)
  },
  methods: {
    onClick() {
      this.isOpen = false
    },
  },
})
</script>

<style scoped>
.notification {
  background: rgba(0, 0, 0, 0) !important;
}
</style>
