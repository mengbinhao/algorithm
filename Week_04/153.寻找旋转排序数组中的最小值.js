/*
 * @lc app=leetcode.cn id=153 lang=javascript
 *
 * [153] 寻找旋转排序数组中的最小值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
	if (!nums || !Array.isArray(nums) || nums.length === 0) return null
	if (nums.length === 1) return nums[0]

	let left = 0,
		right = nums.length - 1,
		mid
	//an sorted array
	if (nums[right] > nums[left]) return nums[0]
	while (left <= right) {
		mid = Math.floor(left + (right - left) / 2)

		if (nums[mid] > nums[mid + 1]) {
			return nums[mid + 1]
		}

		if (nums[mid] < nums[mid - 1]) {
			return nums[mid]
		}

		if (nums[mid] > nums[0]) {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}

	return null
}
// @lc code=end
findMin([1, 2])
