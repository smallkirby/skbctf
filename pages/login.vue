<template>
  <layout-wrapper>
    <div class="w-full h-full text-center align-baseline my-20">
      <button @click="waiwai()">Logging in now...</button>
    </div>
  </layout-wrapper>
</template>

<script>
/* eslint-disable no-console */

export default {
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('signin')
    this.$router.push('/')
  },
}
</script>
