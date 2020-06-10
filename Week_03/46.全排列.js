/*
 * @Author: your name
 * @Date: 2020-06-07 12:46:29
 * @LastEditTime: 2020-06-07 23:02:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /algorithm009-class02/Users/jack/.leetcode/46.全排列.js
 */

/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
	if (nums.length === 0) return []

	let ret = [],
		path = []
	used = Array.from({ length: nums.length }, (item) => false)

	let dfs = (nums, depth, path, used, ret) => {
		if (depth === nums.length) {
			ret.push([...path])
			return
		}

		for (let i = 0; i < nums.length; i++) {
			if (used[i]) continue
			path.push(nums[i])
			used[i] = true
			dfs(nums, depth + 1, path, used, ret)

			//reverse
			path.pop(nums[i])
			used[i] = false
		}
	}

	dfs(nums, 0, path, used, ret)

	return ret
}
// @lc code=end
