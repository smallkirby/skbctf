<template>
  <div>
    <layout-header />
    <div class="h-full">
      <div class="flex mt-4 items-start pt-10 md:pt-0">
        <div class="flex-1 h-full md:mr-72">
          <Nuxt />
        </div>
        <div
          class="
            border-2
            mt-7
            md:mr-10 md:p-3 md:w-72
            hidden
            md:block
            border-skwhite-dark
            rounded-md
            md:fixed md:top-12 md:right-0
          "
        >
          <layout-right-panel class="hiden md:block" />
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
