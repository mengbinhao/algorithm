/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
	let cur = 0,
		p1 = 0,
		p2 = nums.length - 1

	while (cur <= p2) {
		if (nums[cur] === 2) {
			;[nums[cur], nums[p2--]] = [nums[p2], nums[cur]]
		} else if (nums[cur] === 0) {
			;[nums[cur++], nums[p1++]] = [nums[p1], nums[cur]]
		} else {
			cur++
		}
	}
	return nums
}
// @lc code=end
sortColors([2, 0, 1])
