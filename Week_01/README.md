### 学习笔记

#### Array

##### 移动零

- 循环3次，第一次记录0的数目和非0值，第二次再加入0的值，第三次交换数组 O(n) - O(n)

  ```javascript
  var moveZeroes = function (nums) {
  	let zeroCount = 0,
  		ret = [],
  		len = nums.length
  	for (let i = 0; i < len; i++) {
  		if (nums[i] === 0) {
  			zeroCount++
  		} else {
  			ret.push(nums[i])
  		}
  	}
  
  	while (zeroCount--) {
  		ret.push(0)
  	}
  
  	for (let i = 0; i < len; i++) {
  		nums[i] = ret[i]
  	}
  }
  ```

- 循环一次，splice去掉先，然后push个0,splice改变了数组的长度，这里有坑，所以必须从后面循环 O(n^2) - O(1)

  ```javascript
  var moveZeroes = function (nums) {
  	for (let i = 0, len = nums.length; i--; ) {
  		if (nums[i] === 0) {
  			nums.splice(nums[i])
  			nums.push(0)
  		}
  	}
  }
  ```

- 循环一整次和一次0个数的循环，一次把非0换到前面，二次循环把0填进去 O(n) - O(1)

  ```javascript
  var moveZeroes = function (nums) {
  	let lastFoundZeroIndex = 0
  	for (let i = 0, len = nums.length; i < len; i++) {
  		if (nums[i] !== 0) {
  			nums[lastFoundZeroIndex++] = nums[i]
  		}
  	}
  	while (lastFoundZeroIndex--) {
  		nums.push(0)
  	}
  }
  ```

  

- 循环一次，快慢指针，数组解构swap，lastFoundZeroIndex交换一次加一下 O(n)- O(1)

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

##### 装最多水的容器

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

- two pointer夹逼 O(n) - O(1) 

  ```javascript
  var maxArea = function (height) {
  	let maxArea = 0,
  		l = 0,
  		r = height.length - 1
  	while (l < r) {
  		maxArea = Math.max(maxArea, Math.min(height[l], height[r]) * (r - l))
  		height[l] < height[r] ? l++ : r--
  	}
  	return maxArea
  }
  ```

##### ==两数之和==

- brute force O(n^2) - O(1)

  ```javascript
  var twoSum = function (nums, target) {
  	let len = nums.length
  	for (let i = 0; i < len - 1; i++) {
  		for (let j = i + 1; j < len; j++) {
  			if (nums[i] + nums[j] === target) {
  				return [i, j]
  			}
  		}
  	}
  }
  ```

- 两次哈希 O(n) - O(n)

  ```javascript
  //map
  var twoSum = function (nums, target) {
  	let len = nums.length,
  		map = new Map()
  	for (let i = 0; i < len; i++) {
  		map.set(nums[i], i)
  	}
  	for (let i = 0; i < len; i++) {
  		let temp = target - nums[i]
  		//can not be itself
  		if (map.has(temp) && map.get(temp) !== i) {
  			return [i, map.get(temp)]
  		}
  	}
  }
  //obj
  var twoSum = function (nums, target) {
  	let res = {}
  	for (let i = 0; i < nums.length; i++) {
  		res[target - nums[i]] = nums[i]
  	}
  	for (let j = 0; j < nums.length; j++) {
  		if (res[nums[j]] !== undefined) {
  			let idx = nums.indexOf(res[nums[j]])
  			if (idx !== j) {
  				return [j, idx]
  			}
  		}
  	}
  }
  ```

- 一次哈希 O(n) - O(n)

  ```javascript
  //map
  var twoSum = function (nums, target) {
  	let map = new Map()
  	for (let i = 0, len = nums.length; i < len; i++) {
  		let temp = target - nums[i]
  		if (map.has(temp)) {
  			return [map.get(temp), i]
  		}
      //set first, then check if value 
  		map.set(nums[i], i)
  	}
  }
  
  //obj
  var twoSum = function (nums, target) {
  	let res = {}
  	for (let i = 0; i < nums.length; i++) {
  		let matched = res[nums[i]]
  		if (matched !== undefined) {
  			return [i, nums.indexOf(matched)]
  		}
  		res[target - nums[i]] = nums[i]
  	}
  }
  ```

##### ==三数之和==

- brute force O(n^3) O(1)

  ```javascript
  var threeSum = function (nums) {
  	let res = {},
  		ret = []
  	for (let i = 0; i < nums.length - 2; i++) {
  		for (let j = i + 1; j < nums.length - 1; j++) {
  			for (let k = j + 1; k < nums.length; k++) {
  				if (nums[i] + nums[j] + nums[k] === 0) {
  					let key = [nums[i], nums[j], nums[k]].sort()
  					if (!res[key]) {
  						res[key] = true
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
  
  ```

- 加逼（大部分情况已排序） 

  ```javascript
  var threeSum = function (nums) {
    if (nums.length < 3) return []
  	let ret = []
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
  				while (nums[left] === nums[left + 1]) {
  					left++
  				}
  				left++
  				//skip duplicated nums[right]
  				while (nums[right] === nums[right - 1]) {
  					right--
  				}
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

  

##### 爬楼梯

- 类斐波那契数 O(n) - O(1)

  ```javascript
  var climbStairs = function (n) {
  	if (n <= 2) {
  		return n
  	}
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
  	let dp = Array(n + 1)
  	dp[1] = 1
  	dp[2] = 2
  	for (let i = 3; i <= n; i++) {
  		dp[i] = dp[i - 1] + dp[i - 2]
  	}
  	return dp[n]
  }
  ```

#### 栈

##### 有效括号

- brute force

  ```javascript
  var isValid = function (s) {
  	let reg = /\(\)|\[\]|\{\}/g
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

- use stack method ans switch O(n) - O(n) but faster than above

  ```javascript
  var isValid = function (s) {
  	let stack = []
  	for (let c of s) {
  		switch (c) {
  			case '(':
  				stack.push(')')
  				break
  			case '[':
  				stack.push(']')
  				break
  			case '{':
  				stack.push('}')
  				break
  			default:
  				if (c !== stack.pop()) return false
  		}
  	}
  	return stack.length === 0
  }
  ```

##### 最小栈

- 使用辅助栈

  ```javascript
  var MinStack = function () {
    //minStack add a initial value
  	;(this.stack = []), (this.minStack = [Infinity])
  }
  
  //sync push
  MinStack.prototype.push = function (x) {
  	this.stack.push(x)
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

##### 柱状图中最大的矩形

- ==brute force (not pass!!!) O(n^3) - O(1)==

  ```javascript
  var largestRectangleArea = function (heights) {
  	let maxArea = 0,
  		len = heights.length
  	for (let i = 0; i < len; i++) {
  		for (let j = i; j < len; j++) {
  			let minHeight = Number.MAX_SAFE_INTEGER
  			for (let k = i; k <= j; k++) {
  				minHeight = Math.min(minHeight, heights[k])
  				maxArea = Math.max(maxArea, minHeight * (j - i + 1))
  			}
  		}
  	}
  	return maxArea
  }
  ```

- optimal brute force O(n^2) - O(1)

  ```javascript
  var largestRectangleArea = function (heights) {
  	let maxArea = 0,
  		len = heights.length
  	for (let i = 0; i < len; i++) {
  		let minHeight = Number.MAX_SAFE_INTEGER
      //枚举j也就是枚举minHeight 
  		for (let j = i; j < len; j++) {
  			minHeight = Math.min(minHeight, heights[j])
  			maxArea = Math.max(maxArea, minHeight * (j - i + 1))
  		}
  	}
  	return maxArea
  }
  ```

- ==栈(not pass!!!) O(n) - O(n)==

  ```javascript
  var largestRectangleArea = function (heights) {
  	let maxArea = 0,
  		len = heights.length,
  		stack = [-1],
  		lastItemIdx = stack.length - 1
  	for (let i = 0; i < len; i++) {
  		while (
  			stack[lastItemIdx] !== -1 &&
  			heights[stack[lastItemIdx]] >= heights[i]
  		) {
  			maxArea = Math.max(
  				maxArea,
  				heights[stack.pop()] * (i - stack[lastItemIdx] - 1)
  			)
  			stack.push(i)
  		}
  	}
  	while (stack[lastItemIdx] !== -1) {
  		maxArea = Math.max(
  			maxArea,
  			heights[stack.pop()] * (len - stack[lastItemIdx] - 1)
  		)
  	}
  	return maxArea
  }
  ```

##### 滑动窗口最大值

- brute force O(n * k) - O(n - k +1)

  ```javascript
  var maxSlidingWindow = function (nums, k) {
  	let slideWindow = [],
  		ret = [],
  		len = nums.length
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
  	let deque = [],
  		ret = [],
  		len = nums.length
  	for (let i = 0; i < len; i++) {
  		//remove invalid items, like i = 4, k = 3, remove i - k + 1
  		while (deque[0] < i - k + 1) {
  			deque.shift()
  		}
  		//双端队列是一个递减队列
  		while (nums[deque[deque.length - 1]] < nums[i]) {
  			deque.pop()
  		}
  
  		deque.push(i)
  
  		//双端队列是一个递减队列
  		if (i >= k - 1) {
  			ret.push(nums[deque[0]])
  		}
  	}
  	return ret
  }
  ```

- ==DP O(n) - O(n) 未实现==

#### 链表

##### 反转链表

- 迭代 O(n) - O(1)

  ```javascript
  var reverseList = function (head) {
  	let previous = null,
  		current = head,
  		next
  	while (current) {
  		//store next
  		next = current.next
  		//reverse
  		current.next = previous
  		//update previous
  		previous = current
  		//update current
  		current = next
  	}
  	//return null if head == null
  	return previous
  }
  ```

- 递归 O(n) - O(1) ==help==

  ```javascript
  var reverseList = function (head) {
  	if (head == null || head.next == null) return head
  	let p = reverseList(head.next)
  	head.next.next = head
  	head.next = null
  	return p
  }
  ```

##### 交换链表  ==help==

```javascript
//不明白
var swapPairs = function (head) {
	const dummy = new ListNode(0)
	dummy.next = head
	let current = dummy
	while (current.next != null && current.next.next != null) {
		// 初始化双指针
		const first = current.next
		const second = current.next.next

		// 更新双指针和 current 指针
		first.next = second.next
		second.next = first
		current.next = second

		// 更新指针
		current = current.next.next
	}
	return dummy.next
}
```

#####  环形链表

- Hash O(n) - O(n)

  ```javascript
  var hasCycle = function (head) {
  	let set = new Set()
  	while (head) {
  		if (set.has(head)) {
  			return true
  		} else {
  			set.add(head)
  		}
  		head = head.next
  	}
  	return false
  }
  ```

- fast and slow pointer O(n) - O(1)

  ```javascript
  var hasCycle = function (head) {
  	if (head == null || head.next == null) {
  		return false
  	}
  	let slow = head,
  		fast = head.next
  	while (slow != fast) {
  		if (fast == null || fast.next == null) {
  			return false
  		}
  		slow = slow.next
  		fast = fast.next.next
  	}
  	return true
  }
  ```

##### 环形链表2

- Hash O(n) - O(n)

  ```javascript
  var detectCycle = function (head) {
  	let set = new Set(),
  		node = head
  
  	while (node) {
  		if (set.has(node)) return node
  		set.add(node)
  		node = node.next
  	}
  	return node
  }
  ```

- fast and slow pointer O(n) - O(1)

##### K个一组翻转链表 ==backlog==

```javascript
const myReverse = (head, tail) => {
    let prev = tail.next;
    let p = head;
    while (prev !== tail) {
        const nex = p.next;
        p.next = prev;
        prev = p;
        p = nex;
    }
    return [tail, head];
}
var reverseKGroup = function(head, k) {
    const hair = new ListNode(0);
    hair.next = head;
    let pre = hair;

    while (head) {
        let tail = pre;
        // 查看剩余部分长度是否大于等于 k
        for (let i = 0; i < k; ++i) {
            tail = tail.next;
            if (!tail) {
                return hair.next;
            }
        }
        const nex = tail.next;
        [head, tail] = myReverse(head, tail);
        // 把子链表重新接回原链表
        pre.next = head;
        tail.next = nex;
        pre = tail;
        head = tail.next;
    }
    return hair.next;
};
```





#### 作业

##### Design Circular Deque

##### Trapping Rain Water

```javascript
//brute force O(n^2) O(1) 
var trap = function (height) {
	let ret = 0,
		len = height.length
  //the last item can not store water
	for (let i = 0; i < len - 1; i++) {
		let leftMax = 0,
			rightMax = 0
		for (let j = i; j >= 0; j--) {
			leftMax = Math.max(leftMax, height[j])
		}
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

##### 删除排序数组重复项

```javascript
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

##### 旋转数组

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

//额外数组
//环状替换
//反转
```

##### 合并两个有序链表

##### 合并两个有序数组

##### 加一

```javascript
var plusOne = function (digits) {
	const len = digits.length
	for (let i = len - 1; i >= 0; i--) {
		digits[i]++
		digits[i] %= 10
		if (digits[i] != 0) return digits
	}
	digits = [...Array(len + 1)].map((_) => 0)
	digits[0] = 1
	return digits
}
```







