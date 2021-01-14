/*
 * @lc app=leetcode.cn id=55 lang=javascript
 *
 * [55] 跳跃游戏
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
	let max = 0 // 能够走到的数组下标
	for (let i = 0; i < nums.length; i++) {
		//当前这一步都走不到,后面更走不到了
		if (max < i) return false
		max = Math.max(nums[i] + i, max)
	}
	return max >= nums.length - 1
} // @lc code=end
