/*
 * @Author: your name
 * @Date: 2020-06-07 11:34:45
 * @LastEditTime: 2020-06-07 12:04:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /algorithm009-class02/Users/jack/.leetcode/169.多数元素.js
 */

/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
	let major = nums[0],
		count = 1
	for (let i = 1; i < nums.length; i++) {
		if (count === 0) {
			count++
			major = nums[i]
		} else if (major === nums[i]) {
			count++
		} else {
			count--
		}
	}
	return major
}
// @lc code=end
