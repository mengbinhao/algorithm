### 使用二分的条件(整数二分、浮点数二分)

1. 有单调性一定可以二分
2. 能用二分解的题不一定具有单调性
3. 有上下界

### 解题 3 步骤

1. 预处理：如果集合未排序,则进行排序
2. 二分查找：使用循环或递归在每次比较后将查找空间二分
   1. **先定义搜索区间**
   2. **根据搜索区间定义循环结束条件**
   3. 取中间元素和目标元素做对比(目标元素可能是需要找的元素或是数组中满足条件的第一个或最后一个元素等)
   4. 根据比较的结果收缩区间,舍弃非法解
3. 后处理：在剩余空间中确定可行的候选者

### 常见变体

- 若存在多个满足条件的元素,返回最左边满足条件的索引
- 若存在多个满足条件的元素,返回最右边满足条件的索引
- 数组不是整体有序的,比如先升序再降序,或者先降序再升序
- 将一维数组变成二维数组
- 。。。

### framework

**很多人喜欢拿整型溢出的 bug 说事儿,但是二分查找真正的坑根本就不是那个细节问题,而是在于到底要给 mid 加一还是减一,while 里到底用 <= 还是 <**

![](./images/binarySearch.png)

> 1. 分析二分查找代码时,最好不要出现 `else`,全部展开成 `else if`方便理解
> 2. 注意「搜索区间」和 while 的终止条件,若存在漏掉的元素,记得在**最后检查**
> 3. 若定义**左闭右开**的「搜索区间」,只要在 `nums[mid] == target` 时做修改即可,搜索右侧时需要减一
> 4. 若定义**左闭右闭**的「搜索区间」,只要稍改 `nums[mid] == target` 条件处的代码和返回的逻辑即可

### some templates

#### 1 Basic Template

```javascript {.line-numbers}
//返回索引,arr已排序
const binarySearch = (arr, target) => {
	const len = arr.length
	if (len === 0) return -1
	let l = 0,
		//Note 1
		r = len - 1,
		mid
	//Note 2
	while (l <= r) {
		//Maybe note
		mid = Math.floor((r - l) / 2 + l)
		if (arr[mid] === target) {
			return mid
		} else if (arr[mid] < target) {
			l = mid + 1
		} else if (arr[mid] > target) {
			//Note 3
			r = mid - 1
		}
	}
	//Note
	return -1
}
```

#### 2 寻找左侧边界

```javascript
//arr已排序
var binarySearchLeftBound = (arr, target) => {
	const len = arr.length
	let l = 0,
		r = len - 1
	let ret = -1
	while (l <= r) {
		const mid = Math.floor(l + (r - l) / 2)
		if (arr[mid] === target) {
			ret = mid
			r = mid - 1
		} else if (arr[mid] > target) {
			r = mid - 1
		} else {
			l = mid + 1
		}
	}
	return ret
}
```

#### 3 寻找右侧边界

```javascript
//arr已排序
var binarySearchRightBound = (arr, target) => {
	const len = arr.length
	let l = 0,
		r = len - 1
	let ret = -1
	while (l <= r) {
		const mid = Math.floor(l + (r - l) / 2)
		if (arr[mid] === target) {
			ret = mid
			l = mid + 1
		} else if (arr[mid] > target) {
			r = mid - 1
		} else {
			l = mid + 1
		}
	}
	return ret
}
```

#### 4 寻找插入位置

```javascript
//arr已排序
var searchInsert = function (nums, target) {
	const len = nums.length
	let l = 0,
		r = len - 1,
		mid
	while (l <= r) {
		mid = ((r - l) >> 1) + l
		if (nums[mid] === target) {
			return mid
		} else if (nums[mid] > target) {
			r = mid - 1
		} else {
			l = mid + 1
		}
	}
  //l插入点 l init = 0, 一直往左走结束就是0,一直往右走就是len
	return l
}
```

#### 5 查找第一个值等于给定值的元素(左边界)

```javascript {.line-numbers}
//返回索引,arr必须提前排序
const binarySearchLeftBound = (arr, target) => {
	const len = arr.length
	if (len === 0) return -1
	let l = 0,
		r = len - 1,
     mid
	while (l <= r) {
		mid = Math.floor((r - l) / 2 + l)
		if (arr[mid] < target) {
			l = mid + 1
		} else if (arr[mid] > target) {
			r = mid - 1
		} else {
			//已搜到第一个或已找到
			//if (mid === 0 || arr[mid - 1] < target) {
			if (mid === 0 || arr[mid - 1] !== target) {
				return mid
				//继续收缩右边界
			} else {
				r = mid - 1
			}
		}
	}
	return -1
}
```

#### 6 查找最后一个值等于给定值的元素(右边界)

```javascript {.line-numbers}
//返回索引,arr必须提前排序
const binarySearch = (arr, target) => {
	const len = arr.length
	if (len === 0) return -1
	let l = 0,
		r = len - 1,
      mid
	while (l <= r) {
		mid = Math.floor((r - l) / 2 + l)
		if (arr[mid] < target) {
			l = mid + 1
		} else if (arr[mid] > target) {
			r = mid - 1
		} else {
			//已搜到最后一个或已找到
			//if (mid === len - 1 || arr[mid + 1] > target) {
			if (mid === len - 1 || arr[mid + 1] !== target) {
				return mid
			} else {
				l = mid + 1
			}
		}
	}
	return -1
}
```

#### 7 查找第一个大于等于给定值的元素

```javascript {.line-numbers}
const binarySearch = (arr, target) => {
	let l = 0,
		r = arr.length - 1,
		mid
	while (l <= r) {
		mid = Math.floor((r - l) / 2 + l)
		if (arr[mid] >= target) {
			if (mid === 0 || arr[mid - 1] < target) {
				return mid
			} else {
				r = mid - 1
			}
		} else {
			l = mid + 1
		}
	}
	return -1
}
```

#### 8 查找最后一个小于等于给定值的元素

```javascript {.line-numbers}
const binarySearch = (arr, target) => {
	const len = arr.length
	let l = 0,
		r = len - 1,
		mid
	while (l <= r) {
		mid = Math.floor((r - l) / 2 + l)
		if (arr[mid] <= target) {
			if (mid === len - 1 || arr[mid + 1] > target) {
				return mid
			} else {
				l = mid + 1
			}
		} else {
			r = mid - 1
		}
	}
	return -1
}
```

#### 9 寻找左侧边界的二分搜索(labuladuo version)

```javascript {.line-numbers}
const leftBound = (arr, target) => {
  const len = arr.length
  if (len === 0) return -1
	let l = 0,
		//Note 1
		r = len - 1,
      mid
	//Note 2
	while (l <= r) {
		mid = Math.floor((r - l) / 2 + l)
		if (arr[mid] < target) {
			//Note 3
			l = mid + 1
		} else if (arr[mid] >= target) {
			//Note 3
			r = mid - 1
		}
	}
	//Note 4
	//检查出界情况
  //case 1: [1,2,2,2,3], 4, l = len
  //case 2: [2,3,3,3,4], 1, l = 0
	if (l >= len || arr[l] !== target) return -1
  //l是插入点
	return l
}
```

#### 10 寻找右侧边界的二分搜索(labuladuo version)

```javascript {.line-numbers}
const rightBound = (arr, target) => {
	let l = 0,
		r = arr.length - 1,
      mid
	while (l <= r) {
		mid = Math.floor((r - l) / 2 + l)
		if (arr[mid] <= target) {
			l = mid + 1
		} else if (arr[mid] > target) {
			r = mid - 1
		}
	}
	if (r < 0 || arr[r] !== target) return -1
  //r是插入点
	return r
}
```

### 旋转数组系列

#### [189.==旋转数组==](https://leetcode.cn/problems/rotate-array/)

```javascript
//brute force O(nk) - O(1)
var rotate = function (nums, k) {
	const len = nums.length
	for (let i = 0; i < k % len; i++) {
		let previous = nums[len - 1]
		for (let j = 0; j < len; j++) {
			;[nums[j], previous] = [previous, nums[j]]
		}
	}
}

//额外数组 O(n) - O(n)
var rotate = (nums, k) => {
	const len = nums.length,
		tmp = new Array(len)
	//元素的新位置(i + k) % len
	for (let i = 0; i < len; i++) {
		tmp[(i + k) % len] = nums[i]
	}
	for (let i = 0; i < len; i++) nums[i] = tmp[i]
}

//数组翻转 O(n) - O(1)
var rotate = (nums, k) => {
	const len = nums.length
  k %= len
  //特判
  if (k === 0) return
  const reverse = (arr, l, r) => {
    while (l < r) {
      [arr[l++], arr[r--]] = [arr[r], arr[l]]
    }
  }
  reverse(nums, 0, len - 1)
  reverse(nums, 0, k - 1)
  reverse(nums, k, len - 1)
}
```

#### [153.==寻找旋转排序数组中的最小值==](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)

```javascript
var findMin = function (nums) {
	const len = nums.length
	if (len === 0) return null
	if (len === 1) return nums[0]
	let l = 0,
		r = len - 1,
		mid
	//in case array is a sorted array
	if (nums[r] > nums[l]) return nums[0]
	while (l <= r) {
		mid = Math.floor((r - l) / 2 + l)
		//judge according to nums[mid]
		if (nums[mid] < nums[mid - 1]) return nums[mid]
		if (nums[mid] > nums[mid + 1]) return nums[mid + 1]
		//看右边
		if (nums[mid] < nums[len - 1]) {
			r = mid - 1
		} else {
			l = mid + 1
		}
	}
	return null
}

//better
var findMin = function (nums) {
	let l = 0, r = nums.length - 1, mid
	while (l < r) {
		mid = Math.floor(l + (r - l) / 2)
		//所有数据不重复，即不存在nums[mid] === nums[r]的情况
		//看右边
		if (nums[mid] < nums[r]) {
			r = mid
		} else {
			l = mid + 1
		}
	}
	return nums[l]
}
```

#### [154.==寻找旋转排序数组中的最小值 II==](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/)

```javascript
var findMin = function (nums) {
	let l = 0
	let r = nums.length - 1
	let mid
	while (l < r) {
		mid = Math.floor(l + (r - l) / 2)
		if (nums[mid] < nums[r]) {
			r = mid
		} else if (nums[mid] > nums[r]) {
			l = mid + 1
    //当nums[mid] === nums[r]，缩减右端点
		} else {
			r--
		}
	}
	return nums[l]
}
```

#### [33.==搜索旋转排序数组==](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)

```javascript
var search = function (nums, target) {
	const len = nums.length
	if (len === 0) return -1
  if (len === 1) return nums[0] === target ? 0 : -1
	let l = 0,
		r = len - 1,
		mid
	while (l <= r) {
		mid = Math.floor(l + (r - l) / 2)
		if (nums[mid] === target) return mid
		//看左边
    //in case mid === l
    //nums[0] <= nums[mid]
		if (nums[l] <= nums[mid]) {
       //[l, mid - 1]有序
      //nums[0] <= target && target < nums[mid]
			if (nums[l] <= target && target < nums[mid]) {
				r = mid - 1
			} else {
				l = mid + 1
			}
		} else {
       // [mid + 1, r]有序
			if (nums[mid] < target && target <= nums[len - 1]) {
				l = mid + 1
			} else {
				r = mid - 1
			}
		}
	}
	return -1
}
```

#### [81.搜索旋转排序数组 II](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/)

```javascript
var search = function (nums, target) {
	const len = nums.length
	if (len === 0) return false
	let l = 0,
		r = len - 1,
		mid
	while (l <= r) {
		mid = Math.floor(l + (r - l) / 2)
		if (nums[mid] === target) return true
		//move left pointer to exclude repeat item, or we can not define the monotonic section
		if (nums[l] === nums[mid] && nums[mid] === nums[r]) {
      l++
      r--
		} else	if (nums[l] <= nums[mid]) {
			if (nums[l] <= target && target < nums[mid]) {
				r = mid - 1
			} else {
				l = mid + 1
			}
		} else {
			if (nums[mid] < target && target <= nums[len - 1]) {
				l = mid + 1
			} else {
				r = mid - 1
			}
		}
	}
	return false
}
```

#### [==10.3 搜索旋转数组==](https://leetcode.cn/problems/search-rotate-array-lcci/)

```javascript
//arr有重复
var search = function (arr, target) {
	let l = 0,
		r = arr.length - 1,
		mid
	while (l <= r) {
		mid = Math.floor((r + l) / 2)
		//[5, 5, 5, 1, 2, 5]
		if (l !== r && arr[l] === arr[r]) {
			//排除第一个数和最后一个相等的情况
			r--
			continue
		}
		if (target === arr[mid] && (mid === 0 || target !== arr[mid - 1])) return mid
		if (arr[l] <= arr[mid]) {
			//[l, mid - 1]有序, 注意第二个等号存在重复item
			if (arr[l] <= target && target <= arr[mid]) {
				r = mid - 1
			} else {
				l = mid + 1
			}
		} else {
			// [mid + 1, r]有序
			if (arr[mid] <= target && target <= arr[r]) {
				l = mid + 1
			} else {
				r = mid - 1
			}
		}
	}
	return -1
}
```

### questions

#### [34.在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

```javascript {.line-numbers}
//brute force  O(n) - O(1)
//遍历一次，检查遍历元素是否等于target，第一个遇到的就是开始的位置
//再遍历一次，检查遍历元素刚好不等于target，这个元素的前一个位置就是结束的位置

//template version
const findFirstPosition = (arr, target) => {
	let l = 0,
		r = arr.length - 1,
		mid
	while (l <= r) {
		mid = Math.floor((r - l) / 2 + l)
		if (arr[mid] < target) {
			l = mid + 1
		} else if (arr[mid] > target) {
			r = mid - 1
		} else {
			if (mid === 0 || arr[mid - 1] !== target) {
				return mid
			} else {
				r = mid - 1
			}
		}
	}
	return -1
}

const findLastPosition = (arr, target) => {
  const len = arr.length
	let l = 0,
		r = len - 1,
		mid
	while (l <= r) {
		mid = Math.floor((r - l) / 2 + l)
		if (arr[mid] < target) {
			l = mid + 1
		} else if (arr[mid] > target) {
			r = mid - 1
		} else {
			if (mid === len - 1 || arr[mid + 1] !== target) {
				return mid
			} else {
				l = mid + 1
			}
		}
	}
	return -1
}

var searchRange = function (nums, target) {
	let ret = [-1, -1]
	if (nums.length === 0) return ret
	const firstPosition = findFirstPosition(nums, target)
	if (firstPosition === -1) return ret
	const lastPosition = findLastPosition(nums, target)
	return [firstPosition, lastPosition]
}

//official version
var searchRange = function (nums, target) {
	const findFirstPosition = (nums, target) => {
		let l = 0,
			r = nums.length - 1,
			mid
		while (l < r) {
			mid = Math.floor((l + r) / 2)
			if (nums[mid] < target) {
				//下轮搜索[mid + 1, r]
				l = mid + 1
			} else if (nums[mid] === target) {
				//下轮搜索[l, mid]
				r = mid
			} else {
				//下轮搜索[l, mid - 1]
				r = mid - 1
			}
		}
		if (nums[l] === target) return l
		return -1
	}

	const findLastPosition = (nums, target) => {
		let l = 0,
			r = nums.length - 1,
			mid
		while (l < r) {
			mid = Math.floor((l + r + 1) / 2)
			if (nums[mid] < target) {
				//下轮搜索[mid + 1, r]
				l = mid + 1
			} else if (nums[mid] === target) {
				//下轮搜索[mid, r]
				l = mid
			} else {
				//下轮搜索[l, mid - 1]
				r = mid - 1
			}
		}
		return l
	}
	let ret = [-1, -1]
	const len = nums.length
	if (len === 0) return ret
	const firstPosition = findFirstPosition(nums, target)
	if (firstPosition === -1) return ret
	const lastPosition = findLastPosition(nums, target)
	return [firstPosition, lastPosition]
}
```

#### [35. ==搜索插入位置==](https://leetcode.cn/problems/search-insert-position/)

```javascript
var searchInsert = function (nums, target) {
	const len = nums.length
	let l = 0,
		r = len - 1,
		mid
	while (l <= r) {
		mid = ((r - l) >> 1) + l
		if (nums[mid] === target) {
			return mid
		} else if (nums[mid] > target) {
			r = mid - 1
		} else {
			l = mid + 1
		}
	}
  //l插入点 l init = 0, 一直往左走结束就是0,一直往右走就是len
	return l
}
```

#### [69. ==x 的平方根==](https://leetcode-cn.com/problems/sqrtx/)

```javascript {.line-numbers}
var mySqrt = function (x) {
	if (x < 2) return x
	let l = 0,
		r = x,
		mid
	while (l <= r) {
		mid = Math.floor(l + (r - l) / 2)
		if (mid * mid < x) {
			l = mid + 1
		} else if (mid * mid > x) {
			r = mid - 1
		} else {
			return mid
		}
	}
	//返回较小值
	return r
}
```

#### [74.==搜索二维矩阵==](https://leetcode.cn/problems/search-a-2d-matrix/)

```javascript
//brute force
//遍历每个元素

//对每一行都使用一次二分查找
var searchMatrix = function (matrix, target) {
	if (matrix.length == 0 || matrix[0].length == 0) return false
	for (const row of matrix) {
		if (search(row, target) >= 0) return true
	}
	return false
}

const search = (nums, target) => {
	let l = 0,
		r = nums.length - 1
	while (l <= r) {
		const mid = Math.floor((r - l) / 2) + l
		const num = nums[mid]
		if (num === target) {
			return mid
		} else if (num > target) {
			r = mid - 1
		} else {
			l = mid + 1
		}
	}
	return -1
}

//二分，把二维数组matrix[m][n]逻辑上当做一维数组arr[m*n]
//把二维数组matrix中row行col列对应arr中row*n + col
//arr中下标x换算matrix行列关系：row=x/n col=x%n
var searchMatrix = function (matrix, target) {
	let rows = matrix.length
	if (rows === 0) return false
	let cols = matrix[0].length
	if (cols === 0) return false
	let l = 0,
		r = rows * cols - 1
  //一维中间节点，对应的二位数组中的值
	let pivotIdx, pivotData
	while (l <= r) {
		pivotIdx = Math.floor((l + r) / 2)
		pivotData = matrix[Math.floor(pivotIdx / cols)][pivotIdx % cols]
		if (target === pivotData) {
			return true
		} else {
			if (target < pivotData) {
				r = pivotIdx - 1
			} else {
				l = pivotIdx + 1
			}
		}
	}
	return false
}

//better 左下角或右上角坐标轴法 
var findNumberIn2DArray = function (matrix, target) {
	if (matrix.length == 0 || matrix[0].length == 0) return false
	let row = matrix.length - 1,
		col = 0
	while (row >= 0 && col < matrix[0].length) {
		if (matrix[row][col] === target) {
			return true
		} else if (matrix[row][col] > target) {
			row--
		} else {
			col++
		}
	}
	return false
}

//分治
var searchMatrix = function (matrix, target) {
	const helper = (matrix, target, startRow, startCol, endRow, endCol) => {
    //元素小于1或分割的矩阵最小元素大于目标值
		if (
			startRow > endRow ||
			startCol > endCol ||
			matrix[startRow][startCol] > target
		)
			return false
    //对角线长度，囊括正方形和长方形
		const diagonal_length = Math.min(
			endRow - startRow + 1,
			endCol - startCol + 1
		)
    //基于对角线找目标元素
		for (let i = 0; i < diagonal_length; i++) {
			if (matrix[startRow + i][startCol + i] === target) return true
      //找到分界点，分治查找左下和右上
			if (
				i === diagonal_length - 1 ||
				matrix[startRow + i + 1][startCol + i + 1] > target
			) {
				return (
					helper(
						matrix,
						target,
						startRow,
						startCol + i + 1,
						startRow + i,
						endCol
					) ||
					helper(
						matrix,
						target,
						startRow + i + 1,
						startCol,
						endRow,
						startCol + i
					)
				)
			}
		}
		return false
	}
	if (matrix.length == 0 || matrix[0].length == 0) return false
	return helper(matrix, target, 0, 0, matrix.length - 1, matrix[0].length - 1)
}
```

#### [240.搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/)

```javascript
//brute force O(mn)

//O(mlogn)
var searchMatrix = function (matrix, target) {
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
	//一次舍弃半行
	for (const row of matrix) {
		const index = search(row, target)
		if (index >= 0) return true
	}
	return false
}

//O(m + n)
var searchMatrix = function(matrix, target) {
    const m = matrix.length, n = matrix[0].length
    let x = 0, y = n - 1
    //从右上角开始找
    while (x < m && y >= 0) {
        if (matrix[x][y] === target) {
            return true;
        }
        if (matrix[x][y] > target) {
            --y;
        } else {
            ++x;
        }
    }
    return false;
}
```

#### [367.==有效的完全平方数==](https://leetcode-cn.com/problems/valid-perfect-square/)

```javascript {.line-numbers}
var isPerfectSquare = function (num) {
	if (num < 2) return num
	let l = 0,
		r = num,
		mid
	while (l <= r) {
		mid = Math.floor(l + (r - l) / 2)
		if (mid * mid < num) {
			l = mid + 1
		} else if (mid * mid > num) {
			r = mid - 1
		} else if (mid * mid === num) {
			return true
		}
	}
	return false
}

//Math
var isPerfectSquare = function (num) {
	let x = 1,
		square = 1
	while (square <= num) {
		if (square === num) return true
		x++
		square = x * x
	}
	return false
}
```
