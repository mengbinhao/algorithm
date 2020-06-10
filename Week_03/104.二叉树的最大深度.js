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
	if (!root) {
		return 0
	} else {
		let maxLeftDepth = maxDepth(root.left)
		let maxRightDepth = maxDepth(root.right)
		return Math.max(maxLeftDepth, maxRightDepth) + 1
	}
}
// @lc code=end
