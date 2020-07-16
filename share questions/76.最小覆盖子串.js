/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
	let sLen = s.length,
		tLen = t.length

	if (sLen === 0 || tLen === 0 || sLen < tLen) return ''

	let winFreq = {},
		tFreq = {},
		begin = 0,
		left = 0,
		right = 0,
		minLen = Infinity,
		//滑动窗口包含多少T中的字符，对应字符频数超过不重复计算
		distance = 0

	for (let c of t) {
		tFreq[c] ? tFreq[c]++ : (tFreq[c] = 1)
	}

	while (right < sLen) {
		let rightChar = s[right]
		if (tFreq[rightChar] === undefined) {
			right++
			continue
		}

		if (
			winFreq[rightChar] === undefined ||
			winFreq[rightChar] < tFreq[rightChar]
		) {
			distance++
		}

		winFreq[rightChar] === undefined
			? (winFreq[rightChar] = 1)
			: winFreq[rightChar]++
		right++

		//包括了T中的所有字符频数
		while (distance === tLen) {
			if (right - left < minLen) {
				minLen = right - left
				begin = left
			}
			let leftChar = s[left]
			if (tFreq[leftChar] === undefined) {
				left++
				continue
			}

			if (winFreq[leftChar] === tFreq[leftChar]) {
				distance--
			}

			winFreq[leftChar]--
			left++
		}
	}
	console.log(s.substring(begin, begin + minLen))
	return minLen === Infinity ? '' : s.substring(begin, begin + minLen)
}
// @lc code=end
