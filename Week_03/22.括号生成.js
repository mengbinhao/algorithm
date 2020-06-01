/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
	let ret = []
	let recursionParenthesis = (left, right, s) => {
		if (left === 0 && right === 0) {
			ret.push(s)
			return
		}

		if (left) {
			recursionParenthesis(left - 1, right, s + '(')
		}

		if (right > left) {
			recursionParenthesis(left, right - 1, s + ')')
		}
	}

	recursionParenthesis(n, n, '')
	return ret
}
// @lc code=end
