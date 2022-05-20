var zigzagLevelOrder = function (root) {
	const ret = [],
		queue = []
	let direction = true
	root && queue.push(root)

	while (queue.length) {
		const size = queue.length
		const curLevel = []
		for (let i = 0; i < size; i++) {
			const cur = queue.shift()
			direction ? curLevel.push(cur.val) : curLevel.unshift(cur.val)
			if (cur.left) queue.push(cur.left)
			if (cur.right) queue.push(cur.right)
		}
		ret.push(curLevel)
		direction = !direction
	}
	return ret
}
