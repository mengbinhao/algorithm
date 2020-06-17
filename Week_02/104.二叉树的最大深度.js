/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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
 * @return {number}
 */
var maxDepth = function (root) {
	let res = 0
	function traversal(root, depth) {
		if (root !== null) {
			if (depth > res) {
				res = depth
			}
			if (root.left) {
				traversal(root.left, depth + 1)
			}
			if (root.right) {
				traversal(root.right, depth + 1)
			}
		}
	}
	traversal(root, 1)
	return res
}
// @lc code=end
