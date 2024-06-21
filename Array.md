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
	const len = nums.length
	let hash = {}
	for (let i = 0; i < len; i++) hash[target - nums[i]] = i
	for (let j = 0; j < len; j++) {
		//exclude hash[nums[j]] is falsy and same item
		if (hash[nums[j]] !== undefined && hash[nums[j]] !== j)
			return [j, hash[nums[j]]]
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

### [11.==盛最多水的容器 M==](https://leetcode-cn.com/problems/container-with-most-water/)

```javascript
//brute force O(n^2) - O(1)
var maxArea = function (height) {
	const len = height.length
	let maxArea = 0
	for (let i = 0; i < len - 1; i++) {
		for (let j = i + 1; j < len; j++) {
			maxArea = Math.max(ret, Math.min(height[i], height[j]) * (j - i))
		}
	}
	return maxArea
}

//two pointer夹逼 O(n) - O(1)
//若移动数字较大的那个指针，那么前者「两个指针指向的数字中较小值」不会增加，后者「指针之间的距离」会减小，那么这个乘积会减小。因此移动数字较大的那个指针是不合理的
//若保持左指针的位置不变，那么无论右指针在哪里，这个容器的容量都不会超过 
//min(x,y) ∗ t = x ∗ t
//min(x,y) ≤ min(x,y)
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
	//precondition
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
				//使用完删除防止重复，如[-2, 0, 0, 2, 2]
				hash.delete(val)
			}
			hash.set(nums[j], j)
		}
	}
	return arr
}

//有重复
var threeSum = function (nums) {
	const len = nums.length
	const map = new Map()
	const ret = []
	for (let i = 0; i < len - 2; i++) {
		const first = nums[i]
		for (let j = i + 1; j < len; j++) {
			const second = nums[j]
			const third = 0 - first - second
			if (map.has(third)) {
				ret.push([first, second, third])
			}
			map.set(second, j)
		}
		map.clear()
	}
	return ret
}

var threeSum = function (nums) {
	const len = nums.length
	let ret = []
	//precondition!
	nums.sort((a, b) => a - b)
	//不重复的三个数
	for (let i = 0; i < len - 2; i++) {
    //剪枝i
		if (nums[i] > 0) break
		if (i > 0 && nums[i] === nums[i - 1]) continue
		let l = i + 1,
			r = len - 1
		while (l < r) {
			const sum = nums[i] + nums[l] + nums[r]
			if (sum === 0) {
				ret.push([nums[i], nums[l], nums[r]])
				//l < len - 4，l置多可以右移的位置，考虑下面那个l++
				while (l < len - 3 && nums[l + 1] === nums[l]) l++
				l++ //跳到不重复的那个数
				while (r > 3 && nums[r - 1] === nums[r]) r--
				r-- //同上
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
//brute force
var removeDuplicates = function (nums) {
	let len = nums.length
	for (let i = 0; i < len; ) {
		if (nums[i] !== nums[i + 1]) {
			i++
		} else {
      //整体前移，数组会越界但不影响结果
			for (let j = i + 1; j < len; j++) nums[j] = nums[j + 1]
			len--
		}
	}
	return len
}

//slow - fast pointer
var removeDuplicates = function(nums) {
  let slow = 1
  for (let fast = 1, len = nums.length; fast < len; fast++) {
    if (nums[fast] !== nums[fast - 1]) nums[slow++] = nums[fast]
  }
  return slow
}
```

### [27.==移除元素==](https://leetcode.cn/problems/remove-element/)

```javascript
//slow - fast pointer
var removeElement = function(nums, val) {
  let slow = 0
  for (let fast = 0, len = nums.length; fast < len; fast++) {
    if (nums[fast] !== val) nums[slow++] = nums[fast]
  }
  return slow
}
```

### 31.[下一个排列](https://leetcode.cn/problems/next-permutation/)

```javascript
//注意到下一个排列总是比当前排列要大，除非该排列已经是最大的排列。求找到一个大于当前序列的新序列，且变大的幅度尽可能小
//1 将一个左边的「较小数」与一个右边的「较大数」交换，以能够让当前排列变大，从而得到下一个排列
//2 同时要让这个「较小数」尽量靠右，而「较大数」尽可能小。当交换完成后，「较大数」右边的数需要按照升序重新排列。这样可以在保证新排列大于原来排列的情况下，使变大的幅度尽可能小
var nextPermutation = function (nums) {
	const len = nums.length
	let i = len - 2
	while (i >= 0 && nums[i] >= nums[i + 1]) i--
	//当前不是最大排列
	if (i >= 0) {
		let j = len - 1
		while (j >= 0 && nums[j] <= nums[i]) j--
		;[nums[i], nums[j]] = [nums[j], nums[i]]
	}
	let s = i + 1,
		e = len - 1
	while (s < e) {
		;[nums[s++], nums[e--]] = [nums[e], nums[s]]
	}
}
```

### [45.==跳跃游戏 II M==](https://leetcode-cn.com/problems/jump-game-ii/)

```javascript
//optimize
var jump = function (nums) {
	let steps = 0
  //上次能跳到的最远位置
	let lastEnd = 0
	let maxPosition = 0
  //若访问最后一个元素，在边界正好为最后一个位置的情况下，会多一次「不必要的跳跃次数」
	for (let i = 0, len = nums.length; i < len - 1; i++) {
    //更新当前位置能跳到的最远位置
		maxPosition = Math.max(maxPosition, nums[i] + i)
    //跳到"上一次"能跳到的最远位置更新边界
		if (i === lastEnd) {
			steps++
			lastEnd = maxPosition
		}
	}
	return steps
}

//basic
var jump = function (nums) {
	const len = nums.length
	let steps = 0,
		start = 0,
		end = 1
	while (end < len) {
		let maxPosition = 0
		for (let i = start; i < end; i++)
			maxPosition = Math.max(maxPosition, i + nums[i])
		start = end // 下一次起跳点开始格子
		end = maxPosition + 1 //此步避免多跳一次
		steps++
	}
	return steps
}
```

### [48.==旋转图像（2维）==](https://leetcode.cn/problems/rotate-image/)

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

//原地翻转两次
//best
var rotate = function (matrix) {
	const n = matrix.length
	//上下翻转
	//matrix[row][col] -> matrix[n−row−1][col]
	for (let i = 0; i < Math.floor(n / 2); i++) {
		for (let j = 0; j < n; j++) {
			;[matrix[n - i - 1][j], matrix[i][j]] = [
				matrix[i][j],
				matrix[n - i - 1][j],
			]
		}
	}
	//沿对角线左下翻转右上
	//matrix[row][col] -> matrix[col][row]
	for (let i = 1; i < n; i++) {
		for (let j = 0; j < i; j++) {
			;[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
		}
	}
}

//原地旋转，找到4个坐标旋转规律
var rotate = function (matrix) {
	const n = matrix.length
	//关键等式1 matrix[row][col] ->  matrix[col][rows - i - 1]
	//其他点带入 row = col 和 col = rows - row - 1
	//遍历顺序：当n为偶数，等分4个区域；当n为奇数，j多一位，中间格子无需转换，i只需走一半
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
```

### [54.==螺旋矩阵（2维）==](https://leetcode-cn.com/problems/spiral-matrix/)

```javascript {.line-numbers}
//O(n) - O(n) 偏移量
var spiralOrder = function (matrix) {
	const rows = matrix.length,
		cols = matrix[0].length,
		total = rows * cols
	//const visited = new Array(rows).fill(0).map(() => new Array(columns).fill(0))
	const visited = Array.from({ length: rows }, () => new Array(cols)),
		//key param
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
		ret = []
	for (let i = 0; i < total; i++) {
		ret[i] = matrix[row][col]
		//marked
		visited[row][col] = true
		const nextRow = row + directions[direction][0]
		const nextCol = col + directions[direction][1]
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
	//能够跳到的最远位置
	let maxPosition = 0
	for (let i = 0; i < nums.length; i++) {
		//若当前位置都跳不到,后面就更跳不到了
		if (i > maxPosition) return false
		//更新max为当前能走到的最远位置
		maxPosition = Math.max(maxPosition, i + nums[i])
	}
	//当前位置跳跃距离是否能跳到数组末尾或超过数组长度
	//return maxPosition >= len - 1
	return true
}

//more rigorous
var canJump = function (nums) {
	const len = nums.length
	let maxPosition = 0
	for (let i = 0; i < len; i++) {
		if (i > maxPosition) return false
		else {
			maxPosition = Math.max(maxPosition, nums[i] + i)
			if (maxPosition >= len - 1) return true
		}
	}
	return true
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
		//若该位不进位直接返回
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

### [73.==矩阵置零（2维）==](https://leetcode-cn.com/problems/set-matrix-zeroes/)

```javascript {.line-numbers}
//brute force,copy一份,遍历这个副本修改原数组
var setZeroes = function (matrix) {
	const rows = matrix.length
	const cols = matrix[0].length
	let matrixCopy = Array.from({ length: rows }, () => new Array(cols))
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			matrixCopy[i][j] = matrix[i][j]
		}
	}
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (matrixCopy[i][j] === 0) {
				//修改当前行
				for (let p = 0; p < cols; p++) matrix[i][p] = 0
				//修改当前列
				for (let q = 0; q < rows; q++) matrix[q][j] = 0
			}
		}
	}
}

//O(mn) - O(m + n) direct version
var setZeroes = function (matrix) {
	const rows = matrix.length,
		cols = matrix[0].length,
		markedRow = new Array(rows).fill(false),
		markedCol = new Array(cols).fill(false)
	//记录需要待转换的行或列
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

//O(mnm) - O(1)
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
				for (let m = 0; m < rows; m++)
					if (matrix[m][j] !== 0) matrix[m][j] = marked
				for (let n = 0; n < cols; n++)
					if (matrix[i][n] !== 0) matrix[i][n] = marked
			}
		}
	}
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) if (matrix[i][j] === marked) matrix[i][j] = 0
	}
}

//使用两个标记变量,使用matrix的第一行和第一列代替上面的两个数组
var setZeroes = function (matrix) {
	const rows = matrix.length,
		cols = matrix[0].length
	let flagCol0 = false,
		flagRow0 = false
	//遍历第一列
	for (let i = 0; i < rows; i++) {
		if (matrix[i][0] === 0) flagCol0 = true
	}
	//遍历第一行
	for (let j = 0; j < cols; j++) {
		if (matrix[0][j] === 0) flagRow0 = true
	}
	//标记第一行与列
	for (let i = 1; i < rows; i++) {
		for (let j = 1; j < cols; j++) {
			if (matrix[i][j] === 0) matrix[i][0] = matrix[0][j] = 0
		}
	}
	//使用第一行与列反更新除第一行和第一列的其他单元
	for (let i = 1; i < rows; i++) {
		for (let j = 1; j < cols; j++) {
			if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0
		}
	}
	//根据标记变量处理第一行与第一列
	if (flagCol0) {
		for (let i = 0; i < rows; i++) matrix[i][0] = 0
	}
	if (flagRow0) {
		for (let j = 0; j < cols; j++) matrix[0][j] = 0
	}
}

//使用一个标记变量
var setZeroes = function (matrix) {
	const m = matrix.length,
		n = matrix[0].length
	let flagCol0 = false
	for (let i = 0; i < m; i++) {
		//标记第一列是否需转换
		if (matrix[i][0] === 0) flagCol0 = true
		//修改第一行和第一列
		for (let j = 1; j < n; j++) {
			if (matrix[i][j] === 0) {
				matrix[i][0] = matrix[0][j] = 0
			}
		}
	}
	//倒序根据第一行第一列处理其他单元，防止每一列的第一个元素被提前更新及matrix[i][0]
	for (let i = m - 1; i >= 0; i--) {
		for (let j = 1; j < n; j++) {
			if (matrix[i][0] === 0 || matrix[0][j] === 0) {
				matrix[i][j] = 0
			}
		}
		if (flagCol0) matrix[i][0] = 0
	}
}
```

### [75.==颜色分类 M==](https://leetcode-cn.com/problems/sort-colors/)

```javascript
var sortColors = function (nums) {
	const len = nums.length
	let p = 0
	//前移0
	for (let i = 0; i < len; i++) {
		if (nums[i] === 0) {
			;[nums[p++], nums[i]] = [nums[i], nums[p]]
		}
	}
	//再前移1
	for (let i = p; i < len; i++) {
		if (nums[i] === 1) {
			;[nums[p++], nums[i]] = [nums[i], nums[p]]
		}
	}
	return nums
}

//better
var sortColors = function (nums) {
	let cur = 0,
		p1 = 0,
		p2 = nums.length - 1
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

### [80.删除排序数组重复项 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/)

```javascript
//slow - fast pointer
var removeDuplicates = function (nums) {
	const len = nums.length
	if (len <= 2) return len
	let fast = (slow = 2)
  //slow已经处理出的数组的长度
  //fast已经检查过的数组的长度
	while (fast < len) {
		if (nums[fast] !== nums[slow - 2]) nums[slow++] = nums[fast]
		fast++
	}
	return slow
}
```

### [88.==合并两个有序数组 E==](https://leetcode-cn.com/problems/merge-sorted-array/)

```javascript
//直观：使用额外的O(m + n)空间像合并链表一样一个一个复制

//先将数组合并再排序
var merge = function (nums1, m, nums2, n) {
	nums1.splice(m, nums1.length - m, ...nums2)
	nums1.sort((a, b) => a - b)
}

//三指针 从前往后 O(n + m) - O(m)
var merge = (nums1, m, nums2, n) => {
	//原数组前面可能会被覆盖所以copy一份
	let nums1Copy = nums1.slice(0, m)
	let p1 = 0,
		p2 = 0,
		p = 0
	while (p1 < m && p2 < n)
		nums1[p++] = nums1Copy[p1] < nums2[p2] ? nums1Copy[p1++] : nums2[p2++]
	while (p1 < m) nums1[p++] = nums1Copy[p1++]
	while (p2 < n) nums1[p++] = nums2[p2++]
}

//三指针 从后往前 O(n + m) - O(1)
var merge = (nums1, m, nums2, n) => {
	let p1 = m - 1,
		p2 = n - 1,
		//nums1开始放置的末尾
		p = m + n - 1
	//下句可省略
	//while (p1 >= 0 && p2 >= 0) nums1[p--] = nums1[p1] > nums2[p2] ? nums1[p1--] : nums2[p2--]
	//不能写成nums1[p--] = nums1[p1] < nums2[p2] ? nums2[p2--] : nums1[p1--], 死循环
	//nums2全部复制完
	while (p2 >= 0) nums1[p--] = nums1[p1] > nums2[p2] ? nums1[p1--] : nums2[p2--]
}
```

### [189.==轮转数组 E==](https://leetcode-cn.com/problems/rotate-array/)

```javascript {.line-numbers}
//brute force O(nk) - O(1) TLE
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
	const len = nums.length
	const tmp = new Array(len)
	//元素的新位置在(i+k) % len
	for (let i = 0; i < len; i++) tmp[(i + k) % len] = nums[i]
	for (let i = 0; i < len; i++) nums[i] = tmp[i]
}

//数组翻转 O(n) - O(1)
var rotate = (nums, k) => {
	const len = nums.length
	//特判
	k %= len
	if (k === 0) return
	const reverse = (nums, l, r) => {
		while (l < r) {
			;[nums[l++], nums[r--]] = [nums[r], nums[l]]
		}
	}
	reverse(nums, 0, len - 1)
	reverse(nums, 0, k - 1)
	reverse(nums, k, len - 1)
}
```

### [238.==除自身以外数组的乘积==](https://leetcode-cn.com/problems/product-of-array-except-self/)

```javascript {.line-numbers}
//使用两个前缀数组 O(n)
var productExceptSelf = (nums) => {
	const len = nums.length
	// L和R分别表示左右两侧的乘积列表
	let left = new Array(len)
	let right = new Array(len)
	let ret = new Array(len)
	// left[i] 为索引i左侧所有元素的乘积
	// 对于索引为0的元素，因为左侧没有元素，所以 left[0] = 1
	left[0] = 1
	for (let i = 1; i < len; i++) left[i] = left[i - 1] * nums[i - 1]
	// right[i]为索引i右侧所有元素的乘积
	// 对于索引为len-1的元素，因为右侧没有元素，所以 right[len-1] = 1
	right[len - 1] = 1
	for (let i = len - 2; i >= 0; i--) right[i] = right[i + 1] * nums[i + 1]
	// 对于索引i，除nums[i]之外其余各元素的乘积就是左侧所有元素的乘积乘以右侧所有元素的乘积
	for (let i = 0; i < len; i++) ret[i] = left[i] * right[i]
	return ret
}

//使用一个数组 O(n)
var productExceptSelf = function (nums) {
	const len = nums.length,
		right = new Array(len),
		ret = new Array(len)
	ret[0] = 1
	for (let i = 1; i < len; i++) ret[i] = ret[i - 1] * nums[i - 1]
	right[len - 1] = 1
	for (let i = len - 2; i >= 0; i--) right[i] = right[i + 1] * nums[i + 1]
	for (let i = 0; i < len; i++) ret[i] = ret[i] * right[i]
	return ret
}

//best  O(1)
var productExceptSelf = function (nums) {
	const len = nums.length
	let ret = new Array(len), r = 1
	ret[0] = 1
	for (let i = 1; i < len; i++) ret[i] = ret[i - 1] * nums[i - 1]
	for (let i = len - 1; i >= 0; i--) {
		ret[i] = ret[i] * r
		r *= nums[i]
	}
	return ret
}
```

### [283.==移动零==](https://leetcode-cn.com/problems/move-zeroes/)

```javascript {.line-numbers}
//循环一次把非0换到前面，再次循环把0填到后面 O(n) - O(1)
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
	let slow = 0
	for (let fast = 0, len = nums.length; fast < len; fast++) {
		if (nums[fast] !== 0) {
			;[nums[slow++], nums[fast]] = [nums[fast], nums[slow]]
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
	let map = {}
	let ret = []
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

### [560. ==和为 K 的子数组==](https://leetcode.cn/problems/subarray-sum-equals-k/)

```javascript
//最low的是一重枚起点、一重枚终点、再一重枚相加结果 O(N^3)
var subarraySum = function (nums, k) {
	const len = nums.length
	let c = 0
	for (let start = 0; start < len; start++) {
		for (let end = start; end < len; end++) {
			let sum = 0
			for (let i = start; i <= end; i++) sum += nums[i]
			if (sum === k) c++
		}
	}
	return c
}

var subarraySum = function (nums, k) {
	let cnt = 0
	for (let i = 0, len = nums.length; i < len; i++) {
		let sum = 0
		//从后往前sum
		for (let j = i; j >= 0; j--) {
			sum += nums[j]
			if (sum === k) cnt++
		}
	}
	return cnt
}

//前缀和 + hash
//pre[i] = pre[i - 1] + num[i] -> pre[i] - pre[i - 1] === k -> pre[i - 1] === pre[i] - k
var subarraySum = function (nums, k) {
	let cnt = 0,
		pre = 0,
		map = new Map([[0, 1]])
	for (let num of nums) {
		pre += num
		if (map.has(pre - k)) cnt += map.get(pre - k)
		map.has(pre) ? map.set(pre, map.get(pre) + 1) : map.set(pre, 1)
	}
	return cnt
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

### [==汉诺塔==](https://leetcode.cn/problems/hanota-lcci/description/)

```javascript
// 1 找到最小的圆盘，移动到下一个柱子上
// 2 另外两根柱子上可以移动的圆盘移到新的柱子上，当两根柱子都非空时，移动较小的那个圆盘
var hanota = function (A, B, C) {
	const len = A.length
	let pillars = new Array(3)
	pillars[0] = A
	//1 确定盘子摆放顺序
	if (len % 2 === 0) {
		pillars[1] = B
		pillars[2] = C
	} else {
		pillars[1] = C
		pillars[2] = B
	}
	//最小盘子所在柱子下标
	let minIdx = 0
	while (C.length < len) {
		let cur = pillars[minIdx]
		//编号最小盘子所在柱子的下一个柱子
		minIdx = (minIdx + 1) % 3
		let next = pillars[minIdx]
		//编号最小盘子所在柱子的上一个柱子
		let pre = pillars[(minIdx + 1) % 3]
		//最小的圆盘移动到下一个柱子
		next.push(cur.pop())
		//另外两根柱子上可以移动的圆盘移到新的柱子上，当两根柱子都非空时，移动较小的那个圆盘
		let plateMove1 = pre.length === 0 ? Infinity : pre[pre.length - 1]
		let plateMove2 = cur.length === 0 ? Infinity : cur[cur.length - 1]
		plateMove1 < plateMove2 ? cur.push(pre.pop()) : pre.push(cur.pop())
	}
	console.log(C)
}

//recursion
//f(n, A, B, C) => f(n - 1, A, C, B) + M(A, C) + f(n - 1, B, A, C)
var hanota = function (A, B, C) {
	const helper = (c, from, tmp, to) => {
		//terminate
		if (c === 1) {
			to.push(from.pop())
			return
		}
		//将n - 1个盘子从第一个柱子移动到第二个柱子
		helper(c - 1, from, to, tmp)
		//将第n个盘子从第一个柱子移动到第三个柱子
		to.push(from.pop())
		//将n - 1个盘子从第二个柱子移动到第三个柱子
		helper(c - 1, tmp, from, to)
	}
	helper(A.length, A, B, C)
}
```

