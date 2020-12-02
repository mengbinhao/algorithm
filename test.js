var longestPalindrome = function (s) {
	let ret = ''
	for (let i = 0; i < s.length; i++) {
		// 以 s[i] 为中心的最长回文子串
		const s1 = palindrome(s, i, i)
		// 以 s[i] 和 s[i+1] 为中心的最长回文子串
		const s2 = palindrome(s, i, i + 1)
		// ret = longest(ret, s1, s2)
		ret = ret.length > s1.length ? ret : s1
		ret = ret.length > s2.length ? ret : s2
	}
	return ret

	function palindrome(s, l, r) {
		while (l >= 0 && r < s.length && s[l] === s[r]) {
			l--
			r++
		}
		return s.substring(l + 1, r)
	}
}

console.log(longestPalindrome('babad'))
