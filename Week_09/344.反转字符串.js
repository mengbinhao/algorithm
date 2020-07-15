/*
 * @lc app=leetcode.cn id=344 lang=javascript
 *
 * [344] 反转字符串
 */

// @lc code=start
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
	helper(s, 0, s.length - 1)

	function helper(s, left, right) {
		if (left >= right) return
		;[s[left++], s[right--]] = [s[right], s[left]]
		helper(s, left, right)
	}
}
// @lc code=end
reverseString('jack')
