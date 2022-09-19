<template>
  <div>
    <v-row dense v-for="(game, iy) in games" :key="iy">
      <v-col dense v-for="(piece, ix) in game" :key="ix">
        <table class="sample">
          <tr v-for="(row, iy) in piece.shape" :key="ix + iy">
            <td
              v-for="(cll, iz) in row"
              :key="ix + iy + iz"
              :style="{ backgroundColor: cll == 1 ? piece.color : '' }"
            >
              {{ cll == 1 ? piece.name : '' }}
            </td>
          </tr>
        </table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ['games'],
  data() {
    return {}
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
table.sample tr {
  border-width: 2px;
  width: 9px;
  height: 9px;
}
table.sample th {
  border-width: 2px;
  width: 9px;
  height: 9px;

  border-style: inset;
  border-color: white;
}
table.sample td {
  width: 9px;
  height: 9px;
  border-width: 0px;

  border-style: inset;
  border-color: white;
}
</style>
