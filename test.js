function TreeNode(val) {
	this.val = val
	this.left = this.right = null
}

let TreeNode1 = new TreeNode(1)
let TreeNode2 = new TreeNode(2)
let TreeNode3 = new TreeNode(3)
TreeNode1.right = TreeNode2
TreeNode2.left = TreeNode3

const postorderTraversal = (root) => {
	const ret = [],
		stack = []
	let prev = null

	while (root || stack.length > 0) {
		while (root) {
			stack.push(root)
			root = root.left
		}
		root = stack.pop()
		if (root.right === null || root.right === prev) {
			ret.push(root.val)
			prev = root
			root = null
		} else {
			stack.push(root)
			root = root.right
		}
	}
	return ret
}

postorderTraversal([1, null, 2, 3])
