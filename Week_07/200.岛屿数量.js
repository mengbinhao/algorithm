/*
 * @lc app=leetcode.cn id=200 lang=javascript
 *
 * [200] 岛屿数量
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
	let ret = 0
	if (!grid || !Array.isArray(grid) || grid.length === 0) return ret
	let row = grid.length,
		col = grid[0].length,
		queue = [],
		dirs = [
			[0, 1],
			[1, 0],
			[0, -1],
			[-1, 0],
		]

	let bfs = (grid, queue, dirs, row, col) => {
		while (queue.length > 0) {
			let cur = queue.shift()
			for (let [deltaX, deltaY] of dirs) {
				const x = cur[0] + deltaX,
					y = cur[1] + deltaY
				if (x < 0 || y < 0 || x >= row || y >= col || grid[x][y] === '0')
					continue

				grid[x][y] = '0'
				queue.push([x, y])
			}
		}
	}
	for (let i = 0; i < row; i++) {
		for (let j = 0; j < col; j++) {
			if (grid[i][j] === '1') {
				ret++
				grid[i][j] = '0'
				queue.push([i, j])
				bfs(grid, queue, dirs, row, col)
			}
		}
	}

	return ret
}
// @lc code=end
numIslands([
	['1', '1', '0', '0', '0'],
	['1', '1', '0', '0', '0'],
	['0', '0', '1', '0', '0'],
	['0', '0', '0', '1', '1'],
])
