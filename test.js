var numIslands = function (grid) {
	let ret = 0
	if (!grid || !Array.isArray(grid) || grid.length === 0) return ret
	const m = grid.length,
		n = grid[0].length
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (grid[i][j] === '1') {
				ret++
				//marked as zero
				grid[i][j] = 0
				//store each level item
				const queue = []
				//二维转一维
				//queue.add(i * n + j);
				queue.push([i, j])
				while (queue.length > 0) {
					const cur = queue.shift(),
						x = cur[0],
						y = cur[1]
					if (x - 1 >= 0 && grid[x - 1][y] == 1) {
						queue.push([x - 1, y])
						grid[x - 1][y] = 0
					}
					if (x + 1 < m && grid[x + 1][y] == 1) {
						queue.push([x + 1, y])
						grid[x + 1][y] = 0
					}
					if (y - 1 >= 0 && grid[x][y - 1] == 1) {
						queue.push([x, y - 1])
						grid[x][y - 1] = 0
					}
					if (y + 1 < n && grid[x][y + 1] == 1) {
						queue.push([x, y + 1])
						grid[x][y + 1] = 0
					}
				}
			}
		}
	}
	return ret
}

var a1 = [2, 3, 1, 1, 4]
var a2 = [3, 2, 1, 0, 4]

numIslands([
	['1', '1', '1'],
	['1', '1', '0'],
	['1', '1', '0'],
	['0', '0', '0'],
])
