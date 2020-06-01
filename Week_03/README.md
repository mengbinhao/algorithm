学习笔记

##### [22括号生成](https://leetcode-cn.com/problems/generate-parentheses/)

```javascript
//brute forve O(2^3n * n) - O(n)
var generateParenthesis = function (n) {
	let ret = []
	let recursionParenthesis = (level, max, s) => {
    //recursion terminal
		if (level >= max) {
			if (isValid(s)) {
				ret.push(s)
			}
			return
		}

    //precess login of current level
    //drill down
		recursionParenthesis(level + 1, max, `${s}(`)
		recursionParenthesis(level + 1, max, `${s})`)
    
    //reverse current params if needed
	}

	let isValid = s => {
		let balance = 0
		for (let c of s) {
			if (c === '(') {
				balance++
			} else {
				balance--
			}
			if (balance < 0) return false
		}
		return balance === 0
	}

	recursionParenthesis(0, 2 * n, '')
	return ret
}

//回溯,直接过滤掉无效的组合
var generateParenthesis = function (n) {
	let ret = []
	let recursionParenthesis = (left, right, n, s) => {
		if (left == n && right === n) {
			ret.push(s)
			return
		}

		if (left < n) {
			recursionParenthesis(left + 1, right, n, s + '(')
		}

		if (left > right) {
			recursionParenthesis(left, right + 1, n, s + ')')
		}
	}

	recursionParenthesis(0, 0, n, '')
	return ret
}

var generateParenthesis = function (n) {
	let ret = []
	let recursionParenthesis = (left, right, s) => {
		if (left === 0 && right === 0) {
			ret.push(s)
			return
		}

		if (left) {
			recursionParenthesis(left - 1, right, s + '(')
		}

		if (right > left) {
			recursionParenthesis(left, right - 1, s + ')')
		}
	}

	recursionParenthesis(n, n, '')
	return ret
}
```

##### [98验证二叉树搜索](https://leetcode-cn.com/problems/validate-binary-search-tree/)

```javascript
var isValidBST = function (root) {
	let helper = (node, lower, upper) => {
		if (node === null) return true
		if (node.val <= lower || node.val >= upper) return false
		return (
			helper(node.left, lower, node.val) && helper(node.right, node.val, upper)
		)
	}
	return helper(root, -Infinity, Infinity)
}
```

##### [104二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

```javascript
var maxDepth = function (root) {
	if (root == null) {
		return 0
	} else {
		let leftHeight = maxDepth(root.left)
		let rightHeight = maxDepth(root.right)
		return Math.max(leftHeight, rightHeight) + 1
	}
}
```

##### [111二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

```javascript
var minDepth = function (root) {
	if (root == null) {
		return 0
	}

	if (root.left == null && root.right == null) {
		return 1
	}

	let min_depth = Number.MAX_SAFE_INTEGER
	if (root.left != null) {
		min_depth = Math.min(minDepth(root.left), min_depth)
	}
	if (root.right != null) {
		min_depth = Math.min(minDepth(root.right), min_depth)
	}

	return min_depth + 1
}
```

##### [226反转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

```javascript
var invertTree = function (root) {
	if (root == null) {
		return null
	}

	let right = invertTree(root.right)
	let left = invertTree(root.left)

	root.left = right
	root.right = left
	return root
}
```



