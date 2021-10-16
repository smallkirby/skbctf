<template>
  <layout-wrapper>
    <layout-normal-popup
      v-show="loginFinished"
      message="Successfully logged in!"
      pulse-char="💪"
      @close-popup="closePopup"
    />
    <layout-normal-popup
      v-show="logoutFinished"
      message="Hope you come back soon..."
      pulse-char="😢"
      @close-popup="closePopup"
    />
    <header
      class="
        w-full
        fixed
        bg-skblack
        px-0
        py-0
        z-30
        pt-2
        border-b-2 border-skblack-light
      "
    >
      <div
        class="ml-5 pr-8 md:flex md:items-center md:justify-start"
      >
        <!-- Logo -->
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
              <svg
                class="h-6 w-6 fill-current text-skwhite"
                viewBox="0 0 24 24"
              >
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

          <h1 class="flex flex-row">
            <NuxtLink
              class="
                text-pink-200 text-lg
                font-bold
                leading-relaxed
                md:flex-initial
                py-2
                px-2
                md:px-3
                flex
                md:justify-center
                text-center
                hover:text-pink-300
              "
              to="/"
            >
              <p class="mr-2">skbctf</p>
              <img src="~/static/img/logo.png" class="float-left w-8 inline" />
            </NuxtLink>
          </h1>
        </div>

        <!-- Menus -->
        <nav
          class="
            md:w-full md:block
            absolute
            left-0
            md:static
            bg-skblack
            md:bg-none
            z-20
          "
          :class="isOpen ? 'block' : 'hidden'"
        >
          <ul class="md:flex md:justify-start md:items-end">
            <!-- Challenges -->
            <li class="w-full md:w-auto md:ml-5" @click="isOpen = !isOpen">
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

            <!-- Ranking -->
            <li class="w-full md:w-auto md:ml-5" @click="isOpen = !isOpen">
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

            <!-- Rules -->
            <li class="w-full md:w-auto md:ml-5" @click="isOpen = !isOpen">
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

            <!-- Credit -->
            <li class="w-full md:w-auto md:ml-5" @click="isOpen = !isOpen">
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

            <!-- Profile -->
            <li class="w-full md:w-auto md:ml-5" @click="isOpen = !isOpen">
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

            <li class="w-full md:w-auto md:ml-5" @click="isOpen = !isOpen">
              <NuxtLink
                to="/notifications/"
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
                Notifications
              </NuxtLink>
            </li>

            <!-- (Spacer) -->
            <li class="flex-grow"></li>

            <!-- Login / Logout -->
            <li
              v-show="!loggedin"
              class="w-full md:w-auto md:ml-5 animate-bounce"
            >
              <button
                class="
                  text-skwhite
                  md:block md:py-0
                  py-5
                  px-5
                  md:px-0
                  w-full
                  hover:text-skwhite-dark
                  hidden
                "
                @click="login"
              >
                Login<img
                  src="~/static/img/twitter.svg"
                  class="w-4 float-right ml-2 mt-1"
                />
              </button>
              <button
                class="
                  text-skwhite
                  md:hidden md:py-0
                  py-5
                  px-5
                  md:px-0
                  w-full
                  hover:text-skwhite-dark
                "
                @click="loginRedirect"
              >
                Login<img
                  src="~/static/img/twitter.svg"
                  class="w-4 float-right ml-2 mt-1"
                />
              </button>
            </li>
            <li v-show="loggedin" class="w-full md:w-auto md:ml-5">
              <button
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
                @click="logout"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
        </div>
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
      logoutFinished: false,
      loginFinished: false,
    }
  },
  computed: {
    loggedin() {
      return this.$store.getters.loggedin
    },
  },
  methods: {
    async login() {
      this.loginFinished = false
      await this.$store.dispatch('signin')
      this.loginFinished = true
    },
    async loginRedirect() {
      this.loginFinished = false
      await this.$store.dispatch('signinRedirect')
      this.loginFinished = true
    },
    closePopup() {
      this.loginFinished = false
      this.logoutFinished = false
    },
    async logout() {
      this.$store.commit('forgetAll')
      this.logoutFinished = false
      await this.$store.dispatch('signout')
      this.logoutFinished = true
    },
  },
})
</script>
