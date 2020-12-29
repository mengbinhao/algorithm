var permute = function (nums) {
	const len = nums.length,
		ans = []
	if (len === 0) return ans
	//store those number which have been visited
	const visited = Array.from({ length: len }, () => false)

	const dfs = (nums, depth, curState) => {
		if (depth === nums.length) {
			ans.push(curState)
			return
		}

		for (let i = 0, len = nums.length; i < len; i++) {
			if (visited[i]) continue
			visited[i] = true
			dfs(nums, depth + 1, [...curState, nums[i]])
			//reverse
			visited[i] = false
		}
	}
	dfs(nums, 0, [])
	return ans
}

console.log(permute([1, 2, 3]))
