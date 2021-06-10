class Floyd {
  constructor (martix) {
    this.martix = martix
    // node 的個數
    this.n = martix.length
    this.D = martix
  }
  get result () {
    this.execute()
    return this.D
  }

  execute () {
    for (let k = 0; k < this.n; k ++)
      for (let i = 0; i < this.n; i ++)
        for (let j = 0; j < this.n; j ++)
          this.D[i][j] = Math.min(this.D[i][j], this.D[i][k] + this.D[k][j])
  }
}

module.exports = {
  Floyd
}
