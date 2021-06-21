function getMax(){
  let arr = Array.from(arguments)
  arr = arr.map(v=>{
    return Number(v)
  })
  arr.sort((v1, v2)=>v1-v2)
  return arr.pop()
}
function getMin(){
  let arr = Array.from(arguments)
  arr = arr.map(v=>{
    return Number(v)
  })
  arr.sort((v1, v2)=>v2-v1)
  return arr.pop()
}

// 青蛙跳
// 一只青蛙可以一次跳 1 级台阶或者一次跳 2 级台阶，例如：
// 跳上第 1 级台阶只有一种跳法：直接跳 1 级即可。
// 跳上第 2 级台阶有两种跳法：每次跳 1 级，跳两次；或者一次跳 2 级。
// 问要跳上第 n 级台阶有多少种跳法？
function frog(steps){
  // 定义dp，dp[n]为青蛙跳到n级台阶的跳法数
  let dp = new Array(steps + 1)
  // 初始化数值
  dp[0] = 0
  dp[1] = 1
  dp[2] = 2
  for(let i = 3; i < dp.length; i++){
    // 状态转移方程
    dp[i] = dp[i-1] + dp[i-2]
  }
  console.log(dp)
}
// frog(1)


// 机器人走棋盘(计算有多少种路径)
// 有一个长m宽n的棋盘，左上角有一个机器人，他每次只能向右或向下移动一格，问走到右下角共有几种走法？
function robot_chess1(m, n){
  let dp = new Array(m)
  dp.fill(0)
  dp = dp.map(v=>{
    return new Array(n).fill(0)
  })
  for(let i = 0; i < m; i++){
    dp[i][n-1] = 1
  }
  for(let j = 0; j < n; j++){
    dp[m-1][j] = 1
  }
  for(let i = m - 2; i >= 0; i--){
    for(let j = n - 2; j >= 0; j--){
      dp[i][j] = dp[i+1][j] + dp[i][j+1]
    }
  }
  
  dp.forEach(v=>{
    console.log(v)
  })
}
// robot_chess1(5,6)

// 机器人走棋盘-有障碍物的版本
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
 function uniquePathsWithObstacles(obstacleGrid) {
  let m = obstacleGrid.length
  let n = obstacleGrid[0].length
  let dp = new Array(m).fill(0)
  dp = dp.map(v=>{
    return new Array(n).fill(0)
  })
  // 初始化数据
  for(let i = 0; i < m; i++){
    if(obstacleGrid[i][0] != 1){
      dp[i][0] = 1
    } else {
      break
    }
  }
  for(let j = 0; j < n; j++){
    if(obstacleGrid[0][j] != 1){
      dp[0][j] = 1
    } else {
      break
    }
  }
  for(let i = 1; i < m; i++){
    for(let j = 1; j < n; j++){
      if(obstacleGrid[i][j] == 1){
        dp[i][j] = 0
      } else {
        dp[i][j] = dp[i-1][j] + dp[i][j-1] 
      }
    }
  }
  console.log(dp[m-1][n-1])
};
// let obstacleGrid = [[0,1],[0,0]]
// uniquePathsWithObstacles(obstacleGrid)

// 背包问题
/**
 * 一个小偷去偷东西，背着一个容量为 $W$ 的背包，
 * 屋子主人共有 $N $件物品，
 * 其中第 $k$ 件物品的重量为$weight[k]$，价值为$value[k]$，
 * 问小偷最多能偷到价值为多少的物品？
 */
function knapsack(capacity, items){
  capacity = capacity + 1
  items = [[0, 0], ...items]
  let dp = new Array(items.length).fill(0)
  dp = dp.map(v=>{
    return new Array(capacity).fill(0)
  })
  // 初始化
  for(let k = 0; k < items.length; k++){
    dp[k][0] = 0
  }
  for(let W = 0; W < capacity; W++){
    if(W >= items[0][0]){
      dp[0][W] = items[0][1]
    } else {
      dp[0][W] = 0
    }
  }
  for(let k = 1; k < items.length; k++){
    for(let W = 1; W < capacity; W++){
      if(items[k][0] > W){
        dp[k][W] = 0
      } else {
        let value1 = dp[k-1][W-items[k][0]] + items[k][1]
        let value2 = dp[k-1][W]
        dp[k][W] = value1 > value2 ? value1 : value2
      }      
    }
  }
  console.log(dp)
}

let capacity = 4
let items = [
  [1, 10],
  [3, 25],
  [4, 30]
]
knapsack(capacity, items)