var combinationSum = function (candidates, target) {
	const ans = []
	const dfs = (target, combine, idx) => {
		if (idx === candidates.length) return
		if (target === 0) {
			ans.push(combine)
			return
		}

		//不选择当前数
		dfs(target, combine, idx + 1)
		//选择当前数，注意可重复
		if (target - candidates[idx] > 0) {
			dfs(target - candidates[idx], [...combine, candidates[idx]], idx)
		}
	}

	dfs(target, [], 0)

	return ans
}
