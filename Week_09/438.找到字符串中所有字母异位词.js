/*
 * @lc app=leetcode.cn id=438 lang=javascript
 *
 * [438] 找到字符串中所有字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
	let sLen = s.length,
		pLen = p.length

	if (sLen === 0 || pLen === 0 || pLen > sLen) return []

	let left = 0,
		right = 0,
		match = 0,
		needs = {},
		windows = {},
		ret = []

	for (let c of p) {
		needs[c] ? needs[c]++ : (needs[c] = 1)
	}

	let needLen = Object.keys(needs).length
	while (right < sLen) {
		let rightChar = s[right]

		if (needs[rightChar]) {
			windows[rightChar] ? windows[rightChar]++ : (windows[rightChar] = 1)
			if (windows[rightChar] === needs[rightChar]) match++
		}
		right++

		while (right - left >= pLen) {
			if (match === needLen) {
				ret.push(left)
			}
			let leftChar = s[left]
			if (needs[leftChar]) {
				if (windows[leftChar] === needs[leftChar]) match--
				windows[leftChar]--
			}
			left++
		}
	}
	return ret
}
// @lc code=end
findAnagrams('cbaebabacd', 'abc')
