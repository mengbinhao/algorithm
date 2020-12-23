# Binary Tree

![](./images/Tree.png)

## Binary Tree traversal

### preorder/inorder/postorder

##### [144.二叉树前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

```javascript {.line-numbers}
//recursion, don't need to judge if node is null
var preorderTraversal = function (root) {
	const ret = []
	const traversal = (node, ret) => {
		if (!node) return
		ret.push(node.val)
		traversal(node.left, ret)
		traversal(node.right, ret)
	}
	traversal(root, ret)
	return ret
}

//iteration. use stack
var preorderTraversal = function (root) {
	const ret = [],
		stack = []
	root && stack.push(root)

	while (stack.length > 0) {
		root = stack.pop()
		ret.push(root.val)
		if (root.right) {
			stack.push(root.right)
		}
		if (root.left) {
			stack.push(root.left)
		}
	}
	return ret
}
```

##### [589.N 叉树的前序遍历](https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/)

```javascript {.line-numbers}
var preorder = function (root) {
	let ret = []
	const traversal = (node, ret) => {
		if (!node) return
		ret.push(node.val)
		if (node.children && node.children.length > 0) {
			node.children.forEach((child) => {
				traversal(child, ret)
			})
		}
	}

	traversal(root, ret)
	return ret
}

//iteration
var preorder = function (root) {
	const ret = [],
		stack = [root]

	while (stack.length > 0) {
		const curNode = stack.pop()
		if (curNode) {
			ret.push(curNode.val)
			//preorder need push right son first
			for (let i = curNode.children.length - 1; i >= 0; i--) {
				stack.push(curNode.children[i])
			}
		}
	}
	return ret
}
```

##### [94.二叉树中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

```javascript {.line-numbers}
//recursion
var inorderTraversal = function (root) {
	let ret = []
	let traversal = (node, ret) => {
		if (!node) return
		traversal(node.left, ret)
		ret.push(node.val)
		traversal(node.right, ret)
	}
	traversal(root, ret)
	return ret
}
//iteration
var inorderTraversal = function (root) {
	const ret = [],
		stack = []

	while (root || stack.length > 0) {
		//一直放左儿子
		while (root) {
			stack.push(root)
			root = root.left
		}
		root = stack.pop()
		ret.push(root.val)
		//再放入右儿子
		root = root.right
	}
	return ret
}
```

##### [145.二叉树后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

```javascript {.line-numbers}
//recursion
var postorderTraversal = function (root) {
	let ret = []
	var traversal = (node) => {
		if (!node) return
		traversal(node.left)
		traversal(node.right)
		ret.push(node.val)
	}
	traversal(root)
	return ret
}

//iteration
//节点第一次访问时并不打印，而是在第二次遍历时才打印。所以需要一个变量来标记该结点是否访问过
const postorderTraversal = (root) => {
	const ret = [],
		stack = []
	let prev = null

	while (root || stack.length > 0) {
		//一直放左儿子
		while (root) {
			stack.push(root)
			root = root.left
		}
		root = stack.pop()
		//root.right === prev 节点访问过一次
		if (!root.right || root.right === prev) {
			//因第二次才加入，这里加入即可
			ret.push(root.val)
			prev = root
			root = null
		} else {
			//再次放入
			stack.push(root)
			root = root.right
		}
	}

	return ret
}

//逆序输出
const postorderTraversal = (root) => {
	const ret = [],
		stack = []

	root && stack.push(root)
	while (stack.length > 0) {
		root = stack.pop()
		//unshift顺序从根左右 => 右左根
		ret.unshift(root.val)

		//右左根 => 左右根
		if (root.left !== null) {
			stack.push(root.left)
		}
		if (root.right !== null) {
			stack.push(root.right)
		}
	}
	return ret
}
```

##### [590.N 叉树的后序遍历](https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/)

```javascript {.line-numbers}
//recursion
var postorder = function (root) {
	const ret = [],
		stack = []

	const postorderNode = (node, ret) => {
		if (!node) return
		node.children.forEach((child) => {
			postorderNode(child, ret)
		})
		ret.push(node.val)
	}
	postorderNode(root, ret)
	return ret
}

//iteration
var postorder = function (root) {
	const ret = [],
		stack = [root]

	while (stack.length > 0) {
		const curNode = stack.pop()

		if (curNode) {
			//左右根
			for (let i = 0; i < curNode.children.length; i++) {
				stack.push(curNode.children[i])
			}
			ret.unshift(curNode.val)
		}
	}
	return ret
}
```

### level traversal

##### [102.二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

```javascript {.line-numbers}

//BFS iteration, use queue
//层用queue
//层用queue
//层用queue
var levelOrder = function (root) {
	if (root === null) return []

	const queue = [root],
		ret = []

	while (queue.length > 0) {
		const size = queue.length,
			curLevel = []

		for (let i = 0; i < size; i++) {
			const curNode = queue.shift()
			curLevel.push(node.val)
			if (curNode.left) queue.push(curNode.left)
			if (curNode.right) queue.push(curNode.right)
		}
		ret.push(curLevel)
	}
	return ret
}

//DFS
var levelOrder = function (root) {
	const ret = []

	const dfs = (node, level, ret) => {
		if (node == null) return
		if (!ret[level]) ret[level] = []
		ret[level].push(node.val)
		dfs(node.left, level + 1, ret)
		dfs(node.right, level + 1, ret)
	}

	dfs(root, 0, ret)
	return ret
}
```

##### [429.N 叉树的层序遍历](https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/)

```javascript {.line-numbers}
//BFS use queue
var levelOrder = function (root) {
	if (!root) return []
	let queue = [root]
	let ret = []
	while (queue.length) {
		let curLevel = [],
			size = queue.length
		for (let i = 0; i < size; i++) {
			let current = queue.shift()
			curLevel.push(current.val)
			if (current.children && current.children.length) {
				queue.push(...current.children)
			}
		}
		ret.push(curLevel)
	}
	return ret
}

//DFS
var levelOrder = function (root) {
	var nums = []

	let traversal = (node, level, nums) => {
		if (!node) return
		if (!nums[level]) nums[level] = []
		nums[level].push(node.val)
		for (var i = 0; i < node.children.length; i++) {
			traversal(node.children[i], level + 1, nums)
		}
	}
	traversal(root, 0, nums)
	return nums
}
```

##### [103.二叉树的锯齿形层序遍历](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)

```javascript {.line-numbers}
var zigzagLevelOrder = function (root) {
	const queue = [],
		ret = []
	root && queue.push(root)
	let direction = true
	while (queue.length) {
		const size = queue.length,
			curLevel = []
		for (let i = 0; i < size; i++) {
			const node = queue.shift()
			if (direction) {
				curLevel.push(node.val)
			} else {
				curLevel.unshift(node.val)
			}
			if (node.left) queue.push(node.left)
			if (node.right) queue.push(node.right)
		}
		ret.push(curLevel)
		direction = !direction
	}

	return ret
}
```

##### [515.在每个树行中找最大值](https://leetcode-cn.com/problems/find-largest-value-in-each-tree-row/)

```javascript {.line-numbers}
//bfs
var largestValues = function (root) {
	const ret = []
	if (!root) return ret
	const queue = [root]

	while (queue.length > 0) {
		const size = queue.length,
			max = -Infinity
		for (let i = 0; i < size; i++) {
			const curNode = queue.shift()
			if (curNode.left) queue.push(curNode.left)
			if (curNode.right) queue.push(curNode.right)
			max = Math.max(max, curNode.val)
		}
		ret.push(max)
	}
	return ret
}

//dfs
var largestValues = function (root) {
	const ret = []
	const dfs = (node, level, ret) => {
		if (!node) return
		//hole!!! node's value maybe null
		//hole!!! node's value maybe null
		//hole!!! node's value maybe null
		if (ret[level] === undefined) ret[level] = node.val
		ret[level] = Math.max(ret[level], node.val)
		dfs(node.left, level + 1, ret)
		dfs(node.right, level + 1, ret)
	}

	dfs(root, 0, ret)
	return ret
}
```

##### [199.二叉树的右视图](https://leetcode-cn.com/problems/binary-tree-right-side-view/)

```javascript {.line-numbers}
//use queue
var rightSideView = function (root) {
	if (!root) return []
	const ret = [],
		queue = [root]

	while (queue.length > 0) {
		const size = queue.length
		for (let i = 0; i < size; i++) {
			const curNode = queue.shift()
			if (curNode.left) queue.push(curNode.left)
			if (curNode.right) queue.push(curNode.right)
			if (i === size - 1) ret.push(curNode.val)
		}
	}
	return ret
}

//recursion
var rightSideView = function (root) {
	const ret = []
	const dfs = (node, level, ret) => {
		if (!node) return
		if (level === ret.length) ret.push(node.val)
		//visit right son first, so above line code can visit right first node of next level
		dfs(node.right, level + 1, ret)
		dfs(node.left, level + 1, ret)
	}

	dfs(root, 0, ret)
	return ret
}
```

### other

##### [987.二叉树的垂序遍历](https://leetcode-cn.com/problems/vertical-order-traversal-of-a-binary-tree/)

```javascript {.line-numbers}
var verticalTraversal = function (root) {
	if (!root) return []

	// 二维数组 存坐标和值，形式如 [[x, y, val], [...]]
	let locations = []

	const dfs = function (root, x, y) {
		if (!root) return
		locations.push([x, y, root.val])
		dfs(root.left, x - 1, y - 1)
		dfs(root.right, x + 1, y - 1)
	}
	// 先前序遍历记录下节点坐标和值
	dfs(root, 0, 0)

	// 按照x升序，y降序，val升序
	locations = locations.sort((a, b) => {
		if (a[0] !== b[0]) {
			return a[0] - b[0]
		}
		if (a[1] !== b[1]) {
			return b[1] - a[1]
		}
		return a[2] - b[2]
	})

	// curValOfX当前遍历的节点的x的值，默认先取第一个节点的x值
	let curValOfX = locations[0][0]
	const ret = [[locations[0][2]]]

	// 从第2个节点开始遍历坐标数组，把x相同的val分成一组
	for (let i = 1; i < locations.length; i++) {
		const location = locations[i]
		const x = location[0]
		//一个垂序
		if (x === curValOfX) {
			const last = ret[ret.length - 1]
			last.push(location[2])
		} else {
			curValOfX = x
			ret.push([location[2]])
		}
	}
	return ret
}
```

## BST

### crud

##### [98.验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)

```javascript {.line-numbers}
var isValidBST = function (root) {
	let helper = (node, lower, upper) => {
		if (!node) return true
		if (node.val <= lower || node.val >= upper) return false
		return (
			helper(node.left, lower, node.val) && helper(node.right, node.val, upper)
		)
	}
	//增加参数，向下传递
	return helper(root, -Infinity, Infinity)
}

//In-order
var isValidBST = function (root) {
	const stack = []
	let prev = -Infinity

	while (root || stack.length) {
		while (root) {
			stack.push(root)
			root = root.left
		}
		root = stack.pop()
		if (root.val <= prev) return false
		prev = root.val
		root = root.right
	}
	return true
}

//labuladuo version
var isValidBST = function (root) {
	function helper(node, min, max) {
		if (!node) return true
		if (min !== null && node.val <= min.val) return false
		if (max !== null && node.val >= max.val) return false
		//limit左子树最大值node,右子树最小值node
		return helper(node.left, min, node) && helper(node.right, node, max)
	}
	return helper(root, null, null)
}
```

##### [99.恢复二叉搜索树](https://leetcode-cn.com/problems/recover-binary-search-tree/)

```javascript {.line-numbers}
//use array
// interview version
// O(n) - O(h)
var recoverTree = function (root) {
	const stack = []
	let prev = (first = second = null)

	while (root || stack.length) {
		while (root) {
			stack.push(root)
			root = root.left
		}
		root = stack.pop()
		//case 1: [1,2,3,4,5,6,7] -> [1,6,3,4,5,2,7],两处不合法
		//case 2: [1,2,3,4,5,6,7] -> [1,3,2,4,5,6,7],一处不合法
		if (prev && root.val < prev.val) {
			second = root
			if (first == null) {
				first = prev
				//提前返回
			} else break
		}
		prev = root
		root = root.right
	}

	if (first && second) {
		;[first.val, second.val] = [second.val, first.val]
	}
}

//Morris inorder
//来到当前节点，记为cur(引用)
//1、如果cur无左孩子，cur向右移动(cur = cur.right)
//2、如果cur有左孩子，找到cur左子树上最右的节点，记为predecessor
//  (1)如果predecessor的right指针指向空，让其指向cur，cur向左移动(cur = cur.left)
//  (2)如果predecessor的right指针指向cur，说明我们已经遍历完cur的左子树,让其指向空，cur向右移动(cur = cur.right)
//  (3)重复上述操作，直至访问完整棵树
var recoverTree = function (root) {
	let first = (second = pre = predecessor = null)

	while (root !== null) {
		if (root.left) {
			// predecessor 节点就是当前 root 节点向左走一步，然后一直向右走至无法走为止
			predecessor = root.left
			while (predecessor.right && predecessor.right !== root) {
				predecessor = predecessor.right
			}

			// 让 predecessor 的右指针指向 root，继续遍历左子树
			if (predecessor.right === null) {
				predecessor.right = root
				root = root.left
				// 说明左子树已经访问完了，我们需要断开链接
			} else {
				if (pre !== null && root.val < pre.val) {
					second = root
					if (first === null) {
						first = pre
					}
				}
				pre = root
				predecessor.right = null
				root = root.right
			}
			// 如果没有左孩子，则直接访问右孩子
		} else {
			if (pre !== null && root.val < pre.val) {
				second = root
				if (first === null) {
					first = pre
				}
			}
			pre = root
			root = root.right
		}
	}

	if (first !== null && second !== null) {
		;[first.val, second.val] = [second.val, first.val]
	}
}
```

##### [669.修剪二叉搜索树](https://leetcode-cn.com/problems/trim-a-binary-search-tree/)

```javascript {.line-numbers}
var trimBST = function (root, low, high) {
	if (!root) return null
	if (root.val > high) return trimBST(root.left, low, high)
	if (root.val < low) return trimBST(root.right, low, high)

	//需要连接，所以需要返回递归的头结点
	root.left = trimBST(root.left, low, high)
	root.right = trimBST(root.right, low, high)
	return root
}
```

##### [700.二叉搜索树中的搜索](https://leetcode-cn.com/problems/search-in-a-binary-search-tree/)

```javascript {.line-numbers}
var searchBST = function (root, val) {
	if (!root) return null
	if (root.val === val) {
		return root
	} else if (root.val > val) {
		return searchBST(root.left, val)
	} else {
		return searchBST(root.right, val)
	}
}
```

##### [230.寻找第 K 小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)

```javascript {.line-numbers}
//interview version
var kthSmallest = function (root, k) {
	const stack = []
	while (true) {
		while (root) {
			stack.push(root)
			root = root.left
		}
		root = stack.pop()
		if (--k === 0) return root.val
		root = root.right
	}
}

//bad version
var kthSmallest = function (root, k) {
	let rank = k,
		ret
	const helper = (node, k) => {
		if (!node) return
		helper(node.left, k)
		if (--rank === 0) {
			ret = node.val
			return
		}
		helper(node.right, k)
	}
	helper(root, k)
	return ret
}
```

##### [701.二叉搜索树中的插入操作](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)

```javascript {.line-numbers}
var insertIntoBST = function (root, val) {
	if (!root) return new TreeNode(val)
	if (root.val < val) {
		root.right = insertIntoBST(root.right, val)
	} else {
		root.left = insertIntoBST(root.left, val)
	}
	//需要连接，所以需要返回递归的头结点
	return root
}
```

### others

##### [96.不同的二叉搜索树](https://leetcode-cn.com/problems/unique-binary-search-trees/)

```javascript {.line-numbers}
var numTrees = function (n) {
	//dp[i] ：用连着的i个数，所构建出的BST种类数
	const dp = new Array(n + 1).fill(0)
	//base case
	dp[0] = dp[1] = 1

	for (let i = 2; i <= n; i++) {
		//笛卡尔积
		for (let j = 0; j <= i - 1; j++) {
			dp[i] += dp[j] * dp[i - j - 1]
		}
	}
	return dp[n]
}

//recursion
const numTrees = (n) => {
	// n个整数能创建出的BST的种类数
	if (n == 0 || n == 1) return 1

	let num = 0
	for (let i = 0; i <= n - 1; i++) {
		num += numTrees(i) * numTrees(n - i - 1)
	}
	return num
}
```

##### [95.不同的二叉搜索树 II](https://leetcode-cn.com/problems/unique-binary-search-trees-ii/)

```javascript {.line-numbers}
var generateTrees = function (n) {
	if (n === 0) return []

	const buildTree = (start, end) => {
		//以当前i为root能够组成的BST个数
		const ret = []
		if (start > end) {
			ret.push(null)
			return ret
		}

		//loop root node
		for (let i = start; i <= end; i++) {
			//获得所有可行的左子树集合
			const leftTree = buildTree(start, i - 1)
			//获得所有可行的右子树集合
			const rightTree = buildTree(i + 1, end)

			// 从左子树集合中选出一棵左子树，从右子树集合中选出一棵右子树，拼接到根节点上
			for (let tl of leftTree) {
				for (let tr of rightTree) {
					const root = new TreeNode(i)
					root.left = tl
					root.right = tr
					ret.push(root)
				}
			}
		}
		return ret
	}
	return buildTree(1, n)
}
```

##### [108.将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)

```javascript {.line-numbers}
var sortedArrayToBST = function (nums) {
	const helper = (nums, left, right) => {
		if (left > right) return null

		//choose the root node
		const mid = Math.floor((right + left) / 2)
		const root = new TreeNode(nums[mid])
		root.left = helper(nums, left, mid - 1)
		root.right = helper(nums, mid + 1, right)
		return root
	}
	return helper(nums, 0, nums.length - 1)
}
```

##### [109.有序链表转换二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/)

```javascript {.line-numbers}
var sortedListToBST = function (head) {
	const getMedian = (left, right) => {
		let fast = (slow = left)
		while (fast !== right && fast.next !== right) {
			fast = fast.next.next
			slow = slow.next
		}
		return slow
	}

	const buildTree = (left, right) => {
		if (left === right) return null
		const mid = getMedian(left, right)
		const root = new TreeNode(mid.val)
		//左闭右开
		root.left = buildTree(left, mid)
		root.right = buildTree(mid.next, right)
		return root
	}
	//左闭右开
	return buildTree(head, null)
}
```

##### [235.二叉搜索树的公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

```javascript {.line-numbers}
var lowestCommonAncestor = function (root, p, q) {
	while (root) {
		if (root.val > p.val && root.val > q.val) {
			root = root.left
		} else if (root.val < p.val && root.val < q.val) {
			root = root.right
		} else {
			return root
		}
	}
	return null
}
```

##### [538.把二叉搜索树转换为累加树](https://leetcode-cn.com/problems/convert-bst-to-greater-tree/)

```javascript {.line-numbers}
//反序中序遍历
var convertBST = function (root) {
	let sum = 0
	const dfs = (node) => {
		if (!node) return null
		dfs(node.right)
		sum += node.val
		node.val = sum
		dfs(node.left)
	}

	dfs(root)
	return root
}
```

## DFS/BFS

##### [100.相同的树](https://leetcode-cn.com/problems/same-tree/)

```javascript {.line-numbers}
var isSameTree = function (p, q) {
	if (p == null && q == null) {
		return true
	} else if (p == null || q == null) {
		return false
	} else {
		return (
			p.val === q.val &&
			isSameTree(p.left, q.left) &&
			isSameTree(p.right, q.right)
		)
	}
}
```

##### [101.对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/submissions/)

```javascript {.line-numbers}
var isSymmetric = function (root) {
	const helper = (n1, n2) => {
		if (n1 == null && n2 == null) {
			return true
		} else if (n1 == null || n2 == null) {
			return false
		} else {
			return (
				n1.val === n2.val &&
				helper(n1.left, n2.right) &&
				helper(n2.right, n1.left)
			)
		}
	}
	return helper(root, root)
}

var isSymmetric = function (root) {
	const queue = [root, root]
	while (queue.length) {
		const n1 = queue.shift()
		const n2 = queue.shift()
		if (n1 === null && n2 === null) continue
		if (n1 === null || n2 === null) return false
		if (n1.val !== n2.val) return false
		queue.push(n1.left, n2.right)
		queue.push(n2.left, n1.right)
	}
	return true
}
```

##### [226.翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

```javascript {.line-numbers}
//preorder or postorder can work, inorder means no invert
var invertTree = function (root) {
	if (!root) return null
	const left = invertTree(root.left)
	const right = invertTree(root.right)
	root.left = right
	root.right = left
	return root
}

//自上往下
var invertTree = function (root) {
	if (!root) return null
	const queue = [root]

	while (queue.length) {
		const cur = queue.shift()
		;[cur.left, cur.right] = [cur.right, cur.left]
		if (cur.left) queue.push(cur.left)
		if (cur.right) queue.push(cur.right)
	}
	return root
}
```

##### [104.二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

```javascript {.line-numbers}
var maxDepth = function (root) {
	//+1是加上当前node的深度
	return root == null
		? 0
		: Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}

//bfs
var maxDepth = function (root) {
	if (!root) return 0
	const queue = [root]
	let ret = 0
	while (queue.length) {
		const size = queue.length
		//添加当前层的所有子节点
		while (size > 0) {
			const curNode = queue.shift()
			if (curNode.left) queue.push(curNode.left)
			if (curNode.right) queue.push(curNode.right)
			size--
		}
		//一层处理完深度+1
		ret++
	}
	return ret
}
```

##### [111.二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

```javascript {.line-numbers}
//DFS
var minDepth = function (root) {
	if (!root) return 0
	const minLeftDepth = minDepth(root.left)
	const minRightDepth = minDepth(root.right)

	return minLeftDepth === 0 || minRightDepth === 0
		? minLeftDepth + minRightDepth + 1
		: Math.min(minLeftDepth, minRightDepth) + 1
}

//BFS
var minDepth = function (root) {
	if (!root) return 0
	const queue = [root]
	let depth = 1

	while (queue.length) {
		const size = queue.length
		for (let i = 0; i < size; i++) {
			const curNode = queue.shift()
			if (!curNode.left && !curNode.right) return depth
			if (curNode.left) queue.push(curNode.left)
			if (curNode.right) queue.push(curNode.right)
		}
		depth++
	}
	return depth
}
```

##### [110.平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/)

```javascript {.line-numbers}
var isBalanced = function (root) {
	const depth = (node) => {
		return !node ? 0 : Math.max(depth(node.left), depth(node.right)) + 1
	}

	return !root
		? true
		: Math.abs(depth(root.left) - depth(root.right)) <= 1 &&
				isBalanced(root.left) &&
				isBalanced(root.right)
}
```

##### [222.完全二叉树的节点个数](https://leetcode-cn.com/problems/count-complete-tree-nodes/)

```javascript {.line-numbers}
var countNodes = function (root) {
	const countLevel = (node) => {
		let level = 0
		while (node) {
			node = node.left
			level++
		}
		return level
	}

	if (!root) return 0
	const leftLevel = countLevel(root.left)
	const rightLevel = countLevel(root.right)

	// 如果满二叉树的层数为h，则总节点数为：2^h - 1
	// 左子树一定是满二叉树，因为节点已经填充到右子树了，左子树必定已经填满了。所以左子树的节点总数我们可以直接得到，是 2^left - 1，加上当前这个 root 节点，则正好是 2^left。再对右子树进行递归统计
	if (leftLevel === rightLevel) {
		return countNodes(root.right) + (1 << leftLevel)
		//说明此时最后一层不满，但倒数第二层已经满了，可以直接得到右子树的节点个数。同理，右子树节点加上root节点，总数为 2^right。再对左子树进行递归查找
	} else {
		return countNodes(root.left) + (1 << rightLevel)
	}
}
```

##### [662.二叉树最大宽度](https://leetcode-cn.com/problems/maximum-width-of-binary-tree/)

```javascript {.line-numbers}
//not AC!!!
//如果我们走向左子树，那么 position -> position * 2，如果我们走向右子树，那么 position -> position * 2 + 1。当我们在看同一层深度的位置值 L 和 R 的时候，宽度就是 R - L + 1
var widthOfBinaryTree = function (root) {
	if (!root) return 0
	//node + depth + position
	const queue = [[root, 0, 0]]
	let curDepth = (left = ret = 0)

	while (queue.length) {
		const nodeWithDepthAndPosition = queue.shift()
		if (nodeWithDepthAndPosition[0]) {
			queue.push([
				nodeWithDepthAndPosition[0].left,
				nodeWithDepthAndPosition[1] + 1,
				nodeWithDepthAndPosition[2] * 2,
			])
			queue.push([
				nodeWithDepthAndPosition[0].right,
				nodeWithDepthAndPosition[1] + 1,
				nodeWithDepthAndPosition[2] * 2 + 1,
			])
			if (curDepth !== nodeWithDepthAndPosition[1]) {
				curDepth = nodeWithDepthAndPosition[1]
				left = nodeWithDepthAndPosition[2]
			}
			ret = Math.max(ret, nodeWithDepthAndPosition[2] - left + 1)
		}
	}
	return ret
}

var widthOfBinaryTree = function (root) {
	if (!root) return 0
	let ans = 1,
		que = [[0n, root]]
	while (que.length) {
		const width = que[que.length - 1][0] - que[0][0] + 1n
		if (width > ans) {
			ans = width
		}
		let tmp = []
		for (const [i, q] of que) {
			q.left && tmp.push([i * 2n, q.left])
			q.right && tmp.push([i * 2n + 1n, q.right])
		}
		que = tmp
	}
	return Number(ans)
}
```

##### [543.二叉树的直径](https://leetcode-cn.com/problems/diameter-of-binary-tree/)

```javascript {.line-numbers}
var diameterOfBinaryTree = function (root) {
	const dfs = (node) => {
		if (!node) return 0
		const leftDepth = dfs(node.left)
		const rightDepth = dfs(node.right)
		//inner cycle
		ret = Math.max(ret, leftDepth + rightDepth + 1)
		//return该节点为根的子树深度
		return Math.max(leftDepth, rightDepth) + 1
	}
	let ret = 1
	dfs(root)
	return ret - 1
}
```

##### [563.二叉树的坡度](https://leetcode-cn.com/problems/binary-tree-tilt/)

```javascript {.line-numbers}
var findTilt = function (root) {
	let ret = 0
	const dfs = (node) => {
		if (!node) return 0
		const left = dfs(node.left)
		const right = dfs(node.right)
		ret += Math.abs(left - right)
		return left + right + node.val
	}
	dfs(root)
	return ret
}
```

##### [257.二叉树的所有路径](https://leetcode-cn.com/problems/binary-tree-paths/)

```javascript {.line-numbers}
var binaryTreePaths = function (root) {
	const paths = []
	const dfs = (node, paths, path) => {
		if (!node) return
		if (!node.left && !node.right) {
			paths.push(path + node.val)
			return
		}
		dfs(node.left, paths, path + node.val + '->')
		dfs(node.right, paths, path + node.val + '->')
	}
	dfs(root, paths, '')
	return paths
}

var binaryTreePaths = function (root) {
	const paths = []
	const dfs = (node, path) => {
		if (node) {
			path += node.val
			if (!node.left && !node.right) {
				paths.push(path)
			} else {
				dfs(node.left, path + '->')
				dfs(node.right, path + '->')
			}
		}
	}
	dfs(root, '')
	return paths
}
```

##### [236.二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

```javascript {.line-numbers}
var lowestCommonAncestor = function (root, p, q) {
	if (root === null || root === p || root === q) return root
	const left = lowestCommonAncestor(root.left, p, q)
	const right = lowestCommonAncestor(root.right, p, q)
	return left === null ? right : right === null ? left : root
}

//normal version
var lowestCommonAncestor = function (root, p, q) {
	if (root === null || root === p || root === q) return root
	const left = lowestCommonAncestor(root.left, p, q)
	const right = lowestCommonAncestor(root.right, p, q)
	if (left !== null && right !== null) return root
	return left === null ? right : left
}

var lowestCommonAncestor = function (root, p, q) {
	//store left/right son map root
	const parent = new Map()
	const visited = new Set()

	const dfs = (root) => {
		if (root.left) {
			parent.set(root.left.val, root)
			dfs(root.left)
		}
		if (root.right) {
			parent.set(root.right.val, root)
			dfs(root.right)
		}
	}

	dfs(root)
	while (p != null) {
		visited.add(p.val)
		p = parent.get(p.val)
	}
	while (q != null) {
		if (visited.has(q.val)) {
			return q
		}
		q = parent.get(q.val)
	}
	return null
}
```

##### [1123.最深叶节点的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-deepest-leaves/)

```javascript {.line-numbers}
var lcaDeepestLeaves = function (root) {
	const depth = (root) => {
		if (!root) return 0
		const left = depth(root.left)
		const right = depth(root.right)
		return Math.max(left, right) + 1
	}

	if (!root) return null
	const left = depth(root.left)
	const right = depth(root.right)
	if (left === right) return root
	return left > right
		? lcaDeepestLeaves(root.left)
		: lcaDeepestLeaves(root.right)
}
```

##### [652.寻找重复的子树](https://leetcode-cn.com/problems/find-duplicate-subtrees/)

```javascript {.line-numbers}
var findDuplicateSubtrees = function (root) {
	const map = new Map(),
		ret = []

	const dfs = (node) => {
		if (!node) return '#'

		const left = dfs(node.left)
		const right = dfs(node.right)

		const subTree = `${left},${right},${node.val}`
		if (map.has(subTree)) {
			if (map.get(subTree) === 1) {
				ret.push(node)
			}
			map.set(subTree, map.get(subTree) + 1)
		} else {
			map.set(subTree, 1)
		}
		return subTree
	}
	dfs(root)
	return ret
}
```

## path sum

##### [404.左叶子之和](https://leetcode-cn.com/problems/sum-of-left-leaves/)

```javascript {.line-numbers}
var sumOfLeftLeaves = function (root) {
	const dfs = (node) => {
		const isLeaf = (node) => {
			return !node.left && !node.right
		}
		let ret = 0
		if (node.left) {
			ret += isLeaf(node.left) ? node.left.val : dfs(node.left)
		}

		if (node.right && !isLeaf(node.right)) {
			ret += dfs(node.right)
		}
		return ret
	}
	return !root ? 0 : dfs(root)
}
```

##### [112.路径总和](https://leetcode-cn.com/problems/path-sum/)

```javascript {.line-numbers}
var hasPathSum = function (root, sum) {
	if (!root) return false

	if (!root.left && !root.right) return root.val === sum

	return (
		hasPathSum(root.left, sum - root.val) ||
		hasPathSum(root.right, sum - root.val)
	)
}
```

##### [113.路径总和 II](https://leetcode-cn.com/problems/path-sum-ii/)

```javascript {.line-numbers}
//backtrack
var pathSum = function (root, sum) {
	const dfs = (root, sum, curPath) => {
		if (!root) return
		curPath.push(root.val)
		//due to pass reference so add a copy
		if (!root.left && !root.right && sum === root.val) ret.push([...curPath])
		dfs(root.left, sum - root.val, curPath)
		dfs(root.right, sum - root.val, curPath)
		//backtrack
		curPath.pop()
	}
	const ret = []
	dfs(root, sum, [])
	return ret
}
```

##### [437.路径总和 III](https://leetcode-cn.com/problems/path-sum-iii/)

```javascript {.line-numbers}
var pathSum = function (root, sum) {
	const dfs = (node, sum) => {
		if (!node) return 0
		let ret = 0
		if (sum === node.val) ret++
		ret += dfs(node.left, sum - node.val)
		ret += dfs(node.right, sum - node.val)
		return ret
	}

	return !root
		? 0
		: dfs(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum)
}
```

##### [124.二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)

```javascript {.line-numbers}
var maxPathSum = function (root) {
	let retMax = Number.MIN_SAFE_INTEGER

	const dfs = (node) => {
		if (node == null) return 0
		//if negative, then return 0 to outerSum
		const left = Math.max(dfs(node.left), 0)
		const right = Math.max(dfs(node.right), 0)

		//update innerSum = left + right + node.val
		retMax = Math.max(retMax, left + right + node.val)
		return Math.max(left, right) + node.val
	}
	dfs(root)
	return retMax
}
```

##### [129.求根到叶子节点数字之和](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/)

```javascript {.line-numbers}
var sumNumbers = function (root, preSum) {
	const dfs = (node, preSum) => {
		if (!node) return 0
		preSum = preSum * 10 + node.val
		if (!node.left && !node.right) return preSum
		return dfs(node.left, preSum) + dfs(node.right, preSum)
	}
	return dfs(root, 0)
}
```

## serialize/deserialize

##### [105.从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

```javascript {.line-numbers}
var buildTree = function (preorder, inorder) {
	const preLen = preorder.length,
		inLen = inorder.length

	if (preLen !== inLen) throw new TypeError('invalid params')

	const map = new Map()

	//space for time
	//get inorder idx from pre value
	//note question: no same value Node, which means can form a specific tree
	for (let i = 0; i < inLen; i++) {
		map.set(inorder[i], i)
	}

	return helper(preorder, 0, preLen - 1, map, 0, inLen - 1)

	function helper(preorder, preLeft, preRight, map, inLeft, inRight) {
		if (preLeft > preRight || inLeft > inRight) return null

		const rootVal = preorder[preLeft],
			root = new TreeNode(rootVal),
			pIndex = map.get(rootVal)

		root.left = helper(
			preorder,
			preLeft + 1,
			pIndex - inLeft + preLeft,
			map,
			inLeft,
			pIndex - 1
		)
		root.right = helper(
			preorder,
			pIndex - inLeft + preLeft + 1,
			preRight,
			map,
			pIndex + 1,
			inRight
		)
		return root
	}
}
```

##### [106.从中序与后序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

```javascript {.line-numbers}
var buildTree = function (inorder, postorder) {
	const inLen = inorder.length,
		postLen = postorder.length

	if (inLen !== postLen) throw new TypeError('invalid params')

	const map = new Map()

	//space for time
	//get root idx in inorder
	//note question: no same value Node, which means can form a specific tree
	for (let i = 0; i < inLen; i++) {
		map.set(inorder[i], i)
	}

	return helper(postorder, 0, postLen - 1, map, 0, inLen - 1)

	function helper(postorder, postLeft, postRight, map, inLeft, inRight) {
		if (inLeft > inRight || postLeft > postRight) return null

		const rootVal = postorder[postRight],
			root = new TreeNode(rootVal),
			pIndex = map.get(rootVal)

		root.left = helper(
			postorder,
			postLeft,
			pIndex - 1 - inLeft + postLeft,
			map,
			inLeft,
			pIndex - 1
		)
		root.right = helper(
			postorder,
			pIndex - inLeft + postLeft,
			postRight - 1,
			map,
			pIndex + 1,
			inRight
		)
		return root
	}
}
```

##### [1008.前序遍历构造二叉搜索树](https://leetcode-cn.com/problems/construct-binary-search-tree-from-preorder-traversal/)

```javascript {.line-numbers}
var bstFromPreorder = function (preorder) {
	let index = 0
	const helper = (preorder, low, high) => {
		if (index === preorder.length) return null
		const val = preorder[index]
		if (val < low || val > high) return null
		index++
		const root = new TreeNode(val)
		root.left = helper(preorder, low, val)
		root.right = helper(preorder, val, high)
		return root
	}
	return helper(preorder, -Infinity, Infinity)
}
```

##### [297.二叉树的序列化与反序列化](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/)

```javascript {.line-numbers}
const serialize = (root) => {
	if (root == null) return 'X'
	const left = serialize(root.left)
	const right = serialize(root.right)
	return root.val + ',' + left + ',' + right // 按  根,左,右  拼接字符串
}

const deserialize = (data) => {
	const list = data.split(',')
	const buildTree = (list) => {
		const rootVal = list.shift()
		if (rootVal == 'X') return null
		const root = new TreeNode(rootVal)
		root.left = buildTree(list)
		root.right = buildTree(list)
		return root
	}
	return buildTree(list)
}
```

##### [654.最大二叉树](https://leetcode-cn.com/problems/maximum-binary-tree/)

```javascript {.line-numbers}
var constructMaximumBinaryTree = function (nums) {
	const build = (nums, low, high) => {
		if (low > high) return null
		let index = -1,
			max = Number.MIN_SAFE_INTEGER
		for (let i = low; i <= high; i++) {
			if (nums[i] > max) {
				max = nums[i]
				index = i
			}
		}
		const root = new TreeNode(max)
		root.left = build(nums, low, index - 1)
		root.right = build(nums, index + 1, high)
		return root
	}
	if (!nums || nums.length === 0) return nums
	return build(nums, 0, nums.length - 1)
}
```

##### [114.二叉树展开为链表](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/)

```javascript {.line-numbers}
var flatten = function (root) {
	if (!root) return
	flatten(root.left)
	flatten(root.right)

	const left = root.left
	const right = root.right

	root.left = null
	root.right = left

	//原先右子树接到当前右子树的末端
	let p = root
	while (p.right) {
		p = p.right
	}
	p.right = right
}
```

##### [116.填充每个节点的下一个右侧节点指针](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)

```javascript {.line-numbers}
//DFS
var connect = function (root) {
	const helper = (n1, n2) => {
		if (!n1 || !n2) return
		n1.next = n2
		helper(n1.left, n1.right)
		helper(n2.left, n2.right)
		helper(n1.right, n2.left)
	}
	if (!root) return null
	helper(root.left, root.right)
	return root
}

//BFS
var connect = function (root) {
	if (!root) return null

	const queue = [root]

	while (queue.length > 0) {
		const size = queue.length

		for (let i = 0; i < size; i++) {
			const curNode = queue.shift()
			//connect
			if (i < size - 1) {
				curNode.next = queue[0]
			}
			if (curNode.left) queue.push(curNode.left)
			if (curNode.right) queue.push(curNode.right)
		}
	}

	return root
}
```