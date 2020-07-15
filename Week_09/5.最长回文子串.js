/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
	function isValidPalindrome(str, l, r) {
		while (l < r) {
			if (str[l] !== str[r]) {
				return false
			}
			l++
			r--
		}
		return true
	}

	let len = s.length,
		length
	if (len < 2) return s

	let maxLen = 1,
		begin = 0

	for (let i = 0; i < len - 1; i++) {
		for (let j = i + 1; j < len; j++) {
			if (j - i + 1 > maxLen && isValidPalindrome(s, i, j)) {
				maxLen = j - i + 1
				begin = i
			}
		}
	}

	return s.substring(begin, begin + maxLen)
}
// @lc code=end
longestPalindrome('babad')
