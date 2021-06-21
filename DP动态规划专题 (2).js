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
 var uniquePathsWithObstacles = function(obstacleGrid) {
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

// 机器人走棋盘(找出一条路径，使得数字和最小)
function robot_chess2(chess){
  let m = chess.length
  let n = chess[0].length
  // 初始化dp数组
  let dp = new Array(m)
  dp.fill(0)
  dp = dp.map(v=>{
    return new Array(n).fill(0)
  })
  dp[0][0] = chess[0][0]
  // 由于机器人只能向右和下走，所以在数组的上边和左边的dp值，一定等于从棋盘原点直线过来的值之和
  for(let i = 1; i < m; i++){
    dp[i][0] = dp[i-1][0] + chess[i][0]
  }
  for(let j = 1; j < n; j++){
    dp[0][j] = dp[0][j-1] + chess[0][j]
  }
  console.log(dp)
  for(let i = 1; i < m ; i++){
    for(let j = 1; j < n ; j++){
      let value1 = dp[i-1][j] + chess[i][j]
      let value2 = dp[i][j-1] + chess[i][j]
      dp[i][j] = getMin(value1, value2)    
    }
  }
  console.log(dp)
}

// let chess = [
//   [1, 3, 1, 1],
//   [1, 5, 1, 2],
//   [4, 2, 1, 3],
//   [0, 0, 4, 1]
// ]
// robot_chess2(chess)

// 三角形路径
function triangle_sum(chess){
  let dp = chess.map(v1=>{
    return v1.map(v2=>{
      return 0
    })
  })
  // 初始化
  dp[dp.length-1] = chess[chess.length-1].map(v=>v)
  console.log(dp)
  for(let i = chess.length - 2; i >= 0; i--){
    for(let j = chess[i].length - 1; j >= 0; j--){
      let value1 = dp[i+1][j]
      let value2 = dp[i+1][j+1]
      dp[i][j] = chess[i][j] + getMin(value1, value2)
    }
  }
  console.log(dp)
}

// let chess1 = [
//      [2],
//     [2,3],
//    [4,3,1],
//   [2,5,2,3],
//  [6,1,4,3,2]
// ]
// let chess2 = [
//     [2],
//    [3,4],
//   [6,5,7],
//  [4,1,8,3]
// ]
// triangle_sum(chess1)
// triangle_sum(chess2)

