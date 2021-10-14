<template>
  <layout-wrapper>
    <div class="w-full">
      <div class="container w-full mx-10 my-5 pr-20">
        <div class="flex flex-wrap">
          <layout-challenge-panel
            v-for="(chall, index) in challs"
            :key="index"
            :name="chall.name"
            :description="chall.description"
            :genre="chall.genre"
            :score="chall.score"
            :challid="chall.dataid"
            :disturl="chall.disturl"
          />
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script>
export default {
  data() {
    return {
      challs: [],
    }
  },
  mounted() {
    this.challs = this.$store.getters.challs
  },
}
</script>
