### [20.==有效括号 E==](https://leetcode-cn.com/problems/valid-parentheses/)

```javascript {.line-numbers}
//brute force 一直替换

//O(n) - O(n)
var isValid = function (s) {
	if (s.length % 2 === 1) return false
	const stack = [],
		hash = {
			'(': ')',
			'[': ']',
			'{': '}',
		}
	for (let c of s) {
		if (hash[c]) {
			stack.push(hash[c])
		} else {
			if (c !== stack.pop()) return false
		}
	}
	return stack.length === 0
}
```

### [32.最长有效括号](https://leetcode-cn.com/problems/longest-valid-parentheses/)

```javascript {.line-numbers}
//brute force O(n^3)
var longestValidParentheses = function (s) {
	const len = s.length
	if (len < 2) return 0
	//获取字符串截取截止坐标
	const end = len % 2 === 0 ? len : len - 1
	//结束位置,从最长开始偶数递减
	for (let i = end; i >= 0; i -= 2) {
		//起点位置
		for (let j = 0; j < len - i + 1; j++) {
			//找到即是最长的
			if (isValid(s.substring(j, j + i))) return i
		}
	}

	function isValid(str) {
		let balance = 0
		for (let c of str) {
			if (c === '(') {
				balance++
			} else {
				balance--
				if (balance < 0) return false
			}
		}
		return balance === 0
	}
}

//stack O(n) - O(n)
//始终保持栈底元素为当前已经遍历过的元素中“最后一个没有被匹配的右括号的下标”
//对于遇到的每个(，将它下标放入栈中
//对于遇到的每个)，先弹出栈顶元素与之匹配的左括号
//如果栈为空，说明当前的右括号为没有被匹配的左括号，将其下标放入栈中来更新“最后一个没有被匹配的右括号的下标”
//如果栈不为空，当前右括号的下标减去栈顶元素即为“以该右括号为结尾的最长有效括号的长度”
var longestValidParentheses = function (s) {
	const len = s.length
	if (len < 2) return 0
	const stack = [-1] //表示最长子串只能从0开始
	let maxLen = 0
	for (let i = 0; i < len; i++) {
		if (s[i] === '(') {
			stack.push(i)
		} else {
			//先弹出匹配的左括号
			stack.pop()
			//放入最后一个没有被匹配的右括号的下标
			if (stack.length === 0) {
				stack.push(i)
			} else {
				maxLen = Math.max(maxLen, i - stack[stack.length - 1])
			}
		}
	}
	return maxLen
}

//正向逆向结合 O(n) - O(1)
var longestValidParentheses = function (s) {
	const len = s.length
	if (len < 2) return 0
	let l = 0,
		r = 0,
		maxLen = 0
	for (let i = 0; i < len; i++) {
		s[i] === '(' ? l++ : r++
		if (l === r) maxLen = Math.max(maxLen, l * 2)
		else if (r > l) l = r = 0
	}
	l = r = 0
	for (let i = len - 1; i >= 0; i--) {
		s[i] === ')' ? r++ : l++
		if (l === r) maxLen = Math.max(maxLen, l * 2)
		else if (l > r) l = r = 0
	}
	return maxLen
}

//DP O(n) - O(n)
var longestValidParentheses = function (s) {
	const len = s.length
	if (len < 2) return 0
	let ret = 0
	//dp[i] 表示以下标i字符结尾的最长有效括号的长度
	//初始化成0也符合base case，比如当前字符为左括号肯定是0
	const dp = new Array(len).fill(0)
	//dp[0] = 0
	for (let i = 1; i < len; i++) {
     //符合定义
		if (s[i] === ')') {
			if (s[i - 1] === '(') {
				//s[i] = ')' 且 s[i - 1] = '('，也就是字符串       形如 '……()'
				dp[i] = (i -2 >= 0 ? dp[i - 2] : 0) + 2
				//第一个条件表示前面还有括号(由于js特性可省略),但为语义清晰需加上
				//第二个条件前面的括号跟当前循环的)可以匹配，即+2
			} else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
				//s[i] = ')' 且 s[i - 1] = ')'，也就是字符串形如 '……))'
				//内部的有效长度 + 前面的有效长度 + 2
				dp[i] = dp[i - 1] + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0) + 2
			}
			ret = Math.max(ret, dp[i])
		}
	}
	return ret
}
```

### [42.==接雨水 H==](https://leetcode-cn.com/problems/trapping-rain-water/)

```javascript
//brute force O(n^2) - O(1)
var trap = function (height) {
	const len = height.length
	if (len === 0) return 0
	let ret = 0
	//两边无法接雨水
	for (let i = 1; i < len - 1; i++) {
		let lMax = -Infinity,
			rMax = -Infinity
		for (let j = i; j >= 0; j--) lMax = Math.max(lMax, height[j])
		for (let j = i; j < len; j++) rMax = Math.max(rMax, height[j])
		ret += Math.min(lMax, rMax) - height[i]
	}
	return ret
}

//单调递减栈 O(n) - O(n)
//积水只能在低洼处形成，当后面的柱子高度比前面的低时是无法接雨水的，所以使用单调递减栈存储可能储水的柱子，当找到一根比前面高的柱子时就可以计算出能接到的雨水
var trap = function (height) {
	const len = height.length
	if (len === 0) return 0
	const stack = []
	let i = 0,
		ret = 0
	while (i < len) {
		//当前柱子比栈顶的柱子高
		while (stack.length && height[i] > height[stack[stack.length - 1]]) {
			const idx = stack.pop()
			//左边没有柱子或更高的柱子了
			if (stack.length === 0) break
			//计算右边与当前栈顶左边界的距离,即弹出上面那个val后的栈顶
			const distance = i - stack[stack.length - 1] - 1
			const boundedHeight =
				Math.min(height[i], height[stack[stack.length - 1]]) - height[idx]
			ret += distance * boundedHeight
		}
		stack.push(i++)
	}
	return ret
}

// two pointer O(n) - O(1)
// best version
var trap = function (height) {
	const len = height.length
	if (len === 0) return 0
	let l = 0,
		r = len - 1,
		ret = 0,
		lMax = -Infinity,
		rMax = -Infinity
	while (l < r) {
		//会传递
		lMax = Math.max(lMax, height[l])
		rMax = Math.max(rMax, height[r])
		if (lMax < rMax) {
			ret += lMax - height[l++]
		} else {
			ret += rMax - height[r--]
		}
	}
	return ret
}

//DP O(n) - O(n)
var trap = function (height) {
	const len = height.length
	if (len === 0) return 0
	let ret = 0,
		//提前存储每个height[i]对应的左右最大值
		leftMax = [],
		rightMax = []
	leftMax[0] = height[0]
	for (let i = 1; i < len; i++) {
		//leftMax会传递
		leftMax[i] = Math.max(height[i], leftMax[i - 1])
	}
	rightMax[len - 1] = height[len - 1]
	for (let i = len - 2; i >= 0; i--) {
		rightMax[i] = Math.max(height[i], rightMax[i + 1])
	}
	//两边无法接雨水
	for (let i = 1; i < len - 1; i++) {
		ret += Math.min(leftMax[i], rightMax[i]) - height[i]
	}
	return ret
}
```

### [71.简化路径](https://leetcode.cn/problems/simplify-path/)

```javascript {.line-numbers}
var simplifyPath = function (path) {
	const names = path.split('/')
	const stack = []
	for (let name of names) {
		if (name === '..') {
			if (stack.length) stack.pop()
		} else if (name.length && name !== '.') {
			stack.push(name)
		}
	}
	return '/' + stack.join('/')
}
```

### [84.==柱状图中最大的矩形 H==](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)

```javascript {.line-numbers}
//brute force O(n^2)
//固定宽 两重循环

//固定高 一重循环，向两边扫求最长底边
var largestRectangleArea = function (heights) {
	const len = heights.length
	if (len === 0) return 0
	if (len === 1) return heights[0]
	let ret = 0
	for (let i = 0; i < len; i++) {
		const height = heights[i]
		let l = i,
			r = i
		while (l - 1 >= 0 && heights[l - 1] >= height) l--
		while (r + 1 < len && heights[r + 1] >= height) r++
		ret = Math.max(ret, (r - l + 1) * height)
	}
	return ret
}

//stack  O(n) - O(n)
//单调递增栈,存的下标
var largestRectangleArea = function (heights) {
	const len = heights.length
	if (len === 0) return 0
	if (len === 1) return heights[0]
	//每根柱子即每个i对应的左右端点坐标
	const left = new Array(len),
		right = new Array(len),
		stack = []
	for (let i = 0; i < len; i++) {
		while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i])
			stack.pop()
		left[i] = stack.length === 0 ? -1 : stack[stack.length - 1]
		stack.push(i)
	}
	stack.length = 0
	for (let i = len - 1; i >= 0; i--) {
		while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i])
			stack.pop()
		right[i] = stack.length === 0 ? len : stack[stack.length - 1]
		stack.push(i)
	}
	let ret = 0
	for (let i = 0; i < len; i++)
		ret = Math.max(ret, (right[i] - left[i] - 1) * heights[i])
	return ret
}

//stack  O(n) - O(1)
//单调递增栈,存的下标
//求出每一根柱子的左侧且最近的小于其高度的柱子
//使用哨兵技巧(排除非空判断)
var largestRectangleArea = function (heights) {
	let len = heights.length
	if (len === 0) return 0
	if (len === 1) return heights[0]
	let ret = 0
	const tmp = new Array(len + 2).fill(0)
	for (let i = 0; i < len; i++) {
		tmp[i + 1] = heights[i]
	}
	len += 2
	heights = tmp
	const stack = [0]
	for (let i = 1; i < len; i++) {
		while (heights[stack[stack.length - 1]] > heights[i]) {
			const height = heights[stack.pop()]
			const width = i - stack[stack.length - 1] - 1
			ret = Math.max(ret, height * width)
		}
		stack.push(i)
	}
	return ret
}
```

### [150.==逆波兰表达式求值==](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)

```javascript {.line-numbers}
var evalRPN = function (tokens) {
	const stack = []
	const isOperator = (token) => ['+', '-', '*', '/'].includes(token)
	let ret
	for (let token of tokens) {
		if (!isOperator(token)) {
			stack.push(token)
		} else {
			const r = +stack.pop()
			const l = +stack.pop()
			if (token === '+') {
				ret = l + r
			} else if (token === '-') {
				ret = l - r
			} else if (token === '*') {
				ret = l * r
			} else if (token === '/') {
				ret = l / r
			}
			stack.push(parseInt(ret))
		}
	}
	return stack.pop()
}

//more simple
var evalRPN = function (tokens) {
	const s = new Map([
		['+', (a, b) => a * 1 + b * 1],
		['-', (a, b) => b - a],
		['*', (a, b) => b * a],
		['/', (a, b) => (b / a) | 0],
	])
	const stack = []
	for (const i of tokens) {
		if (!s.has(i)) {
			stack.push(i)
		} else {
			stack.push(s.get(i)(stack.pop(), stack.pop()))
		}
	}
	return stack.pop()
}
```

### [227. ==基本计算器 II==](https://leetcode-cn.com/problems/basic-calculator-ii/)

```javascript {.line-numbers}
var calculate = function (s) {
	const stack = []
	let preSign = '+'
	let num = 0
	const n = s.length
	for (let i = 0; i < n; i++) {
		if (!isNaN(+s[i]) && s[i] !== ' ') num = num * 10 + +s[i]
		if (isNaN(+s[i]) || i === n - 1) {
			switch (preSign) {
				case '+':
					stack.push(num)
					break
				case '-':
					stack.push(-num)
					break
				case '*':
					stack.push(stack.pop() * num)
					break
				default:
					stack.push((stack.pop() / num) | 0)
			}
			preSign = s[i]
			num = 0
		}
	}
	let ans = 0
	while (stack.length) {
		ans += stack.pop()
	}
	return ans
}
```

### [394. ==字符串解码 M==](https://leetcode-cn.com/problems/decode-string/)

```javascript {.line-numbers}
var decodeString = function (s) {
	const isNumber = (val) => {
		return typeof +val === 'number' && +val === +val
	}
	const stack = []
	for (let c of s) {
		if (c === ']') {
			let repeatStr = '',
				repeatCount = ''
			while (stack.length > 0 && stack[stack.length - 1] !== '[')
				repeatStr = stack.pop() + repeatStr
			//pop [
			stack.pop()
			while (stack.length > 0 && isNumber(stack[stack.length - 1]))
				repeatCount = stack.pop() + repeatCount
			stack.push(repeatStr.repeat(+repeatCount))
		} else {
			stack.push(c)
		}
	}
	return stack.join('')
}
```
