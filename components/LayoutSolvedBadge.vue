<template>
  <layout-wrapper>
    <transition>
      <button @click="onOpen" @mouseover="mouseover" @mouseleave="mouseleave">
        <div
          class="
            challenge-panel
            border-2
            rounded-md
            m-3
            w-52
            h-48
            p-2
            flex flex-col
            justify-center
            items-center
            relative
          "
          :class="[styleset]"
        >
          <img
            v-if="isSolved"
            src="~/static/img/pwned.png"
            class="absolute w-full h-full"
          />
          <div class="font-bold text-green-400">{{ name }}</div>
          <div>{{ score }}</div>
          <div>{{ genre }}</div>
        </div>
      </button>
    </transition>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutSolvedBadge',
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: -1,
      require: true,
    },
    genre: {
      type: String,
      default: 'pwn',
      require: true,
    },
    challid: {
      type: String,
      default: '-1',
      require: true,
    },
  },
  data() {
    return {
      isMouseOn: false,
      isOpen: false,
    }
  },
  computed: {
    styleset() {
      if (this.isSolved) {
        if (this.isMouseOn) {
          return {
            'bg-skblack-light': true,
            'border-blue-500': true,
            'text-lg': true,
            'border-4': true,
          }
        } else {
          return {
            'bg-skblack': true,
            'border-purple-600': true,
            'animate-pulse': true,
            'text-base': true,
            'border-4': true,
          }
        }
      } else if (this.isMouseOn) {
        return {
          'bg-skblack-light': true,
          'border-pink-400': true,
          'text-lg': true,
        }
      } else {
        return {
          'bg-skblack': true,
          'border-skwhite': true,
          'animate-pulse': true,
          'text-base': true,
        }
      }
    },
  },
})
</script>

<style lang="postcss">
@for $i from 1 to 50 {
  .layout-challenge-panel:nth-child($(i)) .challenge-panel {
    animation-delay: calc(0.2s * $(i));
  }
}
</style>
