var spiralOrder = function (matrix) {
	let top = 0 //赋值上下左右边界
	bottom = matrix.length - 1
	left = 0
	right = matrix[0].length - 1
	const ret = []
	while (true) {
		for (let i = left; i <= right; i++) ret.push(matrix[top][i]) //向右移动直到最右
		if (++top > bottom) break //重新设定上边界，若上边界大于下边界，则遍历遍历完成，下同
		for (let i = top; i <= bottom; i++) ret.push(matrix[i][right]) //向下
		if (--right < left) break //重新设定有边界
		for (let i = right; i >= left; i--) ret.push(matrix[bottom][i]) //向左
		if (--bottom < top) break //重新设定下边界
		for (let i = bottom; i >= top; i--) ret.push(matrix[i][left]) //向上
		if (++left > right) break //重新设定左边界
	}
	return ret
}
console.log(
	spiralOrder([
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	])
)
