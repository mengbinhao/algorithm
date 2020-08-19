学习笔记

#### hash table、映射、集合

##### [242有效的字母异位词E](https://leetcode-cn.com/problems/valid-anagram/)

```javascript
//使用系统内置函数sort O(NlogN) n为字符串长度 - O(1)
var isAnagram = function (s, t) {
	if (s.length !== t.length) return false
	if (s.split('').sort().join('') === t.split('').sort().join('')) return true
	return false
}

//hash 统计每个字符出现的频次,枚s增加，枚t减小，最后检查全部hash值是否为0
//O(n) - O(1)
var isAnagram = function (s, t) {
	if (s.length !== t.length) return false
	let hash = {}
	for (let c of s) {
		hash[c] ? hash[c]++ : (hash[c] = 1)
	}
	for (let c of t) {
		hash[c] ? hash[c]-- : (hash[c] = -1)
	}
	return Object.values(hash).every((val) => val === 0)
}

//hash optimal
var isAnagram = function (s, t) {
	if (s.length !== t.length) return false

	let hash = {}
	for (let c of s) {
		hash[c] ? hash[c]++ : (hash[c] = 1)
	}

	for (let c of t) {
		if (hash[c]) {
			hash[c]--
		} else {
			return false
		}
	}
	return true
}

//use array
var isAnagram = function (s, t) {
	if (s.length !== t.length) return false

	let arr = Array.from({ length: 26 }, () => 0)

	for (let i = 0, sLen = s.length; i < sLen; i++) {
		arr[s.charCodeAt(i) - 97]++
	}
	for (let j = 0, tLen = t.length; j < tLen; j++) {
		arr[t.charCodeAt(j) - 97]--
	}
	return arr.every((val) => val === 0)
}
```

##### [49字母异位词分组M](https://leetcode-cn.com/problems/group-anagrams/)

```javascript
//sort数组放到hash里面，根据不同的key，放对应的异位词 O(NKlogK) - O(NK)
var groupAnagrams = function (strs) {
	let hash = {}

	for (let str of strs) {
		let key = str.split('').sort().join('')

		if (!hash[key]) {
			hash[key] = []
		}
		hash[key].push(str)
	}

	return Object.values(hash)
}

//使用计数器做key，可以去掉sort的时间复杂度 O(NK) - O(NK)
var groupAnagrams = function (strs) {
  if (strs.length === 0) return [[]]
  let count = Array(26),
    map = {}
  for (let str of strs) {
    //re-count each character
    count.fill(0)
    for (let i = 0; i < str.split('').length; i++) {
      count[str.charCodeAt(i) - 97]++
    }
    //build unique key
    let temp = ''
    for (let i = 0; i < 26; i++) {
      temp += `#${count[i]}`
    }
    if (!map[temp]) {
      map[temp] = []
    }
    map[temp].push(str)
  }
  return Object.values(map)
}
```

#### tree、binary tree、binary search tree

##### [144二叉树前序遍历M](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

``` javascript
//recursion, don't need to judge if node is null
var preorderTraversal = function (root) {
	let ret = []
	let traversal = (node) => {
	    if (!node) return
        ret.push(node.val)
        traversal(node.left)
        traversal(node.right)
	}
	traversal(root)
	return ret
}

//iteration. use stack, need to judge if node is null
var preorderTraversal = function(root) {
    let ret = [], stack = [];
    root && stack.push(root)
    while (stack.length > 0) {
        let node = stack.pop()
        ret.push(node.val)
	    //right first
        if (node.right) {
            stack.push(node.right)
        }
        if (node.left) {
            stack.push(node.left)
        }
    }
    return ret
}
```

##### [94二叉树中序遍历M](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

```javascript
//recursion
var inorderTraversal = function (root) {
	let ret = []
	let traversal = (node) => {
	    if (!node) return
        traversal(node.left)
        ret.push(node.val)
        traversal(node.right)
	}
	traversal(root)
	return ret
}
//iteration
var inorderTraversal = function (root) {
	const stack = []
	const res = []

	while (root || stack.length) {
        // 一直放入左儿子
		if (root) {
            stack.push(root)
            root = root.left
         //访问当前元素，把右儿子压入栈
		} else {
            root = stack.pop()
		   res.push(root.val)
		   root = root.right
        }
	}
	return res
}
```

##### [145二叉树后序遍历H](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

```javascript
//recursion
var postorderTraversal = function (root) {
	let result = []
	var traversal = (node) => {
	    if (!node) return
        traversal(node.left)
        traversal(node.right)
        result.push(node.val)
	}
	traversal(root)
	return result
}

//iteration
const postorderTraversal = (root) => {
	const ret = []
	const stack = []

	root && stack.push(root)
	while (stack.length > 0) {
		const node = stack.pop()
		// 根左右=>右左根
		ret.unshift(node.val)

		if (node.left !== null) {
			stack.push(node.left)
		}
		if (node.right !== null) {
			stack.push(node.right)
		}
	}
	return ret
}
```

##### [102二叉树的层序遍历M](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

```javascript
//BFS iteration
var levelOrder = function (root) {
	if (root === null) return []

	let queue = [root],
		ret = []

	while (queue.length > 0) {
		let len = queue.length,
			currentLevel = []

		for (let i = 0; i < len; i++) {
			let node = queue.shift()
			currentLevel.push(node.val)
			if (node.left) queue.push(node.left)
			if (node.right) queue.push(node.right)
		}
		ret.push(currentLevel)
	}
	return ret
}

//DFS
var levelOrder = function (root) {
	if (root === null) return []

	let ret = []

	let dfs = (node, level) => {
		if (node === null) return
		if (ret[level] == undefined) ret[level] = []
		ret[level].push(node.val)
		dfs(node.left, level + 1)
		dfs(node.right, level + 1)
	}
	dfs(root, 0)
	return ret
}
```



##### [589N叉树的前序遍历E](https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/)

```javascript
//recursion
var preorder = function (root) {
	let ret = []
	let preorderNode = (node) => {
		if (node) {
			ret.push(node.val)
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => preorderNode(child))
      }
		}
	}
	preorderNode(root)
	return ret
}
//iteration
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

##### [590N叉树的后序遍历E](https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/)

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
//iteration
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

##### [429N叉树的层序遍历M](https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/)

```javascript
//DFS
var levelOrder = function (root) {
	var nums = []

	let search = (nums, node, k) => {
		if (node == null) return
		if (nums[k] == undefined) nums[k] = []
		nums[k].push(node.val)
		for (var i = 0; i < node.children.length; i++) {
			search(nums, node.children[i], k + 1)
		}
	}
	search(nums, root, 0)
	return nums
}

//BFS
var levelOrder = function (root) {
	if (!root) return []
	let queue = [root]
	let ret = []
	while (queue.length) {
		let level = [],
			len = queue.length
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

##### [347前K个高频元素M](https://leetcode-cn.com/problems/top-k-frequent-elements/)

```javascript
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

//same as above do not meet the requirement
var topKFrequent = function (nums, k) {
	let map = new Map(),
		arr = [...new Set(nums)]

	nums.forEach((num) => {
		if (map.has(num)) {
			map.set(num, map.get(num) + 1)
		} else {
			map.set(num, 1)
		}
	})
	return arr.sort((a, b) => map.get(b) - map.get(a)).slice(0, k)
}
```

##### [98验证二叉搜索树M](https://leetcode-cn.com/problems/validate-binary-search-tree/)

```javascript
var isValidBST = function (root) {
	let isValid = (node, lower, upper) => {
		if (!node) return true
		if (node.val <= lower || node.val >= upper) return false
		return (
			isValid(node.left, lower, node.val) &&
			isValid(node.right, node.val, upper)
		)
	}

	return isValid(root, -Infinity, Infinity)
}

//In-order
var isValidBST = function (root) {
  let queue = []
  let dfs = (node) => {
 	if (!node) return
 	node.left && dfs(node.left)
 	queue.push(node.val)
 	node.right && dfs(node.right)
  }
  dfs(root)
  for (let i = 0; i < queue.length; i++) {
 	if (queue[i] >= queue[i + 1]) {
 		return false
 	}
  }
  return true
}
```

##### [236二叉树的最近公共祖先M](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

```javascript
var lowestCommonAncestor = function (root, p, q) {
	if (root === null || root === p || root === q) return root
	let left = lowestCommonAncestor(root.left, p, q)
	let right = lowestCommonAncestor(root.right, p, q)
	return left === null ? right : right === null ? left : root
}
```

##### [235二叉搜索树的公共祖先E](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

```javascript
var lowestCommonAncestor = function (root, p, q) {
	while (root) {
		if (root.val > p.val && root.val > q.val) root = root.left
		else if (root.val < p.val && root.val < q.val) root = root.right
		else return root
	}
}
```

##### [104二叉树的最大深度E](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

```javascript
var maxDepth = function (root) {
	return root == null
		? 0
		: Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}
```

##### [111二叉树的最小深度E](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

```javascript
var minDepth = function (root) {
	if (!root) return 0
	let minLeftDepth = minDepth(root.left)
	let minRightDepth = minDepth(root.right)

	return minLeftDepth === 0 || minRightDepth === 0
		? minLeftDepth + minRightDepth + 1
		: Math.min(minLeftDepth, minRightDepth) + 1
}
```



#### heap、binary heap