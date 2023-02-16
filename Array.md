### [1.==两数之和 E==](https://leetcode-cn.com/problems/two-sum/)

```javascript
//brute force O(n^2) - O(1)
var twoSum = function (nums, target) {
	if (!Array.isArray(nums) || nums.length < 2) {
		throw new TypeError(`invalid parameter, nums=${nums}`)
	}
	if (
		typeof target !== 'number' ||
		Number.isNaN(target) ||
		!Number.isFinite(target)
	) {
		throw new TypeError(`invalid parameter, target=${target}`)
	}
	for (let i = 0, len = nums.length; i < len - 1; i++) {
		for (let j = i + 1; j < len; j++) {
			if (nums[i] + nums[j] === target) return [i, j]
		}
	}
}

//两次哈希 O(n) - O(n)
//obj or map
var twoSum = function (nums, target) {
	const hash = {},
		len = nums.length
	for (let i = 0; i < len; i++) {
		//[2, 7] 9, store 7,the below loop search 7
		hash[target - nums[i]] = i
	}
	for (let j = 0; j < len; j++) {
		//exclude hash[nums[j]] is falsy and same item
		if (hash[nums[j]] !== undefined && hash[nums[j]] !== j) {
			return [j, hash[nums[j]]]
		}
	}
}

//一次哈希 optimal,先判断要找的值在不在hash里面，再放要找的值则不需要判重
//obj or map
var twoSum = function (nums, target) {
	const hash = {}
	for (let i = 0, len = nums.length; i < len; i++) {
		//exclude hash[nums[i]] is falsy
		if (hash[nums[i]] !== undefined) return [hash[nums[i]], i]
		hash[target - nums[i]] = i
	}
}
```

### [11.==装最多水的容器 M==](https://leetcode-cn.com/problems/container-with-most-water/)

```javascript
//brute force O(n^2) - O(1)
var maxArea = function (height) {
	let maxArea = 0
	for (let l = 0; l < height.length - 1; l++) {
		for (let r = l + 1; r < height.length; r++) {
			maxArea = Math.max(maxArea, Math.min(height[l], height[r]) * (r - l))
		}
	}
	return maxArea
}

//two pointer夹逼 O(n) - O(1)
var maxArea = function (height) {
	let l = 0,
		r = height.length - 1,
		maxArea = 0
	while (l < r) {
		maxArea = Math.max(maxArea, Math.min(height[l], height[r]) * (r - l))
		height[l] < height[r] ? l++ : r--
	}
	return maxArea
}
```

### [15.==三数之和 M==](https://leetcode-cn.com/problems/3sum/)

```javascript
//brute force O(n^3) O(1) TLE
var threeSum = function (nums) {
	const ret = []
	if (nums == null || nums.length < 3) return ret
	const len = nums.length,
		map = {}
	for (let i = 0; i < len - 2; i++) {
		for (let j = i + 1; j < len - 1; j++) {
			for (let k = j + 1; k < len; k++) {
				if (nums[i] + nums[j] + nums[k] === 0) {
					//去重
					const key = [nums[i], nums[j], nums[k]].sort()
					//incase falsy
					if (map[key] === undefined) {
						map[key] = true
						ret.push([nums[i], nums[j], nums[k]])
					}
				}
			}
		}
	}
	return ret
}

//Hash O(n^2) O(n)
var threeSum = function (nums) {
	let arr = []
	if (!nums) return arr
	const len = nums.length
	if (len < 3) return arr
	//precondition!!!!!!
	nums.sort((a, b) => a - b)
	for (var i = 0; i < len - 2; i++) {
		if (nums[i] > 0) break
		if (i > 0 && nums[i] == nums[i - 1]) continue
		const hash = new Map()
		for (var j = i + 1; j < len; j++) {
			//要找的第三个值
			const val = -(nums[i] + nums[j])
			// 前三个数组成的结果肯定不重且防越界，所以j > i + 2
			if (j > i + 2 && nums[j] == nums[j - 1] && nums[j] == nums[j - 2])
				continue
			//hash是首次记录第二次才会push到数组
			if (hash.has(val)) {
				arr.push([nums[i], nums[hash.get(val)], nums[j]])
				//使用完删除防止重复，比如[-2, 0, 0, 2, 2]
				hash.delete(val)
			}
			hash.set(nums[j], j)
		}
	}
	return arr
}

//夹逼  O(n^2) - O(1)
var threeSum = function (nums) {
	const len = nums.length
	//precondition!!!!!!
	nums.sort((a, b) => a - b)
	const ret = []
	//不重复的三个数
	for (let i = 0; i < len - 2; i++) {
		if (nums[i] > 0) break
		if (i > 0 && nums[i] === nums[i - 1]) continue
		let l = i + 1,
			r = len - 1
		while (l < r) {
			const sum = nums[i] + nums[l] + nums[r]
			if (sum === 0) {
				ret.push([nums[i], nums[l], nums[r]])
				while (nums[l] === nums[l + 1]) l++
				l++ //跳到不重复的那个数
				while (nums[r] === nums[r - 1]) r--
				r-- //跳到不重复的那个数
			} else if (sum > 0) {
				r--
			} else {
				l++
			}
		}
	}
	return ret
}
```

### [26.==删除排序数组重复项 E==](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

```javascript
//slow - fast pointer
var removeDuplicates = function (nums) {
	const len = nums.length
	if (len === 0) return 0
	let slow = 0,
		fast = 1
	while (fast < len) {
		if (nums[slow] !== nums[fast]) nums[++slow] = nums[fast]
		fast++
	}
	return slow + 1
}
```

### [27.==移除元素==](https://leetcode.cn/problems/remove-element/)

```javascript
//slow - fast pointer
var removeElement = (nums, val) => {
	let slow = 0
	for (let fast = 0; fast < nums.length; fast++) {
		if (nums[fast] !== val) nums[slow++] = nums[fast]
	}
	return slow
}
```

### [45.==跳跃游戏 II M==](https://leetcode-cn.com/problems/jump-game-ii/)

```javascript
var jump = function (nums) {
	let steps = 0,
		//边界
		end = 0,
		maxPosition = 0
	//如果访问最后一个元素，在边界正好为最后一个位置的情况下，会多一次「不必要的跳跃次数」
	for (let i = 0, len = nums.length; i < len - 1; i++) {
		//不停更新当前位置能跳到的最远位置
		maxPosition = Math.max(maxPosition, nums[i] + i)
		//跳到"上一次"能跳到的最远位置更新边界
		if (i === end) {
			end = maxPosition
			steps++
		}
	}
	return steps
}
```

### [48.==旋转图像==](https://leetcode.cn/problems/rotate-image/)

```javascript
//非原地旋转
var rotate = function (matrix) {
	const n = matrix.length
	const tmp = Array.from({ length: n }, () => new Array(n))
	//matrix[i][j]变成 matrix[j][n - i - 1]
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			tmp[j][n - i - 1] = matrix[i][j]
		}
	}
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			matrix[i][j] = tmp[i][j]
		}
	}
}

//原地旋转，找到4个旋转坐标规律
var rotate = function (matrix) {
	const n = matrix.length
	//matrix[i][j]变成 matrix[j][n - i - 1]
	//考虑奇偶两种情况，当n为奇数，等分4个区域；当n为偶数，j多一位，中间格子无需转换
	//i只需走一半
	for (let i = 0; i < Math.floor(n / 2); i++) {
		for (let j = 0; j < Math.floor((n + 1) / 2); j++) {
			//左往右看同链表
			const temp = matrix[i][j]
			matrix[i][j] = matrix[n - j - 1][i]
			matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1]
			matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1]
			matrix[j][n - i - 1] = temp
		}
	}
}

//原地翻转两次
var rotate = function (matrix) {
	const n = matrix.length
	//上下翻转
	for (let i = 0; i < Math.floor(n / 2); i++) {
		for (let j = 0; j < n; j++) {
			;[matrix[n - i - 1][j], matrix[i][j]] = [
				matrix[i][j],
				matrix[n - i - 1][j],
			]
		}
	}
	//沿对角线左下翻转右上
	for (let i = 1; i < n; i++) {
		for (let j = 0; j < i; j++) {
			;[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
		}
	}
}
```

### [54.==螺旋矩阵==](https://leetcode-cn.com/problems/spiral-matrix/)

```javascript {.line-numbers}
//O(n) - O(n) 偏移量解法
var spiralOrder = function (matrix) {
	const rows = matrix.length,
		cols = matrix[0].length,
		total = rows * cols
  //let visited = new Array(rows).fill(0).map(() => new Array(columns).fill(0))
	let visited = Array.from({ length: rows }, () => new Array(cols)),
		directions = [
			[0, 1],
			[1, 0],
			[0, -1],
			[-1, 0],
		],
		row = 0,
		col = 0,
		direction = 0,
     //ret = new Array(total)
     ret = [],
	for (let i = 0; i < total; i++) {
		ret[i] = matrix[row][col]
    //marked
		visited[row][col] = true
		const nextRow = row + directions[direction][0]
		const nextCol = col + directions[direction][1]
    //check
		if (
			nextRow < 0 ||
			nextRow >= rows ||
			nextCol < 0 ||
			nextCol >= cols ||
			visited[nextRow][nextCol]
		) {
			direction = (direction + 1) % 4
		}
		row += directions[direction][0]
		col += directions[direction][1]
	}
	return ret
}

//O(mn) - O(1) 四指针
var spiralOrder = function (matrix) {
	let top = 0,
		bottom = matrix.length - 1,
		left = 0,
		right = matrix[0].length - 1,
     ret = []
	while (true) {
		//向右移动直到最右
		for (let i = left; i <= right; i++) ret.push(matrix[top][i])
		//update上边界，若上边界大于下边界则跳出，下同
		if (++top > bottom) break
		//向下
		for (let i = top; i <= bottom; i++) ret.push(matrix[i][right])
		if (--right < left) break
		//向左
		for (let i = right; i >= left; i--) ret.push(matrix[bottom][i])
		if (--bottom < top) break
		//向上
		for (let i = bottom; i >= top; i--) ret.push(matrix[i][left])
		if (++left > right) break
	}
	return ret
}
```

### [52.螺旋矩阵 II](https://leetcode-cn.com/problems/spiral-matrix-ii/)

```javascript {.line-numbers}
var generateMatrix = function (n) {
	let left = 0,
		right = n - 1,
		top = 0,
		bottom = n - 1
	//new Array(n).fill(0).map(() => new Array(n)),直接new Array(n)空数组项map会跳过
	const ret = Array.from({ length: n }, () => new Array(n))
	let num = 1
	while (num <= n * n) {
		// left to right
		for (let i = left; i <= right; i++) ret[top][i] = num++
		top++
		// top to bottom
		for (let i = top; i <= bottom; i++) ret[i][right] = num++
		right--
		// right to left
		for (let i = right; i >= left; i--) ret[bottom][i] = num++
		bottom--
		// bottom to top
		for (let i = bottom; i >= top; i--) ret[i][left] = num++
		lef++
	}
	return ret
}
```

### [55.==跳跃游戏 M==](https://leetcode-cn.com/problems/jump-game/)

```javascript
var canJump = function (nums) {
	const len = nums.length
	//能够跳到的最远位置
	let maxPosition = 0
	for (let i = 0; i < len; i++) {
		//若当前位置都跳不到,后面就更跳不到了
		if (maxPosition < i) return false
		//更新max为当前能走到的最远位置
		maxPosition = Math.max(nums[i] + i, maxPosition)
	}
	//当前位置跳跃距离是否能跳到数组末尾或超过数组长度
	return maxPosition >= len - 1
}
```

### [66.==加一 E==](https://leetcode-cn.com/problems/plus-one/)

```javascript
var plusOne = function (digits) {
	const len = digits.length
	for (let i = len - 1; i >= 0; i--) {
		digits[i]++
		//变回个位数
		digits[i] %= 10
		//检查是否还需要进位，若不需要直接返回
		if (digits[i] !== 0) return digits
	}
	//全部加完还需要进位的情况
	digits = Array.from({ length: len + 1 }, (_, idx) => {
		if (idx === 0) return 1
		return 0
	})
	return digits
}
```

### [73.==矩阵置零==](https://leetcode-cn.com/problems/set-matrix-zeroes/)

```javascript {.line-numbers}
//O(mn) - O(mn) 直接把matrix值放到m*n的二维数组里面

//O(mn) - O(m + n) direct version
var setZeroes = function (matrix) {
	const rows = matrix.length,
		cols = matrix[0].length,
		markedRow = new Array(rows).fill(false),
		markedCol = new Array(cols).fill(false)
	//先循环记录需要待转换的行或列
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (matrix[i][j] === 0) markedRow[i] = markedCol[j] = true
		}
	}
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (markedRow[i] || markedCol[j]) matrix[i][j] = 0
		}
	}
}

//O(mn) - O(1)
//advanced version
var setZeroes = function (matrix) {
	const rows = matrix.length,
		cols = matrix[0].length,
		//使用mark标记
		marked = -1000001
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (matrix[i][j] === 0) {
				//对于不为1的单元进行标记，要先标记下次遍历再转换
				for (let m = 0; m < rows; m++) {
					if (matrix[m][j] !== 0) matrix[m][j] = marked
				}
				for (let n = 0; n < cols; n++) {
					if (matrix[i][n] !== 0) matrix[i][n] = marked
				}
			}
		}
	}
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (matrix[i][j] === marked) matrix[i][j] = 0
		}
	}
}

//使用两个标记变量,使用matrix的第一行和第一列代替上面的两个数组
var setZeroes = function (matrix) {
	const m = matrix.length,
		n = matrix[0].length
	let flagCol0 = false,
		flagRow0 = false
	//遍历第一列
	for (let i = 0; i < m; i++) {
		if (matrix[i][0] === 0) {
			flagCol0 = true
		}
	}
	//遍历第一行
	for (let j = 0; j < n; j++) {
		if (matrix[0][j] === 0) {
			flagRow0 = true
		}
	}
	//标记第一行与列
	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			if (matrix[i][j] === 0) {
				matrix[i][0] = matrix[0][j] = 0
			}
		}
	}
	//使用第一行与列反更新其他单元
	for (let i = 1; i < m; i++) {
		for (let j = 1; j < n; j++) {
			if (matrix[i][0] === 0 || matrix[0][j] === 0) {
				matrix[i][j] = 0
			}
		}
	}
	//根据标记变量处理第一行与第一列
	if (flagCol0) {
		for (let i = 0; i < m; i++) {
			matrix[i][0] = 0
		}
	}
	if (flagRow0) {
		for (let j = 0; j < n; j++) {
			matrix[0][j] = 0
		}
	}
}
```

### [74.搜索二维矩阵](https://leetcode.cn/problems/search-a-2d-matrix/)

```javascript
var searchMatrix = function (matrix, target) {
	const rowIndex = binarySearchFirstColumn(matrix, target)
	if (rowIndex < 0) return false
	return binarySearchRow(matrix[rowIndex], target)
}

const binarySearchFirstColumn = (matrix, target) => {
	let low = 0,
		high = matrix.length - 1
	while (low <= high) {
		const mid = Math.floor((high + low) / 2)
		if (matrix[mid][0] <= target) {
			low = mid + 1
		} else {
			high = mid - 1
		}
	}
	return high
}

const binarySearchRow = (row, target) => {
	let low = 0,
		high = row.length - 1
	while (low <= high) {
		const mid = Math.floor((high - low) / 2) + low
		if (row[mid] == target) {
			return true
		} else if (row[mid] > target) {
			high = mid - 1
		} else {
			low = mid + 1
		}
	}
	return false
}
```

### [75.==颜色分类 M==](https://leetcode-cn.com/problems/sort-colors/)

```javascript
var sortColors = function (nums) {
	let cur = 0,
		p1 = 0,
		p2 = nums.length - 1
	//循环结束条件
	while (cur <= p2) {
		//2放后，再看换过来的这个数
		if (nums[cur] === 2) {
			;[nums[cur], nums[p2--]] = [nums[p2], nums[cur]]
			//0放前，cur、p1同步走
		} else if (nums[cur] === 0) {
			;[nums[cur++], nums[p1++]] = [nums[p1], nums[cur]]
		} else {
			cur++
		}
	}
	return nums
}
```

### [80.==删除排序数组重复项 II==](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/)

```javascript
//slow - fast pointer
var removeDuplicates = function (nums) {
	const len = nums.length
	if (len <= 2) return len
	//前两个必保留,从2开始
	let slow = 2,
		fast = 2
	while (fast < len) {
		if (nums[slow - 2] !== nums[fast]) nums[slow++] = nums[fast]
		fast++
	}
	return slow
}
```

### [88.==合并两个有序数组 E==](https://leetcode-cn.com/problems/merge-sorted-array/)

```javascript
//可以使用额外的m+n空间像合并链表一样一个一个复制

//最直观的方法是先将数组合并再排序
var merge = function (nums1, m, nums2, n) {
	nums1.splice(m, nums1.length - m, ...nums2)
	nums1.sort((a, b) => a - b)
}

//三指针 从前往后 O(n+m) - O(m)
var merge = (nums1, m, nums2, n) => {
	//原数组前面会被覆盖所以copy一份
	const nums1Copy = nums1.slice(0, m)
	let p1 = 0,
		p2 = 0,
		p = 0
	while (p1 < m && p2 < n) {
		nums1[p++] = nums1Copy[p1] < nums2[p2] ? nums1Copy[p1++] : nums2[p2++]
	}
	while (p1 < m) nums1[p++] = nums1Copy[p1++]
	while (p2 < n) nums1[p++] = nums2[p2++]
}

//三指针 从后往前 O(n+m) - O(1)
var merge = (nums1, m, nums2, n) => {
	let p1 = m - 1,
		p2 = n - 1,
		k = m + n - 1
	//nums2全部复制完
	//不能写成nums1[p] < nums2[q] ? nums2[q--] : nums1[p--] 死循环
	while (p2 >= 0) nums1[k--] = nums1[p1] > nums2[p2] ? nums1[p1--] : nums2[p2--]
}
```

### [118. ==杨辉三角==](https://leetcode-cn.com/problems/pascals-triangle/)

```javascript
var generate = function (numRows) {
	const ret = []
	for (let i = 0; i < numRows; i++) {
		const curRow = new Array(i + 1).fill(1)
		for (let j = 1; j < curRow.length - 1; j++) {
			curRow[j] = ret[i - 1][j - 1] + ret[i - 1][j]
		}
		ret.push(curRow)
	}
	return ret
}

var generate = function (numRows) {
	const triangle = []
	for (let i = 0; i < numRows; i++) {
		const curRow = []
		curRow[0] = 1
		curRow[i] = 1
		if (i > 1) {
			for (let j = 1; j < i; j++) {
				curRow[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
			}
		}
		triangle.push(curRow)
	}
	return triangle
}
```

### [189.==旋转数组 E==](https://leetcode-cn.com/problems/rotate-array/)

```javascript {.line-numbers}
//brute force O(n*k) - O(1)
var rotate = function (nums, k) {
	const len = nums.length
	//翻转次数
	for (let i = 0; i < k % len; i++) {
		let previous = nums[len - 1]
		//每次向前滚一下
		for (let j = 0; j < len; j++) {
			;[nums[j], previous] = [previous, nums[j]]
		}
	}
}

//额外数组 O(n) - O(n)
var rotate = (nums, k) => {
	const len = nums.length,
		tmp = new Array(len)
	//元素的新位置为(i+k) % len 的位置
	for (let i = 0; i < len; i++) {
		//旋转后的位置
		tmp[(i + k) % len] = nums[i]
	}
	//复制回去
	for (let i = 0; i < len; i++) nums[i] = tmp[i]
}

//数组翻转 O(n) - O(1)
var rotate = function (nums, k) {
	const len = nums.length
	k %= len
	if (k === 0) return
	reverse(nums, 0, len - 1)
	reverse(nums, 0, k - 1)
	reverse(nums, k, len - 1)

	function reverse(arr, l, r) {
		while (l < r) {
			;[arr[l++], arr[r--]] = [arr[r], arr[l]]
		}
	}
}
```

### [238.==除自身以外数组的乘积==](https://leetcode-cn.com/problems/product-of-array-except-self/)

```javascript {.line-numbers}
//使用两个数组，使用前缀
var productExceptSelf = (nums) => {
	const len = nums.length
	// L 和 R 分别表示左右两侧的乘积列表
	const left = new Array(len)
	const right = new Array(len)
	const ret = new Array(len)
	// left[i] 为索引 i 左侧所有元素的乘积
	// 对于索引为 '0' 的元素，因为左侧没有元素，所以 left[0] = 1
	left[0] = 1
	for (let i = 1; i < len; i++) left[i] = left[i - 1] * nums[i - 1]
	// right[i] 为索引 i 右侧所有元素的乘积
	// 对于索引为 'len-1' 的元素，因为右侧没有元素，所以 right[len-1] = 1
	right[len - 1] = 1
	for (let i = len - 2; i >= 0; i--) right[i] = right[i + 1] * nums[i + 1]
	// 对于索引 i，除 nums[i] 之外其余各元素的乘积就是左侧所有元素的乘积乘以右侧所有元素的乘积
	for (let i = 0; i < len; i++) ret[i] = left[i] * right[i]
	return ret
}

//使用一个数组
var productExceptSelf = function (nums) {
	const len = nums.length,
		r = new Array(len),
		ret = new Array(len)
	ret[0] = 1
	for (let i = 1; i < len; i++) ret[i] = ret[i - 1] * nums[i - 1]
	r[len - 1] = 1
	for (let i = len - 2; i >= 0; i--) r[i] = r[i + 1] * nums[i + 1]
	for (let i = 0; i < len; i++) ret[i] = ret[i] * r[i]
	return ret
}

//best  O(1)
var productExceptSelf = function (nums) {
	const len = nums.length,
		ret = new Array(len)
	ret[0] = 1
	for (let i = 1; i < len; i++) ret[i] = ret[i - 1] * nums[i - 1]
	let r = 1
	//从最后一个更新开始更新答案
	for (let i = len - 1; i >= 0; i--) {
		ret[i] = ret[i] * r
		r *= nums[i]
	}
	return ret
}
```

### [240.搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/)

```javascript
var searchMatrix = function (matrix, target) {
	for (const row of matrix) {
		const index = search(row, target)
		if (index >= 0) return true
	}
	return false
}

const search = (nums, target) => {
	let low = 0,
		high = nums.length - 1
	while (low <= high) {
		const mid = Math.floor((high - low) / 2) + low
		const num = nums[mid]
		if (num === target) {
			return mid
		} else if (num > target) {
			high = mid - 1
		} else {
			low = mid + 1
		}
	}
	return -1
}
```

### [283.==移动零==](https://leetcode-cn.com/problems/move-zeroes/)

```javascript {.line-numbers}
//循环一整次把非0换到前面，第二次循环把0填到后面 O(n) - O(1)
var moveZeroes = function (nums) {
	let lastFoundZeroIndex = 0
	const len = nums.length
	for (let i = 0; i < len; i++) {
		if (nums[i] !== 0) nums[lastFoundZeroIndex++] = nums[i]
	}
	for (let i = lastFoundZeroIndex; i < len; i++) nums[i] = 0
	return nums
}

//循环一次，快慢指针，慢指针当前第一个 0 的位置 O(n)- O(1)
var moveZeroes = function (nums) {
	let lastFoundZeroIndex = 0
	for (let fast = 0, len = nums.length; fast < len; fast++) {
		if (nums[fast] !== 0) {
			;[nums[lastFoundZeroIndex++], nums[fast]] = [
				nums[fast],
				nums[lastFoundZeroIndex],
			]
		}
	}
}
```

### [349.==两个数组的交集==](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

```javascript {.line-numbers}
//bad version
var intersection = function (nums1, nums2) {
	return [...new Set(nums1)].filter((item) =>
		[...new Set(nums2)].includes(item)
	)
}

//good version
var intersection = function (nums1, nums2) {
	const map = {}
	const ret = []
	for (let i = 0; i < nums1.length; i++) map[nums1[i]] = true
	for (let i = 0; i < nums2.length; i++) {
		if (map[nums2[i]]) {
			ret.push(nums2[i])
			map[nums2[i]] = false
		}
	}
	return ret
}
```

### [498.对角线遍历](https://leetcode.cn/problems/diagonal-traverse/)

```javascript {.line-numbers}
var findDiagonalOrder = function (mat) {
	const m = mat.length
	const n = mat[0].length
	const res = new Array(m * n).fill(0)
	let pos = 0
	for (let i = 0; i < m + n - 1; i++) {
		if (i % 2 === 1) {
			let x = i < n ? 0 : i - n + 1
			let y = i < n ? i : n - 1
			while (x < m && y >= 0) {
				res[pos++] = mat[x++][y--]
			}
		} else {
			let x = i < m ? i : m - 1
			let y = i < m ? 0 : i - m + 1
			while (x >= 0 && y < n) {
				res[pos++] = mat[x--][y++]
			}
		}
	}
	return res
}
```

### [1122.数组的相对排序](https://leetcode-cn.com/problems/relative-sort-array/)

```javascript {.line-numbers}
var relativeSortArray = function (arr1, arr2) {
	return arr1.sort((a, b) => {
		let ia = arr2.indexOf(a)
		let ib = arr2.indexOf(b)
		if (ia === -1 && ib === -1) {
			// 如果两个元素都不在arr2中按升序排列
			return a - b
		} else if (ia === -1) {
			// 如果有一个不在arr2中（a），另一个在arr2中(b)不在arr中的元素要排在后面
			return 1
		} else if (ia !== -1 && ib !== -1) {
			// 如果两个元素都在arr2中，他们的顺序跟在arr2中一致
			return ia - ib
		}
	})
}
```
