var zigzagLevelOrder = function (root) {
	const ret = [],
		queue = []

	root && queue.push(root)
	let direction = true
	while (queue.length > 0) {
		const size = queue.length,
			curLevel = []
		for (let i = 0; i < size; i++) {
			const cur = queue.shift()
			direction ? curLevel.push(cur.val) : curLevel.unshift(cur.val)
			if (cur.left) queue.push(cur.left)
			if (cur.right) queue.push(cur.right)
		}
		direction = !direction
		ret.push(curLevel)
	}
	return ret
}
