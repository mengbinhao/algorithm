/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 */

// @lc code=start
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function (str) {
	let len = str.length,
		ret = 0,
		i = 0,
		flag = 1,
		max = Math.pow(2, 31) - 1,
		min = -Math.pow(2, 31)
	if (len === 0) return ret
	while (str[i] === ' ' && i < len) i++
	if (str[i] === '+' || str[i] === '-') {
		flag = str[i] === '+' ? 1 : -1
		i++
	}
	while (i < len && isDigit(str[i])) {
		let val = +str[i]
		ret = ret * 10 + val
		i++
	}

	if (ret > max || ret < min) {
		return flag > 0 ? max : min
	}

	return ret * flag

	function isDigit(val) {
		return !Number.isNaN(Number.parseInt(val))
	}
}
// @lc code=end
