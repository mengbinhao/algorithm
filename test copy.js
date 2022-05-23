var levelOrder = function (root) {
	const ret = [],
		queue = []

	root && queue.push(root)
	while (queue.length > 0) {
		const size = queue.length,
			curLevel = []
		for (let i = 0; i < size; i++) {
			const cur = queue.shift()
			curLevel.push(cur.val)
			if (cur.left) queue.push(cur.left)
			if (cur.right) queue.push(cur.right)
		}
		ret.push(curLevel)
	}
	return ret
}
