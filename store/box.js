import { pieces } from '../static/pieces'

export const state = () => ({
  currentPiece: null,
  pieces: pieces,
})

export const getters = {
  getCounter(state) {
    return state.counter
  },
  getBoxPieces(state) {
    return state.pieces
  },
}

export const mutations = {
  setCurrentPiece(state, tPiece) {
    state.currentPiece = tPiece
  },
  rotatePiece90(state, tPiece) {
    let piece = state.pieces.find((x) => x.name == tPiece.name)
    let { shape } = piece
    piece.shape = shape[0].map((val, index) =>
      shape.map((row) => row[index]).reverse()
    )
  },
  rotatePieceN90(state, tPiece) {
    let piece = state.pieces.find((x) => x.name == tPiece.name)
    let { shape } = piece
    piece.shape = shape[0]
      .map((val, index) => shape.map((row) => row[index]))
      .reverse()
  },
  flipPieceH(state, tPiece) {
    let piece = state.pieces.find((x) => x.name == tPiece.name)
    let { shape } = piece
    piece.shape = shape.map((row, index) => row.reverse())
  },
  flipPieceV(state, tPiece) {
    let piece = state.pieces.find((x) => x.name == tPiece.name)
    let { shape } = piece
    piece.shape = shape.map((row, index) => row).reverse()
  },
  clearCurrent(state) {
    state.currentPiece = null
  },
  removePieceFromBox(state, piece) {
    state.pieces = state.pieces.filter((x) => {
      return x.name != piece.name
    })
  },
  setPieceOnBox(state, piece) {
    state.pieces.push(piece)
  },
}

export const actions = {
  async fetchCounter({ state }) {
    // make request
    const res = { data: 10 }
    state.counter = res.data
    return res.data
  },
}
