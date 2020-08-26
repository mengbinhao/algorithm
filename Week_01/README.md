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

##### [394字符串解码M](https://leetcode-cn.com/problems/decode-string/)

```javascript
var decodeString = function (s) {
	let numStack = [],
		strStack = [],
		multiple = 0,
		ret = ''

	for (let c of s) {
		if (!isNaN(c)) {
			multiple = multiple * 10 + Number(c)
		} else if (c === '[') {
             //前面的字母和倍数都压入栈，并释放临时变量
			numStack.push(multiple)
			multiple = 0
			strStack.push(ret)
			ret = ''
		} else if (c === ']') {
            //合并两个栈顶
			ret = strStack.pop() + ret.repeat(numStack.pop())
		} else {
			ret += c
		}
	}
	return ret
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

##### [239滑动窗口最大值H ](https://leetcode-cn.com/problems/sliding-window-maximum/) ==backlog==

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
  		//remove invalid items, like i = 4, k = 3, remove i - k + 1
  		//队列满了移出去一个
  		if (deque[0] < i - k + 1) {
  			deque.shift()
  		}
  
  		//双端队列放的前K大,第一个是第一大
  		while (nums[deque[deque.length - 1]] < nums[i]) {
  			deque.pop()
  		}
  
  		deque.push(i)
  
  		//开始存ret
  		if (i >= k - 1) {
  			ret.push(nums[deque[0]])
  		}
  	}
  	return ret
  }
  ```

#### 链表

##### [2两数相加M](https://leetcode-cn.com/problems/add-two-numbers/)

```javascript
//three point + dummyNode
var addTwoNumbers = function (l1, l2) {
	let dummyNode = new ListNode(0),
		p1 = l1,
		p2 = l2,
		cur = dummyNode,
		carry = 0
	while (p1 !== null || p2 !== null) {
		const x = p1 !== null ? p1.val : 0
		const y = p2 !== null ? p2.val : 0
		const sum = x + y + carry
		carry = Math.floor(sum / 10)
		cur.next = new ListNode(sum % 10)
		cur = cur.next
		if (p1 !== null) p1 = p1.next
		if (p2 !== null) p2 = p2.next
	}

	//最后的进位
	if (carry === 1) {
		cur.next = new ListNode(carry)
	}

	return dummyNode.next
}
```

##### [21合并两个有序链表E](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

```javascript
//recursion
var mergeTwoLists = function (l1, l2) {
	if (l1 === null) return l2
	if (l2 === null) return l1

	if (l1.val < l2.val) {
		l1.next = mergeTwoLists(l1.next, l2)
		return l1
	} else {
		l2.next = mergeTwoLists(l1, l2.next)
		return l2
	}
}

//iterartion
var mergeTwoLists = function (l1, l2) {
	const dummy = new ListNode(-1)
	let prev = preHead

	while (l1 !== null && l2 !== null) {
		if (l1.val < l2.val) {
			prev.next = l1
			l1 = l1.next
		} else {
			prev.next = l2
			l2 = l2.next
		}
        //move prev
		prev = prev.next
	}
	//添加剩余的l1或l2
	prev.next = l1 === null ? l2 : l1
	//返回合并后的头结点
	return dummy.next
}
```

##### [206反转链表E](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

```javascript
//three point iteration O(n) - O(1)
var reverseList = function (head) {
	let prev = null,
		cur = head,
		next
	while (cur) {
		//store previous next
		next = cur.next
		//adjust ..3->2->1->null
		cur.next = prev
		//move prev forward
		prev = cur
		//move cur forward
		cur = next
	}
	//return new head
	return prev
}

//这个解法很烧脑
//这个解法很烧脑
//这个解法很烧脑
//recurssion O(n) - O(1) 
//reverseList(head.next) 此时最后一层结束递归的条件是head.next == null , head 等于 5 ， 那么它的上一层就是 reverseList(4.next) ， head 等于4 ， 因此后面
//head.next.next = head  相当于4的后面的后面指向4 ， 那就是 4<-5
//然后 head.next = null , 即 null <- 4 <-5 。 
//最顶层通过递归条件 head == null 整体结束
var reverseList = function (head) {
	if (head == null || head.next == null) return head
	let p = reverseList(head.next)
	head.next.next = head
	head.next = null
	return p
}
```

##### [24两两交换链表M](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

```javascript
//recursion  O(N) - O(N)
var swapPairs = function (head) {
	//当前没有节点或者只有一个节点，不需要交换
	if (!head || !head.next) return head

	let first = head,
		second = head.next
	//firstNode连接后面交换完成的子链表
	first.next = swapPairs(second.next)
	//secondNode连接firstNode
	second.next = first

	//递归后的每个second
	return second
}

//iteration, three pointer  O(N) - O(1)
var swapPairs = function (head) {
	let dummyNode = new ListNode(0)
	;(dummyNode.next = head), (cur = dummyNode)

    //够2个了才交换
	while (cur.next !== null && cur.next.next !== null) {
		const first = cur.next
		const second = first.next

		first.next = second.next
		second.next = first
		cur.next = second
		//update cur
		cur = cur.next.next
	}
	//new head
	return dummyNode.next
}
```

#####  [141环形链表E](https://leetcode-cn.com/problems/linked-list-cycle/)

```javascript
//标记法 O(n) - O(1)
var hasCycle = function(head) {
   while (head) {
       if (head.flag) {
            return true
       } else {
           head.flag = true
           head = head.next
       }
   }
   return false
}

//fast and slow pointer O(n) - O(1)
var hasCycle = function(head) {
   let fast = slow = head
   while (fast && fast.next) {
       fast = fast.next.next
       slow = slow.next
       if (fast === slow) return true
   }
   return false
}

//Hash O(n) - O(n)
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

[21合并两个有序链表E](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

```javascript
//iteration
var mergeTwoLists = function(l1, l2) {
    const prehead = new ListNode(-1);

    let prev = prehead;
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            prev.next = l1;
            l1 = l1.next;
        } else {
            prev.next = l2;
            l2 = l2.next;
        }
        prev = prev.next;
    }

    // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可
    prev.next = l1 === null ? l2 : l1;

    return prehead.next;
};

//recursion
var mergeTwoLists = function (l1, l2) {
	if (l1 === null) {
		return l2
	} else if (l2 === null) {
		return l1
	} else if (l1.val < l2.val) {
		l1.next = mergeTwoLists(l1.next, l2)
		return l1
	} else {
		l2.next = mergeTwoLists(l1, l2.next)
		return l2
	}
}
```


##### [19删除链表的倒数第N个节点M](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

```javascript
//two pointers + dummyNode O(n) - O(1)
var removeNthFromEnd = function (head, n) {
	let dummy = new ListNode(0)
	;(dummy.next = head), (first = dummy), (second = dummy)

    // Advances first pointer so that the gap between first and second is n nodes apart
	for (let i = 1; i <= n + 1; i++) {
		first = first.next
	}
	//Move first to the end, maintaining the gap
	while (first !== null) {
		first = first.next
		second = second.next
	}
	second.next = second.next.next
	return dummy.next
}
```

##### [876链表的中间节点E](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

```javascript
//two pointers
var middleNode = function (head) {
	let slow = head,
		fast = head

	while (fast && fast.next) {
		slow = slow.next
		fast = fast.next.next
	}
	return slow
}
```

##### [61旋转链表M](https://leetcode-cn.com/problems/rotate-list/)

```javascript
var rotateRight = function (head, k) {
    // 避免掉 空和只有一个元素的情况
	if (head === null || head.next === null) return head
	let length = 1,
		cur = head
	while (cur.next) {
		cur = cur.next
		length++
	}
	cur.next = head //form ring
    // 因为当k大于长度时, 又是一个轮回, 所以对长度取余
	let num = k % length,
		index = 1,
		node = head
    //find new tail
	while (index < length - num) {
		node = node.next
		index++
	}
    //new head
	let vnode = node.next
	node.next = null //break ring
	return vnode
}
```

##### [25K个一组翻转链表H](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/) ==不熟==

```javascript
const myReverse = (head, tail) => {
	let prev = tail.next,
		p = head
    //翻转结束条件
	while (prev !== tail) {
		const nex = p.next
		p.next = prev
		prev = p
		p = nex
	}
	return [tail, head]
}

var reverseKGroup = function (head, k) {
	const hair = new ListNode(0)
	hair.next = head
	let pre = hair

	while (head) {
		let tail = pre
		//剩余部分长度小于k则不需要反转
		for (let i = 0; i < k; ++i) {
			tail = tail.next
			if (!tail) {
				return hair.next
			}
		}
		const nex = tail.next
		;[head, tail] = myReverse(head, tail)
		// 把子链表重新接回原链表
		pre.next = head
		tail.next = nex
		pre = tail
		head = tail.next
	}
	return hair.next
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
