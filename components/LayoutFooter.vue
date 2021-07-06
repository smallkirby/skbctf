<template>
  <footer
    class="
      border-t
      fixed
      w-full
      text-center
      z-40
      h-6
      bottom-0
      border-skblack-light
      bg-skblack-dark
    "
  >
    <div class="flex justify-items-stretch justify-between">
      <div class="md:flex hidden justify-start">
        <div class="mx-5">
          <p>NORMAL</p>
        </div>
        <div class="mx-5">
          <p>master*</p>
        </div>
      </div>

      <div class="w-full md:w-auto">
        <p>smallkirby few rights received</p>
      </div>

      <div class="md:flex hidden justify-items-end">
        <div class="mx-5">
          <p>0% 1/152 ln:1</p>
        </div>
        <div class="mx-5">
          <p>utf-8[unix] LF</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'LayoutFooter',
  data() {
    return {}
  },
})
</script>
