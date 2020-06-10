/*
 * @Author: your name
 * @Date: 2020-06-02 11:11:43
 * @LastEditTime: 2020-06-10 13:37:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \algorithm009-class02\Week_03\22.括号生成.js
 */

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

	let backTracking = (left, right, n, ret, s) => {
		if (left === n && right === n) {
			ret.push(s)
			return
		}

		if (left < n) {
			backTracking(left + 1, right, n, ret, s + '(')
		}

		if (left > right) {
			backTracking(left, right + 1, n, ret, s + ')')
		}
	}

	backTracking(0, 0, n, ret, '')
	return ret
}
// @lc code=end
