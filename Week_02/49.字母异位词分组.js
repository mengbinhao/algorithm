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
	if (!Array.isArray(strs) || strs.length === 0) {
		throw new TypeError('invalid parameter')
	}
	let map = {}
	for (let item of strs) {
		let key = item.split('').sort().join('')
		if (!map[key]) {
			map[key] = []
		}
		map[key].push(item)
	}
	return Object.values(map)
}
// @lc code=end
console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))
