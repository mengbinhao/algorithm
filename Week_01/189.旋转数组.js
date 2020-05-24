/*
 * @lc app=leetcode.cn id=189 lang=javascript
 *
 * [189] 旋转数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
	let previous, temp
	for (let i = 0; i < k; i++) {
		previous = nums[nums.length - 1]
		for (let j = 0; j < nums.length; j++) {
			temp = nums[j]
			nums[j] = previous
			previous = temp
		}
	}
}
// @lc code=end
