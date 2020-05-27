/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
var preorderTraversal = function (root) {
	let ret = [],
		stack = []
	root && stack.push(root)
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
// @lc code=end
