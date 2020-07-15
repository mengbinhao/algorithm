/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
	const len = s.length
	if (len === 0) return 0
	let end = len - 1
	while (end >= 0 && s.charAt(end) === ' ') end--
	if (end < 0) return 0
	let start = end
	while (start >= 0 && s.charAt(start) !== ' ') start--
	return end - start
}
// @lc code=end
