### [54.螺旋矩阵](https://leetcode-cn.com/problems/spiral-matrix/)

```javascript {.line-numbers}
//O(n) - O(n) 没写directionIndex = (directionIndex + 1) % 4;

//O(n) - O(1)
var spiralOrder = function (matrix) {
	const ret = []
	if (matrix == null || matrix.length === 0 || matrix[0].length === 0) return

	const rows = matrix.length,
		cols = matrix[0].length
	let left = 0,
		right = cols - 1,
		top = 0,
		bottom = rows - 1

	while (left <= right && top <= bottom) {
		//上(top,left)...(top,right)
		for (let column = left; column <= right; column++) {
			ret.push(matrix[top][column])
		}
		//右(top + 1,right)...(bottom,right)
		for (let row = top + 1; row <= bottom; row++) {
			ret.push(matrix[row][right])
		}
		//下(bottom,right - 1)...(bottom,left + 1)
		//坐(bottom,left)...(top + 1,left)
		//handle one row or one column
		if (left < right && top < bottom) {
			for (let column = right - 1; column > left; column--) {
				ret.push(matrix[bottom][column])
			}
			for (let row = bottom; row > top; row--) {
				ret.push(matrix[row][left])
			}
		}
		left++
		right--
		top++
		bottom--
	}
	return ret
}
```

### [73.矩阵置零](https://leetcode-cn.com/problems/set-matrix-zeroes/)

```javascript {.line-numbers}
//O(mn) - O(mn) 直接把matrix值放到m*n的数组里面

//O(mn) - O(m + n) direct version
var setZeroes = function (matrix) {
	const rows = matrix.length,
		cols = matrix[0].length
	const impactedRows = new Set(),
		impactedCols = new Set()
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (matrix[i][j] === 0) {
				impactedRows.add(i)
				impactedCols.add(j)
			}
		}
	}

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (impactedRows.has(i) || impactedCols.has(j)) {
				matrix[i][j] = 0
			}
		}
	}
}

//O((MN)×(M+N)) - O(1)
//advanced version
var setZeroes = function (matrix) {
	const rows = matrix.length,
		cols = matrix[0].length,
		marked = -1000001
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (matrix[i][j] === 0) {
				for (let m = 0; m < rows; m++) {
					//不能影响到原本的0
					if (matrix[m][j] !== 0) {
						matrix[m][j] = marked
					}
				}
				for (let n = 0; n < cols; n++) {
					//不能影响到原本的0
					if (matrix[i][n] !== 0) {
						matrix[i][n] = marked
					}
				}
			}
		}
	}

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (matrix[i][j] === marked) {
				matrix[i][j] = 0
			}
		}
	}
}

//best version
var setZeroes = function (matrix) {
	const rows = matrix.length,
		cols = matrix[0].length
	let isCol = false
	for (let i = 0; i < rows; i++) {
		//handle one col
		if (matrix[i][0] === 0) {
			isCol = true
		}
		for (let j = 1; j < cols; j++) {
			if (matrix[i][j] === 0) {
				matrix[i][0] = 0
				matrix[0][j] = 0
			}
		}
	}

	for (let i = 1; i < rows; i++) {
		for (let j = 1; j < cols; j++) {
			if (matrix[i][0] === 0 || matrix[0][j] === 0) {
				matrix[i][j] = 0
			}
		}
	}

	if (matrix[0][0] === 0) {
		for (let j = 0; j < cols; j++) {
			matrix[0][j] = 0
		}
	}

	if (isCol) {
		for (let i = 0; i < rows; i++) {
			matrix[i][0] = 0
		}
	}
}
```

### [189.旋转数组 E](https://leetcode-cn.com/problems/rotate-array/)

```javascript {.line-numbers}
//brute force O(n*k) - O(1)
var rotate = function (nums, k) {
	const len = nums.length
	let previous, temp
	for (let i = 0; i < k; i++) {
		previous = nums[len - 1]
		for (let j = 0; j < len; j++) {
			temp = nums[j]
			nums[j] = previous
			previous = temp
		}
	}
}

//额外数组 O(n) - O(n)
var rotate = (nums, k) => {
	const len = nums.length,
		arr = new Array(len)
	for (let i = 0; i < len; i++) {
		//旋转后的数值位置
		arr[(i + k) % len] = nums[i]
	}
	for (let i = 0; i < len; i++) {
		nums[i] = arr[i]
	}
}

//数组翻转 O(n) - O(1)
// 1 翻转所有元素
// 2 翻转 [0, k\bmod n - 1][0,kmodn−1] 区间的元素
// 3 翻转 [k\bmod n, n - 1][kmodn,n−1] 区间的元素
var rotate = (nums, k) => {
	const reverse = (nums, start, end) => {
		while (start < end) {
			const temp = nums[start]
			nums[start] = nums[end]
			nums[end] = temp
			start++
			end--
		}
	}
	k %= nums.length
	reverse(nums, 0, nums.length - 1)
	reverse(nums, 0, k - 1)
	reverse(nums, k, nums.length - 1)
}
```
