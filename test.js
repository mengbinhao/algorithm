var firstUniqChar = function (s) {
	const hash = {}
	for (let c of s) {
		!hash[c] ? (hash[c] = 1) : hash[c]++
	}

	for (let i = 0, len = s.length; i < len; i++) {
		if (hash[s[i]] === 1) return s[i]
	}
	return -1
}

console.log(firstUniqChar('leetcode'))
