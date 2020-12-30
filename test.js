var longestPalindrome = function (s) {
	if (!s) return ''
	const len = s.length
	if (len < 2) return s

	//dp[i..j] 表示从i到j的子串是否是回文
	const dp = Array.from({ length: len }, () => new Array(len))

	let begin = 0,
		maxLen = 1

	//在状态转移方程中，是从长度较短的字符串向长度较长的字符串进行转移的，因此要注意动态规划的循环顺序
	//先升序填列，再升序填行
	for (let j = 1; j < len; j++) {
		for (let i = 0; i < j; i++) {
			if (s[i] !== s[j]) {
				dp[i][j] = false
			} else {
				//j - i + 1 < 4，即当子串s[i..j]的长度等于2 or 3的时候，只需要判断一下头尾两个字符是否相等就可以直接下结论
				if (j - i < 3) dp[i][j] = true
				else dp[i][j] = dp[i + 1][j - 1]
			}

			//每次update result
			if (dp[i][j] && j - i + 1 > maxLen) {
				maxLen = j - i + 1
				begin = i
			}
		}
	}
	return s.substring(begin, begin + maxLen)
}

longestPalindrome('babad')
