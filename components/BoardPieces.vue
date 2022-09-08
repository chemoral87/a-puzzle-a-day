<template>
  <div>
    <div>Board Pieces</div>
    <v-list-item
      v-for="piece in pieces"
      :style="{ backgroundColor: piece.color }"
      :key="piece.name"
    >
      <v-list-item-content class="ma-0">{{ piece.name }}</v-list-item-content>
      <v-list-item-action class="ma-0">
        <v-btn fab x-small class="error" @click="removePiece(piece)"
          ><v-icon>mdi-cancel</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  props: {},
  data() {
    return {}
  },
  methods: {
    ...mapMutations({
      removePieceFromPuzzle: 'puzzleBoard/removePieceFromPuzzle',
      setPieceOnBox: 'box/setPieceOnBox',
    }),
    removePiece(piece) {
      this.removePieceFromPuzzle(piece)
      this.setPieceOnBox(piece)
    },
  },
  computed: {
    pieces() {
      return this.$store.state.puzzleBoard.pieces
    },
  },
  mounted() {
    let me = this
  },
}
</script>
