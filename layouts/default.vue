<template>
  <div>
    <layout-header />
    <div class="h-full">
      <div class="flex md:mt-4 items-start pt-10 md:pt-0">
        <div class="flex-1 h-full mt-4 md:mt-0 md:mr-72">
          <Nuxt />
        </div>
        <div
          class="
            border-2
            md:mr-10 md:p-3 md:w-72
            hidden
            md:block
            border-skwhite-dark
            rounded-md
            md:fixed md:top-12 md:right-0 md:mt-8
          "
        >
          <layout-right-panel class="hiden md:block" />
        </div>
      </div>
    </div>
    <layout-footer />
  </div>
</template>

<script>
import { auth } from '~/static/js/firebase.js'

export default {
  mounted() {
    return new Promise((resolve, reject) => {
      auth().onAuthStateChanged((user) => {
        if (user != null) {
          this.$store.dispatch('updateUserInfo', user.uid)
          this.$store.dispatch('updateSolves', user.uid)
          resolve()
        }
      })
    })
  },
}
</script>

<style>
body {
  background-color: #282828;
  color: #ebdbb2;
  font-family: 'Ubuntu Mono';
}
</style>
