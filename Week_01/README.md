### 学习笔记

#### Array

##### [283移动零E](https://leetcode-cn.com/problems/move-zeroes/)

- 循环3次，额外使用一个数组空间，第一次记录0的位置和填入非0值，第二次额外数组再加入0的个数，第三次交换到原数组 O(n) - O(n)

- 循环一次，splice去掉0值，然后最后push个0,splice改变了数组的长度，这里有坑，所以必须从后面循环 O(n^2) - O(1)

- 循环一整次把非0换到前面，第二次循环把0填到后面 O(n) - O(1)

  ```javascript
  var moveZeroes = function (nums) {
  	let lastFoundZeroIndex = 0
  	for (let i = 0; i < nums.length; i++) {
          //move non-zero to front
  		if (nums[i] !== 0) {
  			nums[lastFoundZeroIndex++] = nums[i]
  		}
  	}
      //update behind item to zero
  	for (let i = lastFoundZeroIndex; i < nums.length; i++) {
  		nums[i] = 0
  	}
      return nums
  }
  ```

- 循环一次，快慢指针，慢指针当前第一个0的位置，数组解构快速交换0与非0  O(n)- O(1)

  ```javascript
  var moveZeroes = function (nums) {
  	let lastFoundZeroIndex = 0,
  		len = nums.length
  	for (let cur = 0; cur < len; cur++) {
  		if (nums[cur] !== 0) {
  			;[nums[lastFoundZeroIndex++], nums[cur]] = [
  				nums[cur],
  				nums[lastFoundZeroIndex],
  			]
  		}
  	}
  }
  ```

##### [11装最多水的容器M](https://leetcode-cn.com/problems/container-with-most-water/)

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

##### ==[1两数之和E](https://leetcode-cn.com/problems/two-sum/)==

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
	let map = new Map(),
		len = nums.length
	for (let i = 0; i < len; i++) {
		for (let j = i + 1; j < len; j++) {
			map.set(target - nums[i], i)
		}
	}
	for (let j = 0; j < len; j++) {
    //can not be itself
		if (map.has(nums[j]) && map.get(nums[j]) !== j) {
			return [j, map.get(nums[j])]
		}
	}
}
//obj
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
	let hash = {},
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
//map
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
	let map = new Map()
	for (let i = 0, len = nums.length; i < len; i++) {
		let temp = target - nums[i]
		if (map.has(temp)) {
			return [map.get(temp), i]
		}
		map.set(nums[i], i)
	}
}

//obj  不需要判重，先检查若没有再加
var twoSum = function (nums, target) {
	let hash = {}

	for (let i = 0, len = nums.length; i < len; i++) {
		let idx = hash[nums[i]]
		if (idx !== undefined) {
			return [idx, i]
		}
		hash[target - nums[i]] = i
	}
}}
```

##### ==[15三数之和M](https://leetcode-cn.com/problems/3sum/)==

- brute force O(n^3) O(1)  //Time limit exceeded

  ```javascript
  var threeSum = function (nums) {
  	let ret = []
  	if (nums == null || nums.length < 3) return ret
  	let len = nums.length,
  		map = {}
  	for (let i = 0; i < len - 2; i++) {
  		for (let j = i + 1; j < len - 1; j++) {
  			for (let k = j + 1; k < len; k++) {
  				if (nums[i] + nums[j] + nums[k] === 0) {
                        //duplicate-removal
  					let key = [nums[i], nums[j], nums[k]].sort()
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
    	let arr = []
    	if (nums == null || nums.length < 3) return arr
    	nums.sort((a, b) => a - b)
    	for (var i = 0; i < nums.length - 2; i++) {
    		if (nums[i] > 0) break
    		if (i > 0 && nums[i] == nums[i - 1]) continue
             const hashMap = new Map()
    		for (var j = i + 1; j < nums.length; j++) {
    			const val = -(nums[i] + nums[j])
    			// hashMap是首次记录第二次才会push到数组
    			// 前三个数肯定不重，所以j > i + 2
    			if (j > i + 2 && nums[j] == nums[j - 1] && nums[j] == nums[j - 2]) {
    				continue
    			}
    			//第二次push
    			if (hashMap.has(val)) {
    				arr.push([nums[i], nums[hashMap.get(val)], nums[j]])
    				//防止重复[-2, 0, 0, 2, 2]
    				hashMap.delete(val)
    			}
    			//第一次直接加
    			hashMap.set(nums[j], j)
    		}
    	}
    	return arr
    }
    ```

- 夹逼（大部分情况需已排序） O(n^2) O(1) 

  ```javascript
  var threeSum = function (nums) {
  	let ret = []
  	if (nums == null || nums.length < 3) return ret
  	//here is a hole, need sort first
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
  			let sum = nums[k] + nums[left] + nums[right]
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
  
##### [70爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

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

##### [88合并两个有序数组E](https://leetcode-cn.com/problems/merge-sorted-array/)

```javascript
//双指针 / 从前往后 O(n+m) - O(m)
var merge = function (nums1, m, nums2, n) {
	let nums1_copy = [...nums1.slice(0, m)],
    // Two get pointers for nums1_copy and nums2.
		p1 = 0,
		p2 = 0,
    // Set pointer for nums1
		p = 0
	while (p1 < m && p2 < n) {
		nums1[p++] = nums1_copy[p1] < nums2[p2] ? nums1_copy[p1++] : nums2[p2++]
	}

	while (p1 < m) {
		nums1[p++] = nums1_copy[p1++]
	}
	while (p2 < n) {
		nums1[p++] = nums2[p2++]
	}
}

//双指针 / 从前往后 O(n+m) - O(1)
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

##### [26删除排序数组重复项E](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

```javascript
//slow / fast two pointer 
var removeDuplicates = function (nums) {
	if (nums.length === 0) return 0
	let i = 0
	for (let j = 1; j < nums.length; j++) {
		if (nums[i] !== nums[j]) {
			nums[++i] = nums[j]
		}
	}
	return i + 1
}
```

##### [189旋转数组E](https://leetcode-cn.com/problems/rotate-array/)

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

##### [20有效括号E](https://leetcode-cn.com/problems/valid-parentheses/)

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

##### [155最小栈E](https://leetcode-cn.com/problems/min-stack/)

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

##### [84柱状图中最大的矩形H](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)   ==backlog==

##### [239滑动窗口最大值H ](https://leetcode-cn.com/problems/sliding-window-maximum/)

- brute force O(n * k) - O(n - k +1)

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

##### [42Trapping Rain WaterH](https://leetcode-cn.com/problems/trapping-rain-water/)

```javascript
//brute force O(n^2) O(1) 

var trap = function (height) {
	let ret = 0,
		len = height.length
  //the last item can not store water
	for (let i = 0; i < len - 1; i++) {
    //two pointer
		let leftMax = 0,
			rightMax = 0
    //Search the left part for max bar size
		for (let j = i; j >= 0; j--) {
			leftMax = Math.max(leftMax, height[j])
		}
    //Search the right part for max bar size
		for (let j = i; j < len; j++) {
			rightMax = Math.max(rightMax, height[j])
		}
		ret += Math.min(leftMax, rightMax) - height[i]
	}
	return ret
}

//DP O(n) O(n) 
var trap = function (height) {
	let ret = 0,
		len = height.length,
		leftMax = [],
		rightMax = []

	leftMax[0] = height[0]
	for (let i = 1; i < len; i++) {
		leftMax[i] = Math.max(height[i], leftMax[i - 1])
	}
	rightMax[len - 1] = height[len - 1]
	for (let i = len - 2; i >= 0; i--) {
		rightMax[i] = Math.max(height[i], rightMax[i + 1])
	}
	for (let i = 1; i < len - 1; i++) {
		ret += Math.min(leftMax[i], rightMax[i]) - height[i]
	}
	return ret
}
//stack O(n) O(n) 
//two pointer O(n) O(1) 
```

##### [66加一E](https://leetcode-cn.com/problems/plus-one/)

```javascript
var plusOne = function (digits) {
	const len = digits.length
    //从后往前+
	for (let i = len - 1; i >= 0; i--) {
		digits[i]++
        //变回个位数
		digits[i] %= 10
		if (digits[i] != 0) return digits
	}
	digits = [...Array(len + 1)].map((_) => 0)
	digits[0] = 1
	return digits
}
```
