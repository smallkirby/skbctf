G
<template>
  <layout-wrapper>
    <layout-notification-modal
      v-show="isOpen"
      :title="title"
      :content="content"
      :publishedAt="publishedAt"
      :updatedAt="updatedAt"
      @close-notification-modal="onClose"
    />
    <button class="text-left" @click="onOpen">
      <div
        class="
          w-full
          flex
          overflow-hidden
          flex-col
          my-2
          pt-1
          pb-2
          border-skblack-light
          hover:text-white
        "
        :class="{ 'border-b': !isLast }"
      >
        <p class="text-xs text-skwhite-dark">{{ publishedAtStr }}</p>
        <p class="text-sm pl-2">{{ title }}</p>
      </div>
    </button>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'

export default Vue.extend({
  name: 'LayoutNotificationBadge',
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
    updatedAt: {
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
      isMouseOn: false,
      isOpen: false,
    }
  },
  computed: {
    publishedAtStr() {
      return moment(this.publishedAt).format('YYYY/MM/DD HH:mm')
    },
    updatedAtStr() {
      return moment(this.updatedAt).format('YYYY/MM/DD HH:mm')
    },
  },
  methods: {
    onOpen() {
      this.isOpen = true
    },
    onClose() {
      this.isOpen = false
    },
    mouseover() {
      this.isMouseOn = true
    },
    mouseleave() {
      this.isMouseOn = false
    },
  },
})
</script>

<style lang="scss">
@for $i from 1 to 50 {
  .layout-challenge-panel:nth-child(#{$i}) .challenge-panel {
    animation-delay: calc(0.2s * #{$i});
  }
}
</style>
