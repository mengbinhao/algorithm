学习笔记

##### [515.在每个树行中找最大值 M](https://leetcode-cn.com/problems/find-largest-value-in-each-tree-row/)

```javascript
//dfs
var largestValues = function (root) {
	let ret = []

	let dfs = (node, ret, level) => {
		if (!node) return
		//if it is new level, just add val
		if (ret[level] === undefined) {
			ret[level] = node.val
		} else {
			ret[level] = Math.max(ret[level], node.val)
		}
		dfs(node.left, ret, level + 1)
		dfs(node.right, ret, level + 1)
	}

	dfs(root, ret, 0)
	return ret
}

//bfs
var largestValues = function (root) {
	let ret = []
	if (!root) return ret
	let queue = [root]

	while (queue.length > 0) {
		let len = queue.length,
			max = -Infinity
		//loop each level
		for (let i = 0; i < len; i++) {
			let temp = queue.shift()
			if (temp.left !== null) {
				queue.push(temp.left)
			}
			if (temp.right !== null) {
				queue.push(temp.right)
			}
			max = Math.max(max, temp.val)
		}
		ret.push(max)
	}
	return ret
}
```

##### [69.X 的平方根 E](https://leetcode-cn.com/problems/sqrtx/)

```javascript
//1 单调性 2上下边 3 可以index访问(可选)
var mySqrt = function (x) {
	if (x < 2) return x

	let left = 0,
		right = x,
		mid

	while (left <= right) {
		mid = Number.parseInt(left + (right - left) / 2)

		if (mid * mid === x) {
			return mid
		} else if (mid * mid > x) {
			right = mid - 1
		} else {
			left = mid + 1
		}
	}

	return right
}
```

##### [367.有效的完全平方数 E](https://leetcode-cn.com/problems/valid-perfect-square/)

```javascript
var isPerfectSquare = function (num) {
	if (num < 2) return true
	let left = 2,
		right = num,
		mid

	while (left <= right) {
		mid = Number.parseInt(left + (right - left) / 2)
		if (mid * mid === num) {
			return true
		}

		if (mid * mid < num) {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}

	return false
}
```

##### [153.寻找旋转数组中的最小值 M](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)

```javascript
var findMin = function (nums) {
	if (!nums || !Array.isArray(nums) || nums.length === 0) return null
	if (nums.length === 1) return nums[0]

	let left = 0,
		right = nums.length - 1,
		mid
	//in case array is a sorted array
	if (nums[right] > nums[left]) return nums[0]
	while (left <= right) {
		mid = Math.floor(left + (right - left) / 2)

		//judge according to nums[mid]
		if (nums[mid] > nums[mid + 1]) {
			return nums[mid + 1]
		}

		//judge according to nums[mid]
		if (nums[mid] < nums[mid - 1]) {
			return nums[mid]
		}

		//binary search
		if (nums[mid] > nums[0]) {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}

	return null
}
```

##### [33.搜索旋转排序数组 M](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)

```javascript
var search = function (nums, target) {
	if (!nums || !Array.isArray(nums) || !nums.length) return -1
	if (typeof target !== 'number' || !Number.isInteger(target)) return -1

	let left = 0,
		right = nums.length - 1,
		mid

	while (left <= right) {
		mid = Number.parseInt(left + (right - left) / 2)
		if (nums[mid] === target) {
			return mid
		}

		//left is asc
		//incase mid === left
		if (nums[mid] >= nums[left]) {
			if (target < nums[mid] && target >= nums[left]) {
				right = mid - 1
			} else {
				left = mid + 1
			}
		} else {
			if (target > nums[mid] && target <= nums[right]) {
				left = mid + 1
			} else {
				right = mid - 1
			}
		}
	}

	return -1
}
```

##### [81.搜索旋转排序数组 2M](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/)

```javascript
var search = function (nums, target) {
	if (!nums || !Array.isArray(nums)) return false
	let len = nums.length
	if (!len) return false
	if (len === 1) {
		return nums[0] === target
	}

	let left = 0,
		right = len - 1,
		mid

	while (left <= right) {
		mid = Math.floor(left + (right - left) / 2)

		if (nums[mid] === target) {
			return true
		}

		//move left pointer to exclude repeat item, or we can not define the monotonic section
		if (nums[left] === nums[mid]) {
			left++
			continue
		}

		if (nums[mid] >= nums[left]) {
			if (target < nums[mid] && target >= nums[left]) {
				right = mid - 1
			} else {
				left = mid + 1
			}
		} else {
			if (target > nums[mid] && target <= nums[right]) {
				left = mid + 1
			} else {
				right = mid - 1
			}
		}
	}

	return false
}
```

##### [200.岛屿数量 M](https://leetcode-cn.com/problems/number-of-islands/)

```javascript
//DFS
var numIslands = function (grid) {
	let ret = 0
	if (!grid || !Array.isArray(grid) || grid.length === 0) return ret

	let row = grid.length,
		col = grid[0].length

	const dfs = (grid, i, j, row, col) => {
		//terminator
		if (i < 0 || j < 0 || i >= row || j >= col || grid[i][j] === '0') return

		//process current logic
		//marked as zero
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
	const m = grid.length,
		n = grid[0].length
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (grid[i][j] === '1') {
				ret++
				//marked as zero
				grid[i][j] = 0
				//store each level's item
				const queue = []
				//二维转一维
				//queue.add(i * n + j);
				queue.push([i, j])
				while (queue.length > 0) {
					const cur = queue.shift(),
						x = cur[0],
						y = cur[1]
					//往左
					if (x - 1 >= 0 && grid[x - 1][y] == 1) {
						queue.push([x - 1, y])
						grid[x - 1][y] = 0
					}
					//往右
					if (x + 1 < m && grid[x + 1][y] == 1) {
						queue.push([x + 1, y])
						grid[x + 1][y] = 0
					}
					//往上
					if (y - 1 >= 0 && grid[x][y - 1] == 1) {
						queue.push([x, y - 1])
						grid[x][y - 1] = 0
					}
					//往下
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
```
