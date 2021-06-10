class Munkres {
  constructor(matrix) {
    // init
    this.matrix = matrix
    this.row_covered = Array.from(Array(matrix.length), (_, x) => false)
    this.col_covered = Array.from(Array(matrix.length), (_, x) => false)
    this.n = matrix.length
    this.Z0_r = 0
    this.Z0_c = 0
    this.path = this._make_matrix(matrix.length * 2, 0)
    this.marked = this._make_matrix(matrix.length, 0)
  }
  _make_matrix (n, val) {
    var matrix = []
    for (var i = 0; i < n; ++i) {
      matrix[i] = []
      for (var j = 0; j < n; ++j)
        matrix[i][j] = val
    }
    return matrix
  }
  get result() {
    this.execute()
    return this.marked
  }

  execute () {
    var step = 1
    var steps = {
      1: this._step1,
      2: this._step2,
      3: this._step3,
      4: this._step4,
      5: this._step5,
      6: this._step6
    };

    while (true) {
      var func = steps[step]
      if (!func) // done
        break
      step = func.apply(this)
    }
  }
  _step1 () {
    for (var i = 0; i < this.n; i++) {
      // row 取最小值 然後相減
      var minval = Math.min.apply(Math, this.matrix[i])

      for (var j = 0; j < this.n; j++)
        this.matrix[i][j] -= minval;
    }
    // 第二部
    return 2
  }
  _step2 () {
    // 找出完全不相關的0 並且把它標記成 mark = 1
    // 而這些mark == 1的0 則代表我們的第一組解
    for (var i = 0; i < this.n; i++) {
      for (var j = 0; j < this.n; j++) {
        if (this.matrix[i][j] === 0 && !this.col_covered[j] && !this.row_covered[i]) {
          this.marked[i][j] = 1
          this.col_covered[j] = true
          this.row_covered[i] = true
          break;
        }
      }
    }
    this._clear_covers()
    return 3
  }

  _step3 () {
    // 此時去判斷這組矩陣有沒有解答，有的話直接跳出輸出解，沒有的話進入step4 檢查zero 是否有沒有沒被 cover 的
    // 有的話則cover
    var count = 0
    for (var i = 0; i < this.n; i++) {
      for (var j = 0; j < this.n; j++) {
        if (this.marked[i][j] == 1 && this.col_covered[j] == false) {
          this.col_covered[j] = true
          count++
        }
      }
    }

    return (count >= this.n) ? 7 : 4;
  }
  _step4 () {
    var done = false
    var row = -1, col = -1, star_col = -1

    while (!done) {
      // 找尚未cover的 0
      var z = this._find_a_zero()
      row = z[0]
      col = z[1]
      // 沒有的話，跳掉step 6 （做相減)
      // 基本上第一輪都會跳到6
      if (row < 0)
        return 6;

      this.marked[row][col] = 2
      // 找該row中有沒有mark == 1的 zero
      star_col = this._find_star_in_row(row)
      if (star_col >= 0) {
        // 表示有 cover 掉
        col = star_col;
        this.row_covered[row] = true
        this.col_covered[col] = false
      } else {
        // 跳第五步驟
        this.Z0_r = row
        this.Z0_c = col
        return 5
      }
    }
  }

  _step5 (){
    var count = 0;

    this.path[count][0] = this.Z0_r
    this.path[count][1] = this.Z0_c
    var done = false

    while (!done) {
      var row = this._find_star_in_col(this.path[count][1])
      if (row >= 0) {
        count++
        this.path[count][0] = row
        this.path[count][1] = this.path[count - 1][1]
      } else {
        done = true
      }

      if (!done) {
        var col = this._find_prime_in_row(this.path[count][0])
        count++
        this.path[count][0] = this.path[count - 1][0]
        this.path[count][1] = col
      }
    }

    this._convert_path(this.path, count)
    this._clear_covers()
    this._erase_primes()
    return 3
  }
  _step6 () {
    var minval = this._find_smallest()

    for (var i = 0; i < this.n; i++) {
      for (var j = 0; j < this.n; j++) {
        if (this.row_covered[i])
          this.matrix[i][j] += minval
        if (!this.col_covered[j])
          this.matrix[i][j] -= minval
      }
    }
    return 4
  }

  _clear_covers (){
    for (var i = 0; i < this.n; i++) {
      this.row_covered[i] = false
      this.col_covered[i] = false
    }
  }
  _find_a_zero () {
    for (var i = 0; i < this.n; i++)
      for (var j = 0; j < this.n; j++)
        if (this.matrix[i][j] === 0 && !this.row_covered[i] && !this.col_covered[j])
          return [i, j]

    return [-1, -1]
  }
  _find_star_in_row (row) {
    for (var j = 0; j < this.n; j++)
      if (this.marked[row][j] == 1)
        return j
    return -1
  }
  _find_star_in_col (col) {
    for (var i = 0; i < this.n; i++)
      if (this.marked[i][col] == 1)
        return i

    return -1
  }
  _find_prime_in_row (row) {
    for (var j = 0; j < this.n; j++)
      if (this.marked[row][j] == 2)
        return j

    return -1
  }
  _convert_path (path, count) {
    for (var i = 0; i <= count; i++)
      this.marked[path[i][0]][path[i][1]] =
        (this.marked[path[i][0]][path[i][1]] == 1) ? 0 : 1;
  }
  _erase_primes () {
    for (var i = 0; i < this.n; i++)
      for (var j = 0; j < this.n; j++)
        if (this.marked[i][j] == 2)
          this.marked[i][j] = 0
  }
  _find_smallest () {
    var minval = parseInt(Number.MAX_SAFE_INTEGER / 2) || ((1 << 26) * (1 << 26))

    for (var i = 0; i < this.n; i++)
      for (var j = 0; j < this.n; j++)
        if (!this.row_covered[i] && !this.col_covered[j])
          if (minval > this.matrix[i][j])
            minval = this.matrix[i][j]

    return minval
  }
}

module.exports = {
  Munkres
}
