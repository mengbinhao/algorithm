var combinationSum = function (candidates, target) {
	const len = candidates.length,
		ret = []
	if (len === 0) return ret

	const dfs = (candidates, remain, index, curState, ret) => {
		if (index === candidates.length || remain < 0) return
		if (remain === 0) {
			ret.push(curState)
			return
		}

		dfs(candidates, remain, index + 1, curState, ret)
		
		dfs(
			candidates,
			remain - candidates[index],
			index,
			[...curState, candidates[index]],
			ret
		)
	}

	dfs(candidates, target, 0, [], ret)
	return ret
}

console.log(combinationSum([2, 3, 6, 7], 7))

//combinationSum2([2, 5, 2, 1, 2], 5)
