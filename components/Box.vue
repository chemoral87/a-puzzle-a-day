<template>
  <v-row dense>
    <v-col dense v-for="(piece, ix) in pieces" :key="ix">
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
    </v-col>
  </v-row>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  computed: {
    pieces() {
      return this.$store.state.puzzle.boxPieces
    },
  },
  // https://htmlcolorcodes.com/es/nombres-de-los-colores/
  methods: {
    ...mapMutations({
      setCurrentPiece: 'puzzle/setCurrentPiece',
      clearBoardTemp: 'puzzle/clearBoardTemp',
    }),

    setPiece(shape) {
      this.clearBoardTemp()
      this.setCurrentPiece(shape)
    },
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
