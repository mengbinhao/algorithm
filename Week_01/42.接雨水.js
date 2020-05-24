/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
	let ret = 0,
		len = height.length,
		leftMax = [],
		rightMax = []

	leftMax[0] = height[0]
	for (let i = 1; i < len; i++) {
		leftMax[i] = Math.max(height[i], leftMax[i - 1])
	}
	rightMax[len - 1] = height[len - 1]
	for (let i = len - 2; i >= 0; i--) {
		rightMax[i] = Math.max(height[i], rightMax[i + 1])
	}
	for (let i = 1; i < len - 1; i++) {
		ret += Math.min(leftMax[i], rightMax[i]) - height[i]
	}
	return ret
}
// @lc code=end
