### [20.有效括号 E](https://leetcode-cn.com/problems/valid-parentheses/)

```javascript {.line-numbers}
//brute force 一直替换
var isValid = function (s) {
	const reg = /\(\)|\[\]|\{\}/g
	while (s.includes('()') || s.includes('[]') || s.includes('{}')) {
		s = s.replace(reg, '')
	}
	return s === ''
}

//O(n) - O(n)
var isValid = function (s) {
	if ((s.length & 1) === 1) return false
	let map = {
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

### [155.最小栈 E](https://leetcode-cn.com/problems/min-stack/)

```javascript {.line-numbers}
//使用辅助栈
var MinStack = function () {
	this.stack = []
	//add a initial value
	this.minStack = [Infinity]
}

//sync push
MinStack.prototype.push = function (x) {
	this.stack.push(x)
	//peek always min item
	this.minStack.push(Math.min(this.minStack[this.minStack.length - 1], x))
}

//sync pop
MinStack.prototype.pop = function () {
	this.stack.pop()
	this.minStack.pop()
}

MinStack.prototype.top = function () {
	return this.stack[this.stack.length - 1]
}

MinStack.prototype.getMin = function () {
	return this.minStack[this.minStack.length - 1]
}
```
