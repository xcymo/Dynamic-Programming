function getMin(){
  let arr = Array.from(arguments).map(v=>{
    return Number(v)
  })
  arr.sort((v1, v2) => {
    return v2 - v1
  })
  return arr.pop()
}
function sleep(time){
  return new Promise((resolve)=>{
    setTimeout(() => {
      resolve()
    }, time);
  })
}

// 单词替换问题

function word_change(word1='', word2=''){
  let m = word1.length + 1
  let n = word2.length + 1
  if(m == 0){
    return n
  }
  if(n == 0){
    return m
  }
  let dp = new Array(m)
  dp.fill(0)
  dp = dp.map(v=>{
    return new Array(n).fill(0)
  })
  
  for(let i = 0; i < m; i++){
    dp[i][0] = i
  }
  for(let j = 0; j < n; j++){
    dp[0][j] = j
  }
  dp.forEach(v=>{
    console.log(v)
  })
  console.log('===========')
  for(let i = 1; i < m; i++){
    for(let j = 1; j < n; j++){
      if(word1[i - 1] == word2[j - 1]){
        dp[i][j] = dp[i-1][j - 1]
      } else {
        // 插入
        let value1 = dp[i][j - 1] + 1
        // 删除
        let value2 = dp[i - 1][j] + 1
        // 替换
        let value3 = dp[i - 1][j - 1] + 1
        dp[i][j] = getMin(value1, value2, value3)
      }
    }
  }
  dp.forEach(v=>{
    console.log(v)
  })
}

// word_change('baby', 'water')


function longestPalindrome(s) {
  let arr = s.split('')
  let dp = new Array(arr.length)
  dp.fill(0)
  dp = dp.map(v=>{
    return new Array(arr.length).fill(0)
  })
  for(let i = 0; i < arr.length; i++){
    dp[i][i] = 1
  }
  console.log(dp)
  for(let i = 0; i < arr.length; i++){
    for(let j = arr.length - 1; j >= 0; j--){
      dp[i][j] = Number(s[i] == s[j] && (j - i < 3 || dp[i+1][j-1]))
    }
  }
  dp.forEach(v=>[
    console.log(v)
  ])
};

// longestPalindrome('poop')


// 最大矩形
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = async function(matrix) {
  let m = matrix.length
  let n = matrix[0].length
  let dp = new Array(m).fill(0)
  dp = dp.map(v=>{
    return new Array(n).fill(0)
  })
  for(let i = 0; i < m; i++){
    for(let j = 0; j < n; j++){
      if(matrix[i][j] == 0){
        dp[i][j] = [0, 0]
      } else {
        dp[i][j] = [1, 1]
        let x_break = false
        let y_break = false
        let cur_direction = 'x'
        let x = 0
        let y = 0
        while(!x_break || !y_break){
          await sleep(500)
          if(!x_break && cur_direction == 'x'){
            x++
            for(let c_y = j; c_y <= j + y; c_y++){
              console.log()
              if(matrix[i+x][c_y] == 0){
                x_break = true
                x--
                break
              }
            }
            cur_direction = 'y'
          }
          if(!y_break && cur_direction == 'y'){
            y++
            for(let c_x = i; c_x <= i + x; c_x++){
              if(matrix[c_x][j+y] == 0){
                y_break = true
                y--
                break
              }
            }
            cur_direction = 'x'
          }
        }
        dp[i][j] = [x, y]
      }
    }
  }
  console.log(dp)
};

let matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
maximalRectangle(matrix)