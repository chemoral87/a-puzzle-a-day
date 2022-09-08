<template>
  <div
    style="
      display: grid;
      column-gap: 5px;
      grid-template-columns: auto auto auto auto auto;
    "
  >
    <div v-for="(piece, ix) in pieces" :key="ix">
      <v-btn class="primary mr-1" @click="setPiece(piece)">Set Current</v-btn>
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
      <br />
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  props: {},
  data() {
    return {}
  },
  computed: {
    pieces() {
      return this.$store.state.box.pieces
    },
  },
  // https://htmlcolorcodes.com/es/nombres-de-los-colores/
  methods: {
    ...mapMutations({
      rotatePiece: 'box/rotatePiece',
      flipPiece: 'box/flipPiece',
      setCurrentPiece: 'box/setCurrentPiece',
      clearBoardTemp: 'puzzleBoard/clearBoardTemp',
    }),

    setPiece(shape) {
      this.clearBoardTemp()
      this.setCurrentPiece(shape)
    },
  },
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
  width: 10px;
  height: 10px;
  padding: 5px;
  border-style: inset;
  border-color: white;
}
table.sample td {
  width: 32px;
  height: 32px;
  border-width: 0px;
  padding: 5px;
  border-style: inset;
  border-color: white;
}
</style>
