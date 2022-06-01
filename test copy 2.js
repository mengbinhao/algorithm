var isValidSudoku = function (board) {
	const rows = {}, //记录每行对应的key
		columns = {}, //记录每列对应的key
		boxes = {} //记录每个小数独对应的key

	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			let num = board[i][j]
			if (num !== '.') {
				//计算子数独序号
				const boxIdx = Number.parseInt(i / 3) * 3 + Number.parseInt(j / 3)
				if (
					rows[i + '-' + num] ||
					columns[j + '-' + num] ||
					boxes[boxIdx + '-' + num]
				)
					return false
				//标记
				rows[i + '-' + num] = true
				columns[j + '-' + num] = true
				boxes[boxIdx + '-' + num] = true
			}
		}
	}
	console.log(boxes)
	return true
}

isValidSudoku([
	['5', '3', '.', '.', '7', '.', '.', '.', '.'],
	['6', '.', '.', '1', '9', '5', '.', '.', '.'],
	['.', '9', '8', '.', '.', '.', '.', '6', '.'],
	['8', '.', '.', '.', '6', '.', '.', '.', '3'],
	['4', '.', '.', '8', '.', '3', '.', '.', '1'],
	['7', '.', '.', '.', '2', '.', '.', '.', '6'],
	['.', '6', '.', '.', '.', '.', '2', '8', '.'],
	['.', '.', '.', '4', '1', '9', '.', '.', '5'],
	['.', '.', '.', '.', '8', '.', '.', '7', '9'],
])
