<template>
  <layout-wrapper>
    <div class="w-full h-full text-center align-baseline my-20">
      <button @click="waiwai()">Login now with Twitter.</button>
      <p>{{ user }}</p>
    </div>
  </layout-wrapper>
</template>

<script>
/* eslint-disable no-console */

export default {
  data() {
    return {}
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
  },
  methods: {
    waiwai() {
      this.$store.dispatch('signin')
    },

    onRejected(error) {
      console.log('onRejected', error)
    },
  },
}
</script>
