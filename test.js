var minPathSum = function (grid) {
	if (!grid) return 0
	const rows = grid.length,
		cols = grid[0].length

	if (!rows || !cols) return 0

	//滚动列
	const dp = new Array(cols).fill(Infinity)

	dp[0] = grid[0][0]

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (i === 0 && j === 0) continue
			else if (i === 0) {
				dp[j] = dp[j - 1] + grid[i][j]
			} else if (j === 0) {
				dp[j] += grid[i][j]
			} else {
				dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j]
			}
		}
	}
	return dp[cols - 1]
}

minPathSum([
	[1, 3, 1],
	[1, 5, 1],
	[4, 2, 1],
])
