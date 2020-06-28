/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} N
 * @return {number}
 */
var fib = function (N) {
	if (N <= 1) return N
	if (N === 2) return 1

	let cur = 0,
		pre1 = 1,
		pre2 = 1

	for (let i = 3; i <= N; i++) {
		cur = pre1 + pre2
		pre2 = pre1
		pre1 = cur
	}
	return cur
}
// @lc code=end
