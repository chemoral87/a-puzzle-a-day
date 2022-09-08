<template>
  <div>
    <!-- {{ boardTemp }}
    {{ board }} -->
    <div style="display: flex">
      <div style="margin-right: 15px">
        <BoardPieces />
      </div>
      <div style="margin-right: 15px">
        <div>Puzzle Board</div>
        <table class="sample">
          <tr v-for="(row, iy) in boardTemplate" :key="iy">
            <td
              @click="setPiece(iy, ix)"
              @mouseover="ghostPiece(iy, ix)"
              v-for="(cll, ix) in row"
              :key="ix + iy"
              :style="getBackground(ix, iy)"
            >
              {{ cll }}
            </td>
          </tr>
        </table>
      </div>
      <div>
        Current Piece
        <CurrentPiece />
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import BoardPieces from './BoardPieces.vue'
export default {
  props: {},
  data() {
    return {}
  },
  methods: {
    ...mapMutations({
      clearBoardTemp: 'puzzleBoard/clearBoardTemp',
      initBoard: 'puzzleBoard/initBoard',
      setBoardTemp: 'puzzleBoard/setBoardTemp',
      setPieceOnPuzzle: 'puzzleBoard/setPieceOnPuzzle',
      clearCurrent: 'box/clearCurrent',
      removePieceFromBox: 'box/removePieceFromBox',
      // flipPiece: 'puzzleBoard/flipPiece',
      // setCurrentPiece: 'puzzleBoard/setCurrentPiece',
    }),
    getBackground(x, y) {
      if (this.boardTemp.length == 0) return {}
      let cllTemp = this.boardTemp[y][x]
      let cllBoard = this.board[y][x]

      if (cllBoard != 0) {
        return {
          backgroundColor: cllBoard.color,
        }
      } else if (cllTemp != 0) {
        return {
          backgroundColor: cllTemp.color,
        }
      }
      return {
        backgroundColor: 'transparent',
      }
    },
    ghostPiece(posY, posX) {
      if (this.currentPiece == null) return
      let boardTempEmpty = this.$getNewBoardTemp()
      let { name, color, shape } = this.currentPiece

      let canPlaced = this.$canPlace(
        this.currentPiece,
        // boardTempEmpty,
        this.board,
        posY,
        posX
      )
      for (let [y, row] of shape.entries()) {
        for (let [x, val] of row.entries()) {
          if (val == 1) {
            try {
              if (boardTempEmpty[posY + y][posX + x] != 0) {
              } else {
                let color_ = canPlaced ? color : 'grey'
                boardTempEmpty[posY + y][posX + x] = {
                  name: name,
                  color: color_,
                }
              }
            } catch (ex) {}
          }
        }
      }

      this.setBoardTemp(boardTempEmpty)
    },
    setPiece(y, x) {
      if (this.currentPiece == null) return
      let canPlaced = this.$canPlace(this.currentPiece, this.board, y, x)
      if (canPlaced) {
        this.setPieceOnPuzzle({ piece: this.currentPiece, posY: y, posX: x })
        this.removePieceFromBox(this.currentPiece)
        this.clearCurrent()
      }
      // console.log(' canPlaced', canPlaced, y, x)
    },
  },
  computed: {
    board() {
      return this.$store.state.puzzleBoard.board
    },
    boardTemplate() {
      return this.$store.state.puzzleBoard.boardTemplate
    },
    boardTemp() {
      return this.$store.state.puzzleBoard.boardTemp
    },
    currentPiece() {
      return this.$store.state.box.currentPiece
    },
  },
  mounted() {
    let me = this
    this.initBoard()
  },
  components: { BoardPieces },
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
  width: 35px;
  text-align: center;
  border-width: 2px;
  padding: 5px;
  border-style: inset;
  border-color: white;
}
</style>
