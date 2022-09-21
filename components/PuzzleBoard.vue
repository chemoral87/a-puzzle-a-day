<template>
  <div>
    <!-- {{ count }} / {{ powercount }} <br /> -->
    <!-- {{ badGames }} -->
    <v-dialog v-model="thinking" persistent>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Solucionando...
        </v-card-title>
      </v-card>
    </v-dialog>
    <v-row dense>
      <v-col cols="6" sm="auto">
        <v-select :items="select_months" v-model="month_play" label="Month">
        </v-select
      ></v-col>
      <v-col cols="6" sm="auto">
        <v-select
          :items="select_days"
          v-model="day_play"
          label="Day"
        ></v-select>
      </v-col>
      <v-col cols="auto">
        <v-btn class="primary" @click="newPlayExternal">Play</v-btn>
        <v-btn class="info" @click="setAlgorith">Auto Resolve </v-btn>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="auto">
        <BoardPieces />
      </v-col>
      <v-col cols="auto">
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
      </v-col>
      <v-col cols="auto">
        Current Piece
        <CurrentPiece />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <!-- <Badgames :games="badGames" /> -->
      </v-col>
    </v-row>
    v.2.0
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
      iterations: 0,
      iterGood: 0,
      iterFailed: 0,
      badGames: [],
      count: 0,
      powercount: 0,
      thinking: false,
    }
  },
  methods: {
    ...mapMutations({
      clearBoardTemp: 'puzzle/clearBoardTemp',
      initPuzzle: 'puzzle/initPuzzle',
      shuffle: 'puzzle/shuffle',
      setBoardTemp: 'puzzle/setBoardTemp',
      clearCurrent: 'puzzle/clearCurrent',
      setPieceOnBox: 'puzzle/setPieceOnBox',
      setCurrentPiece: 'puzzle/setCurrentPiece',
    }),
    ...mapActions({
      setPieceOnBoard: 'puzzle/setPieceOnBoard',
      placePieceInRandomEmptyCells: 'puzzle/placePieceInRandomEmptyCells',
      placePieceInEmptyCell: 'puzzle/placePieceInEmptyCell',
      canPutPiecesOnNextCells: 'puzzle/canPutPiecesOnNextCells',
      removePieceFromBoard: 'puzzle/removePieceFromBoard',
      removeAllPieceFromPuzzle: 'puzzle/removeAllPieceFromPuzzle',
      newPuzzlePlay: 'puzzle/newPuzzlePlay',
      getRandomPieceFromBox: 'puzzle/getRandomPieceFromBox',
      removeRandomPieceFromBoard: 'puzzle/removeRandomPieceFromBoard',
      removeLastPlacedPieceFromBoard: 'puzzle/removeLastPlacedPieceFromBoard',
      rotatePiece90: 'puzzle/rotatePiece90',
      rotatePiece180: 'puzzle/rotatePiece180',
      rotatePieceN90: 'puzzle/rotatePieceN90',
      flipPieceH: 'puzzle/flipPieceH',
      flipPieceV: 'puzzle/flipPieceV',
    }),
    async setRandomPieceAlgorithm3() {
      // PONER 4 PIEZAS Y TRABAJAR EN ELLAS SOLAMENTE
      let boxPieces = Object.assign([], this.getBoxPieces)
      let boardEmptyCells = Object.assign([], this.getBoardEmptyCells)

      while (boxPieces.length > 0) {
        let boxPiece = boxPieces.shift()
        let transforms = Object.assign([], boxPiece.transforms)
        while (transforms.length > 0) {
          let transform = transforms.shift()
          if (transform == 'rotate90')
            boxPiece = await this.rotatePiece90(boxPiece)
          if (transform == 'flipH') boxPiece = await this.flipPieceH(boxPiece)

          let flagHasPlaced = await this.placePieceInEmptyCell({
            piece: boxPiece,
            cell: boardEmptyCells[0],
          })

          if (flagHasPlaced) {
            // this.binaryTree.push(boxPiece)
          }
        }
      }
    },
    async setAlgorith() {
      this.thinking = true
      await this.setRandomPieceAlgorithm2()
    },

    async setRandomPieceAlgorithm2() {
      this.newPlay()
      let iterations = 0
      let boardEmptyCells = Object.assign([], this.getBoardEmptyCells)
      // let count = 0
      // let this.powercount = 0
      while (boardEmptyCells.length > 0 && iterations < 1800) {
        let hasPlaced = false
        let boxPiece
        let boxPieces = Object.assign([], this.getBoxPieces)

        while (boxPieces.length > 0) {
          boxPiece = await boxPieces.splice(
            Math.floor(Math.random() * boxPieces.length),
            1
          )[0]

          this.setCurrentPiece(boxPiece)

          let transforms = Object.assign([], boxPiece.transforms)
          if (Math.floor(Math.random * 2) == 1) {
            transforms = transforms.reverse()
          }
          while (transforms.length > 0) {
            let transform = await transforms.splice(
              0, // Math.floor(Math.random() * transforms.length),
              1
            )[0]

            if (transform == 'rotate90')
              boxPiece = await this.rotatePiece90(boxPiece)
            if (transform == 'flipH') boxPiece = await this.flipPieceH(boxPiece)

            let flagHasPlaced = await this.placePieceInEmptyCell({
              piece: boxPiece,
              cell: boardEmptyCells[0],
            })

            if (flagHasPlaced) {
              // let emptyIsolateCells = Object.assign(
              //   [],
              //   this.getEmptyIsolateCells
              // )

              // if (emptyIsolateCells.length > 0) {
              //   await this.removePieceFromBoard(boxPiece)
              //   continue
              // } else

              if (
                !(await this.canPutPiecesOnNextCells({
                  cells: this.getBoardEmptyCells,
                  pieces: this.getBoxPieces,
                }))
              ) {
                await this.removePieceFromBoard(boxPiece)
                continue
              }

              if (-1 !== [2, 3, 4].indexOf(this.getBoardPieces.length)) {
                let isBadGame = false
                let badGames_ = this.badGames.filter(
                  (x) => x.length == this.getBoardPieces.length
                )

                let boardPieces = JSON.parse(
                  JSON.stringify(this.getBoardPieces)
                )
                for (let board of boardPieces) {
                  delete board.transforms
                  delete board.color
                  delete board.name
                }

                for (let badGame of badGames_) {
                  if (JSON.stringify(badGame) == JSON.stringify(boardPieces)) {
                    isBadGame = true
                    break
                  }
                }

                if (isBadGame) {
                  await this.newPlay()
                  this.count = 0
                  this.powercount = 0
                }
              }
              hasPlaced = true
              break
            }
          }

          if (hasPlaced) {
            break
          }
        }

        if (!hasPlaced) {
          this.count++
          if (this.count >= 2) {
            let piecesOnBoard
            if (this.getBoardPieces.length > 4)
              piecesOnBoard = await this.removeLastPlacedPieceFromBoard()
            while (piecesOnBoard > 4) {
              piecesOnBoard = await this.removeLastPlacedPieceFromBoard()
            }
            this.count = 0
            this.powercount++
            if (this.powercount > 1) {
              let badGame = this.getBoardPieces.slice(0, 4)

              if (-1 !== [2, 3, 4].indexOf(badGame.length)) {
                // let newBadGame = Object.assign([], badGame)
                let newBadGame = await JSON.parse(JSON.stringify(badGame))
                for (let board of newBadGame) {
                  delete board.transforms
                  delete board.color
                  delete board.name
                }

                await this.badGames.push(newBadGame)
              }
              await this.newPlay()
              this.powercount = 0
            }
            boardEmptyCells = Object.assign([], this.getBoardEmptyCells)
          }
        } else {
          boardEmptyCells = Object.assign([], this.getBoardEmptyCells)
        }

        iterations++
      }

      // this.powercount = 0
      // this.count = 0
      this.thinking = false
    },

    async setRandomPieceAlgorithm1() {
      this.iterations = 0
      this.iterGood = 0
      this.iterFailed = 0

      while (this.iterations < 5) {
        let pieces = this.getBoxPieces
        let boardPieces = this.getBoardPieces

        // let randomPiece = pieces[Math.floor(Math.random() * pieces.length)]
        let randomPiece = await this.getRandomPieceFromBox()
        this.setCurrentPiece(randomPiece)
        let transforms = Object.assign([], randomPiece.transforms)

        this.iterations++

        let hasPlaced = false
        if (Math.floor(Math.random() * 2) == 0) {
          transforms = transforms.reverse()
        }
        for (let transform of transforms) {
          if (transform == 'rotate90') this.rotatePiece90(randomPiece)
          if (transform == 'flipH') this.flipPieceH(randomPiece)
          hasPlaced = await this.placePieceInRandomEmptyCells(randomPiece)

          if (hasPlaced) {
            break
          }
        }

        // verify if we finist
        if (this.getBoxPieces.length == 0) {
          alert('Congratulations YOU FINISH')
          break
        }

        let emptyIsolateCells = Object.assign([], this.getEmptyIsolateCells)
        if (emptyIsolateCells.length > 0) {
          while (emptyIsolateCells.length > 0) {
            // remove a previos
            let emptyIsolateCell =
              emptyIsolateCells[
                Math.floor(Math.random() * emptyIsolateCells.length)
              ]

            let neibors = emptyIsolateCell.neighbors.filter(
              (x) => !Number.isInteger(x.val)
            )
            let neibor = neibors[Math.floor(Math.random() * neibors.length)]
            this.removePieceFromBoard(neibor.val)
            emptyIsolateCells = Object.assign([], this.getEmptyIsolateCells)
            // this.removeRandomPieceFromBoard()
          }
        } else if (!hasPlaced) {
          this.removeRandomPieceFromBoard()
        }
      }
    },
    async newPlayExternal() {
      // let pieces = await this.removeAllPieceFromPuzzle()
      this.badGames = []
      this.newPlay()
    },
    async newPlay() {
      this.initPuzzle()
      this.shuffle()
      // for (let [ix, piece] of pieces.entries()) {
      //   this.setPieceOnBox(piece)
      // }
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
    async setPiece(y, x) {
      if (this.currentPiece == null) return
      let canPlaced = this.$canPlace(this.currentPiece, this.board, y, x)
      if (canPlaced) {
        await this.setPieceOnBoard({
          piece: this.currentPiece,
          posY: y,
          posX: x,
        })
      }
      if (this.getBoxPieces.length == 0) {
        alert('Congratulations YOU FINISH')
      }
    },
  },
  computed: {
    ...mapGetters({
      getBoxPieces: 'puzzle/getBoxPieces',
      getBoardPieces: 'puzzle/getBoardPieces',
      getBoardEmptyCells: 'puzzle/getBoardEmptyCells',
      getEmptyIsolateCells: 'puzzle/getEmptyIsolateCells',
    }),
    board() {
      return this.$store.state.puzzle.board
    },
    boardTemplate() {
      return this.$store.state.puzzle.boardTemplate
    },
    boardTemp() {
      return this.$store.state.puzzle.boardTemp
    },
    currentPiece() {
      return this.$store.state.puzzle.boxCurrentPiece
    },
    binaryTree() {
      return this.$store.state.puzzle.binaryTree
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
