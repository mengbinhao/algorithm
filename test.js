var uniquePaths = function (m, n) {
	let dp = Array.from({ length: n }, (item, rowIdx) => {
		return Array.from({ length: m }, (item, colIndex) => {
			if (rowIdx === 0 || colIndex === 0) {
				return 1
			}
		})
	})

	for (let i = 1; i < n; i++) {
		for (let j = 1; j < m; j++) {
			dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
		}
	}

	return dp[n - 1][m - 1]
}

var uniquePaths2 = function (m, n) {
	//row
	let cur = Array.from({ length: n }, () => 1)

	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			cur[j] += cur[j - 1]
		}
	}

	return cur[n - 1]
}

uniquePaths2(3, 2)
