var longestValidParentheses = function (s) {
	const len = s.length
	if (len < 2) return 0
	//最长子串只能从0开始
	let l = (r = 0),
		ret = 0
	for (let i = 0; i < len; i++) {
		if (s[i] === '(') {
			l++
		} else {
			r++
		}
		if (l === r) {
			ret = Math.max(ret, 2 * l)
		}
		if (r > l) {
			l = r = 0
		}
	}
	l = r = 0
	for (let i = len - 1; i >= 0; i--) {
		if (s[i] === '(') {
			l++
		} else {
			r++
		}
		if (l === r) {
			ret = Math.max(ret, 2 * l)
		}
		if (l > r) {
			l = r = 0
		}
	}
	return ret
}

longestValidParentheses(')()())')
