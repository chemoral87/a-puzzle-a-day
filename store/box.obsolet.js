import { pieces } from '../static/pieces'

export const state = () => ({
  currentPiece: null,
  // pieces: pieces,
})

export const getters = {
  // getBoxPieces(state) {
  //   return state.pieces
  // },
}

export const mutations = {
  removePieceFromBox(state, piece) {
    state.pieces = state.pieces.filter((x) => {
      return x.name != piece.name
    })
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
