/*
 * @lc app=leetcode.cn id=79 lang=javascript
 *
 * [79] 单词搜索
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
	if (!board || board.length === 0 || !word) return false
	let row = board.length,
		col = board[0].length,
		visited = new Array(row),
		directions = [
			[0, -1],
			[-1, 0],
			[0, 1],
			[1, 0],
		]

	//init visited
	for (let i = 0; i < visited.length; i++) {
		visited[i] = Array.from({ length: col }, () => false)
	}

	for (let i = 0; i < row; i++) {
		for (let j = 0; i < col; j++) {
			if (dfs(board, word, 0, i, j, row, col, visited, directions)) return true
		}
	}

	return false
}

function dfs(board, word, level, i, j, row, col, visited, directions) {
	if (level === word.length - 1) {
		return board[i][j] === word[level]
	}

	if (board[i][j] === word[level]) {
		visited[i][j] = true
		for (let [deltaX, deltaY] of directions) {
			let newX = i + deltaX,
				newY = j + deltaY
			if (isValid(newX, newY, row, col) && !visited[newX][newY]) {
				if (
					dfs(board, word, level + 1, newX, newY, row, col, visited, directions)
				)
					return true
			}
		}
		visited[i][j] = false
	}
}

function isValid(x, y, row, col) {
	return x >= 0 && x < row && y >= 0 && y < col
}
// @lc code=end
exist(
	[
		['A', 'B', 'C', 'E'],
		['S', 'F', 'C', 'S'],
		['A', 'D', 'E', 'E'],
	],
	'ABCCED'
)
