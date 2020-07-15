/*
 * @lc app=leetcode.cn id=541 lang=javascript
 *
 * [541] 反转字符串 II
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
	let arr = s.split('')
	for (let start = 0; start < arr.length; start += 2 * k) {
		let i = start,
			j = Math.min(start + k - 1, arr.length)
		while (i < j) {
			;[arr[i++], arr[j--]] = [arr[j], arr[i]]
		}
	}
	return arr.join('')
}
// @lc code=end
