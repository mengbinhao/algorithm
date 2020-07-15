/*
 * @lc app=leetcode.cn id=49 lang=javascript
 *
 * [49] 字母异位词分组
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
	let hash = {}

	for (let str of strs) {
		let tmp = str.split('').sort().join()
		if (!hash[tmp]) hash[tmp] = []
		hash[tmp].push(str)
	}
	return Object.values(hash)
}
// @lc code=end
