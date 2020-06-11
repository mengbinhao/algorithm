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
	if (grid.length < 1) return 0
	let m = grid.length
	let n = grid[0].length
	let islands = 0
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (grid[i][j] == 1) {
				islands++
				grid[i][j] = 0
				let queue = []
				queue.push([i, j])
				while (queue.length > 0) {
					let cur = queue.shift()
					let x = cur[0],
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
	return islands
}
// @lc code=end
numIslands([
	['1', '1', '1', '1', '0'],
	['1', '1', '0', '1', '0'],
	['1', '1', '0', '0', '0'],
	['0', '0', '0', '0', '0'],
])
