## 思路

1. dp定义: 第i天，允许交易的最大次数，0 不持有， 1持有的最大利润

   > 求的最终答案是 `dp[n - 1][K][0]`，即最后一天，最多允许 `K` 次交易，不持有的状态的利润

   ![](./images/dp_11.png)

2. 递推公式

   ![](./images/dp_12.png)

   ```markdown
   对于dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
                 max( 今天选择 rest,        今天选择 sell      )
                 
   
   
   对于dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
                       max( 今天选择 rest,         今天选择 buy        )
   因为buy了,相当于开了一次交易,所以前一天从同交易上限次数的k-1次推导过来
   ```
   
3. 根据递推公式确定base case

   ![](./images/dp_13.png)

4. 确定状态的遍历顺序（多状态的遍历先后）

5. 举例推导 dp 数组(打印 dp 数组)

## [121. 买股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

```javascript {.line-numbers}
//brute force O(n^2) - O(1) 两两暴搜
var maxProfit = function (prices) {
	if (!prices) return 0
	const len = prices.length
	if (len < 2) return 0
	let maxProfit = 0
	for (let i = 0; i < len - 1; i++) {
		for (let j = i + 1; j < len; j++) {
      maxProfit = Math.max(maxProfit, prices[j] - prices[i])
		}
	}
	return maxProfit
}

//O(n) - O(1)
var maxProfit = function (prices) {
	if (!prices) return 0
	const len = prices.length
	if (len < 2) return 0
  //维护最小值和最大利润
	let maxProfit = 0,
		minPrice = Infinity
	for (let i = 0; i < len; i++) {
		minPrice = Math.min(minPrice, prices[i])
		maxProfit = Math.max(maxProfit, prices[i] - minPrice)
	}
	return maxProfit
}

//DP O(n) - O(n)
var maxProfit = function (prices) {
	if (!prices) return 0
	const len = prices.length
	if (len < 2) return 0
	let dp = Array.from({length: len}, () => new Array(2).fill(0))
  //0 不持有 1 持有
  dp[0][0] = 0
  dp[0][1] = -prices[0]
	for (let i = 1; i < len; i++) {
		 dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
     dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
	}
	return dp[len - 1][0]
}

//DP O(n) - O(1)
var maxProfit = function (prices) {
	if (!prices) return 0
	const len = prices.length
	if (len < 2) return 0
	let dp_i_0 = 0,
		dp_i_1 = -prices[0]
	for (let i = 1; i < len; i++) {
		dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
    dp_i_1 = Math.max(dp_i_1, -prices[i])
	}
	return dp_i_0
}
```

## [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

```javascript {.line-numbers}
//DFS TLE

//Greedy
//计算的过程并不是实际的交易过程，收益被分成了若干个阶段
var maxProfit = function (prices) {
	let profit = 0
	let len = prices.length
	if (len < 2) return 0
	for (let i = 1; i < len; i++) {
		// if (prices[i] > prices[i - 1]) {
		// 	profit += prices[i] - prices[i - 1]
		// }
		profit += Math.max(prices[i] - prices[i - 1], 0)
	}
	return profit
}

//DP O(n)-O(n)
var maxProfit = function (prices) {
	let len = prices.length
	if (len < 2) return 0
	const dp = Array.from({ length: len }, () => new Array(2))
	//base case
	dp[0][0] = 0
	dp[0][1] = -prices[0]
	for (let i = 1; i < len; i++) {
		dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
		dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
	}
	return dp[len - 1][0]
}

//DP 分开定义 O(n)-O(n)
var maxProfit = function (prices) {
	let len = prices.length
	if (len < 2) return 0
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

//DP O(n)-O(1)
var maxProfit = function (prices) {
	let len = prices.length
	if (len < 2) return 0
	let dp_i_0 = 0,
		dp_i_1 = -Infinity
	for (let i = 0; i < len; i++) {
    const temp = dp_i_0
		dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
		dp_i_1 = Math.max(dp_i_1, temp - prices[i])
	}
	return dp_i_0
}
```

## [123. 买卖股票的最佳时机 III](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/)

```javascript {.line-numbers}
var maxProfit = function (prices) {
	const len = prices.length
	if (len < 2) return 0
	let dp = Array.from({ length: len }, () =>
		new Array(2 + 1).fill(0).map(() => new Array(2).fill(0))
	)
	for (let i = 0; i < len; i++) {
    //k从大到小遍历更符合语义
    //从小到大也可
    //dp[i][k][..] 不依赖 dp[i][k - 1][..]，而是依赖 dp[i - 1][k - 1][..]
		for (let k = 2; k >= 1; k--) {
			if (i - 1 === -1) {
				// base case
				dp[i][k][0] = 0
				dp[i][k][1] = -prices[i]
				continue
			}
			dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
			dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])
		}
	}
	return dp[len - 1][2][0]
}

var maxProfit = function (prices) {
	let dp_i10 = 0,
		dp_i11 = -Infinity
	let dp_i20 = 0,
		dp_i21 = -Infinity
	for (let price of prices) {
		dp_i20 = Math.max(dp_i20, dp_i21 + price)
		dp_i21 = Math.max(dp_i21, dp_i10 - price)
		dp_i10 = Math.max(dp_i10, dp_i11 + price)
		dp_i11 = Math.max(dp_i11, -price)
	}
	return dp_i20
}
```

## [188. ==买卖股票的最佳时机== IV](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/)

```javascript {.line-numbers}
var maxProfit = function (k, prices) {
	const len = prices.length
	if (len < 2) return 0
	let dp = Array.from({ length: len }, () =>
		new Array(k + 1).fill(0).map(() => new Array(2).fill(0))
	)
  //base case
  for (let i = 0; i< len; i++) {
    dp[i][0][0] = 0
    dp[i][0][1] = -Infinity
  }
	for (let i = 0; i < len; i++) {
		for (let k1 = k; k1 >= 1; k1--) {
			if (i - 1 === -1) {
				// base case
				dp[i][k1][0] = 0
				dp[i][k1][1] = -prices[i]
				continue
			}
			dp[i][k1][0] = Math.max(dp[i - 1][k1][0], dp[i - 1][k1][1] + prices[i])
			dp[i][k1][1] = Math.max(dp[i - 1][k1][1], dp[i - 1][k1 - 1][0] - prices[i])
		}
	}
	return dp[len - 1][k][0]
}
```

## [309. 最佳买卖股票时机含冷冻期](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

```javascript {.line-numbers}
var maxProfit = function (prices) {
	const len = prices.length
  if (len < 2) return 0
	let dp = Array.from({ length: len }, () => new Array(2))
	dp[0][0] = 0
	dp[0][1] = -prices[0]
	dp[1][0] = Math.max(dp[0][0], dp[0][1] + prices[1])
	dp[1][1] = Math.max(dp[0][1], -prices[1])
	for (let i = 2; i < len; i++) {
		dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
		dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i])
	}
	return dp[len - 1][0]
}


var maxProfit = function (prices) {
	const len = prices.length
	if (len < 2) return 0
	let dp_i_0 = 0,
		dp_i_1 = -Infinity,
		dp_pre_0 = 0 // 代表 dp[i-2][0]
	for (let i = 0; i < len; i++) {
		const temp = dp_i_0
		dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
		dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i])
		dp_pre_0 = temp
	}
	return dp_i_0
}
```

## [714. 买卖股票的最佳时机含手续费](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

```javascript {.line-numbers}
var maxProfit = function (prices, fee) {
	const len = prices.length
  if (len < 2) return 0
	let dp = Array.from({ length: len }, () => new Array(2))
	dp[0][0] = 0
	dp[0][1] = -prices[0] - fee
	for (let i = 1; i < len; i++) {
		dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
		dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i] - fee)
	}
	return dp[len - 1][0]
}


var maxProfit = function (prices, fee) {
	const len = prices.length
	if (len < 2) return 0
	let dp_i_0 = 0,
		dp_i_1 = -Infinity
	for (let i = 0; i < len; i++) {
		const temp = dp_i_0
		dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
		dp_i_1 = Math.max(dp_i_1, temp - prices[i] - fee)
		dp_pre_0 = temp
	}
	return dp_i_0
}
```
