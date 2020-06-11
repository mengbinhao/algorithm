/*
 * @lc app=leetcode.cn id=367 lang=javascript
 *
 * [367] 有效的完全平方数
 */

// @lc code=start
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
	if (num < 2) return true
	let left = 2,
		right = num,
		mid

	while (left <= right) {
		mid = Number.parseInt(left + (right - left) / 2)
		if (mid * mid === num) {
			return true
		}

		if (mid * mid < num) {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}

	return false
}
// @lc code=end
isPerfectSquare(9)
