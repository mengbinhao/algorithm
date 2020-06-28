/*
 * @lc app=leetcode.cn id=62 lang=javascript
 *
 * [62] 不同路径
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
	// 1 子问题 f(i,j) = f(i - 1; j) + f(i; j - 1)
	// 2 存储中间状态 dp[i, j]
	// 3 DP方程 dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
	//注意：自底向上推
	let cur = Array.from({ length: n }, () => 1)

	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			cur[j] += cur[j - 1]
		}
	}

	return cur[n - 1]
}
// @lc code=en

uniquePaths(5, 4)
