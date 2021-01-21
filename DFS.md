# 基本概念

# 解题要素

### [77.组合](https://leetcode-cn.com/problems/combinations/)

```javascript {.line-numbers}
//dfs + backtrack 1
var combine = function (n, k) {
	const ret = []
	let dfs = (n, k, start, path) => {
		if (k === 0) {
			ret.push([...path])
			return
		}
		//剪枝
		for (let i = start; i <= n - k + 1; i++) {
			path.push(i)
			dfs(n, k - 1, i + 1, path)
			path.pop()
		}
	}
	dfs(n, k, 1, [])
	return ret
}

//dfs + backtrack 2
var combine = function (n, k) {
	const ret = []
	const dfs = (cur, n, k, path) => {
		//剪枝
		if (path.length + (n - cur + 1) < k) return

		if (path.length === k) {
			ret.push(path)
			return
		}
		//选择当前数字
		dfs(cur + 1, n, k, [...path, cur])
		//不选当前数字
		dfs(cur + 1, n, k, path)
	}

	dfs(1, n, k, [])
	return ret
}
```

### [39.组合总和](https://leetcode-cn.com/problems/combination-sum/)

```javascript {.line-numbers}
//candidates无重复
//dfs + backtrack 1
var combinationSum = function (candidates, target) {
	const len = candidates.length,
		ret = []
	if (len === 0) return ret
	const dfs = (candidates, remain, start, path) => {
		if (remain < 0) return
		if (remain === 0) {
			ret.push([...path])
			return
		}

		for (let i = start; i < candidates.length; i++) {
			path.push(candidates[i])
			//传递的是i可以重复选
			dfs(candidates, remain - candidates[i], i, path)
			//backtrack
			path.pop()
		}
	}

	dfs(candidates, target, 0, [])
	return ret
}

//dfs + backtrack 2
var combinationSum = function (candidates, target) {
	const len = candidates.length,
		ret = []
	if (len === 0) return ret
	const dfs = (candidates, remain, start, path) => {
		if (remain < 0 || start >= candidates.length) return
		if (remain === 0) {
			ret.push(path)
			return
		}

		//choice
		//剪枝
		if (remain - candidates[index] >= 0) {
			dfs(candidates, remain - candidates[start], start, [
				...path,
				candidates[start],
			])
		}
		//no choice
		dfs(candidates, remain, start + 1, path)
	}

	dfs(candidates, target, 0, [])
	return ret
}
```

### [40.组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/)

```javascript {.line-numbers}
//candidates有重复
var combinationSum2 = function (candidates, target) {
	const len = candidates.length,
		ret = []
	if (len === 0) return ret
	//剪枝前提
	candidates.sort((a, b) => a - b)

	const dfs = (candidates, remain, begin, path) => {
		if (remain === 0) {
			ret.push([...path])
			return
		}

		for (let i = begin, len = candidates.length; i < len; i++) {
			//大剪枝：减去 candidates[i] 小于 0，减去后面的 candidates[i + 1]、candidates[i + 2] 肯定也小于 0，因此用 break
			if (remain - candidates[i] < 0) break
			// 小剪枝：同一层相同数值的结点，从第 2 个开始，候选数更少，结果一定发生重复，因此跳过，用 continue
			if (i > begin && candidates[i - 1] === candidates[i]) continue

			path.push(candidates[i])
			dfs(candidates, remain - candidates[i], i + 1, path)
			path.pop()
		}
	}

	dfs(candidates, target, 0, [])
	return ret
}
```

### [46.全排列 M](https://leetcode-cn.com/problems/permutations/)

```javascript {.line-numbers}
//nums无重复
//dfs + backtrack
var permute = function (nums) {
	const len = nums.length,
		ret = []
	if (len === 0) return ret
	//space for time
	const visited = Array.from({ length: len }, () => false)

	const dfs = (nums, depth, path) => {
		if (depth === nums.length) {
			ret.push([...path])
			return
		}
		//每次都从开头枚,有visited标记
		for (let i = 0, len = nums.length; i < len; i++) {
			if (visited[i]) continue
			visited[i] = true
			dfs(nums, depth + 1, [...path, nums[i]])
			//backtrack
			visited[i] = false
		}
	}

	dfs(nums, 0, [])
	return ret
}
```

### [47.全排列 2M](https://leetcode-cn.com/problems/permutations-ii/)

```javascript {.line-numbers}
//nums有重复
var permuteUnique = function (nums) {
	const len = nums.length,
		ret = []
	if (len === 0) return ret

	const visited = Array.from({ length: len }, () => false)
	//升序或者降序都可以，剪枝前提
	nums.sort((a, b) => a - b)

	const dfs = (nums, depth, path, visited) => {
		if (depth === nums.length) {
			ret.push([...path])
			return
		}

		for (let i = 0, len = nums.length; i < len; i++) {
			if (visited[i]) continue
			//剪枝
			//和前一个元素值相同并且前一个元素还没有被使用过,否则其在下层遍历肯定会出现
			if (i > 0 && nums[i] === nums[i - 1] && !visited[i - 1]) continue

			path.push(nums[i])
			visited[i] = true
			dfs(nums, depth + 1, path, visited)
			path.pop()
			visited[i] = false
		}
	}

	dfs(nums, 0, [], visited)
	return ret
}
```

### [78.子集 M](https://leetcode-cn.com/problems/subsets/)

```javascript {.line-numbers}
//iteration
var subsets = function (nums) {
	const res = [[]]
	for (let i = 0; i < nums.length; i++) {
		//动态增加res
		res.forEach((item) => {
			res.push([...item, nums[i]])
		})
	}
	return res
}

//backtrack 1
var subsets = function (nums) {
	const ret = []
	const dfs = (nums, start, path) => {
		//在递归压栈前做事情
		ret.push([...path])
		for (let i = start, len = nums.length; i < len; i++) {
			path.push(nums[i])
			//i + 1不是start + 1
			dfs(nums, i + 1, path)
			path.pop()
		}
	}
	dfs(nums, 0, [])
	return ret
}

//backtrack 2
var subsets = function (nums) {
	const ret = []
	const dfs = (nums, index, path) => {
		if (index === nums.length) {
			ret.push([...path])
			return
		}
		path.push(nums[index])
		//choice
		dfs(nums, index + 1, path)
		path.pop()
		//no choice
		dfs(nums, index + 1, path)
	}
	dfs(nums, 0, [])
	return ret
}
```

### [90.子集 II](https://leetcode-cn.com/problems/subsets-ii/)

```javascript {.line-numbers}
var subsetsWithDup = function (nums) {
	const ret = []
	//重复需要排序!
	nums.sort((a, b) => a - b)
	const dfs = (nums, start, path) => {
		ret.push([...path])
		for (let i = start, len = nums.length; i < len; i++) {
			//剪枝
			if (i > start && nums[i] === nums[i - 1]) continue
			path.push(nums[i])
			//i + 1不是start + 1
			dfs(nums, i + 1, path)
			path.pop()
		}
	}
	dfs(nums, 0, [])
	return ret
}
```

### [51.N 皇后 H](https://leetcode-cn.com/problems/n-queens/)

```javascript {.line-numbers}
var solveNQueens = function (n) {
	if (n < 1) return []
	const solutions = [],
		cols = new Set(), //垂直线攻击位置
		pies = new Set(), //左对角线攻击位置
		nas = new Set() //右对角线攻击位置

	const dfs = (row, path) => {
		if (row >= n) {
			solutions.push([...path])
			return
		}

		for (let col = 0; col < n; col++) {
			if (cols.has(col) || pies.has(row + col) || nas.has(row - col)) continue

			cols.add(col)
			pies.add(row + col)
			nas.add(row - col)
			path.push(col)

			//drill down
			dfs(row + 1, path)

			//reverse
			cols.delete(col)
			pies.delete(row + col)
			nas.delete(row - col)
			path.pop()
		}
	}

	const generatorBoard = (solutions) => {
		return solutions.map((solution) => {
			return solution.map((position) => {
				return Array.from({ length: n }, (_, idx) => {
					return position === idx ? 'Q' : '.'
				}).join('')
			})
		})
	}

	dfs(0, [])
	return generatorBoard(solutions)
}
```

### [52.N 皇后 2H](https://leetcode-cn.com/problems/n-queens-ii/)

```javascript {.line-numbers}
var totalNQueens = function (n) {
	if (n < 1) return []
	let ret = 0
	const cols = new Set(),
		pies = new Set(),
		nas = new Set()
	const dfs = (row) => {
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

	const dfs = (n, row, col, pie, na) => {
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
			const p = bits & -bits

			//drill down next row
			dfs(n, row + 1, col | p, (pie | p) << 1, (na | p) >> 1)

			//打掉二进制数最后一位的1，及放上皇后
			bits &= bits - 1
		}
	}

	dfs(n, 0, 0, 0, 0)
	return ret
}
```
