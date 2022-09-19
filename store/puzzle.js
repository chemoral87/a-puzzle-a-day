import goTo from 'vuetify/lib/services/goto'
import { pieces } from '../static/pieces'

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
  boardPieces: [],
  boxPieces: pieces,
  boxInitPieces: pieces,
  badGames: [],
  boxCurrentPiece: null,
})

export const getters = {
  getBoxPieces(state) {
    return state.boxPieces
  },
  getBoardPieces(state) {
    return state.boardPieces
  },
  getBoardEmptyCells(state) {
    let board_ = state.board.entries()
    let cells = []
    for (let [y, row] of board_) {
      for (let [x, val] of row.entries()) {
        if (val == 0) {
          cells.push({ x, y })
        }
      }
    }
    return cells
  },
  getEmptyIsolateCells(state, getters) {
    let emptyCells = getters.getBoardEmptyCells
    let board = state.board
    let EmptyIsolateCells = []
    for (let cll of emptyCells) {
      let { x, y } = cll
      let neighbors = []
      if (board[y - 1] && typeof board[y - 1][x] != 'undefined') {
        neighbors.push({ val: board[y - 1][x], x, y: y - 1 })
      }
      if (board[y + 1] && typeof board[y + 1][x] != 'undefined') {
        neighbors.push({ val: board[y + 1][x], x, y: y + 1 })
      }
      if (board[y] && typeof board[y][x + 1] != 'undefined') {
        neighbors.push({ val: board[y][x + 1], x: x + 1, y })
      }
      if (board[y] && typeof board[y][x - 1] != 'undefined') {
        neighbors.push({ val: board[y][x - 1], x: x - 1, y })
      }
      // Find empty neighbors
      if (neighbors.find((x) => x.val == 0) == undefined) {
        EmptyIsolateCells.push({ ...cll, neighbors })
      }
    }

    return EmptyIsolateCells
  },
}

export const mutations = {
  setPieceOnBox(state, piece) {
    if (piece) state.boxPieces.push(piece)
  },
  clearCurrent(state) {
    state.boxCurrentPiece = null
  },
  rotatePiece90(state, tPiece) {
    let piece = state.boxPieces.find((x) => x.name == tPiece.name)
    let { shape } = piece
    piece.shape = shape[0].map((val, index) =>
      shape.map((row) => row[index]).reverse()
    )
    state.boxPieces = Object.assign([], state.boxPieces)
  },
  rotatePiece180(state, tPiece) {
    let piece = state.boxPieces.find((x) => x.name == tPiece.name)
    let { shape } = piece
    piece.shape = shape[0].map((val, index) => shape.map((row) => row[index]))
    state.boxPieces = Object.assign([], state.boxPieces)
  },
  rotatePieceN90(state, tPiece) {
    let piece = state.boxPieces.find((x) => x.name == tPiece.name)
    let { shape } = piece
    piece.shape = shape[0]
      .map((val, index) => shape.map((row) => row[index]))
      .reverse()
    state.boxPieces = Object.assign([], state.boxPieces)
  },
  flipPieceH(state, tPiece) {
    let piece = state.boxPieces.find((x) => x.name == tPiece.name)
    let { shape } = piece
    piece.shape = shape.map((row, index) => row.reverse())
    state.boxPieces = Object.assign([], state.boxPieces)
  },
  flipPieceV(state, tPiece) {
    let piece = state.boxPieces.find((x) => x.name == tPiece.name)
    let { shape } = piece
    piece.shape = shape.map((row, index) => row).reverse()
    state.boxPieces = Object.assign([], state.boxPieces)
  },
  setCurrentPiece(state, tPiece) {
    state.boxCurrentPiece = tPiece
  },
  shuffle(state) {
    let array = Object.assign([], state.boxPieces)
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    state.boxPieces = array
  },
  initPuzzle(state) {
    state.boardTemp = this.$getNewBoardTemp()
    state.board = this.$getNewBoardTemp()
    state.boardPieces = []
    state.boxPieces = state.boxInitPieces
    state.binaryTree = []
  },
  clearBoardTemp(state) {
    state.boardTemp = this.$getNewBoardTemp()
  },
  setBoardTemp(state, boardTemp) {
    state.boardTemp = boardTemp
  },
  clearBoardPieces(state) {
    state.boardPieces = []
  },
  removePieceFromBoard(state, piece) {
    state.boardPieces = state.boardPieces.filter((x) => {
      return x.name != piece.name
    })

    let boardBak = Object.assign([], state.board)
    for (let [y, row] of boardBak.entries()) {
      for (let [x, val] of row.entries()) {
        let cll = val
        if (!Number.isInteger(cll)) {
          if (cll.name == piece.name) {
            boardBak[y][x] = 0
          }
        }
      }
    }

    state.board = Object.assign([], boardBak)
  },
  setPieceOnBoard(state, { piece, posY, posX }) {
    state.boardPieces.push(piece)

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
  blockCells(state, { day, month }) {
    let boardTemplate = Object.assign([], state.boardTemplate)
    let board = Object.assign([], state.board)

    for (let [y, row] of boardTemplate.entries()) {
      for (let [x, val] of row.entries()) {
        if (val == day || val == month) {
          board[y][x] = 1
        }
      }
    }
    state.board = Object.assign([], board)
  },
  removePieceFromBox(state, piece) {
    state.boxPieces = state.boxPieces.filter((x) => {
      return x.name != piece.name
    })
  },
}

export const actions = {
  rotatePiece90({ commit, state }, piece) {
    commit('rotatePiece90', piece)
    return state.boxPieces.find((x) => x.name == piece.name)
  },
  rotatePiece180({ commit, state }, piece) {
    commit('rotatePiece180', piece)
    return state.boxPieces.find((x) => x.name == piece.name)
  },
  rotatePieceN90({ commit, state }, piece) {
    commit('rotatePieceN90', piece)
    return state.boxPieces.find((x) => x.name == piece.name)
  },
  flipPieceH({ commit, state }, piece) {
    commit('flipPieceH', piece)
    return state.boxPieces.find((x) => x.name == piece.name)
  },
  flipPieceV({ commit, state }, piece) {
    commit('flipPieceV', piece)
    return state.boxPieces.find((x) => x.name == piece.name)
  },
  async canPutPiecesOnNextCells(
    { commit, state, dispatch },
    { pieces, cells }
  ) {
    let max = Math.floor((cells.length - 1) / 4)

    // if (4 >= max) {
    //   return true
    // }
    for (let { x, y } of cells) {
      // console.log('x,y', x, y)
      let flagPlaced = false
      for (let piece of pieces) {
        // let transforms = Object.assign([], boxPiece.transforms)
        for (let transform of piece.transforms) {
          if (transform == 'rotate90')
            piece = await dispatch('rotatePiece90', piece)
          if (transform == 'flipH') piece = await dispatch('flipPieceH', piece)

          let { shape } = piece

          let firxtX = shape[0].indexOf(1)
          // let pieceWidth = shape[0].length
          // let pieceHeigth = shape.length
          let realX = x - firxtX

          let canPlaced = this.$canPlace(piece, state.board, y, realX)
          if (canPlaced) {
            flagPlaced = true
            break
          }
        }
        if (flagPlaced) {
          break
        }
      }
      if (!flagPlaced) {
        return false
      }
      max--
      if (max == 0) return true
    }
    return true
  },
  placePieceInEmptyCell({ commit, state, getters, dispatch }, payload) {
    let {
      cell: { x, y },
    } = payload

    let piece = getters.getBoxPieces.find((x) => x.name == payload.piece.name)
    let { shape } = piece

    let firxtX = shape[0].indexOf(1)
    let pieceWidth = shape[0].length
    let pieceHeigth = shape.length
    let realX = x - firxtX

    if (realX >= 0 && realX <= 7 - pieceWidth && y <= 7 - pieceHeigth) {
      let canPlaced = this.$canPlace(piece, state.board, y, realX)

      if (canPlaced) {
        commit('setPieceOnBoard', { piece, posY: y, posX: realX })
        commit('removePieceFromBox', piece)
        commit('clearCurrent')

        return true
        // break
      }
    }
    return false
  },
  placePieceInRandomEmptyCells({ commit, state, getters }, piece) {
    let emptyCells = Object.assign([], getters.getBoardEmptyCells)
    let firxtX = piece.shape[0].indexOf(1)
    let { shape } = piece
    let pieceWidth = shape[0].length
    let pieceHeigth = shape.length
    while (emptyCells.length > 0) {
      // let { x, y } = emptyCells.splice(
      //   Math.floor(Math.random() * emptyCells.length),
      //   1
      // )[0]

      let { x, y } = emptyCells.splice(0, 1)[0]
      let realX = x - firxtX
      if (realX >= 0 && realX <= 7 - pieceWidth && y <= 7 - pieceHeigth) {
        let canPlaced = this.$canPlace(piece, state.board, y, realX)

        if (canPlaced) {
          // this.setPiece(y, realX)
          commit('setPieceOnBoard', { piece, posY: y, posX: realX })
          commit('removePieceFromBox', piece)
          commit('clearCurrent')

          return true
          // break
        }
      }
    }

    return false
  },
  getRandomPieceFromBox({ state }) {
    let pieces = state.boxPieces
    let piece = pieces[Math.floor(Math.random() * pieces.length)]
    return piece
  },
  removeLastPlacedPieceFromBoard({ state, commit }) {
    let pieces = state.boardPieces
    let piece = pieces[pieces.length - 1]
    commit('removePieceFromBoard', piece)
    commit('setPieceOnBox', piece)
    return state.boardPieces.length
  },
  removeRandomPieceFromBoard({ state, commit }) {
    let pieces = state.boardPieces
    let piece = pieces[Math.floor(Math.random() * pieces.length)]
    commit('removePieceFromBoard', piece)
    commit('setPieceOnBox', piece)
  },
  removePieceFromBoard({ commit, state }, tPiece) {
    let piece = state.boardPieces.find((x) => x.name == tPiece.name)
    commit('removePieceFromBoard', piece)
    commit('setPieceOnBox', piece)
  },
  setPieceOnBoard({ commit }, payload) {
    commit('setPieceOnBoard', payload)
    commit('removePieceFromBox', payload.piece)
    commit('clearCurrent')
  },
  removeAllPieceFromPuzzle({ commit, getters }) {
    let pieces = Object.assign([], getters.getBoardPieces)

    // commit('clearBoardPieces')
    commit('initPuzzle')

    return pieces
  },
  newPuzzlePlay({ commit, getters }, payload) {
    commit('blockCells', payload)
  },
}
