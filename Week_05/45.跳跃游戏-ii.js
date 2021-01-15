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
//Greedy
//O(N) - O(1)
var jump = function (nums) {
	let steps = 0,
		end = 0,
		maxPosition = 0
	for (let i = 0, len = nums.length; i < len - 1; i++) {
		//当前位置能跳到的最远位置
		maxPosition = Math.max(maxPosition, nums[i] + i)
		//跳到上次能跳到的最远位置后update
		if (i === end) {
			end = maxPosition
			steps++
		}
	}
	return steps
}
// @lc code=end
jump([2, 3, 1, 1, 4])
