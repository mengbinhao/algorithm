/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
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
 * @return {TreeNode}
 */
var invertTree = function (root) {
	let traversal = (node) => {
		if (node === null) {
			return null
		} else {
			;[node.left, node.right] = [traversal(node.right), traversal(node.left)]
			return node
		}
	}

	return traversal(root)
}
// @lc code=end
