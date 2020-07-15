/*
 * @lc app=leetcode.cn id=917 lang=javascript
 *
 * [917] 仅仅反转字母
 */

// @lc code=start
/**
 * @param {string} S
 * @return {string}
 */
var reverseOnlyLetters = function (S) {
	function isLetter(letter) {
		return /[a-zA-Z]/.test(letter)
	}
	let ret = '',
		end = S.length - 1

	for (let i = 0; i < S.length; i++) {
		if (isLetter(S[i])) {
			while (!isLetter(S[end])) end--
			ret += S[end--]
		} else {
			ret += S[i]
		}
	}
	return ret
}
// @lc code=end
