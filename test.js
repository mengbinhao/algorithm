var pathSum = function (root, sum) {
	const dfs = (root, sum, path) => {
		if (!root) return
		path.push(root.val)
		sum -= root.val
		if (!root.left && !root.right && sum === 0) {
			ret.push([...path])
		}
		dfs(root.left, sum, path)
		dfs(root.right, sum, path)
	}
	const ret = []

	dfs(root, sum, [])
	return ret
}
