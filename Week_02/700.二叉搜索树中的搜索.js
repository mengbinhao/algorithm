/*
 * @lc app=leetcode.cn id=700 lang=javascript
 *
 * [700] 二叉搜索树中的搜索
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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
	let traversal = (node) => {
		if (node) {
			if (node.val === val) {
				return node
			} else if (node.val > val) {
				return traversal(node.left)
			} else {
				return traversal(node.right)
			}
		} else {
			return node
		}
	}
	return traversal(root)
}
// @lc code=end
