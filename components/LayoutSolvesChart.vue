<template>
  <layout-wrapper>
    <table class="w-4/5 table-fixed ml-2">
      <tr class="font-bold text-lg border-b border-skwhite">
        <th class="w-10">ID</th>
        <th>name</th>
        <th>genre</th>
        <th>score</th>
        <th>pwned at</th>
      </tr>
      <tr v-for="(solve, ix) in solves" :key="ix" class="text-center leading-7">
        <td>{{ solve.challid }}</td>
        <td>{{ solve.name }}</td>
        <td>{{ solve.genre }}</td>
        <td>{{ solve.score }}</td>
        <td>{{ solve.solved_at }}</td>
      </tr>
    </table>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutSolvesTable',
  props: {
    solves: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  computed: {},
})
</script>

<style></style>
