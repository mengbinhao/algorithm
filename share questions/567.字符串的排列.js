/*
 * @lc app=leetcode.cn id=567 lang=javascript
 *
 * [567] 字符串的排列
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
	let s1Len = s1.length,
		s2Len = s2.length
	if (s1Len === 0 || s1Len === 0 || s1Len > s2Len) return false

	let left = 0,
		right = 0,
		windows = {},
		needs = {},
		match = 0

	for (let c of s1) {
		needs[c] ? needs[c]++ : (needs[c] = 1)
	}
	let needsLen = Object.keys(needs).length
	while (right < s2Len) {
		let rightChar = s2[right]
		if (needs[rightChar]) {
			windows[rightChar] ? windows[rightChar]++ : (windows[rightChar] = 1)
			if (windows[rightChar] === needs[rightChar]) match++
		}
		right++
		while (match === needsLen) {
			if (right - left === s1Len) {
				return true
			}
			let leftChar = s2[left]
			if (needs[leftChar]) {
				if (windows[leftChar] === needs[leftChar]) match--
				windows[leftChar]--
			}
			left++
		}
	}
	return false
}
// @lc code=end
