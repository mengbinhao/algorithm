/*
 * @lc app=leetcode.cn id=191 lang=javascript
 *
 * [191] 位1的个数
 */

// @lc code=start
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
	let sum = 0
	while (n != 0) {
		sum++
		n &= n - 1
	}
	return sum
}
// @lc code=end
