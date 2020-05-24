/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
	//if (nums.length < 3) return []
	let ret = []
	nums.sort((a, b) => a - b)
	//至少留k那一位和2个pointer
	for (let k = 0; k < nums.length - 2; k++) {
		//nums is sorted,so it's impossible to have a sum = 0
		if (nums[k] > 0) break
		//skip duplicated nums[k]
		if (k > 0 && nums[k] === nums[k - 1]) continue
		let left = k + 1,
			right = nums.length - 1
		while (left < right) {
			let sum = nums[k] + nums[left] + nums[right]
			if (sum === 0) {
				ret.push([nums[k], nums[left], nums[right]])
				//skip duplicated nums[left]
				while (nums[left] === nums[left + 1]) {
					left++
				}
				left++
				//skip duplicated nums[right]
				while (nums[right] === nums[right - 1]) {
					right--
				}
				right--
			} else if (sum > 0) {
				right--
			} else {
				left++
			}
		}
	}
	return ret
}
// @lc code=end
