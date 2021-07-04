<template>
  <layout-wrapper>
    <layout-normal-popup
      v-if="isPopupOpen"
      :message="message"
      :pulse-char="pulseChar"
      @close-popup="closePopup"
    />
    <transition name="modal" appear>
      <div class="modal-overlay flex justify-center" @click.self="onClose">
        <div
          class="
            modal-window
            m-auto
            my-auto
            bg-skblack
            items-center
            h-full
            border-2 border-skwhite
            rounded-md
            p-4
          "
        >
          <div class="flex flex-col justify-between h-full">
            <div class="flex flex-col">
              <div class="text-2xl my-2 flex justify-between">
                <div class="text-pink-200 font-bold">
                  {{ name }}
                </div>
                <div class="pr-4">{{ score }} pts</div>
              </div>
              <div class="mt-2 mx-2">
                <p
                  v-for="(line, ix) in description_lines"
                  :key="ix"
                  class="mb-2"
                >
                  {{ line }}
                </p>
              </div>
              <div class="my-4 mx-2">download from HERE.</div>
            </div>

            <div class="flex flex-col justify-end">
              <input
                v-model="submittedFlag"
                class="
                  focus:ring-2 focus:ring-skwhite
                  my-4
                  h-10
                  rounded-md
                  border-skwhite-light
                  bg-skblack
                  outline-none
                  border-2
                  p-2
                "
                placeholder="skbctf{nirugiri_the_life}"
              />
              <div class="text-right flex justify-end items-center">
                <div
                  v-if="waitingJudge"
                  class="flex justify-end items-center pr-8"
                >
                  <p class="animate-spin mr-2">pwn</p>
                  <p>waiting for a judge...</p>
                </div>
                <button
                  type="button"
                  class="
                    border-2
                    p-2
                    rounded-md
                    border-skwhite
                    hover:border-skwhite-dark hover:skblack-dark
                  "
                  @click="onSubmit"
                >
                  submit
                </button>
              </div>
              <div>pwned xx times.</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'

export default Vue.extend({
  name: 'LayoutChallengeModal',
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: -1,
      require: true,
    },
    isSolved: {
      type: Boolean,
      default: false,
      require: true,
    },
    genre: {
      type: String,
      default: 'pwn',
      require: true,
    },
    challid: {
      type: String,
      default: '-1',
      require: true,
    },
  },
  data() {
    return {
      isOpen: false,
      submittedFlag: '',
      message: '',
      isPopupOpen: false,
      pulseChar: '',
      waitingJudge: false,
    }
  },
  computed: {
    description_lines() {
      return this.description.split('\n')
    },
  },
  methods: {
    onClose() {
      this.$emit('close-challenge-modal')
    },
    closePopup() {
      this.isPopupOpen = false
    },
    async onSubmit() {
      if (this.submittedFlag.length === 0) {
        return
      }
      if (this.isSolved) {
        return
      }
      this.waitingJudge = true
      console.log(`submitting ${this.submittedFlag}`)
      const functions = firebase.functions()
      const func = functions.httpsCallable('submit')
      const result = await func({
        flag: this.submittedFlag,
        challid: this.challid,
      })

      console.log(result)
      if (result.data.ok === true) {
        await this.$store.dispatch('updateSolves', this.$store.getters.user.uid)
        this.message = `You solved ${this.name} !`
        this.pulseChar = '🎉'
      } else {
        this.message = `Wrong answer. Try harder...`
        this.pulseChar = '😢'
      }
      this.waitingJudge = false
      this.isPopupOpen = true
    },
  },
})
</script>

<style scoped>
.modal-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  background: rgba(0, 0, 0, 0.8);
}

.modal-window {
  z-index: 41;
  width: 40em;
  height: 28em;
}
</style>
