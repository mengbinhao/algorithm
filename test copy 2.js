var largestRectangleArea = function (heights) {
	let len = heights.length
	if (len === 0) return 0
	if (len === 1) return heights[0]
	let ret = 0
	const tmp = new Array(len + 2).fill(0)
	for (let i = 0; i < len; i++) {
		tmp[i + 1] = heights[i]
	}
	len += 2
	heights = tmp
	const stack = [0]
	for (let i = 1; i < len; i++) {
		while (heights[stack[stack.length - 1]] > heights[i]) {
			const height = heights[stack.pop()]
			const width = i - stack[stack.length - 1] - 1
			ret = Math.max(ret, height * width)
		}
		stack.push(i)
	}
	return ret
}
largestRectangleArea([2, 1, 5, 6, 2, 3])
