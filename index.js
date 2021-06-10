const { Floyd } = require('./Floyd_Warshall')
const { BellanFord } = require('./Bellman_Ford')


let MAX_NUMBER = Number.POSITIVE_INFINITY
const floydEx = [
  [0,1,MAX_NUMBER,1,5],
  [9,0,3,2,MAX_NUMBER],
  [MAX_NUMBER,MAX_NUMBER,0,4,MAX_NUMBER],
  [MAX_NUMBER,MAX_NUMBER,2,0,3],
  [3,MAX_NUMBER,MAX_NUMBER,MAX_NUMBER,0]
]
const floyd = new Floyd(floydEx.slice(0))
const floyd_result = floyd.result
console.log('==佛洛依德演算法 找最短路徑，graph中不能有負數')
console.log(floyd_result)

const bellanFordEx = [
  [0,-4,MAX_NUMBER,MAX_NUMBER,MAX_NUMBER, -3],
  [MAX_NUMBER,0, MAX_NUMBER,-1,-2,MAX_NUMBER],
  [MAX_NUMBER, 8, 0, MAX_NUMBER, MAX_NUMBER, 3],
  [6, MAX_NUMBER, MAX_NUMBER, 0, MAX_NUMBER, 4],
  [MAX_NUMBER, MAX_NUMBER, -3, MAX_NUMBER, 0, 2],
  [MAX_NUMBER, MAX_NUMBER, MAX_NUMBER, MAX_NUMBER, MAX_NUMBER, 0]
]
// 終點為 node 4
const bellanFord = new BellanFord(bellanFordEx.slice(0), 5)

console.log('==Bellman Ford演算法 找最短路徑，graph中可以有負數')
console.log(bellanFord.result)
// 2021/05/20 驗證正確

