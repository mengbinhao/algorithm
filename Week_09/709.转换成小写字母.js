/*
 * @lc app=leetcode.cn id=709 lang=javascript
 *
 * [709] 转换成小写字母
 */

// @lc code=start
/**
 * @param {string} str
 * @return {string}
 */
var toLowerCase = function (str) {
	return str.replace(/[A-Z]/g, (item) => {
		return String.fromCharCode(item.charCodeAt() + 32)
	})
}
// @lc code=end
