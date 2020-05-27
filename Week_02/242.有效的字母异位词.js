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
	if (typeof s !== 'string' || typeof t !== 'string') return false
	if (s.length !== t.length) return false
	let map = {}
	for (let c of s) {
		map[c] ? map[c]++ : (map[c] = 1)
	}

	for (let c of t) {
		if (map[c]) {
			map[c]--
		} else {
			return false
		}
	}

	return true
}
// @lc code=end
