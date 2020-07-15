/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
//brute force
var longestCommonPrefix = function (strs) {
	if (!strs || !Array.isArray(strs) || !strs.length) return ''
	const first = strs[0],
		firstLen = first.length
	for (let i = 0; i < firstLen; i++) {
		for (let j = 1; j < strs.length; j++) {
			let str = strs[j]
			//i === str.length剪枝
			if (str[i] !== first[i] || i === str.length) {
				return first.substring(0, i)
			}
		}
	}
	return first
}
// @lc code=end
