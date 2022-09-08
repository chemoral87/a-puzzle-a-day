<template>
  <div>
    <!-- {{ boardTemp }} -->
    <v-row>
      <v-col cols="auto">
        <v-select :items="select_months" v-model="month_play" label="Month">
        </v-select
      ></v-col>
      <v-col cols="auto">
        <v-select
          :items="select_days"
          v-model="day_play"
          label="Day"
        ></v-select>
      </v-col>
      <v-col cols="auto">
        <v-btn class="primary" @click="newPlay">Play</v-btn>
      </v-col>
    </v-row>

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
import { mapMutations, mapGetters, mapActions } from 'vuex'
import BoardPieces from './BoardPieces.vue'
import { days, months } from '../static/pieces'
export default {
  props: {},
  data() {
    return {
      month_play: 'Jan',
      day_play: 1,
      select_months: months,
      select_days: days,
    }
  },
  methods: {
    ...mapMutations({
      clearBoardTemp: 'puzzleBoard/clearBoardTemp',
      initBoard: 'puzzleBoard/initBoard',
      setBoardTemp: 'puzzleBoard/setBoardTemp',
      setPieceOnPuzzle: 'puzzleBoard/setPieceOnPuzzle',

      clearCurrent: 'box/clearCurrent',
      removePieceFromBox: 'box/removePieceFromBox',
      setPieceOnBox: 'box/setPieceOnBox',
      // flipPiece: 'puzzleBoard/flipPiece',
      // setCurrentPiece: 'puzzleBoard/setCurrentPiece',
    }),
    ...mapActions({
      removeAllPieceFromPuzzle: 'puzzleBoard/removeAllPieceFromPuzzle',
      newPuzzlePlay: 'puzzleBoard/newPuzzlePlay',
    }),
    async newPlay() {
      let pieces = await this.removeAllPieceFromPuzzle()
      for (let [ix, piece] of pieces.entries()) {
        this.setPieceOnBox(piece)
      }
      this.newPuzzlePlay({ month: this.month_play, day: this.day_play })
    },
    getBackground(x, y) {
      if (this.boardTemp.length == 0) return {}
      let cllTemp = this.boardTemp[y][x]
      let cllBoard = this.board[y][x]

      if (cllBoard != 0 && cllTemp != 0) {
        return {
          backgroundColor: 'gray',
        }
      } else if (cllBoard == 0 && cllTemp != 0) {
        return {
          backgroundColor: cllTemp.color,
        }
      } else if (cllBoard == 1) {
        return {
          backgroundColor: 'LightSlateGray',
        }
      }

      return {
        backgroundColor: cllBoard.color,
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
      if (this.getBoxPieces.length == 0) {
        alert('Congratulations YOU FINISH')
      }
    },
  },
  computed: {
    ...mapGetters({
      getBoxPieces: 'box/getBoxPieces',
    }),
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
    this.newPlay()
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
