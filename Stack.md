### ==[20.有效括号 E](https://leetcode-cn.com/problems/valid-parentheses/)==

```javascript {.line-numbers}
//brute force 一直替换
var isValid = function (s) {
	if ((s.length & 1) === 1) return false
	while (s.includes('()') || s.includes('[]') || s.includes('{}')) {
		s = s.replace(/\(\)|\[\]|\{\}/g, '')
	}
	return s === ''
}

//O(n) - O(n)
var isValid = function (s) {
	if ((s.length & 1) === 1) return false
	const map = {
			'(': ')',
			'[': ']',
			'{': '}',
		},
		stack = []
	for (let c of s) {
		if (map[c]) {
			stack.push(map[c])
		} else {
			//included empty condition
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
	//有效括号肯定是偶数
	const end = len % 2 === 0 ? len : len - 1
	//从最长开始偶数递减loop
	for (let i = end; i >= 0; i -= 2) {
		for (let j = 0; j < len - i + 1; j++) {
			//找到即是最长的
			if (isValid(s.substring(j, j + i))) return i
		}
	}

	function isValid(s) {
		const stack = []
		for (let c of s) {
			if (c === '(') {
				stack.push('(')
			} else if (stack.length > 0 && stack[stack.length - 1] === '(') {
				stack.pop()
			} else {
				return false
			}
		}
		return stack.length === 0
	}
}

//DP O(n) - O(n)
var longestValidParentheses = function (s) {
	const len = s.length
	if (len < 2) return 0
	let ret = 0
	//dp[i] 表示以下标i字符结尾的最长有效括号的长度
	const dp = new Array(len).fill(0)
	for (let i = 1; i < len; i++) {
		//只有右括号结尾的字符才合法
		if (s[i] === ')') {
			if (s[i - 1] === '(') {
				//s[i] = ')' 且 s[i - 1] = '('，也就是字符串形如 '……()'
				dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2
			} else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
				//s[i] = ')' 且 s[i - 1] = ')'，也就是字符串形如 '……))'
				//内部的有效长度 + 前面的有效长度 + 2
				dp[i] = dp[i - 1] + (i - dp[i - 1] >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2
			}
			ret = Math.max(ret, dp[i])
		}
	}
	return ret
}

//stack O(n) - O(n)
//始终保持栈底元素为当前已经遍历过的元素中「最后一个没有被匹配的右括号的下标」
//对于遇到的每个(，将它下标放入栈中
//对于遇到的每个)，先弹出栈顶元素表示匹配了当前右括号：
//  如果栈为空，说明当前的右括号为没有被匹配的左括号，将其下标放入栈中来更新「最后一个没有被匹配的右括号的下标」
//  如果栈不为空，当前右括号的下标减去栈顶元素即为「以该右括号为结尾的最长有效括号的长度」
var longestValidParentheses = function (s) {
	const len = s.length
	if (len < 2) return 0
	//最长子串只能从0开始
	const stack = [-1]
	let maxLen = 0
	for (let i = 0; i < len; i++) {
		if (s[i] === '(') {
			stack.push(i)
		} else {
			stack.pop()
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
	let left = 0,
		right = 0
	maxLen = 0
	for (let i = 0; i < len; i++) {
		s[i] === '(' ? left++ : right++
		if (left === right) {
			maxLen = Math.max(maxLen, left * 2)
		} else if (right > left) {
			left = right = 0
		}
	}
	left = right = 0
	for (let i = len - 1; i >= 0; i--) {
		s[i] === '(' ? left++ : right++
		if (left === right) {
			maxLen = Math.max(maxLen, left * 2)
		} else if (left > right) {
			left = right = 0
		}
	}
	return maxLen
}
```

### ==[42.接雨水 H](https://leetcode-cn.com/problems/trapping-rain-water/)==

```javascript
//brute force O(n^2) - O(1)
var trap = function (height) {
	let ret = 0
	const len = height.length
	//两边无法接雨水
	for (let i = 1; i < len - 1; i++) {
		//two pointer
		let leftMax = 0,
			rightMax = 0
		//找到左边的最高柱
		for (let j = i; j >= 0; j--) {
			leftMax = Math.max(leftMax, height[j])
		}
		//找到右边的最高柱
		for (let j = i; j < len; j++) {
			rightMax = Math.max(rightMax, height[j])
		}
		//计算每个height[i]能接到的雨水，并加到最终结果
		ret += Math.min(leftMax, rightMax) - height[i]
	}
	return ret
}

//备忘录优化 dp O(n) - O(n)
var trap = function (height) {
	const len = height.length
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

//two pointer O(n) - O(1)
var trap = function (height) {
	const len = height.length
	if (len === 0) return 0
	let left = 0,
		right = len - 1,
		ret = 0

	let l_max = height[0],
		r_max = height[len - 1]

	while (left < right) {
		l_max = Math.max(l_max, height[left])
		r_max = Math.max(r_max, height[right])

		if (l_max < r_max) {
			ret += l_max - height[left]
			left++
		} else {
			ret += r_max - height[right]
			right--
		}
	}
	return ret
}

//单调递减栈 O(n) - O(n)
var trap = function (height) {
	const len = height.length
	if (len === 0) return 0
	const stack = []
	let i = 0,
		ret = 0
	while (i < len) {
		while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
			const val = stack.pop()
			if (stack.length === 0) break
			const distance = i - stack[stack.length - 1] - 1
			const boundedHeight =
				Math.min(height[i], height[stack[stack.length - 1]]) - height[val]
			ret += distance * boundedHeight
		}
		stack.push(i++)
	}
	return ret
}
```

### ==[84.柱状图中最大的矩形 H](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)==

```javascript {.line-numbers}
//brute force O(n^2)
//固定宽 两重循环
//固定高 一重循环，向两边扫求最长底边
var largestRectangleArea = function (heights) {
	const len = heights.length
	if (len === 0) return 0
	if (len === 1) return heights[0]
	let ret = 0
	//枚举高
	for (let i = 0; i < len; i++) {
		const height = heights[i]
		let left = i,
			right = i
		// 确定左右边界
		while (left - 1 >= 0 && heights[left - 1] >= height) left--
		while (right + 1 < len && heights[right + 1] >= height) right++
		ret = Math.max(ret, (right - left + 1) * height)
	}
	return ret
}

//stack  O(n) - O(n)
//单调递增栈,存的下标
var largestRectangleArea = function (heights) {
	const len = heights.length
	if (len === 0) return 0
	if (len === 1) return heights[0]
	//每根柱子即每个i对应的左、右端点坐标
	const left = new Array(len)
	const right = new Array(len)

	const stack = new Array()
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
//使用哨兵技巧
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

### ==[150.逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)==

```javascript {.line-numbers}
var evalRPN = function (tokens) {
	const stack = []
	for (let i = 0, len = tokens.length; i < len; i++) {
		const val = tokens[i]
		if (isNumber(val)) {
			stack.push(parseInt(val))
		} else {
			const n2 = stack.pop()
			const n1 = stack.pop()
			if (val === '+') {
				stack.push(n1 + n2)
			} else if (val === '-') {
				stack.push(n1 - n2)
			} else if (val === '*') {
				stack.push(n1 * n2)
			} else if (val === '/') {
				stack.push(n1 / n2 > 0 ? Math.floor(n1 / n2) : Math.ceil(n1 / n2))
			}
		}
	}

	return stack.pop()

	function isNumber(val) {
		return !(val === '+' || val === '-' || val === '*' || val === '/')
	}
}
```
