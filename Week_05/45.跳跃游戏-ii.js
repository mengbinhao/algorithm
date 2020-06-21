/*
 * @lc app=leetcode.cn id=45 lang=javascript
 *
 * [45] 跳跃游戏 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

var jump = function (nums) {
	let steps = 0,
		end = 0,
		maxPosition = 0

	for (let i = 0, len = nums.length; i < len - 1; i++) {
		maxPosition = Math.max(maxPosition, nums[i] + i)
		if (i === end) {
			end = maxPosition
			steps++
		}
	}

	return steps
}
// @lc code=end
jump([2, 3, 1, 1, 4])
