/*
 * @lc app=leetcode.cn id=18 lang=javascript
 *
 * [18] 四数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
	if (!Array.isArray(nums) || nums.length === 0) {
		return []
	}
	if (typeof target !== 'number' || !Number.isInteger(target)) {
		throw new TypeError(`invalid param target = ${target}`)
	}

	nums.sort((a, b) => a - b)
	let len = nums.length,
		ret = []

	for (let k = 0; k < len - 3; k++) {
		if (nums[k] + nums[k + 1] + nums[k + 2] + nums[k + 3] > target) break
		if (k > 0 && nums[k] === nums[k - 1]) continue

		for (let l = k + 1; l < len - 2; l++) {
			if (l > k + 1 && nums[l] === nums[l - 1]) continue

			let m = l + 1,
				n = len - 1

			while (m < n) {
				let sum = nums[k] + nums[l] + nums[m] + nums[n]
				if (sum === target) {
					ret.push([nums[k], nums[l], nums[m], nums[n]])
					while (nums[m] === nums[m + 1]) {
						m++
					}
					m++
					while (nums[n] === nums[n - 1]) {
						n--
					}
					n--
				} else if (sum < target) {
					m++
				} else {
					n--
				}
			}
		}
	}
	return ret
}
// @lc code=end
fourSum([1, -2, -5, -4, -3, 3, 3, 5], -11)
//[-2, -1, 0, 0, 1, 2]
