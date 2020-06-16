/*
 * @lc app=leetcode.cn id=125 lang=javascript
 *
 * [125] 验证回文串
 * two pointer 夹逼
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
	if (typeof s !== 'string') return false

	s = s.replace(/[^A-Za-z0-9]/g, '').toLowerCase()

	let left = 0
	right = s.length - 1

	while (left < right) {
		if (s[left] !== s[right]) {
			return false
		}
		left++
		right--
	}

	return true
}
// @lc code=end
