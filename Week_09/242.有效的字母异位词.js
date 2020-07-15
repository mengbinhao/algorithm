/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
	if (s.length !== t.length) return false

	let hash = {}
	for (let c of s) {
		hash[c] ? hash[c]++ : (hash[c] = 1)
	}

	for (let c of t) {
		if (hash[c]) {
			hash[c]--
		} else {
			return false
		}
	}

	return true
}
// @lc code=end
