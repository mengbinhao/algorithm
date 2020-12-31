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

### [5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)

```javascript {.line-numbers}
//brute force + reverse()
//O(N^3) - O(1)
var longestPalindrome = function (s) {
	if (!s) return ''
	const len = s.length
	if (len < 2) return s

	let maxLen = 1,
		begin = 0

	const isPalindrome = (s, l, r) => {
		while (l < r) {
			if (s[l] !== s[r]) return false
			l++
			r--
		}
		return true
	}

	for (let i = 0; i < len - 1; i++) {
		for (let j = i + 1; j < len; j++) {
			if (j - i + 1 > maxLen && isPalindrome(s, i, j)) {
				maxLen = j - i + 1
				begin = i
			}
		}
	}
	return s.substring(begin, begin + maxLen)
}

//DP  O(n^2) - O(n^2)
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
	//只需要填dp table上班边
	//对角线等于true的case未用到
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

//中心扩展法 O(n^2) - O(1)
var longestPalindrome = function (s) {
	if (!s) return ''
	const len = s.length
	if (len < 2) return s
	let maxLen = 1,
		begin = 0
	for (let i = 0; i < s.length; i++) {
		const oddLen = palindrome(s, i, i + 1)
		const evenLen = palindrome(s, i, i)
		const curMaxLen = Math.max(oddLen, evenLen)
		if (curMaxLen > maxLen) {
			maxLen = curMaxLen
			//奇/偶两种情况向下取整
			begin = i - Math.floor((maxLen - 1) / 2)
		}
	}
	return s.substring(begin, begin + maxLen)

	function palindrome(s, l, r) {
		// 向两边扩散
		while (l >= 0 && r < s.length && s[l] === s[r]) {
			l--
			r++
		}
		return r - l - 1
	}
}
```

### [53. 最大子序和](https://leetcode-cn.com/problems/maximum-subarray/)

```javascript {.line-numbers}
//brute force 两层循环
var maxSubArray = function (nums) {
	let max = -Infinity,
	const len = nums.length
	for (let i = 0; i < len; i++) {
		let sum = 0
		for (let j = i; j < len; j++) {
			sum += nums[j]
			if (sum > max) max = sum
		}
	}
	return max
}

//dp[i]表示nums中以nums[i]结尾的最大子序和
//dp[i] = max(dp[i - 1] + nums[i], nums[i])
//O(n) - O(1)
var maxSubArray = function (nums) {
	let pre = 0,
		maxAns = nums[0]
	nums.forEach((x) => {
		//若前面sum小于0,舍弃
		pre = Math.max(pre + x, x)
		maxAns = Math.max(maxAns, pre)
	})
	return maxAns
}
```

### [62. 不同路径](https://leetcode-cn.com/problems/unique-paths/)

```javascript {.line-numbers}
var uniquePaths = function (m, n) {
	const dp = Array.from({ length: m }, () => new Array(n).fill(0))
	//base case第一列
	for (let i = 0; i < m; i++) {
		dp[i][0] = 1
	}
	//base case第一行
	for (let j = 0; j < n; j++) {
		dp[0][j] = 1
	}
	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
		}
	}
	return dp[m - 1][n - 1]
}

var uniquePaths = function (m, n) {
	//纵向一列
	const dp = new Array(n).fill(1)

	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			dp[j] += dp[j - 1]
		}
	}
	return dp[j - 1]
}
```

### [64. 最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/)

```javascript {.line-numbers}
//dp[i][j]表示从(i,j)走到(m-1, n-1)点的最小路径和
var minPathSum = function (grid) {
	if (!grid) return 0
	const rows = grid.length,
		cols = grid[0].length
	if (rows === 0 || cols === 0) return 0

	const dp = Array.from({ length: rows }, () => new Array(cols).fill(Infinity))

	//base case
	dp[0][0] = grid[0][0]

	//第一列
	for (let i = 1; i < rows; i++) {
		dp[i][0] = dp[i - 1][0] + grid[i][0]
	}

	//第一行
	for (let j = 1; j < cols; j++) {
		dp[0][j] = dp[0][j - 1] + grid[0][j]
	}

	for (let i = 1; i < rows; i++) {
		for (let j = 1; j < cols; j++) {
			dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
		}
	}
	return dp[rows - 1][cols - 1]
}

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
```

### [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

```javascript {.line-numbers}
//recursion O(2^n)
//memo recursion

//O(n) - O(n)
var climbStairs = function (n) {
	//dp[i]表示爬到第i级台阶的方案数
	const dp = new Array(n + 1)
	dp[1] = 1
	dp[2] = 2

	for (let i = 3; i <= n; i++) {
		dp[i] = dp[i - 1] + dp[i - 2]
	}
	return dp[n]
}

//O(n) - O(1)
var climbStairs = function (n) {
	if (n <= 2) return n

	let first = 1,
		second = 2,
		third

	for (let i = 3; i <= n; i++) {
		third = first + second
		first = second
		second = third
	}
	return third
}
```

### [118. 杨辉三角](https://leetcode-cn.com/problems/pascals-triangle/)

```javascript {.line-numbers}
var generate = function (numRows) {
	const triangle = []
	for (let i = 0; i < numRows; i++) {
		const curRow = []
		curRow[0] = 1
		curRow[i] = 1
		if (i > 1) {
			for (let j = 1; j < i; j++) {
				curRow[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
			}
		}
		triangle.push(curRow)
	}
	return triangle
}
```

### [121. 买股票的最佳时机 E](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

```javascript {.line-numbers}
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

### [122. 买卖股票的最佳时机 2E](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

```javascript {.line-numbers}
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

//DP O(n)-O(n)
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

//DP O(n)-O(n)
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

//DP O(n)-O(1)
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

### [300. 最长递增子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

```javascript {.line-numbers}
var lengthOfLIS = function (nums) {
	const len = nums.length
	if (len === 0) return 0
	//定义dp[i]为考虑前i个元素,以第i个数字结尾的最长上升子序列的长度,注意nums[i]必须被选取
	const dp = new Array(len).fill(1)
	let ret = 1

	for (let i = 0; i < len; i++) {
		for (let j = 0; j < i; j++) {
			if (nums[i] > nums[j]) {
				dp[i] = Math.max(dp[i], dp[j] + 1)
			}
		}
		ret = Math.max(ret, dp[i])
	}
	return ret
}

//dp + Dichotomy
var lengthOfLIS = function (nums) {
	const tails = new Array(nums.length)
	let res = 0
	for (let num of nums) {
		let i = 0,
			j = res
		//Dichotomy
		while (i < j) {
			const m = Math.floor((i + j) / 2)
			if (tails[m] < num) i = m + 1
			else j = m
		}
		tails[i] = num
		if (res === j) res++
	}
	return res
}
```

### [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)

```javascript {.line-numbers}
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

### [746. 使用最小花费爬楼梯](https://leetcode-cn.com/problems/min-cost-climbing-stairs/)

```javascript {.line-numbers}
var minCostClimbingStairs = function (cost) {
	const len = cost.length
	const dp = new Array(len + 1)
	//由于可以选择下标0或1作为初始阶梯，因此有dp[0]=dp[1]=0
	dp[0] = dp[1] = 0
	for (let i = 2; i <= len; i++) {
		dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
	}
	return dp[len]
}

//dp[i] 表示达到下标i的最小花费
//dp[i]=min(dp[i−1]+cost[i−1],dp[i−2]+cost[i−2])
var minCostClimbingStairs = function (cost) {
	const len = cost.length
	let prev = (cur = 0),
		next
	for (let i = 2; i <= len; i++) {
		next = Math.min(cur + cost[i - 1], prev + cost[i - 2])
		prev = cur
		cur = next
	}
	return cur
}
```
