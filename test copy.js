var coinChange = function (coins, amount) {
	if (coins.length === 0) -1
	if (amount < 1) return 0
	const cache = {}
	const dfs = (coins, remain) => {
		if (remain < 0) return -1
		if (remain === 0) return 0
		if (cache[remain]) return cache[remain]

		let min = Infinity
		for (let i = 0, len = coins.length; i < len; i++) {
			const ret = dfs(coins, remain - coins[i])
			//加1是为了加上得到ret结果的那个步骤中兑换的那一个硬币
			//下层返回需要有意义并且是下层需要最少的硬币个数
			if (ret >= 0 && ret < min) min = ret + 1
		}
		return (cache[remain] = min === Infinity ? -1 : min)
	}
	return dfs(coins, amount)
}

coinChange([2, 5, 10, 1], 27)
