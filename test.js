function test() {
	const weight = [1, 3, 4],
		value = [15, 20, 30],
		bagWeight = 4

	// 初始化
	const dp = new Array(bagWeight + 1).fill(0)
	for (let j = bagWeight; j >= weight[i]; j--) {
		for (let i = 0; i < weight.length; i++) {
			dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i])
		}
	}
	debugger
}

test()
