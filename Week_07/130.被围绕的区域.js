/*
 * @lc app=leetcode.cn id=130 lang=javascript
 *
 * [130] 被围绕的区域
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
	if (!board || !Array.isArray(board) || board.length === 0) return board

	let row = board.length,
		col = board[0].length

	for (let i = 0; i < row; i++) {
		for (let j = 0; j < col; j++) {
			//from edge dfs, to mark O to #
			let isEdge = i === 0 || j === 0 || i === row - 1 || j === col - 1
			if (isEdge && board[i][j] === 'O') {
				dfs(board, i, j, row, col)
			}
		}
	}

	for (let i = 0; i < row; i++) {
		for (let j = 0; j < col; j++) {
			//left O change to X
			if (board[i][j] === 'O') board[i][j] = 'X'
			//reverse O those can not be changed
			if (board[i][j] === '#') board[i][j] = 'O'
		}
	}

	function dfs(board, i, j, row, col) {
		if (
			i < 0 ||
			j < 0 ||
			i >= row ||
			j >= col ||
			board[i][j] === 'X' ||
			board[i][j] === '#'
		)
			return

		board[i][j] = '#'

		dfs(board, i - 1, j, row, col)
		dfs(board, i + 1, j, row, col)
		dfs(board, i, j - 1, row, col)
		dfs(board, i, j + 1, row, col)
	}

	return board
}
// @lc code=end
