### [42. 接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)

```javascript {.line-numbers}
//brute force O(n^2) O(1)

var trap = function (height) {
	let ret = 0,
		len = height.length
	//the last item can not store water
	for (let i = 0; i < len - 1; i++) {
		//two pointer
		let leftMax = 0,
			rightMax = 0
		//Search the left part for max bar size
		for (let j = i; j >= 0; j--) {
			leftMax = Math.max(leftMax, height[j])
		}
		//Search the right part for max bar size
		for (let j = i; j < len; j++) {
			rightMax = Math.max(rightMax, height[j])
		}
		ret += Math.min(leftMax, rightMax) - height[i]
	}
	return ret
}

//备忘录优化 O(n) O(n)
var trap = function (height) {
	let ret = 0,
		len = height.length,
		leftMax = [],
		rightMax = []

	leftMax[0] = height[0]
	for (let i = 1; i < len; i++) {
		leftMax[i] = Math.max(height[i], leftMax[i - 1])
	}
	rightMax[len - 1] = height[len - 1]
	for (let i = len - 2; i >= 0; i--) {
		rightMax[i] = Math.max(height[i], rightMax[i + 1])
	}
	for (let i = 1; i < len - 1; i++) {
		ret += Math.min(leftMax[i], rightMax[i]) - height[i]
	}
	return ret
}

//two pointer O(n) O(1)
var trap = function (height) {
	if (height.length === 0) return 0
	let len = height.length,
		left = 0,
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
```

### [204. 计数质数](https://leetcode-cn.com/problems/count-primes/)

```javascript {.line-numbers}
var countPrimes = function (n) {
	let isPrim = new Array(n).fill(true)
	//由于因子的对称性，只需要遍历到[2,sqrt(n)]
	for (let i = 2; i * i < n; i++) {
		if (isPrim[i]) {
			//比如 n = 25，i = 4 时算法会标记 4 × 2 = 8，4 × 3 = 12 等等数字，但是这两个数字已经被 i = 2 和 i = 3 的 2 × 4 和 3 × 4 标记了
			for (let j = i * i; j < n; j += i) {
				isPrim[j] = false
			}
		}
	}
	let ret = 0
	for (let i = 2; i < n; i++) {
		if (isPrim[i]) ret++
	}
	return ret
}
```

### [==227. 基本计算器 II==](https://leetcode-cn.com/problems/basic-calculator-ii/)

```javascript {.line-numbers}
var calculate = function (s) {
	var stack = [],
		num = 0,
		sign = '+'
	for (let i = 0; i < s.length; i++) {
		const val = s[i]
		if (isNumber(+val)) {
			num = 10 * num + +val
		}
		if ((!isNumber(+val) && val !== ' ') || i === s.length - 1) {
			switch (sign) {
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
					stack.push(stack.pop() / num)
					break
			}
			sign = val
			num = 0
		}
	}
	return stack.reduce((acc, val) => acc + (val | 0), 0)

	function isNumber(val) {
		return typeof val === 'number' && val === val
	}
}
```

### [319. 灯泡开关](https://leetcode-cn.com/problems/bulb-switcher/)

```javascript {.line-numbers}
var bulbSwitch = function (n) {
	return Math.floor(Math.sqrt(n))
}
```

### [372. 超级次方](https://leetcode-cn.com/problems/super-pow/)

```javascript {.line-numbers}
const base = 1337
var superPow = function (a, b) {
	if (b.length === 0) return 1

	//分解成子问题
	const part1 = myPow(a, b.pop())
	const part2 = myPow(superPow(a, b), 10)
	return (part1 * part2) % base

	// 计算 a 的 k 次方然后与 base 求模的结果
	//对乘法的结果求模，等价于先对每个因子都求模，然后对因子相乘的结果再求模
	function myPow(a, k) {
		// 对因子求模
		a %= base
		let res = 1
		for (let _ = 0; _ < k; _++) {
			// 这里有乘法，是潜在的溢出点
			res *= a
			// 对乘法结果求模
			res %= base
		}
		return res
	}

	// function myPow(a, k) {
	// 	if (k == 0) return 1
	// 	a %= base

	// 	if (k % 2 == 1) {
	// 		// k 是奇数
	// 		return (a * myPow(a, k - 1)) % base
	// 	} else {
	// 		// k 是偶数
	// 		const sub = myPow(a, k / 2)
	// 		return (sub * sub) % base
	// 	}
	// }
}
```

### [392. 判断子序列](https://leetcode-cn.com/problems/is-subsequence/)

```javascript {.line-numbers}
var isSubsequence = function (s, t) {
	let i = 0,
		j = 0,
		sLen = s.length,
		tLen = t.length

	while (i < sLen && j < tLen) {
		if (s[i] === t[j]) {
			i++
		}
		j++
	}
	return i === sLen
}

//optimize version
var isSubsequence = function (s, t) {
	const m = s.length,
		n = t.length
	// 对 t 进行预处理
	const index = {}
	for (let i = 0; i < n; i++) {
		const c = t.charAt(i)
		if (!index[c]) index[c] = []
		index[c].push(i)
	}

	// 串 t 上的指针
	let j = 0
	// 借助 index 查找 s[i]
	for (let i = 0; i < m; i++) {
		const c = s.charAt(i)
		// 整个 t 压根儿没有字符 c
		if (!index[c]) return false
		const pos = left_bound(index[c], j)
		// 二分搜索区间中没有找到字符 c
		if (pos == index[c].length) return false
		// 向前移动指针 j
		j = index[c][pos] + 1
	}
	return true

	function left_bound(arr, tar) {
		let lo = 0,
			hi = arr.length
		while (lo < hi) {
			let mid = Math.floor(lo + (hi - lo) / 2)
			if (tar > arr[mid]) {
				lo = mid + 1
			} else {
				hi = mid
			}
		}
		return lo
	}
}
```

### [654. 错误的集合](https://leetcode-cn.com/problems/set-mismatch/)

```javascript {.line-numbers}
//关键点在于元素和索引是成对儿出现的，常用的方法是排序、异或、映射
var findErrorNums = function (nums) {
	const n = nums.length
	let dup = -1
	for (let i = 0; i < n; i++) {
		//元素是从 1 开始的
		const index = Math.abs(nums[i]) - 1
		// nums[index] 小于 0 则说明重复访问
		if (nums[index] < 0) {
			dup = Math.abs(nums[i])
		} else {
			nums[index] *= -1
		}
	}

	let missing = -1
	for (let i = 0; i < n; i++)
		// nums[i] 大于 0 则说明没有访问
		if (nums[i] > 0) {
			// 将索引转换成元素
			missing = i + 1
		}

	return [dup, missing]
}
```
