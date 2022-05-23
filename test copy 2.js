var levelOrder = function (root) {
	const ret = [],
		queue = []
	root && queue.push(root)
	while (queue.length) {
		const size = queue.length
		const curLevel = []
		for (let i = 0; i < size; i++) {
			const cur = queue.shift()
			curLevel.push(cur.val)
			if (cur.left) queue.push(root.left)
			if (cur.right) queue.push(root.right)
		}
		ret.push(curLevel)
	}
	return ret
}
