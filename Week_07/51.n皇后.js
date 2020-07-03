/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N皇后
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
	let ret = []
	if (n < 1) return []

	let cols = new Set(),
		pies = new Set(),
		nas = new Set()

	dfs(ret, 0, [])

	return generateBoard(ret)

	function dfs(ret, row, curState) {
		if (row >= n) {
			ret.push([...curState])
		}

		for (let col = 0; col < n; col++) {
			if (cols.has(col) || pies.has(row + col) || nas.has(row - col)) continue

			cols.add(col)
			pies.add(row + col)
			nas.add(row - col)
			curState.push(col)

			dfs(ret, row + 1, curState)

			cols.delete(col)
			pies.delete(row + col)
			nas.delete(row - col)
			curState.pop()
		}
	}

	function generateBoard(ret) {
		return ret.map((solution) => {
			return solution.map((point) => {
				return Array.from({ length: n }, (_, idx) => {
					return point === idx ? 'Q' : '.'
				})
			})
		})
	}
} // @lc code=end
solveNQueens(4)
