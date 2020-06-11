/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
	if (!nums || !Array.isArray(nums) || !nums.length) return -1
	if (typeof target !== 'number' || !Number.isInteger(target)) return -1

	let left = 0,
		right = nums.length - 1,
		mid

	while (left <= right) {
		mid = Math.floor(left + (right - left) / 2)
		if (nums[mid] === target) {
			return mid
		}

		//left is asc
		//incase mid === left
		if (nums[mid] >= nums[left]) {
			if (target < nums[mid] && target >= nums[left]) {
				right = mid - 1
			} else {
				left = mid + 1
			}
		} else {
			if (target > nums[mid] && target <= nums[right]) {
				left = mid + 1
			} else {
				right = mid - 1
			}
		}
	}

	return -1
}
// @lc code=end
search([4, 5, 6, 7, 0, 1, 2], 0)
