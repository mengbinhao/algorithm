/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
	let window = {},
		left = 0,
		right = 0,
		ret = 0
	while (right < s.length) {
		let rightChar = s[right]

		window[rightChar] ? window[rightChar]++ : (window[rightChar] = 1)
		right++

		while (window[rightChar] > 1) {
			let leftChar = s[left]
			window[leftChar]--
			left++
		}
		ret = Math.max(ret, right - left)
	}
	return ret
}
// @lc code=end
lengthOfLongestSubstring('abcabcbb')
