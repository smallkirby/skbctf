<template>
  <div>
    <layout-header />
    <div>
      <div class="flex mt-4 items-start">
        <div class="flex-1 h-full">
          <Nuxt />
        </div>
        <div
          class="border-2 mt-4 mr-10 p-3 w-72 border-skwhite-dark rounded-md"
        >
          <layout-right-panel />
        </div>
      </div>
    </div>
    <layout-footer />
  </div>
</template>
<style>
body {
  background-color: #282828;
  color: #ebdbb2;
  font-family: 'Ubuntu Mono';
}
</style>
