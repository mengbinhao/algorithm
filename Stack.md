### [20.==有效括号 E==](https://leetcode-cn.com/problems/valid-parentheses/)

```javascript {.line-numbers}
//brute force 一直替换

//O(n) - O(n)
var isValid = function (s) {
	if (s.length % 2 === 1) return false
	let stack = [],
		hash = {
			'(': ')',
			'[': ']',
			'{': '}',
		}
	for (let c of s) {
		if (hash[c]) {
			stack.push(hash[c])
		} else {
			//囊括stack为空弹出undefined的case, 如)()(
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
  const	isValid = str => {
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
	const len = s.length
	if (len < 2) return 0
	//获取字符串截取截止坐标
	const end = len % 2 === 0 ? len : len - 1
	//枚结束位置,从最长开始偶数递减
	for (let i = end; i >= 0; i -= 2) {
		//枚起点位置
		for (let j = 0; j < len - i + 1; j++) {
			//找到即是最长的
			if (isValid(s.substring(j, j + i))) return i
		}
	}
}

//stack O(n) - O(n)
//始终保持栈底元素为当前已经遍历过的元素中"最后一个没有被匹配的右括号的下标"
//对于遇到的每个(，将它下标放入栈中
//对于遇到的每个)，先弹出栈顶元素与之匹配的左括号
//若栈为空，说明当前的右括号为没有被匹配的左括号，将其下标放入栈中来更新“最后一个没有被匹配的右括号的下标”
//若栈不为空，当前右括号的下标减去栈顶元素即为"以该右括号为结尾的最长有效括号的长度"
var longestValidParentheses = function (s) {
	const len = s.length
	if (len < 2) return 0
	let stack = [-1], //表示最长子串只能从0开始
		maxLen = 0
	for (let i = 0; i < len; i++) {
		if (s[i] === '(') {
			stack.push(i)
		} else {
			//先弹出匹配的左括号
			stack.pop()
			//放入最后一个没有被匹配的右括号下标
			if (stack.length === 0) {
				stack.push(i)
				//当前右括号的下标减去栈顶元素即为「以该右括号为结尾的最长有效括号的长度」
			} else {
				maxLen = Math.max(maxLen, i - stack[stack.length - 1])
			}
		}
	}
	return maxLen
}

//正向逆向结合 O(n) - O(1)  best
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
	//初始化成0符合base case，比如当前字符为左括号肯定是0
	let dp = new Array(len).fill(0)
	//dp[0] = 0
	for (let i = 1; i < len; i++) {
		//符合定义
		if (s[i] === ')') {
			if (s[i - 1] === '(') {
				//形如 '……()'
				dp[i] = (i - 2 >= 0 ? dp[i - 2] : 0) + 2
				//第一个条件表示前面还有括号(根据JS特性可省略),但为语义清晰最好加上
				//第二个条件前面的括号跟当前循环的)可以匹配，即+2
				//形如 '…((…))'
			} else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
				//s[i] = ')' 且 s[i - 1] = ')'，也就是字符串形如 '……))'
				//内部的有效长度 + 前面的有效长度 + 2
				dp[i] =
					dp[i - 1] + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0) + 2
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
	//for (let i = 1; i < len - 1; i++) {
	for (let i = 0; i < len; i++) {
    let lMax = rMax = -Infinity
		for (let j = i; j >= 0; j--) lMax = Math.max(lMax, height[j])
		for (let j = i; j < len; j++) rMax = Math.max(rMax, height[j])
		//若当前轮自己最高，结果是0
		ret += Math.min(lMax, rMax) - height[i]
	}
	return ret
}

//单调递减栈 O(n) - O(n)
//积水只能在低洼处形成，当后面的柱子高度比前面的低时是无法接雨水的，所以使用单调递减栈存储可能储水的柱子，当找到一根比前面高的柱子时就可以计算出能接到的雨水量
//横着分批找答案
var trap = function (height) {
	const len = height.length
	let stack = [],
		ret = 0
	for (let i = 0; i < len; i++) {
		//当前柱子比栈顶的柱子高,即表示可以形成积水
		while (stack.length && height[i] > height[stack[stack.length - 1]]) {
			const idx = stack.pop()
			//左边没有柱子了，即无法形成积水，积水由两边柱子中间低洼的地方形成
			if (stack.length === 0) break
			//计算右边与当前栈顶左边界的距离
			const distance = i - stack[stack.length - 1] - 1
			const boundedHeight =
				Math.min(height[i], height[stack[stack.length - 1]]) - height[idx]
			ret += distance * boundedHeight
		}
		stack.push(i)
	}
	return ret
}

// two pointer夹逼 O(n) - O(1)
// best version
var trap = function (height) {
	const len = height.length
	let ret = 0,
		l = 0,
		r = len - 1,
		lMax = -Infinity,
		rMax = -Infinity
	while (l < r) {
		//会传递
		lMax = Math.max(lMax, height[l])
		rMax = Math.max(rMax, height[r])
	  if (height[l] < height[r]) {
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
		lMax = [],
		rMax = []
	lMax[0] = height[0]
	for (let i = 1; i < len; i++) lMax[i] = Math.max(height[i], lMax[i - 1])
	rMax[len - 1] = height[len - 1]
	for (let i = len - 2; i >= 0; i--) rMax[i] = Math.max(height[i], rMax[i + 1])
	//两边无法接雨水
	for (let i = 1; i < len - 1; i++)
		ret += Math.min(lMax[i], rMax[i]) - height[i]
	return ret
}
```

### [71.简化路径](https://leetcode.cn/problems/simplify-path/)

```javascript {.line-numbers}
var simplifyPath = function(path) {
  let names = path.split('/')
  let stack = []
  for (let name of names) {
    if (name === '..') {
      if (stack.length) stack.pop()
    } else if (name.length > 0 && name !== '.') {
      stack.push(name)
    }
  }
  return `/${stack.join('/')}`
}
```

### [84.==柱状图中最大的矩形 H==](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)

```javascript {.line-numbers}
//brute force O(n^2)
//固定宽 两重循环

//固定高向两边扫一遍求最长底边
var largestRectangleArea = function (heights) {
	const len = heights.length
	if (len === 0) return 0
	if (len === 1) return heights[0]
	let maxArea = 0
	for (let i = 0; i < len; i++) {
		const height = heights[i]
		let l = i,
			r = i
		while (l - 1 >= 0 && heights[l - 1] >= height) l--
		while (r + 1 < len && heights[r + 1] >= height) r++
		maxArea = Math.max(maxArea, (r - l + 1) * height)
	}
	return maxArea
}

//stack  单调递增
var largestRectangleArea = function (heights) {
	const len = heights.length
	if (len === 0) return 0
	if (len === 1) return heights[0]
	let maxArea = 0, stack = []
  //特殊情况1, 出栈后栈为空则width = i即可以延展到数组开头
  //特殊情况2, 一遍遍历完成后，栈顶元素width = len即可以扩展到数组末尾
  //特殊情况3, 当新栈顶高度 = 旧栈顶，计算是错的，但是不影响最终计算结果，因为下次循环正确的答案会覆盖错误的答案，严谨性加上内层while
	for (let i = 0; i < len; i++) {
    //当前栈顶大于扫到的柱子时
		while (stack.length && heights[stack[stack.length - 1]] > heights[i]) {
      //拿到可以计算出栈顶的柱子高
			const height = heights[stack.pop()]
      //严谨性
			while (stack.length && heights[stack[stack.length - 1]] === height)
				stack.pop()
			let width
			if (!stack.length) {
				width = i //可以延伸到数组开头
			} else {
				width = i - stack[stack.length - 1] - 1
			}
			maxArea = Math.max(maxArea, width * height)
		}
		stack.push(i)
	}
	while (stack.length) {
		const height = heights[stack.pop()]
		while (stack.length && heights[stack[stack.length - 1]] === height)
			stack.pop()
		let width
		if (!stack.length) {
			width = len //可以延伸到数组两头
		} else {
			width = len - stack[stack.length - 1] - 1
		}
		maxArea = Math.max(maxArea, width * height)
	}
	return maxArea
}

//stack with sentinel O(n) - O(1)
//单调递增栈
var largestRectangleArea = function (heights) {
	let len = heights.length
	if (len === 0) return 0
	if (len === 1) return heights[0]
	let maxArea = 0
  //前面哨兵跟初始化的stack配合保证栈非空，后面哨兵保证heights循环完所有元素都可被计算，即heights原本有效元素都会出栈
	let tmp = [0, ...heights, 0]
	len += 2
	heights = tmp
  //Note
	let stack = [0]
	for (let i = 1; i < len; i++) {
		while (heights[stack[stack.length - 1]] > heights[i]) {
			const height = heights[stack.pop()]
			const width = i - stack[stack.length - 1] - 1
			maxArea = Math.max(maxArea, height * width)
		}
		stack.push(i)
	}
	return maxArea
}

//dp  O(n) - O(n)
var largestRectangleArea = function (heights) {
	const len = heights.length
	if (len === 0) return 0
	if (len === 1) return heights[0]
	//每根柱子即每个i对应的左右端点坐标
	//left[i]即每一根柱子的左侧且最近的小于其高度的柱子坐标
	//right[i]即每一根柱子的右侧且最近的小于其高度的柱子坐标
	//当看到元素的高度严格小于栈顶元素的高度时，栈顶元素出站，进而计算出栈顶元素的所能勾勒出来的最大面积
	let left = new Array(len),
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
	let maxArea = 0
	for (let i = 0; i < len; i++)
		maxArea = Math.max(ret, (right[i] - left[i] - 1) * heights[i])
	return maxArea
}
```

### [150.逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)

```javascript {.line-numbers}
var evalRPN = function (tokens) {
	let stack = []
	const isOperators = (val) => ['+', '-', '*', '/'].includes(val)
	for (let token of tokens) {
		if (!isOperators(token)) {
			stack.push(token)
		} else {
			const r = +stack.pop()
			const l = +stack.pop()
			switch (token) {
				case '+':
					stack.push(l + r)
					break
				case '-':
					stack.push(l - r)
					break
				case '*':
					stack.push(l * r)
					break
				case '/':
					stack.push((l / r) | 0)
					break
			}
		}
	}
	return stack.pop()
}

//more simple
var evalRPN = function (tokens) {
	const operations = new Map([
		['+', (a, b) => a * 1 + b * 1],
		['-', (a, b) => b - a],
		['*', (a, b) => b * a],
		['/', (a, b) => (b / a) | 0],
	])
	const stack = []
	for (const i of tokens) {
		if (!operations.has(i)) {
			stack.push(i)
		} else {
			stack.push(operations.get(i)(stack.pop(), stack.pop()))
		}
	}
	return stack.pop()
}
```

### [227. 基本计算器 II](https://leetcode-cn.com/problems/basic-calculator-ii/)

```javascript {.line-numbers}
var calculate = function (s) {
	const isNumber = (val) => typeof val === 'number' && val === val
	let stack = [],
		num = 0,
		preSign = '+'
	for (let i = 0, len = s.length; i < len; i++) {
		if (isNumber(+s[i]) && s[i] !== ' ') num = num * 10 + +s[i]
		//不能else，当最后一个字符时必须计算
		if (!isNumber(+s[i]) || i === len - 1) {
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
				case '/':
					stack.push((stack.pop() / num) | 0)
			}
			//update preSign and num
			preSign = s[i]
			num = 0
		}
	}
	return stack.reduce((acc, val) => acc + val)
}
```

### [394. ==字符串解码 M==](https://leetcode-cn.com/problems/decode-string/)

```javascript {.line-numbers}
var decodeString = function (s) {
  //排除NaN
	const isNumber = (val) => typeof val === 'number' && val === val
	const stack = []
	for (let c of s) {
		if (c === ']') {
			let repeatStr = '',
				repeatCount = ''
			while (stack.length > 0 && stack[stack.length - 1] !== '[')
				repeatStr = stack.pop() + repeatStr
			//pop [
			stack.pop()
			while (stack.length > 0 && isNumber(+stack[stack.length - 1]))
				repeatCount = stack.pop() + repeatCount
			stack.push(repeatStr.repeat(+repeatCount))
		} else {
			stack.push(c)
		}
	}
	return stack.join('')
}
```

### [11.==盛最多水的容器 M==](https://leetcode-cn.com/problems/container-with-most-water/)

```javascript
//brute force O(n^2) - O(1)
var maxArea = function(height) {
  const len = height.length
  let maxArea = 0
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      maxArea = Math.max(ret, Math.min(height[i], height[j]) * (j - i))
    }
  }
  return maxArea
}

//two pointer夹逼 O(n) - O(1)
//若移动数字较大的那个指针，那么前者「两个指针指向的数字中较小值」不会增加，后者「指针之间的距离」会减小，那么这个乘积会减小。因此移动数字较大的那个指针是不合理的
//若保持左指针的位置不变，那么无论右指针在哪里，这个容器的容量都不会超过 
//min(x,y) ∗ t = x ∗ t
//min(x,y) ≤ min(x,y)
var maxArea = function (height) {
	let l = 0,
		r = height.length - 1,
		maxArea = 0
	while (l < r) {
		maxArea = Math.max(maxArea, Math.min(height[l], height[r]) * (r - l))
		height[l] < height[r] ? l++ : r--
	}
	return maxArea
}
```

### [239.==滑动窗口最大值 H==](https://leetcode-cn.com/problems/sliding-window-maximum/)

```javascript
//brute force O(nk) - O(k)
var maxSlidingWindow = function (nums, k) {
	const len = nums.length
	let slideWindow = [],
		ret = []
	//能形成的最大窗口个数
	for (let i = 0; i < len - k + 1; i++) {
		for (let j = 0; j < k; j++) slideWindow.push(nums[i + j])
		ret.push(Math.max(...slideWindow))
		slideWindow.length = 0
	}
	return ret
}

//deque O(n) - O(n)，存下标，单调递减，第一个元素是第一大的index,依此类推
//头尾尾头
var maxSlidingWindow = function (nums, k) {
	const deque = [],
		ret = []
	for (let i = 0, len = nums.length; i < len; i++) {
		//队列满了移出去一个
		//L,R 来标记窗口的左边界和右边界,当窗口大小形成时,L 和 R 一起向右移,每次移动时,判断队首的值的数组下标是否在 [L,R] 中,若不在则需要弹出队首的值
		if (deque.length && deque[0] < i - k + 1) deque.shift()
		//维护递减队列
		while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop()
		deque.push(i)
		//检查结果
		if (i >= k - 1) ret.push(nums[deque[0]])
	}
	return ret
}
```

### [735.小行星碰撞](https://leetcode.cn/problems/asteroid-collision/)

```javascript
var asteroidCollision = function (asteroids) {
	let stack = []
	for (let aster of asteroids) {
		let alive = true
		while (
			alive &&
			aster < 0 &&
			stack.length > 0 &&
			stack[stack.length - 1] > 0
		) {
			alive = stack[stack.length - 1] < -aster // aster 是否存在
			if (stack[stack.length - 1] <= -aster) stack.pop() //栈顶行星爆炸
		}
		if (alive) stack.push(aster)
	}
	//const size = stack.length
	//let ret = new Array(size).fill(0)
	//for (let i = size - 1; i >= 0; i--) ret[i] = stack.pop()
	return stack
}
```

### [739.==每日温度==](https://leetcode.cn/problems/daily-temperatures/)

```javascript
//brute force O(n2)
var dailyTemperatures = function (temperatures) {
	const len = temperatures.length
	const ret = new Array(len).fill(0)
	for (let i = 0; i < len; i++) {
		let cur = temperatures[i]
		//if (cur < 100) {
		for (let j = i + 1; j < len; j++) {
			if (temperatures[j] > cur) {
				ret[i] = j - i
				break
			}
		}
		//}
	}
	return ret
}

var dailyTemperatures2 = function (temperatures) {
	const len = temperatures.length
	const ret = new Array(len).fill(0)
	for (let i = len - 2; i >= 0; i--) {
		// j+= result[j]是利用已有的结果进行跳跃
		for (let j = i + 1; j < len; j += ret[j]) {
			if (temperatures[j] > temperatures[i]) {
				ret[i] = j - i
				break
			} else if (ret[j] == 0) {
				//遇到0表示后面不会有更大的值，那当然当前值就应该也为0
				ret[i] = 0
				break
			}
		}
	}
	return ret
}

//stack 单调递减栈
var dailyTemperatures = function (temperatures) {
	const len = temperatures.length
	const ret = new Array(len).fill(0),
		stack = []
	for (let i = 0; i < len; i++) {
		while (
			stack.length > 0 &&
			temperatures[i] > temperatures[stack[stack.length - 1]]
		) {
			const idx = stack.pop()
			ret[idx] = i - idx
		}
		stack.push(i)
	}
	return ret
}
```

### [921.使括号有效的最少添加](https://leetcode.cn/problems/minimum-add-to-make-parentheses-valid/)

```javascript
var minAddToMakeValid = function (s) {
	let ret = 0
	let leftCount = 0
	let length = s.length
	for (let i = 0; i < length; i++) {
		const c = s[i]
		if (c === '(') {
			leftCount++
		} else {
			if (leftCount > 0) {
				leftCount--
			} else {
				ret++
			}
		}
	}
	//leftCount为需要补的右括号数
	//ret为需要补的右括号数
	ret += leftCount
	return ret
}
```

### [1021.删除最外层的括号](https://leetcode.cn/problems/remove-outermost-parentheses/)

```javascript
//brute force
var removeOuterParentheses = function (s) {
	//store原语子串
	const arr = []
	//l统计左括号, r统计右括号,last原语的开始位置
	let l = (r = last = 0),
		ret = ''
	for (let i = 0, len = s.length; i < len; i++) {
		s[i] === '(' ? l++ : r++
		//find原语
		if (l === r) {
			const end = i + 1
			arr.push(s.substring(last, end))
			last = end
		}
	}
	for (let str of arr) {
		ret += str.substring(1, str.length - 1)
	}
	return ret
}

//brute force optimize
var removeOuterParentheses = function (s) {
	let l = (r = last = 0),
		ret = ''
	for (let i = 0, len = s.length; i < len; i++) {
		s[i] === '(' ? l++ : r++
		//find原语
		if (l === r) {
			ret += s.substring(++last, i)
			last = i + 1
		}
	}
	return ret
}

//stack
var removeOuterParentheses = function (s) {
	let last = 0,
		ret = ''
	const stack = []
	for (let i = 0, len = s.length; i < len; i++) {
		const c = s[i]
		c === '(' ? stack.push(c) : stack.pop()
		if (stack.length === 0) {
			ret += s.substring(++last, i)
			last = i + 1
		}
	}
	return ret
}

//stack better
var removeOuterParentheses = function (s) {
	let idx = -1,
		ret = ''
	const stack = []
	for (let i = 0, len = s.length; i < len; i++) {
		const c = s[i]
		if (c === '(') {
			//1 读取到左括号：此前有数据，其必属于原语
			if (idx > -1) ret += c
			stack[++idx] = c
		} else {
			stack[idx--] = undefined
			//2 读取到右括号：匹配后不为零，其必属于原语
			if (idx > -1) ret += c
		}
	}
	return ret
}

//stack best
var removeOuterParentheses = function (s) {
	//所有括号
	let cnt = 0,
		ret = ''
	for (let i = 0, len = s.length; i < len; i++) {
		const c = s[i]
		if (c === '(') {
			//1 读取到左括号：此前有数据，其必属于原语
			if (cnt > 0) ret += c
			cnt++
		} else {
			cnt--
			//2 读取到右括号：匹配后不为零，其必属于原语
			if (cnt > 0) ret += c
		}
	}
	return ret
}
```
