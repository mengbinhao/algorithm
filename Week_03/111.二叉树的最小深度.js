/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
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
var minDepth = function (root) {
	if (!root) return 0
	if (!root.left && !root.right) return 1

	let minDepth = Number.MAX_SAFE_INTEGER
	if (root.left) {
		minDepth = Math.min(minDepth(root.left), minDepth)
	}

	if (root.right) {
		minDepth = Math.min(minDepth(root.right), minDepth)
	}

	return minDepth + 1
}
// @lc code=end
