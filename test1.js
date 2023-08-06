var spiralOrder = function (matrix) {
	const rows = matrix.length,
		cols = matrix[0].length,
		total = rows * cols
	let visited = Array.from({ length: rows }, () => new Array(cols)),
		directions = [
			[0, 1],
			[1, 0],
			[0, -1],
			[-1, 0],
		],
		row = 0,
		col = 0,
		direction = 0,
		ret = []
	for (let i = 0; i < total; i++) {
		ret[i] = matrix[row][col]
		visited[row][col] = true
		const nextRow = row + directions[direction][0]
		const nextCol = col + directions[direction][1]
		if (
			nextRow < 0 ||
			nextRow >= rows ||
			nextCol < 0 ||
			nextCol >= cols ||
			visited[nextRow][nextCol]
		) {
			direction = (direction + 1) % 4
		}
		row += directions[direction][0]
		col += directions[direction][1]
	}
	return ret
}
