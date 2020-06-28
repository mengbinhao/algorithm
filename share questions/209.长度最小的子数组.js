/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
//two pointer
var minSubArrayLen = function (s, nums) {
	if (nums.length === 0) return 0
	let len = nums.length,
		start = 0,
		end = 0,
		sum = 0,
		ret = Number.MAX_SAFE_INTEGER

	while (end < len) {
		sum += nums[end]
		while (sum >= s) {
			ret = Math.min(ret, end - start + 1)
			sum -= nums[start]
			start++
		}
		end++
	}
	return ret === Number.MAX_SAFE_INTEGER ? 0 : ret
}
// @lc code=end
minSubArrayLen(7, [2, 3, 1, 2, 4, 3])

//brute force
// var minSubArrayLen = function (s, nums) {
// 	if (nums.length === 0) return 0
// 	let len = nums.length,
// 		ret = Infinity

// 	for (let i = 0; i < len; i++) {
// 		let sum = 0
// 		for (let j = i; j < len; j++) {
// 			sum += nums[j]
// 			if (sum >= s) {
// 				ret = Math.min(ret, j - i + 1)
// 				break
// 			}
// 		}
// 	}

// 	return ret === Infinity ? 0 : ret
// }
