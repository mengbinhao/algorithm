学习笔记

#### hash table、映射、集合

##### 有效的字母异位词

```javascript
//直接sort O(nlogn) n为字符串长度 - O(1)
var isAnagram = function (s, t) {
	if (typeof s !== 'string' || typeof t !== 'string') return false
	if (s.length !== t.length) return false
	if (s.split('').sort().join('') === t.split('').sort().join('')) return true
	return false
}

//hash 统计每个字符出现的频次,枚s增加，枚t减小，最后检查全部hash值是否为0
//O(n) - O(1)
var isAnagram = function (s, t) {
	if (typeof s !== 'string' || typeof t !== 'string') return false
	if (s.length !== t.length) return false
	let map = {}
	for (let c of s) {
		map[c] ? map[c]++ : (map[c] = 1)
	}
	for (let c of t) {
		map[c] ? map[c]-- : (map[c] = -1)
	}
	return Object.keys(map).every((key) => map[key] === 0)
}

//hash optimal
var isAnagram = function (s, t) {
	if (typeof s !== 'string' || typeof t !== 'string') return false
	if (s.length !== t.length) return false
	let map = {}
	for (let c of s) {
		map[c] ? map[c]++ : (map[c] = 1)
	}
	for (let c of t) {
		//when t has one character more than s, return false
		if (map[c]) {
			map[c]--
			//means t exists one character that s doesn't have
		} else {
			return false
		}
	}
	return true
}
```

##### 字母异位词分组

```javascript
//sort数组放到hash里面，根据不同的key，放对应的异位词 O(NKlogK) O(NK)
var groupAnagrams = function (strs) {
	if (!Array.isArray(strs) || strs.length === 0) {
		throw new TypeError('invalid parameter')
	}
	let map = {}
	for (let item of strs) {
		let key = item.split('').sort().join('')
		if (!map[key]) {
			map[key] = []
		}
		map[key].push(item)
	}
	return Object.values(map)
}
```



#### tree、binary tree、binary search tree

##### 二叉树前序遍历

``` javascript
//recursion
var preorderTraversal = function (root) {
	let ret = []
	let preorderTraversalNode = (node) => {
		if (node !== null) {
			ret.push(node.val)
			preorderTraversalNode(node.left)
			preorderTraversalNode(node.right)
		}
	}
	preorderTraversalNode(root)
	return ret
}

//loop. use stack
var preorderTraversal = function (root) {
	let ret = [],
		stack = []
  if (root !== null) {
    stack.push(root)
  }
	while (stack.length > 0) {
		let node = stack.pop()
		ret.push(node.val)

		if (node.right !== null) {
			stack.push(node.right)
		}
		if (node.left !== null) {
			stack.push(node.left)
		}
	}
	return ret
}
```

##### 二叉树中序遍历

```javascript
//recursion
var inorderTraversal = function (root) {
	let ret = []
	let inorderTraversalNode = (node) => {
		if (node !== null) {
			if (node.left !== null) {
				inorderTraversalNode(node.left)
			}
			ret.push(node.val)
			if (node.right !== null) {
				inorderTraversalNode(node.right)
			}
		}
	}
	inorderTraversalNode(root)
	return ret
}
//loop
var inorderTraversal = function (root) {
	const stack = []
	const res = []

	while (root || stack.length) {
		if (root) {
			stack.push(root)
			root = root.left
		} else {
			root = stack.pop()
			res.push(root.val)
			root = root.right
		}
	}
	return res
}
```

##### N叉树的前序遍历

```javascript
//recursion
var preorder = function (root) {
	let ret = []
	let preorderNode = (node) => {
		if (node) {
			ret.push(node.val)
			node.children.forEach((child) => preorderNode(child))
		}
	}
	preorderNode(root)
	return ret
}
//loop
var preorder = function (root) {
	let ret = [],
		stack = []
	root && stack.push(root)

	while (stack.length > 0) {
		let node = stack.pop()
		ret.push(node.val)
		for (let i = node.children.length - 1; i >= 0; i--) {
			stack.push(node.children[i])
		}
	}
	return ret
}
```

##### N叉树的后序遍历

```javascript
//recursion
var postorder = function (root) {
	let ret = [],
		stack = []

	let postorderNode = (node) => {
		if (node) {
			node.children.forEach((child) => {
				postorderNode(child)
			})
			ret.push(node.val)
		}
	}
	postorderNode(root)
	return ret
}
//loop
var postorder = function (root) {
	let ret = [],
		stack = []
	root && stack.push(root)

	while (stack.length > 0) {
		let node = stack.pop()

		for (let i = 0; i < node.children.length; i++) {
			stack.push(node.children[i])
		}
		ret.unshift(node.val)
	}
	return ret
}
```

##### N叉树的层序遍历

```javascript
//使用queue
var levelOrder = function (root) {
	if (!root) return []
	let queue = [root]
	let ret = []
	while (queue.length) {
		let level = [],
			len = queue.length
    //依次加上层的val,然后按顺序添加子Node
		for (let i = 0; i < len; i++) {
			let current = queue.shift()
			level.push(current.val)
			if (current.children && current.children.length) {
				queue.push(...current.children)
			}
		}
		ret.push(level)
	}
	return ret
}
```

##### 前K个高频元素

```javascript
//do not meet the requirement
//do not meet the requirement
//do not meet the requirement
var topKFrequent = function (nums, k) {
	let map = {}
	//统计每个item次数到hash table
	for (let i = 0; i < nums.length; i++) {
		map[nums[i]] ? map[nums[i]]++ : (map[nums[i]] = 1)
	}
	//sort
	let list = []
	Object.keys(map).forEach((key) => {
		list.push({ key, value: map[key] })
	})
	//desc
	list.sort((a, b) => b.value - a.value)
	let ret = []
	//build return
	list.forEach((obj, index) => {
		if (index < k) {
			ret.push(Number.parseInt(obj.key, 10))
		}
	})
	return ret
}
```

#### heap、binary heap