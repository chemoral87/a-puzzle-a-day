<template>
  <div>
    <div>Puzzle Board</div>
    <table class="sample">
      <tr v-for="(row, ix) in board" :key="ix">
        <td v-for="(cll, iy) in row" :key="ix + iy">{{ cll }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      board: [
        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
        [22, 23, 24, 25, 26, 27, 28],
        [29, 30, 31],
      ],
    }
  },
  methods: {},
  mounted() {
    let me = this
  },
}
</script>
<style scoped>
table.sample {
  border-style: none;
  border-collapse: collapse;
}
table.sample th {
  border-width: 2px;
  padding: 5px;
  border-style: inset;
  border-color: white;
}
table.sample td {
  border-width: 2px;
  padding: 5px;
  border-style: inset;
  border-color: white;
}
</style>
