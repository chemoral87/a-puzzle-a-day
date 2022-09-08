export default ({ app }, inject) => {
  /* Here we inject the method 'getNewBoardTemp' */
  inject('getNewBoardTemp', (params) => {
    let board = Array(7)
      .fill(null)
      .map(() => Array(7).fill(0))
    board[0][6] = 1
    board[1][6] = 1
    board[6][3] = 1
    board[6][4] = 1
    board[6][5] = 1
    board[6][6] = 1
    return board
  })
  inject('canPlace', (piece, board, posY, posX) => {
    let { shape } = piece
    for (let [y, row] of shape.entries()) {
      for (let [x, val] of row.entries()) {
        if (val == 1) {
          try {
            if (board[posY + y][posX + x] != 0) {
              return false
            }
          } catch (ex) {
            return false
          }
        }
      }
    }
    return true
  })
}
