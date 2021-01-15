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
	//能够走到的数组下标
	let maxPosition = 0
	for (let i = 0; i < nums.length; i++) {
		//若当前这一步都走不到,后面就更走不到了
		if (maxPosition < i) return false
		//更新max为当前能走到的最远位置
		maxPosition = Math.max(nums[i] + i, maxPosition)
	}
	//判断是否能跳完
	return maxPosition >= nums.length - 1
} // @lc code=end
