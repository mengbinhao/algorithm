# 基本概念

# 解题要素

### [39.组合总和](https://leetcode-cn.com/problems/combination-sum/)

```javascript {.line-numbers}
//candidates无重复
var combinationSum = function (candidates, target) {
	const len = candidates.length,
		ret = []
	if (len === 0) return ret

	//出来的结果是倒序的
	const dfs = (candidates, remain, index, curState) => {
		if (index === candidates.length || remain < 0) return
		if (remain === 0) {
			ret.push(curState)
			return
		}
		//no choice
		dfs(candidates, remain, index + 1, curState)
		//choice
		//剪枝
		if (remain - candidates[index] >= 0) {
			dfs(candidates, remain - candidates[index], index, [
				...curState,
				candidates[index],
			])
		}
	}
	dfs(candidates, target, 0, [])
	return ret
}
```

### [40.组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/)

```javascript {.line-numbers}
//candidates有重复
var combinationSum2 = function (candidates, target) {
	//剪枝前提
	candidates.sort((a, b) => a - b)
	const ret = []

	const dfs = (candidates, begin, remain, curState, ret) => {
		if (remain === 0) {
			ret.push([...curState])
			return
		}

		for (let i = begin, len = candidates.length; i < len; i++) {
			//大剪枝：减去 candidates[i] 小于 0，减去后面的 candidates[i + 1]、candidates[i + 2] 肯定也小于 0，因此用 break
			if (remain - candidates[i] < 0) break
			// 小剪枝：同一层相同数值的结点，从第 2 个开始，候选数更少，结果一定发生重复，因此跳过，用 continue
			if (i > begin && candidates[i - 1] === candidates[i]) continue

			curState.push(candidates[i])
			dfs(candidates, i + 1, remain - candidates[i], curState, ret)
			//backtrack
			curState.pop()
		}
	}

	dfs(candidates, 0, target, [], ret)
	return ret
}
```

### [46.全排列 M](https://leetcode-cn.com/problems/permutations/)

```javascript {.line-numbers}
//回溯 dfs
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

		for (let i = 0; i < len; i++) {
			if (visited[i]) continue
			visited[i] = true
			dfs(nums, depth + 1, [...path, nums[i]])
			//reverse
			visited[i] = false
		}
	}

	dfs(nums, 0, [])
	return ret
}
```

### [47.全排列 2M](https://leetcode-cn.com/problems/permutations-ii/)

```javascript {.line-numbers}
var permuteUnique = function (nums) {
	const len = nums.length,
		ret = []
	if (len === 0) return ret

	let path = [],
		used = Array.from({ length: len }, () => false)
	// 排序(升序或者降序都可以)，排序是剪枝的前提
	nums.sort()

	const dfs = (nums, depth, path, used, ret) => {
		if (depth === nums.length) {
			ret.push([...path])
			return
		}

		for (let i = 0, len = nums.length; i < len; i++) {
			if (used[i]) continue
			// 剪枝
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

### [78.子集 M](https://leetcode-cn.com/problems/subsets/)

```javascript {.line-numbers}
//recursion
var subsets = function (nums) {
	const res = [[]]

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
