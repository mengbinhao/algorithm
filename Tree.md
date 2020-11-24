### [99.恢复二叉搜索树](https://leetcode-cn.com/problems/recover-binary-search-tree/)

```javascript {.line-numbers}
//use array
//O(n) - O(h)
var recoverTree = function (root) {
	const nums = []
	inorder(root, nums)
	const [first, second] = findTwoSwapped(nums)
	recover(root, 2, first, second)

	//inorder
	function inorder(node, nums) {
		if (node == null) return
		inorder(node.left, nums)
		nums.push(node.val)
		inorder(node.right, nums)
	}

	function findTwoSwapped(nums) {
		let x = (y = -1)
		for (let i = 0, len = nums.length; i < len; i++) {
			if (nums[i] > nums[i + 1]) {
				y = nums[i + 1]
				if (x === -1) {
					x = nums[i]
				} else {
					break
				}
			}
		}
		return [x, y]
	}

	//preorder
	function recover(root, count, x, y) {
		if (root !== null) {
			if (root.val === x || root.val === y) {
				root.val = root.val === x ? y : x
				if (--count === 0) {
					return
				}
			}
			recover(root.left, count, x, y)
			recover(root.right, count, x, y)
		}
	}
}

// O(n) - O(h)
var recoverTree = function (root) {
	let pre = (first = second = null)
	inorder(root)

	if (first !== null && second !== null) {
		;[first.val, second.val] = [second.val, first.val]
	}

	function inorder(node) {
		if (node == null) return

		inorder(node.left)

		if (pre == null) {
			pre = node
		} else {
			if (pre.val > node.val) {
				second = node
				if (first == null) {
					first = pre
				}
			}
			pre = node
		}
		inorder(node.right)
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
			predecessor = root.left
			//找到最右侧的点
			while (predecessor.right && predecessor.right !== root) {
				predecessor = predecessor.right
			}

			//继续遍历左子树
			if (predecessor.right === null) {
				predecessor.right = root
				root = root.left
				//左子树遍历完,断开链接
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
			//无左孩子的情况
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

### [105.从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

```javascript {.line-numbers}
var buildTree = function (preorder, inorder) {
	const preLen = preorder.length,
		inLen = inorder.length

	if (preLen !== inLen) return null

	const map = new Map()

	//space for time
	//get root idx in inorder
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

##### [111.二叉树的最小深度 E](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

```javascript {.line-numbers}
//DFS
var minDepth = function (root) {
	if (root === null) return 0
	const minLeftDepth = minDepth(root.left)
	const minRightDepth = minDepth(root.right)

	return minLeftDepth === 0 || minRightDepth === 0
		? minLeftDepth + minRightDepth + 1
		: Math.min(minLeftDepth, minRightDepth) + 1
}

//BFS
var minDepth = function (root) {
	if (root === null) return 0
	const queue = [root]
	let depth = 1

	while (queue.length > 0) {
		const size = queue.length

		for (let i = 0; i < size; i++) {
			const curNode = queue.shift()
			if (curNode.left === null && curNode.right === null) {
				return depth
			}

			if (curNode.left) {
				queue.push(curNode.left)
			}

			if (curNode.right) {
				queue.push(curNode.right)
			}
		}
		depth++
	}
	return depth
}
```

### [124.二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)

```javascript {.line-numbers}
//dfs_post traversal
var maxPathSum = function (root) {
	let retMax = Number.MIN_SAFE_INTEGER

	const dfs = (node) => {
		if (node == null) return 0
		//if negative, then return 0 to outerSum
		let left = Math.max(dfs(node.left), 0)
		let right = Math.max(dfs(node.right), 0)

		const innerSum = left + right + node.val
		//update innerSum
		retMax = Math.max(retMax, innerSum)
		return Math.max(left, right) + node.val
	}
	dfs(root)
	return retMax
}
```

### [222.完全二叉树的节点个数](https://leetcode-cn.com/problems/count-complete-tree-nodes/)

```javascript {.line-numbers}
//
var countNodes = function (root) {
	if (root === null) return 0
	const left = countLevel(root.left)
	const right = countLevel(root.right)

	//如果满二叉树的层数为h，则总节点数为：2^h - 1
	//左子树一定是满二叉树，因为节点已经填充到右子树了，左子树必定已经填满了。所以左子树的节点总数我们可以直接得到，是 2^left - 1，加上当前这个 root 节点，则正好是 2^left。再对右子树进行递归统计
	if (left === right) {
		return countNodes(root.right) + (1 << left)
		//说明此时最后一层不满，但倒数第二层已经满了，可以直接得到右子树的节点个数。同理，右子树节点加上root节点，总数为 2^right。再对左子树进行递归查找
	} else {
		return countNodes(root.left) + (1 << right)
	}

	function countLevel(node) {
		let level = 0
		while (node) {
			level++
			node = node.left
		}
		return level
	}
}
```
