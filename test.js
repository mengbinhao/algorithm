var generateParenthesis = function (n) {
	const ret = []
	let count = 0

	const dfs = (left, right, n, str) => {
		console.log(++count)
		if (left === n && right === n) {
			ret.push(str)
			return
		}

		if (left < n) {
			dfs(left + 1, right, n, `${str}(`)
		}

		if (left > right) {
			dfs(left, right + 1, n, `${str})`)
		}
	}
	dfs(0, 0, n, '')
	return ret
}

console.log(generateParenthesis(2))
