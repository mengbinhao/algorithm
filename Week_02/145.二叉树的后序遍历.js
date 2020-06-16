/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 后序遍历
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
// @lc code=end
