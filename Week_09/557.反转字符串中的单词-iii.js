/*
 * @lc app=leetcode.cn id=557 lang=javascript
 *
 * [557] 反转字符串中的单词 III
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
	function mySplit(s) {
		let words = [],
			word = ''
		for (let i = 0; i < s.length; i++) {
			if (s[i] === ' ') {
				words.push(word)
				word = ''
			} else {
				word += s[i]
			}
		}
		words.push(word)
		return words
	}
	function myReverse(word) {
		let ret = ''
		for (let i = word.length - 1; i >= 0; i--) {
			ret += word[i]
		}
		return ret
	}
	let words = mySplit(s),
		ret = ''

	for (let word of words) {
		ret += myReverse(word) + ' '
	}

	return ret.substring(0, ret.length - 1)
}
// @lc code=end
reverseWords("Let's take LeetCode contest")

// var reverseWords = function (s) {
// 	let strs = s.split(' '),
// 		ret = ''
// 	for (let str of strs) {
// 		ret += str.split('').reverse().join('') + ' '
// 	}
// 	return ret.substring(0, ret.length - 1)
// }
