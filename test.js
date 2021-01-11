var longestCommonSubsequence = function (text1, text2) {
	const m = text1.length
	const n = text2.length

	// 初始化二维 dp 数组
	const dp = new Array(m)
	for (let i = 0; i < m; i++) {
		dp[i] = new Array(n).fill(0)
	}

	// 从前往后遍历设置 dp[i][j]，根据 dp[0][0..n] 和 dp[0..m][0] 都为 0，推导出 dp[m-1][n-1]
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			// 第一种情况，两者相等，则 dp(m,n) = 1 + dp(m - 1,n - 1)
			if (text1[i] === text2[j]) {
				if (i - 1 < 0 || j - 1 < 0) {
					// 越界处理
					dp[i][j] = 1 + 0
				} else {
					dp[i][j] = 1 + dp[i - 1][j - 1]
				}
			} else {
				// 第二种情况，两者不相等，则 dp(m,n) = max(dp(m - 1,n), dp(m,n - 1))
				if (i - 1 < 0 || j - 1 < 0) {
					// 越界处理
					if (i - 1 < 0 && j - 1 < 0) {
						dp[i][j] = 0
					} else if (i - 1 < 0) {
						dp[i][j] = dp[i][j - 1]
					} else if (j - 1 < 0) {
						dp[i][j] = dp[i - 1][j]
					}
				} else {
					dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
				}
			}
		}
	}

	// dp[m - 1][n - 1] 即为结果
	return dp[m - 1][n - 1]
}

var longestCommonSubsequence2 = function (text1, text2) {
	const n = text1.length
	const m = text2.length
	//直接第一行和第一列赋值base case为0,第一行第一列代表的是空,下面也不需要判断越界
	const dp = Array.from(new Array(n + 1), () => new Array(m + 1).fill(0))

	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= m; j++) {
			if (text1[i - 1] === text2[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1] + 1
			} else {
				dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
			}
		}
	}
	return dp[n][m]
}
longestCommonSubsequence2('abcde', 'ace')
