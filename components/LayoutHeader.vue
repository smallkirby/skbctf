<template>
  <layout-wrapper>
    <header
      class="
        w-full
        absolute
        md:static
        black
        px-0
        py-0
        z-50
        md:pt-2
        border-b-2 border-skblack-light
      "
    >
      <div
        class="md:max-w-2xl ml-5 pr-8 md:flex md:items-center md:justify-start"
      >
        <div
          class="
            md:flex md:flex-initial
            mx-auto
            px-2
            md:px-0
            flex
            justify-start
            items-center
            h-10
          "
        >
          <div class="text-white md:hidden">
            <button class="focus:outline-none" @click="isOpen = !isOpen">
              <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  v-show="!isOpen"
                  d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"
                />
                <path
                  v-show="isOpen"
                  d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
                />
              </svg>
            </button>
          </div>
          <h1>
            <NuxtLink
              class="
                text-pink-200 text-lg
                font-bold
                leading-relaxed
                md:flex-initial
                inline-block
                py-2
                px-2
                md:px-3
                hover:text-pink-300
              "
              to="/"
            >
              skbctf
            </NuxtLink>
          </h1>
        </div>
        <nav
          class="w-full md:block absolute left-0 md:static md:bg-none z-20"
          :class="isOpen ? 'block' : 'hidden'"
        >
          <ul class="md:flex md:justify-start md:items-end">
            <li class="w-full md:w-auto md:ml-5">
              <NuxtLink
                to="/challenges/"
                class="
                  text-skwhite
                  md:block
                  inline-block
                  md:py-0
                  py-5
                  px-5
                  md:px-0
                  w-full
                  hover:text-skwhite-dark
                "
              >
                Challs
              </NuxtLink>
            </li>
            <li class="w-full md:w-auto md:ml-5">
              <NuxtLink
                to="/ranks/"
                class="
                  text-skwhite
                  md:block
                  inline-block
                  md:py-0
                  py-5
                  px-5
                  md:px-0
                  w-full
                  hover:text-skwhite-dark
                "
              >
                Ranks
              </NuxtLink>
            </li>
            <li class="w-full md:w-auto md:ml-5">
              <NuxtLink
                to="/rules/"
                class="
                  text-skwhite
                  md:block
                  inline-block
                  md:py-0
                  py-5
                  px-5
                  md:px-0
                  w-full
                  hover:text-skwhite-dark
                "
              >
                Rules
              </NuxtLink>
            </li>
            <li class="w-full md:w-auto md:ml-5">
              <NuxtLink
                to="/about/"
                class="
                  text-skwhite
                  md:block
                  inline-block
                  md:py-0
                  py-5
                  px-5
                  md:px-0
                  w-full
                  hover:text-skwhite-dark
                "
              >
                About
              </NuxtLink>
            </li>
            <li class="w-full md:w-auto md:ml-5">
              <NuxtLink
                to="/credit/"
                class="
                  text-skwhite
                  md:block
                  inline-block
                  md:py-0
                  py-5
                  px-5
                  md:px-0
                  w-full
                  hover:text-skwhite-dark
                "
              >
                Credit
              </NuxtLink>
            </li>
            <li class="w-full md:w-auto md:ml-5">
              <NuxtLink
                to="/profile/"
                class="
                  text-skwhite
                  md:block
                  inline-block
                  md:py-0
                  py-5
                  px-5
                  md:px-0
                  w-full
                  hover:text-skwhite-dark
                "
              >
                Profile
              </NuxtLink>
            </li>
            <li
              v-show="!loggedin"
              class="w-full md:w-auto md:ml-5 animate-bounce"
            >
              <NuxtLink
                to="/login/"
                class="
                  text-skwhite
                  md:block md:py-0
                  py-5
                  px-5
                  md:px-0
                  w-full
                  hover:text-skwhite-dark
                "
              >
                Login<img
                  src="~/static/img/twitter.svg"
                  class="w-4 float-right ml-2 mt-1"
                />
              </NuxtLink>
            </li>
            <li v-show="loggedin" class="w-full md:w-auto md:ml-5">
              <NuxtLink
                to="/logout/"
                class="
                  text-skwhite
                  md:block
                  inline-block
                  md:py-0
                  py-5
                  px-5
                  md:px-0
                  w-full
                  hover:text-skwhite-dark
                "
              >
                Logout
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutHeader',
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    loggedin() {
      return this.$store.getters.loggedin
    },
  },
})
</script>
