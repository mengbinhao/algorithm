### 学习笔记

#### Array

##### [283.移动零 E](https://leetcode-cn.com/problems/move-zeroes/)

- 循环一整次把非 0 换到前面，第二次循环把 0 填到后面 O(n) - O(1)

  ```javascript
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
  ```

- 循环一次，快慢指针，慢指针当前第一个 0 的位置，数组解构快速交换 0 与非 0 O(n)- O(1)

  ```javascript
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

##### [11.装最多水的容器 M](https://leetcode-cn.com/problems/container-with-most-water/)

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

##### ==[1.两数之和 E](https://leetcode-cn.com/problems/two-sum/)==

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

##### ==[15.三数之和 M](https://leetcode-cn.com/problems/3sum/)==

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
  	//precondition！！！
  	nums.sort((a, b) => a - b)
  	for (var i = 0; i < nums.length - 2; i++) {
  		if (nums[i] > 0) break
  		if (i > 0 && nums[i] == nums[i - 1]) continue
  		const hash = new Map()
  		for (var j = i + 1; j < nums.length; j++) {
  			const val = -(nums[i] + nums[j])
  			// 前三个数组成的结果肯定不重，所以j > i + 2
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
  	//precondition！！！
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

##### [70.爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

- 类斐波那契数 O(n) - O(1)

  ```javascript
  var climbStairs = function (n) {
  	if (n <= 2) return n

  	let first = 1,
  		second = 2,
  		third = 3

  	for (let i = 3; i <= n; i++) {
  		third = first + second
  		first = second
  		second = third
  	}

  	return third
  }
  ```

- DP O(n) - O(n)

  ```javascript
  var climbStairs = function (n) {
  	const dp = new Array(n + 1)
  	dp[0] = 1
  	dp[1] = 1

  	for (let i = 2; i <= n; i++) {
  		dp[i] = dp[i - 1] + dp[i - 2]
  	}
  	return dp[n]
  }
  ```

##### [88.合并两个有序数组 E](https://leetcode-cn.com/problems/merge-sorted-array/)

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
	//nums2没完复制就是
	while (q >= 0) {
		nums1[k--] = nums1[p] > nums2[q] ? nums1[p--] : nums2[q--]
	}
}
```

##### [26.删除排序数组重复项 E](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

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

##### [189.旋转数组 E](https://leetcode-cn.com/problems/rotate-array/)

```javascript
//brute force O(n*k) O(1)
var rotate = function (nums, k) {
	let previous, temp
	for (let i = 0; i < k; i++) {
		previous = nums[nums.length - 1]
		for (let j = 0; j < nums.length; j++) {
			temp = nums[j]
			nums[j] = previous
			previous = temp
		}
	}
}

//额外数组 O(n) O(n)
var rotate = (nums, k) => {
	let a = new Array(nums.length)
	for (let i = 0; i < nums.length; i++) {
		a[(i + k) % nums.length] = nums[i]
	}
	for (let i = 0; i < nums.length; i++) {
		nums[i] = a[i]
	}
}
//环状替换
//反转 O(n) O(1)
var rotate = (nums, k) => {
	var reverse = (nums, start, end) => {
		while (start < end) {
			let temp = nums[start]
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

#### 栈(典型的空间换时间)

##### [20.有效括号 E](https://leetcode-cn.com/problems/valid-parentheses/)

- brute force 一直替换

  ```javascript
  var isValid = function (s) {
  	const reg = /\(\)|\[\]|\{\}/g
  	while (s.includes('()') || s.includes('[]') || s.includes('{}')) {
  		s = s.replace(reg, '')
  	}
  	return s === ''
  }
  ```

- use stack method O(n) - O(n)

  ```javascript
  var isValid = function (s) {
  	let map = {
  			'(': ')',
  			'[': ']',
  			'{': '}',
  		},
  		stack = []
  	for (let c of s) {
  		if (map[c]) {
  			stack.push(map[c])
  		} else {
  			if (c !== stack.pop()) {
  				return false
  			}
  		}
  	}
  	return stack.length === 0
  }
  ```

##### [155.最小栈 E](https://leetcode-cn.com/problems/min-stack/)

- 使用辅助栈

  ```javascript
  var MinStack = function () {
  	//minStack add a initial value
  	;(this.stack = []), (this.minStack = [Infinity])
  }

  //sync push
  MinStack.prototype.push = function (x) {
  	this.stack.push(x)
  	//peek always min item
  	this.minStack.push(Math.min(this.minStack[this.minStack.length - 1], x))
  }

  //sync pop
  MinStack.prototype.pop = function () {
  	this.stack.pop()
  	this.minStack.pop()
  }

  MinStack.prototype.top = function () {
  	return this.stack[this.stack.length - 1]
  }

  MinStack.prototype.getMin = function () {
  	return this.minStack[this.minStack.length - 1]
  }
  ```

##### [84.柱状图中最大的矩形 H](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/) ==backlog==

##### [239.滑动窗口最大值 H ](https://leetcode-cn.com/problems/sliding-window-maximum/)

- brute force O(n \* k) - O(n - k +1)

  ```javascript
  var maxSlidingWindow = function (nums, k) {
  	let slideWindow = [],
  		ret = [],
  		len = nums.length
  	//loop max window value = len - k + 1
  	for (let i = 0; i < len - k + 1; i++) {
  		for (let j = 0; j < k; j++) {
  			slideWindow.push(nums[i + j])
  		}
  		ret.push(Math.max(...slideWindow))
  		slideWindow = []
  	}
  	return ret
  }
  ```

- deque O(n) - O(n)

  ```javascript
  var maxSlidingWindow = function (nums, k) {
  	let deque = [], //放的下标,递减队列,第一个第一大的index,依此类推
  		ret = []
  	//头尾尾头
  	for (let i = 0, len = nums.length; i < len; i++) {
  		//队列满了移出去一个
  		if (deque[0] < i - k + 1) {
  			deque.shift()
  		}

  		//维护递减队列,第一个第一大的index,依此类推
  		while (nums[deque[deque.length - 1]] < nums[i]) {
  			deque.pop()
  		}

  		deque.push(i)

  		if (i >= k - 1) {
  			ret.push(nums[deque[0]])
  		}
  	}
  	return ret
  }
  ```

#### 作业

##### [42.接雨水 H](https://leetcode-cn.com/problems/trapping-rain-water/)

```javascript
//brute force O(n^2) - O(1)
var trap = function (height) {
	let ret = 0
	const len = height.length
	//the last item can not store water
	for (let i = 1; i < len - 1; i++) {
		//two pointer
		let leftMax = 0,
			rightMax = 0
		//找到左边的最高柱
		for (let j = i; j >= 0; j--) {
			leftMax = Math.max(leftMax, height[j])
		}
		//找到右边的最高柱
		for (let j = i; j < len; j++) {
			rightMax = Math.max(rightMax, height[j])
		}
		//计算每个height[i]能接到的雨水，并加到最终结果
		ret += Math.min(leftMax, rightMax) - height[i]
	}
	return ret
}

//备忘录优化 O(n) - O(n)
var trap = function (height) {
	const len = height.length
	let ret = 0,
		//提前存储每个height[i]对应的左右最大值
		leftMax = [],
		rightMax = []

	leftMax[0] = height[0]
	for (let i = 1; i < len; i++) {
		//leftMax会传递
		leftMax[i] = Math.max(height[i], leftMax[i - 1])
	}
	rightMax[len - 1] = height[len - 1]
	for (let i = len - 2; i >= 0; i--) {
		rightMax[i] = Math.max(height[i], rightMax[i + 1])
	}
	//两边无法接雨水
	for (let i = 1; i < len - 1; i++) {
		ret += Math.min(leftMax[i], rightMax[i]) - height[i]
	}
	return ret
}

//two pointer O(n) - O(1)
var trap = function (height) {
	const len = height.length
	if (len === 0) return 0
	let left = 0,
		right = len - 1,
		ret = 0

	let l_max = height[0],
		r_max = height[len - 1]

	while (left < right) {
		l_max = Math.max(l_max, height[left])
		r_max = Math.max(r_max, height[right])

		if (l_max < r_max) {
			ret += l_max - height[left]
			left++
		} else {
			ret += r_max - height[right]
			right--
		}
	}
	return ret
}
```

##### [66.加一 E](https://leetcode-cn.com/problems/plus-one/)

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
