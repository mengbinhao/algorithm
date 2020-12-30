/*
 * @Author: your name
 * @Date: 2020-06-07 12:46:29
 * @LastEditTime: 2020-12-30 10:38:23
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
	const len = nums.length,
		ans = []
	if (len === 0) return ans
	//store those number which have been visited
	const visited = Array.from({ length: len }, () => false)

	const dfs = (nums, depth, curState) => {
		if (depth === nums.length) {
			//因数组传递引用，copy一份
			ans.push([...curState])
			return
		}

		for (let i = 0, len = nums.length; i < len; i++) {
			if (visited[i]) continue
			visited[i] = true
			dfs(nums, depth + 1, [...curState, nums[i]])
			//reverse
			visited[i] = false
		}
	}

	dfs(nums, 0, [])
	return ans
}
// @lc code=end
