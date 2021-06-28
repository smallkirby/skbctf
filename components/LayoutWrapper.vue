<template>
  <div class="wrapper" :class="propsclass">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LayoutWrapper',
  props: {
    propsclass: {
      type: String,
      default: '',
    },
  },
}
</script>
