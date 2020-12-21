var widthOfBinaryTree = function (root) {
	if (!root) return 0
	let ans = 1,
		que = [[0n, root]]
	while (que.length) {
		const width = que[que.length - 1][0] - que[0][0] + 1n
		if (width > ans) {
			ans = width
		}
		let tmp = []
		for (const [i, q] of que) {
			q.left && tmp.push([i * 2n, q.left])
			q.right && tmp.push([i * 2n + 1n, q.right])
		}
		que = tmp
	}
	return Number(ans)
}
