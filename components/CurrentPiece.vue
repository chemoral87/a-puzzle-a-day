<template>
  <div v-if="tPiece">
    <div>
      <v-btn class="primary mr-1" @click="rotatePiece90(tPiece)">
        <v-icon>mdi-reload</v-icon></v-btn
      >
      <v-btn class="primary mr-1" @click="rotatePieceN90(tPiece)"
        ><v-icon>mdi-restore</v-icon></v-btn
      >
      <v-btn class="primary mr-1" @click="flipPieceH(tPiece)">
        <!-- Flip H. -->
        <v-icon>mdi-flip-horizontal</v-icon>
      </v-btn>
      <v-btn class="primary mr-1" @click="flipPieceV(tPiece)">
        <v-icon>mdi-flip-vertical</v-icon>
        <!-- Flip V. -->
      </v-btn>
      <v-btn class="primary mr-1" @click="clear()">Clear</v-btn>
      <table class="sample">
        <tr v-for="(row, iy) in tPiece.shape" :key="iy">
          <td
            v-for="(cll, iz) in row"
            :key="iy + iz"
            :style="{ backgroundColor: cll == 1 ? tPiece.color : '' }"
          >
            {{ cll == 1 ? tPiece.name : '' }}
          </td>
        </tr>
      </table>
      <br />
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  props: {},
  data() {
    return {}
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      rotatePiece90: 'puzzle/rotatePiece90',
      rotatePieceN90: 'puzzle/rotatePieceN90',
      flipPieceH: 'puzzle/flipPieceH',
      flipPieceV: 'puzzle/flipPieceV',
      clearCurrent: 'puzzle/clearCurrent',
      clearBoardTemp: 'puzzle/clearBoardTemp',
    }),
    clear() {
      this.clearCurrent()
      this.clearBoardTemp()
    },
  },
  computed: {
    tPiece() {
      return this.$store.state.puzzle.boxCurrentPiece
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
