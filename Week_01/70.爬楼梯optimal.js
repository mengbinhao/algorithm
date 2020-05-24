/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
	if (n <= 2) {
		return n
	}
	let first = 1,
		second = 2,
		allWays = 3
	for (let i = 3; i <= n; i++) {
		allWays = first + second
		first = second
		second = allWays
	}
	return allWays
}
