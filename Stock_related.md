#### [121. 买股票的最佳时机E](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

```javascript
//brute force O(n^2) - O(1)
var maxProfit = function(prices) {
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
var maxProfit = function(prices) {
  let len = prices.length
  if (len < 2) return 0

  let ret = 0, minPrices = Infinity
  for (let i = 0; i < len; i++) {
    if (prices[i] < minPrices) minPrices = prices[i]
    else if (prices[i] - minPrices > ret) ret = prices[i] - minPrices
  }
  return ret
}
```



#### [122. 买卖股票的最佳时机2E](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

```javascript
//Greedy
var maxProfit = function (prices) {
	let maxProfit = 0

	for (let i = 1; i < prices.length; i++) {
		if (prices[i] > prices[i - 1]) {
			maxProfit += prices[i] - prices[i - 1]
		}E
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