<template>
  <div v-if="tPiece">
    <div>
      <v-btn class="primary mr-1" @click="rotatePiece(tPiece)">Rotate</v-btn>
      <v-btn class="primary mr-1" @click="flipPiece(tPiece)">Flip</v-btn>
      <v-btn class="primary mr-1" @click="clearCurrent()">Clear</v-btn>
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
import { mapMutations } from 'vuex'
export default {
  props: {},
  data() {
    return {}
  },
  methods: {
    ...mapMutations({
      rotatePiece: 'box/rotatePiece',
      flipPiece: 'box/flipPiece',

      clearCurrent: 'box/clearCurrent',
    }),
  },
  computed: {
    tPiece() {
      return this.$store.state.box.currentPiece
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
