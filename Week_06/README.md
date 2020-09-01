学习笔记

这周题做的不多，后面补上！！！

##### [509斐波那契](https://leetcode-cn.com/problems/fibonacci-number/)

```javascript
//recursion
var fib = function(N) {
  return N <= 1 ? N : fib( N -1) + fib(N - 2)
};

//dp
var fib = function (N) {
	let ret = Array.from({ length: N })
	;(ret[0] = 0), (ret[1] = 1)

	for (let i = 2; i <= N; i++) {
		ret[i] = ret[i - 1] + ret[i - 2]
	}

	return ret[N]
}

//一直递推
var fib = function (N) {
	if (N <= 1) return N
	if (N === 2) return 1

	let cur = 0,
		pre1 = 1,
		pre2 = 1

	for (let i = 3; i <= N; i++) {
		cur = pre1 + pre2
		pre1 = pre2
		pre2 = cur
	}
	return cur
}
```

##### [62不同路径](https://leetcode-cn.com/problems/unique-paths/)

```javascript
//dp, define a two-demension array 
var uniquePaths = function (m, n) {
	// 1 子问题 f(i,j) = f(i - 1; j) + f(i; j - 1)
	// 2 存储中间状态 dp[i, j]
	// 3 DP方程 dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
	//注意：自底向上推
	let dp = Array.from({ length: m }, (item, rowIdx, arr) => {
		return Array.from({ length: n }, (item, colIndex, arr) => {
			if (rowIdx === 0 || colIndex === 0) {
				return 1
			}
		})
	})

	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
		}
	}

	return dp[m - 1][n - 1]
}

//space optimal
var uniquePaths = function (m, n) {
  //row
	let cur = Array.from({ length: n }, () => 1)

	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			cur[j] += cur[j - 1]
		}
	}

	return cur[n - 1]
}
```

##### [64最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/)

```javascript
//DP
var minPathSum = function (grid) {
	if (!grid) return 0
	let rows = grid.length,
		cols = grid[0].length
	if (rows === 0 || cols === 0) return 0
	//dp[i][j]表示从(i,j)点走到(m-1, n-1)点的最小路径和
	let dp = Array.from({ length: rows }, () => new Array(cols).fill(Infinity))

	dp[0][0] = grid[0][0]

	//first col
	for (let i = 1; i < rows; i++) {
		dp[i][0] = dp[i - 1][0] + grid[i][0]
	}
	//first row
	for (let j = 1; j < cols; j++) {
		dp[0][j] = dp[0][j - 1] + grid[0][j]
	}

	for (let i = 1; i < rows; i++) {
		for (let j = 1; j < cols; j++) {
			dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
		}
	}

	return dp[rows - 1][cols - 1]
}


//DP optimal
var minPathSum = function (grid) {
	if (!grid) return 0
	let rows = grid.length,
		cols = grid[0].length
	if (rows === 0 || cols === 0) return 0

	//滚动数组
	let dp = new Array(cols).fill(Infinity)

	//initial
	dp[0] = grid[0][0]

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (i === 0 && j === 0) continue
			else if (i === 0) dp[j] = dp[j - 1] + grid[i][j]
			else if (j === 0) dp[j] = dp[j] + grid[i][j]
			else dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j]
		}
	}
	return dp[cols - 1]
}
```

##### [91解码方法](https://leetcode-cn.com/problems/decode-ways/)

```javascript
//DP
var numDecodings = function(s) {
    if (!s) return 0
    let len = s.length;
    let dp =  Array(len + 1).fill(0);
    dp[0] = 1;
    dp[1] = s[0] === '0' ? 0 : 1;
    for (let i = 2; i <= len; i++) {
        if (s[i - 1] !== '0') {
            dp[i] += dp[i - 1];
        }
        if (s[i - 2] === '1' || (s[i - 2] === '2' && s[i - 1] >= 0 && s[i - 1] <= 6)) {
            dp[i] += dp[i - 2];
        }
    }
    return dp[len];
}
```

