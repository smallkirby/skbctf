<template>
  <layout-wrapper>
    <div class="w-full h-full text-center align-baseline my-20">
      <p>Logging out now...</p>
    </div>
  </layout-wrapper>
</template>

<script>
/* eslint-disable no-console */

export default {
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('signout')
    this.$router.push('/')
  },
}
</script>
