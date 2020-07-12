/*
 * @lc app=leetcode.cn id=231 lang=javascript
 *
 * [231] 2的幂
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
	if (n < 1) {
		return false
	}

	let m = n & (n - 1)
	return m == 0 ? true : false
}
// @lc code=end
