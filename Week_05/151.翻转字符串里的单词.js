/*
 * @lc app=leetcode.cn id=151 lang=javascript
 *
 * [151] 翻转字符串里的单词
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
//return s.trim().split(/\s+/).reverse().join(' ');
var reverseWords = function (s) {
	let left = 0
	let right = s.length - 1
	let queue = []
	let word = ''
	while (s.charAt(left) === ' ') left++
	while (s.charAt(right) === ' ') right--
	while (left <= right) {
		let char = s.charAt(left)
		if (char === ' ' && word) {
			queue.unshift(word)
			word = ''
		} else if (char !== ' ') {
			word += char
		}
		left++
	}
	queue.unshift(word)
	return queue.join(' ')
}
// @lc code=end
