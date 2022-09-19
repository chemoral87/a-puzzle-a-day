<template>
  <div>
    <div>Board Pieces</div>
    <v-list-item
      v-for="(piece, index) in pieces"
      :style="{ backgroundColor: piece.color }"
      :key="piece.name + index"
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
import { mapActions } from 'vuex'
export default {
  props: {},
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      removePieceFromBoard: 'puzzle/removePieceFromBoard',
    }),

    async removePiece(piece) {
      await this.removePieceFromBoard(piece)
    },
  },
  computed: {
    pieces() {
      return this.$store.state.puzzle.boardPieces
    },
  },
  mounted() {
    let me = this
  },
}
</script>
