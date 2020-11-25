- DP 使用场景
  - 求‘最’优解问题（最大值和最小值）
    - 乘积最大子数组
    - 最长回文子串
    - 最长上升子序列
    - 打家劫舍 3 道
    - 股票 6 道
  - 求可行性（True 或 False）
    - 零钱兑换问题
    - 字符串交错组成问题
  - 求方案总数
    - 硬币组合问题
    - 路径规划问题
  - 数据结构不可排序（Unsortable）
    - 最小的 k 个数 不能 DP
  - 算法不可使用交换（Non-swappable）
    - 8 皇后 不能 DP
    - 全排列 不能 DP

---

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
			//下层返回需要小于当前的min才更新min
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

#### [121. 买股票的最佳时机 E](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

```javascript
//brute force O(n^2) - O(1)
var maxProfit = function (prices) {
	let len = prices.length
	if (len < 2) return 0

	let ret = 0
	//loop every day, find the ret
	for (let i = 0; i < len - 1; i++) {
		for (let j = i + 1; j < len; j++) {
			let profit = prices[j] - prices[i]
			if (profit > ret) ret = profit
		}
	}
	return ret
}

//loop once
var maxProfit = function (prices) {
	let len = prices.length
	if (len < 2) return 0

	let ret = 0,
		minPrices = Infinity
	for (let i = 0; i < len; i++) {
		if (prices[i] < minPrices) minPrices = prices[i]
		else if (prices[i] - minPrices > ret) ret = prices[i] - minPrices
	}
	return ret
}
```

#### [122. 买卖股票的最佳时机 2E](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

```javascript
//Greedy
var maxProfit = function (prices) {
	let maxProfit = 0

	for (let i = 1; i < prices.length; i++) {
		if (prices[i] > prices[i - 1]) {
			maxProfit += prices[i] - prices[i - 1]
		}
	}
	return maxProfit
}

//DFS  Time Limit Exceeded
var maxProfit = function (prices) {
	let dfs = (prices, level) => {
		if (level >= prices.length) return 0
		let ret = 0

		//计算每天可能的利润
		for (let start = level; start < prices.length; start++) {
			let maxProfit = 0
			for (let i = start + 1; i < prices.length; i++) {
				if (prices[i] > prices[start]) {
					let profit = dfs(prices, i + 1) + prices[i] - prices[start]
					if (profit > maxProfit) maxProfit = profit
				}
			}
			//每一次的最大利润
			if (maxProfit > ret) ret = maxProfit
		}
		return ret
	}

	return dfs(prices, 0)
}

//DP O(N)-O(N)
var maxProfit = function (prices) {
	let len = prices.length
	if (len < 2) return 0

	//状态 dp[i][j]
	//第一维i表示索引为i的那一天（具有前缀性质，即考虑了之前天数的收益）能获得的最大利润
	//第二维j表示索引为i的那一天是持有股票，还是持有现金。这里0表示持有现金（cash），1表示持有股票（stock）

	let dp = Array.from({ length: len }, (v, i) => new Array(2))

	dp[0][0] = 0
	dp[0][1] = -prices[0]

	for (let i = 1; i < len; i++) {
		dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
		dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
	}

	return dp[len - 1][0]
}

//DP O(N)-O(N)
var maxProfit = function (prices) {
	let len = prices.length
	if (len < 2) return 0

	//分开定义
	let cash = new Array(len)
	let hold = new Array(len)

	cash[0] = 0
	hold[0] = -prices[0]
	for (let i = 1; i < len; i++) {
		cash[i] = Math.max(cash[i - 1], hold[i - 1] + prices[i])
		hold[i] = Math.max(hold[i - 1], cash[i - 1] - prices[i])
	}

	return cash[len - 1]
}

//DP O(N)-O(1)
var maxProfit = function (prices) {
	let len = prices.length
	if (len < 2) return 0

	//分开定义
	let cash = 0
	let hold = -prices[0]

	let preCash = cash,
		preHold = hold
	for (let i = 1; i < len; i++) {
		cash = Math.max(preCash, preHold + prices[i])
		hold = Math.max(preHold, preCash - prices[i])

		preCash = cash
		preHold = hold
	}

	return cash
}
```
