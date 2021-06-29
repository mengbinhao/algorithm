### ==[1.两数之和 E](https://leetcode-cn.com/problems/two-sum/)==

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
			if (nums[i] + nums[j] === target) {
				return [i, j]
			}
		}
	}
}

//两次哈希 O(n) - O(n)
//obj or map
var twoSum = function (nums, target) {
	const hash = {},
		len = nums.length
	for (let i = 0; i < len; i++) {
		//[2, 7] 9, store 7,the other loop to search 7
		hash[target - nums[i]] = i
	}
	for (let j = 0; j < len; j++) {
		//exclude same item
		if (hash[nums[j]] !== undefined && hash[nums[j]] !== j) {
			return [j, hash[nums[j]]]
		}
	}
}

//一次哈希 optimal,先放再回头找，不需要后续判重
//obj or map
var twoSum = function (nums, target) {
	const hash = {}
	for (let i = 0, len = nums.length; i < len; i++) {
		//the index in array should be zero
		if (hash[nums[i]] !== undefined) return [hash[nums[i]], i]
		hash[target - nums[i]] = i
	}
}
```

### ==[11.装最多水的容器 M](https://leetcode-cn.com/problems/container-with-most-water/)==

- brute force O(n^2) - O(1)

  ```javascript
  var maxArea = function (height) {
  	let maxArea = 0
  	for (let l = 0; l < height.length - 1; l++) {
  		for (let r = l + 1; r < height.length; r++) {
  			maxArea = Math.max(maxArea, Math.min(height[l], height[r]) * (r - l))
  		}
  	}
  	return maxArea
  }
  ```

- two pointer **夹逼** O(n) - O(1)

  ```javascript
  var maxArea = function (height) {
  	let left = 0,
  		right = height.length - 1,
  		maxArea = 0

  	while (left < right) {
  		maxArea = Math.max(
  			maxArea,
  			Math.min(height[left], height[right]) * (right - left)
  		)
  		height[left] < height[right] ? left++ : right--
  	}
  	return maxArea
  }
  ```

### ==[15.三数之和 M](https://leetcode-cn.com/problems/3sum/)==

- brute force O(n^3) O(1) //Time limit exceeded

  ```javascript
  var threeSum = function (nums) {
  	const ret = []
  	if (nums == null || nums.length < 3) return ret
  	const len = nums.length,
  		map = {}
  	for (let i = 0; i < len - 2; i++) {
  		for (let j = i + 1; j < len - 1; j++) {
  			for (let k = j + 1; k < len; k++) {
  				if (nums[i] + nums[j] + nums[k] === 0) {
  					//duplicate-removal
  					const key = [nums[i], nums[j], nums[k]].sort()
  					//point is not repeat
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
  ```

- Hash O(n^2) O(n)

  ```javascript
  var threeSum = function (nums) {
  	const arr = []
  	if (nums == null || nums.length < 3) return arr
  	//precondition!!!!!!
  	nums.sort((a, b) => a - b)
  	for (var i = 0; i < nums.length - 2; i++) {
  		if (nums[i] > 0) break
  		if (i > 0 && nums[i] == nums[i - 1]) continue
  		const hash = new Map()
  		for (var j = i + 1; j < nums.length; j++) {
  			const val = -(nums[i] + nums[j])
  			// 前三个数组成的结果肯定不重且防越界，所以j > i + 2
  			if (j > i + 2 && nums[j] == nums[j - 1] && nums[j] == nums[j - 2])
  				continue
  			//hash是首次记录第二次才会push到数组
  			if (hash.has(val)) {
  				arr.push([nums[i], nums[hash.get(val)], nums[j]])
  				//使用完删除防止重复[-2, 0, 0, 2, 2]
  				hash.delete(val)
  			}
  			//第一次直接加,加的是结果中的第二个数
  			hash.set(nums[j], j)
  		}
  	}
  	return arr
  }
  ```

- 夹逼（大部分情况需已排序） O(n^2) - O(1)

  ```javascript
  var threeSum = function (nums) {
  	let ret = []
  	if (nums == null || nums.length < 3) return ret
  	//precondition!!!!!!
  	nums.sort((a, b) => a - b)
  	//至少留k那一位和2个pointer
  	for (let k = 0; k < nums.length - 2; k++) {
  		//nums is sorted,so it's impossible to have a sum = 0
  		if (nums[k] > 0) break
  		//skip duplicated nums[k]
  		if (k > 0 && nums[k] === nums[k - 1]) continue
  		let left = k + 1,
  			right = nums.length - 1
  		while (left < right) {
  			const sum = nums[k] + nums[left] + nums[right]
  			if (sum === 0) {
  				ret.push([nums[k], nums[left], nums[right]])
  				//skip duplicated nums[left]
  				while (nums[left] === nums[left + 1]) left++
  				left++
  				//skip duplicated nums[right]
  				while (nums[right] === nums[right - 1]) right--
  				right--
  			} else if (sum > 0) {
  				right--
  			} else {
  				left++
  			}
  		}
  	}
  	return ret
  }
  ```

### [18.四数之和 M](https://leetcode-cn.com/problems/4sum/)

```javascript
var fourSum = function (nums, target) {
	if (!Array.isArray(nums) || nums.length === 0) {
		return []
	}
	if (typeof target !== 'number' || !Number.isInteger(target)) {
		throw new TypeError(`invalid param target = ${target}`)
	}

	nums.sort((a, b) => a - b)
	let len = nums.length,
		ret = []

	for (let k = 0; k < len - 3; k++) {
		if (nums[k] + nums[k + 1] + nums[k + 2] + nums[k + 3] > target) break
		if (k > 0 && nums[k] === nums[k - 1]) continue

		for (let l = k + 1; l < len - 2; l++) {
			if (l > k + 1 && nums[l] === nums[l - 1]) continue

			let m = l + 1,
				n = len - 1

			while (m < n) {
				let sum = nums[k] + nums[l] + nums[m] + nums[n]
				if (sum === target) {
					ret.push([nums[k], nums[l], nums[m], nums[n]])
					while (nums[m] === nums[m + 1]) {
						m++
					}
					m++
					while (nums[n] === nums[n - 1]) {
						n--
					}
					n--
				} else if (sum < target) {
					m++
				} else {
					n--
				}
			}
		}
	}
	return ret
}
```

### ==[26.删除排序数组重复项 E](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)==

```javascript
//slow / fast pointer
var removeDuplicates = function (nums) {
	const len = nums.length
	if (len === 0) return 0
	let slow = 0
	for (let fast = 1; fast < len; fast++) {
		if (nums[slow] !== nums[fast]) {
			nums[++slow] = nums[fast]
		}
	}
	return slow + 1
}
```

### ==[45.跳跃游戏 II M](https://leetcode-cn.com/problems/jump-game-ii/)==

```javascript
var jump = function (nums) {
	let steps = 0,
		end = 0,
		maxPosition = 0
	for (let i = 0, len = nums.length; i < len - 1; i++) {
		//当前位置能跳到的最远位置
		maxPosition = Math.max(maxPosition, nums[i] + i)
		//跳到上次能跳到的最远位置后update
		if (i === end) {
			end = maxPosition
			steps++
		}
	}
	return steps
}
```

### [54.螺旋矩阵](https://leetcode-cn.com/problems/spiral-matrix/)

```javascript {.line-numbers}
//O(n) - O(n) 没写 directionIndex = (directionIndex + 1) % 4;

//O(mn) - O(1)
var spiralOrder = function (matrix) {
	let top = 0,
		bottom = matrix.length - 1,
		left = 0,
		right = matrix[0].length - 1
	const ret = []
	while (true) {
		//向右移动直到最右
		for (let i = left; i <= right; i++) ret.push(matrix[top][i])
		//重新设定上边界，若上边界大于下边界，则遍历遍历完成，下同
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

//O(mn) - O(1)
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

### [52.螺旋矩阵 II](https://leetcode-cn.com/problems/spiral-matrix-ii/)

```javascript {.line-numbers}
var generateMatrix = function (n) {
	let left = 0,
		right = n - 1,
		top = 0,
		bottom = n - 1
	const ret = Array.from({ length: n }, () => new Array(n))
	const total = n * n
	let num = 1
	while (num <= total) {
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

### ==[55.跳跃游戏 M](https://leetcode-cn.com/problems/jump-game/)==

```javascript
var canJump = function (nums) {
	//能够走到的数组下标
	let maxPosition = 0
	for (let i = 0; i < nums.length; i++) {
		//若当前这一步都走不到,后面就更走不到了
		if (maxPosition < i) return false
		//更新max为当前能走到的最远位置
		maxPosition = Math.max(nums[i] + i, maxPosition)
	}
	//判断是否能跳完
	return maxPosition >= nums.length - 1
}
```

### ==[66.加一 E](https://leetcode-cn.com/problems/plus-one/)==

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
	digits = [...Array(len + 1)].map(() => 0)
	digits[0] = 1
	return digits
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

### ==[75.颜色分类 M](https://leetcode-cn.com/problems/sort-colors/)==

```javascript
var sortColors = function (nums) {
	let cur = 0,
		p1 = 0,
		p2 = nums.length - 1

	while (cur <= p2) {
		if (nums[cur] === 2) {
			;[nums[cur], nums[p2--]] = [nums[p2], nums[cur]]
		} else if (nums[cur] === 0) {
			;[nums[cur++], nums[p1++]] = [nums[p1], nums[cur]]
		} else {
			cur++
		}
	}
	return nums
}
```

### ==[88.合并两个有序数组 E](https://leetcode-cn.com/problems/merge-sorted-array/)==

```javascript
//三指针 / 从前往后 O(n+m) - O(m)
var merge = (nums1, m, nums2, n) => {
	const nums1Copy = nums1.slice(0, m)
	let p1 = 0,
		p2 = 0,
		p = 0
	while (p1 < m && p2 < n) {
		nums1[p++] = nums1Copy[p1] < nums2[p2] ? nums1Copy[p1++] : nums2[p2++]
	}

	//handle p1 < m or p2 < n
	while (p1 < m) {
		nums1[p++] = nums1Copy[p1++]
	}
	while (p2 < n) {
		nums1[p++] = nums2[p2++]
	}
}

//三指针 / 从后往前 O(n+m) - O(1)
var merge = (nums1, m, nums2, n) => {
	let p = m - 1,
		q = n - 1,
		k = m + n - 1
	//loop nums1, nums2没完复制就是
	while (q >= 0) {
		nums1[k--] = nums1[p] > nums2[q] ? nums1[p--] : nums2[q--]
	}
}
```

### ==[189.旋转数组 E](https://leetcode-cn.com/problems/rotate-array/)==

```javascript {.line-numbers}
//brute force O(n*k) - O(1)
var rotate = function (nums, k) {
	const len = nums.length
	let previous, temp
	//loop k次
	for (let i = 0; i < k; i++) {
		previous = nums[len - 1]
		//每次向前滚动一下
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
		tmp = new Array(len)
	for (let i = 0; i < len; i++) {
		//旋转后的数值位置
		tmp[(i + k) % len] = nums[i]
	}
	//复制回去
	for (let i = 0; i < len; i++) {
		nums[i] = tmp[i]
	}
}

//数组翻转 O(n) - O(1)
// 1 翻转所有元素
// 2 翻转 [0, k\bmod n - 1][0,kmodn−1] 区间的元素
// 3 翻转 [k\bmod n, n - 1][kmodn,n−1] 区间的元素
var rotate = function (nums, k) {
	const len = nums.length
	k %= len
	myReverse(nums, 0, len - 1)
	myReverse(nums, 0, k - 1)
	myReverse(nums, k, len - 1)

	function myReverse(arr, l, r) {
		while (l < r) {
			;[arr[l++], arr[r--]] = [arr[r], arr[l]]
		}
	}
}
```

### ==[283.移动零](https://leetcode-cn.com/problems/move-zeroes/)==

```javascript {.line-numbers}
//循环一整次把非 0 换到前面，第二次循环把 0 填到后面 O(n) - O(1)
var moveZeroes = function (nums) {
	let lastFoundZeroIndex = 0
	const len = nums.length
	for (let i = 0; i < len; i++) {
		//move non-zero to front
		if (nums[i] !== 0) {
			nums[lastFoundZeroIndex++] = nums[i]
		}
	}
	//update behind item to zero
	for (let i = lastFoundZeroIndex; i < len; i++) {
		nums[i] = 0
	}
	return nums
}

//循环一次，快慢指针，慢指针当前第一个 0 的位置，数组解构快速交换 0 与非 0 O(n)- O(1)
var moveZeroes = function (nums) {
	let lastFoundZeroIndex = 0
	for (let cur = 0, len = nums.length; cur < len; cur++) {
		if (nums[cur] !== 0) {
			;[nums[lastFoundZeroIndex++], nums[cur]] = [
				nums[cur],
				nums[lastFoundZeroIndex],
			]
		}
	}
}
```

### ==[349.两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)==

```javascript {.line-numbers}
var intersection = function (nums1, nums2) {
	return [...new Set(nums1)].filter((item) =>
		[...new Set(nums2)].includes(item)
	)
}
```

### ==[1122.数组的相对排序](https://leetcode-cn.com/problems/relative-sort-array/)==

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
