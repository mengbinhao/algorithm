学习笔记

##### [79单词搜索](https://leetcode-cn.com/problems/word-search/)

```javascript
//DFS Time Exceeded
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
```

##### [208实现Trie](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)

```javascript
var TrieNode = function () {
	//next[i]保存着下一个字符i的节点引用
	this.next = {}
	//当前节点是否可以作为一个单词的结束位置
	this.isEnd = false
}

var Trie = function () {
	this.root = new TrieNode()
}

Trie.prototype.insert = function (word) {
	if (!word) return false

	let node = this.root

	for (let i = 0; i < word.length; i++) {
		if (!node.next[word[i]]) {
			node.next[word[i]] = new TrieNode()
		}
		node = node.next[word[i]]
	}
	node.isEnd = true
	return true
}

Trie.prototype.search = function (word) {
	if (!word) return false

	let node = this.root

	for (let i = 0; i < word.length; i++) {
		if (node.next[word[i]]) {
			node = node.next[word[i]]
		} else {
			return false
		}
	}

	return node.isEnd
}

Trie.prototype.startsWith = function (prefix) {
	if (!prefix) return true

	let node = this.root
	for (let i = 0; i < prefix.length; i++) {
		if (node.next[prefix[i]]) {
			node = node.next[prefix[i]]
		} else {
			return false
		}
	}

	return true
}
```

##### [547朋友圈](https://leetcode-cn.com/problems/friend-circles/) ==backlog==

```javascript
var findCircleNum = function (M) {
	if (!M || !Array.isArray(M) || M.length === 0) return
	let len = M.length,
		visited = Array.from({ length: len }).fill(0),
		ret = 0

	let dfs = (i, M, len, visited) => {
		for (let j = 0; j < len; j++) {
			if (M[i][j] === 1 && visited[j] === 0) {
				//存在朋友圈即标注
				visited[j] = 1
				dfs(j, M, len, visited)
			}
		}
	}

	for (let i = 0; i < len; i++) {
		if (visited[i] === 0) {
			//visited[i] = 1
			dfs(i, M, len, visited)
			ret++
		}
	}
	return ret
}
```

##### [200岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)

```javascript
//DFS
var numIslands = function (grid) {
	let ret = 0
	if (!grid || !Array.isArray(grid) || grid.length === 0) return ret
	let row = grid.length,
		col = grid[0].length

	let dfs = (grid, i, j, row, col) => {
		//terminator
		if (i < 0 || j < 0 || i >= row || j >= col || grid[i][j] === '0') return

		//process current logic
		grid[i][j] = '0'

		//drill down
		dfs(grid, i + 1, j, row, col)
		dfs(grid, i, j + 1, row, col)
		dfs(grid, i - 1, j, row, col)
		dfs(grid, i, j - 1, row, col)
	}

	for (let i = 0; i < row; i++) {
		for (let j = 0; j < col; j++) {
			if (grid[i][j] === '1') {
				ret++
				dfs(grid, i, j, row, col)
			}
		}
	}

	return ret
}


//BFS
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
					y = cur[1] + deltaYBFS
				if (x < 0 || y < 0 || x >= row || y >= col || grid[x][y] === '0')
					continueBFS

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
```

##### [130被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions/)

```javascript
//DFS
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
```

##### [36有效的数独](https://leetcode-cn.com/problems/valid-sudoku/)

```javascript
var isValidSudoku = function (board) {
	let rows = {}, //记录每行对应的key
		columns = {}, //记录每列对应的key
		boxes = {} //记录每个小数独对应的key

	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			let num = board[i][j]
			if (num !== '.') {
				//子数独序号
				let boxIndex = Number.parseInt(i / 3) * 3 + Number.parseInt(j / 3)
				if (
					rows[i + '-' + num] ||
					columns[j + '-' + num] ||
					boxes[boxIndex + '-' + num]
				)
					return false

				rows[i + '-' + num] = true
				columns[j + '-' + num] = true
				boxes[boxIndex + '-' + num] = true
			}
		}
	}

	return true
}
```

