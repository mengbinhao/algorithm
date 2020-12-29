学习笔记

##### [22 括号生成 M](https://leetcode-cn.com/problems/generate-parentheses/)

```javascript
//brute force O(2^3n * n) - O(n)
var generateParenthesis = function (n) {
	const ret = []

	const isValid = (s) => {
		let balance = 0
		for (let c of s) {
			if (c === '(') {
				balance++
			} else {
				balance--
			}
			if (balance < 0) return false
		}
		return balance === 0
	}

	const dfs = (level, max, s) => {
		//recursion terminal
		if (level >= max) {
			if (isValid(s)) ret.push(s)
			return
		}

		//precess login of current level
		//drill down
		dfs(level + 1, max, `${s}(`)
		dfs(level + 1, max, `${s})`)

		//reverse current params if needed
	}

	dfs(0, 2 * n, '')
	return ret
}

//回溯
var generateParenthesis = function (n) {
	const ret = []

	const dfs = (left, right, n, ret, s) => {
		if (left === n && right === n) {
			ret.push(s)
			return
		}

		//回溯的过程中直接剪枝掉无效的组合
		if (left < n) {
			dfs(left + 1, right, n, ret, s + '(')
		}

		//回溯的过程中直接剪枝掉无效的组合
		if (left > right) {
			dfs(left, right + 1, n, ret, s + ')')
		}
	}

	dfs(0, 0, n, ret, '')
	return ret
}
```

##### [98 验证二叉树搜索 M](https://leetcode-cn.com/problems/validate-binary-search-tree/)

```javascript
var isValidBST = function (root) {
	let helper = (node, lower, upper) => {
		if (!node) return true
		if (node.val <= lower || node.val >= upper) return false
		return (
			helper(node.left, lower, node.val) && helper(node.right, node.val, upper)
		)
	}
	return helper(root, -Infinity, Infinity)
}
```

##### [104 二叉树的最大深度 E](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

```javascript
//dfs
var maxDepth = function (root) {
	if (!root) {
		return 0
	} else {
		let maxLeftDepth = maxDepth(root.left)
		let maxRightDepth = maxDepth(root.right)
		return Math.max(maxLeftDepth, maxRightDepth) + 1
	}
}

//bfs
var maxDepth = function (root) {
	if (root == null) {
		return 0
	}
	let queue = [root],
		ret = 0
	while (queue.length > 0) {
		let size = queue.length
		//添加当前层的所有子节点
		while (size > 0) {
			let node = queue.shift()
			if (node.left != null) {
				queue.push(node.left)
			}
			if (node.right != null) {
				queue.push(node.right)
			}
			size--
		}
		//一层添加完深度+1
		ret++
	}
	return ret
}
```

##### [111 二叉树的最小深度 E](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

```javascript
var minDepth = function (root) {
	if (!root) return 0
	let minLeftDepth = minDepth(root.left)
	let minRightDepth = minDepth(root.right)

	return minLeftDepth === 0 || minRightDepth === 0
		? minLeftDepth + minRightDepth + 1
		: Math.min(minLeftDepth, minRightDepth) + 1
}
```

##### [226 翻转二叉树 E](https://leetcode-cn.com/problems/invert-binary-tree/)

```javascript
//recursion 自底向上
var invertTree = function (root) {
	if (!root) return null
	;[root.left, root.right] = [invertTree(root.right), invertTree(root.left)]
	return root
}

//iteration 自顶向下
var invertTree = function (root) {
	if (root == null) return null
	let queue = [root]
	while (queue.length > 0) {
		let cur = queue.shift()
		;[cur.left, cur.right] = [cur.right, cur.left]
		if (cur.left !== null) queue.push(cur.left)
		if (cur.right !== null) queue.push(cur.right)
	}
	return root
}
```

##### [50Pow(x, n)M](https://leetcode-cn.com/problems/powx-n/)

```javascript
//brute force
//tme limit exceeded
var myPow = function (x, n) {
	if (n === 0) return 1
	if (n === 1) return x
	if (n < 0) return 1 / myPow(x, -n)
	let ret = 1

	for (let i = 1; i <= n; i++) {
		ret *= x
	}
	return ret
}

//recursion
var myPow = function (x, n) {
	if (n === 0) return 1
	if (n === 1) return x
	if (n < 0) return 1 / myPow(x, -n)
	//even的时候转换成子问题
	return n % 2 === 1 ? x * myPow(x, n - 1) : myPow(x * x, n / 2)
}

//divide-and-conquer
var myPow = function (x, n) {
	if (n === 0) return 1
	if (n === 1) return x
	if (n < 0) return 1 / myPow(x, -n)

	let ret = 1
	while (n > 1) {
		if (n % 2 === 1) {
			//补上当前遍历的x
			ret *= x
			n--
		}
		x *= x
		n /= 2
	}
	//返回总数
	return ret * x
}
```

##### [78 子集 M](https://leetcode-cn.com/problems/subsets/)

```javascript
//recursion
var subsets = function (nums) {
	let res = [[]]

	for (let i = 0; i < nums.length; i++) {
		res.forEach((item) => {
			res.push([...item, nums[i]])
		})
	}

	return res
}

//Backtracking
var subsets = function (nums) {
	const powerset = []
	generatePowerset([], 0)

	function generatePowerset(path, index) {
		powerset.push(path)
		for (let i = index; i < nums.length; i++) {
			generatePowerset([...path, nums[i]], i + 1)
		}
	}

	return powerset
}
```

##### [169 多数元素 E](https://leetcode-cn.com/problems/majority-element/)

```javascript
//brute force O(n^2)
var majorityElement = function (nums) {
	let len = nums.length
	for (let i = 0; i < len; i++) {
		let count = 0
		for (let j = 0; j < len; j++) {
			if (nums[i] === nums[j]) {
				if (++count > Math.floor(len / 2)) return nums[i]
			}
		}
	}
}

// O(NlogN)
// sort array then the middle is majority
// due to must be have an answer
var majorityElement = function (nums) {
	nums.sort((a, b) => a - b)
	return nums[Math.floor(nums.length / 2)]
}

//hash O(n)
var majorityElement = function (nums) {
	let hash = {}

	for (let num of nums) {
		hash[num] ? hash[num]++ : (hash[num] = 1)
	}

	let max = -Infinity,
		ret

	Object.keys(hash).forEach((key) => {
		let count = hash[key]
		if (count > max) {
			max = count
			ret = +key
		}
	})
	return ret
}

//O(n) - O(1) best
var majorityElement = function (nums) {
	let ret = nums[0],
		count = 1
	for (let i = 1; i < nums.length; i++) {
		//note sequence!!!
		if (count === 0) {
			count++
			ret = nums[i]
		} else if (nums[i] === ret) {
			count++
		} else {
			count--
		}
	}
	return ret
}
```

##### [17 电话号码的字母组合 M](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

```javascript
//recursion
var letterCombinations = function (digits) {
	if (!digits) return []
	let ret = [],
		map = new Map([
			[2, 'abc'],
			[3, 'def'],
			[4, 'ghi'],
			[5, 'jkl'],
			[6, 'mno'],
			[7, 'pqrs'],
			[8, 'tuv'],
			[9, 'wxyz'],
		])

	let traversal = (s, digits, level, ret, map) => {
		if (level === digits.length) {
			ret.push(s)
			return
		}
		let letters = map.get(+digits.charAt(level))

		for (let l of letters) {
			traversal(s + l, digits, level + 1, ret, map)
		}
	}

	traversal('', digits, 0, ret, map)

	return ret
}

//more simple
var letterCombinations = function (digits) {
	if (digits.length === 0) return []

	const map = {
		2: 'abc',
		3: 'def',
		4: 'ghi',
		5: 'jkl',
		6: 'mno',
		7: 'pqrs',
		8: 'tuv',
		9: 'wxyz',
	}

	let res = []
	function go(i, s) {
		if (i === digits.length) {
			res.push(s)
			return
		}

		for (let c of map[digits[i]]) {
			go(i + 1, s + c)
		}
	}

	go(0, '')
	return res
}
```

##### [51N 皇后 H](https://leetcode-cn.com/problems/n-queens/)

```javascript
var solveNQueens = function (n) {
	if (n < 1) return []
	let solutions = [],
		cols = new Set(), //垂直线攻击位置
		pies = new Set(), //左对角线攻击位置
		nas = new Set() //右对角线攻击位置

	let dfs = (row, curState) => {
		if (row >= n) {
			//复制curState
			solutions.push([...curState])
			return
		}

		for (let col = 0; col < n; col++) {
			if (cols.has(col) || pies.has(row + col) || nas.has(row - col)) continue

			cols.add(col)
			pies.add(row + col)
			nas.add(row - col)
			curState.push(col)

			//drill down
			dfs(row + 1, curState)

			//reverse
			cols.delete(col)
			pies.delete(row + col)
			nas.delete(row - col)
			curState.pop()
		}
	}

	dfs(0, [])
	return generatorBoard(solutions)

	function generatorBoard(solutions) {
		return solutions.map((solution) => {
			return solution.map((position) => {
				return Array.from({ length: n }, (_, idx) => {
					return position === idx ? 'Q' : '.'
				}).join('')
			})
		})
	}
}
```

##### [52N 皇后 2H](https://leetcode-cn.com/problems/n-queens-ii/)

```javascript
var totalNQueens = function (n) {
	if (n < 1) return []
	let ret = 0,
		cols = new Set(),
		pies = new Set(),
		nas = new Set()
	let dfs = (row) => {
		if (row >= n) {
			ret++
			return
		}

		for (let col = 0; col < n; col++) {
			if (cols.has(col) || pies.has(row + col) || nas.has(row - col)) continue

			cols.add(col)
			pies.add(row + col)
			nas.add(row - col)

			dfs(row + 1)

			cols.delete(col)
			pies.delete(row + col)
			nas.delete(row - col)
		}
	}
	dfs(0)
	return ret
}

//final bit version
var totalNQueens = function (n) {
	if (n < 1) return []
	let ret = 0

	let dfs = (n, row, col, pie, na) => {
		if (row >= n) {
			ret++
			return
		}

		//得到当前row所有可以放Queue空位
		//n位可放置的二进制数
		let bits = ~(col | pie | na) & ((1 << n) - 1)

		//直到没位置可放
		while (bits) {
			//取到最低位的1的二进制数
			let p = bits & -bits
			//打掉二进制数最后一位的1，及放上皇后
			bits &= bits - 1
			//drill down next row
			dfs(n, row + 1, col | p, (pie | p) << 1, (na | p) >> 1)
			//no need reverse
		}
	}

	dfs(n, 0, 0, 0, 0)
	return ret
}
```

##### [46 全排列 M](https://leetcode-cn.com/problems/permutations/)

```javascript
//回溯 dfs
var permute = function (nums) {
	const len = nums.length,
		ans = []
	if (len === 0) return ans
	//space for time
	const visited = Array.from({ length: len }, () => false)

	let dfs = (nums, depth, path) => {
		if (depth === nums.length) {
			ans.push([...path])
			return
		}

		for (let i = 0; i < len; i++) {
			if (visited[i]) continue
			visited[i] = true
			dfs(nums, depth + 1, [...path, nums[i]])

			//reverse
			visited[i] = false
		}
	}

	dfs(nums, 0, [])
	return ans
}
```

##### [47 全排列 2M](https://leetcode-cn.com/problems/permutations-ii/)

```javascript
var permuteUnique = function (nums) {
	if (!Array.isArray(nums) || nums.length === 0) {
		return []
	}

	let ret = []
	path = []
	used = Array.from({ length: nums.length }, (item) => false)
	// 排序(升序或者降序都可以)，排序是剪枝的前提
	nums.sort()

	let dfs = (nums, depth, path, used, ret) => {
		if (depth === nums.length) {
			ret.push([...path])
			return
		}

		for (let i = 0; i < nums.length; i++) {
			if (used[i]) continue
			// 剪枝条件：i > 0 是为了保证 nums[i - 1] 有意义
			// 写 !used[i - 1] 是因为 nums[i - 1] 在深度优先遍历的过程中刚刚被撤销选择
			if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue

			path.push(nums[i])
			used[i] = true

			dfs(nums, depth + 1, path, used, ret)

			path.pop(nums[i])
			used[i] = false
		}
	}

	dfs(nums, 0, path, used, ret)

	return ret
}
```
