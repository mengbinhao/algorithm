### [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)

```javascript
//greedy + dfs
var coinChange = function (coins, amount) {
	if (coins.length === 0) return -1
	if (amount < 1) return 0

	let ans = amount + 1

	let dfs = (coins, remain, coinsIdx, count) => {
		if (remain === 0) {
			ans = Math.min(count, ans)
			return
		}

		if (coinsIdx >= coins.length) return
		//直接拿最大币值的最大个数找解
		//coins递减k + count < ans剪纸非最小count解
		for (
			let k = Math.floor(remain / coins[coinsIdx]);
			k >= 0 && k + count < ans;
			k--
		) {
			dfs(coins, remain - k * coins[coinsIdx], coinsIdx + 1, k + count)
		}
	}

	//greedy前提
	coins.sort((a, b) => b - a)

	dfs(coins, amount, 0, 0)

	return ans === amount + 1 ? -1 : ans
}

//dfs time exceeded
//O(S^n) - O(n)
var coinChange = function (coins, amount) {
	if (coins.length === 0) return -1
	if (amount < 1) return 0

	let ans = amount + 1

	let dfs = (coins, remain, count) => {
		if (remain < 0) return

		if (remain === 0) {
			//穷举更新最小解
			ans = Math.min(count, ans)
			return
		}
		//穷举
		for (let i = 0; i < coins.length; i++) {
			dfs(coins, remain - coins[i], count + 1)
		}
	}

	dfs(coins, amount, 0)

	return ans === amount + 1 ? -1 : ans
}

//dfs + Memoization
//O(Sn) + O(S)
var coinChange = function (coins, amount) {
	if (coins.length === 0) return -1
	if (amount < 1) return 0

	let cache = {}

	return dfs(coins, amount)

	//返回cache[remain]
	function dfs(coins, remain) {
		if (remain < 0) return -1

		if (remain === 0) return 0

		if (cache[remain]) return cache[remain]

		let min = Infinity
		for (let i = 0; i < coins.length; i++) {
			let ret = dfs(coins, remain - coins[i])
			//加1是为了加上得到res结果的那个步骤中兑换的那一个硬币
			//第一次返回跟当前的min=Infinity需要比较得出有意义的值
			if (ret >= 0 && ret < min) min = ret + 1
		}
		return (cache[remain] = min === Infinity ? -1 : min)
	}
}

//dp
//O(Sn) + O(S)
var coinChange = function (coins, amount) {
	if (coins.length === 0) return -1
	if (amount < 1) return 0

	const max = amount + 1,
		//dp[i]:组成金额i所需最少的硬币数量
		//初始化成不可能的数
		dp = new Array(max).fill(max)
	//当i=0时无法用硬币组成
	dp[0] = 0
	for (let i = 1; i <= amount; i++) {
		for (let j = 0; j < coins.length; j++) {
			//忽略dp[i]为负数
			if (i - coins[j] >= 0) {
				dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
			}
		}
	}
	return dp[amount] === max ? -1 : dp[amount]
}
```
