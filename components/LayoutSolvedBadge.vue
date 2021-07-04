<template>
  <layout-wrapper>
    <div class="flex w-full justify-between">
      <div>{{ challid }}</div>
      <div>{{ genre }}</div>
      <div>{{ name }}</div>
      <div>{{ score }}</div>
      <div>{{ solvedAt }}</div>
    </div>
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
    solvedAt: {
      type: String,
      default: '?',
      require: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
})
</script>

<style></style>
