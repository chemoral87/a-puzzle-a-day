export const state = () => ({
  boardTemplate: [
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31],
  ],
  boardTemp: [],
  board: [],
  pieces: [],
})

export const getters = {}

export const mutations = {
  initBoard(state) {
    state.boardTemp = this.$getNewBoardTemp()
    state.board = this.$getNewBoardTemp()
  },
  clearBoardTemp(state) {
    state.boardTemp = this.$getNewBoardTemp()
  },
  setBoardTemp(state, boardTemp) {
    state.boardTemp = boardTemp
  },
  removePieceFromPuzzle(state, piece) {
    state.pieces = state.pieces.filter((x) => {
      return x.name != piece.name
    })

    let boardBak = Object.assign([], state.board)
    console.log(boardBak)
    for (let [y, row] of boardBak.entries()) {
      for (let [x, val] of row.entries()) {
        let cll = val
        if (!Number.isInteger(cll)) {
          console.log(cll.name, y, x)
          if (cll.name == piece.name) {
            boardBak[y][x] = 0
          }
        }
      }
    }

    state.board = Object.assign([], boardBak)
  },
  setPieceOnPuzzle(state, { piece, posY, posX }) {
    state.pieces.push(piece)

    let { shape, name, color } = piece
    let boardBak = Object.assign([], state.board)
    for (let [y, row] of shape.entries()) {
      for (let [x, val] of row.entries()) {
        if (val == 1) {
          try {
            if (boardBak[posY + y][posX + x] != 0) {
            } else {
              boardBak[posY + y][posX + x] = {
                name: name,
                color: color,
              }
            }
          } catch (ex) {
            console.log(ex)
          }
        }
      }
    }
    state.board = boardBak
    state.boardTemp = this.$getNewBoardTemp()
  },
}

export const actions = {}
