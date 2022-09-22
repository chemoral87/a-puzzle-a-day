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
  inject('arraysEqual', (a, b) => {
    if (a === b) return true
    if (a == null || b == null) return false
    if (a.length !== b.length) return false

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false
    }
    return true
  })
  inject('rotate90', (matrix) => {
    return matrix[0].map((val, index) =>
      matrix.map((row) => row[index]).reverse()
    )
  })
  inject('flipH', (matrix) => {
    return matrix.map((row, index) => row.reverse())
  })
}
