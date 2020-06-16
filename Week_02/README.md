学习笔记

#### hash table、映射、集合

##### [242有效的字母异位词E](https://leetcode-cn.com/problems/valid-anagram/)

```javascript
//直接sort O(nlogN) n为字符串长度 - O(1)
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
	return Object.keys(hash).every((key) => hash[key] === 0)
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
var preorderTraversal = function(root) {
    let ret = [], stack = [];
    root && stack.push(root)
    while (stack.length > 0) {
        let node = stack.pop()
        ret.push(node.val)

        if (node.right) {
            stack.push(node.right)
        }

        if (node.left) {
            stack.push(node.left)
        }
    }
    return ret
};
```

##### [94二叉树中序遍历M](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

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

##### [145二叉树后序遍历H](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

```javascript
//recursion
var postorderTraversal = function (root) {
	let result = []
	var postorderTraversalNode = (node) => {
		if (node) {
			postorderTraversalNode(node.left)
			postorderTraversalNode(node.right)
			result.push(node.val)
		}
	}
	postorderTraversalNode(root)
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

##### [429N叉树的层序遍历M](https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/)

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

##### [347前K个高频元素M](https://leetcode-cn.com/problems/top-k-frequent-elements/)

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