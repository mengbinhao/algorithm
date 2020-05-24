/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
	let res = {}
	for (let i = 0; i < nums.length; i++) {
		if (res[nums[i]] !== undefined) {
			return [i, nums.indexOf(res[nums[i]])]
		}
		res[target - nums[i]] = nums[i]
	}
}
// @lc code=end
