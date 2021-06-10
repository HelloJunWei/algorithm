class BellanFord {
  constructor(martix, t) {
    // t 表示為終點
    this.martix = martix
    console.log(martix)
    this.n = martix.length
    this.t = t
    this.MAX = Number.POSITIVE_INFINITY
    this.m = this.makeMartix(this.n, this.MAX)
  }
  get result () {
    this.execute(this.t)
    return this.m
  }

  makeMartix(n, val) {
    var matrix = []
    for (var i = 0; i < n; ++i) {
      matrix[i] = []
      for (var j = 0; j < n; ++j)
        matrix[i][j] = val
    }
    return matrix
  }

  execute (t) {
    for (var i = 0; i < this.n; i ++) {
      for (var v = 0; v < this.n; v ++) {
        if (i == 0 && v == t) {
          this.m[i][v] = 0
        }
        if (i == 0 && v !== t) {
          this.m[i][v] = this.MAX
        }
        if (i == 1) {
          // 經過1條edge 然後到達終點t的情況
          this.m[i][v] = this.martix[v][t] || this.martix[v][t] == 0 ? this.martix[v][t] : this.MAX
        } else if (i > 1) {
          for (var w = 0 ; w < this.n; w ++) {
            if (w == v) continue
            let value = Math.min(this.m[i][v], this.m[i-1][v], this.martix[v][w] + this.m[i-1][w])
            this.m[i][v] = value
          }
        }
      }
    }
        
  }
}

module.exports = {
  BellanFord
}
