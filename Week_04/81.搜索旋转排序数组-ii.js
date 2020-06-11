/*
 * @lc app=leetcode.cn id=81 lang=javascript
 *
 * [81] 搜索旋转排序数组 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
	if (!nums || !Array.isArray(nums)) return false
	let len = nums.length
	if (!len) return false
	if (len === 1) {
		return nums[0] === target
	}

	let left = 0,
		right = len - 1,
		mid

	while (left <= right) {
		mid = Math.floor(left + (right - left) / 2)

		if (nums[mid] === target) {
			return true
		}

		if (nums[left] === nums[mid]) {
			left++
			continue
		}

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

	return false
}
// @lc code=end
search([1, 3, 1, 1, 1], 3)
