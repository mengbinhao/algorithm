/*
 * @lc app=leetcode.cn id=671 lang=javascript
 *
 * [671] 二叉树中第二小的节点
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
var findSecondMinimumValue = function (root) {
	let arr = []
	;(function traversal(root) {
		if (root !== null) {
			traversal(root.left)
			arr.push(root.val)
			traversal(root.right)
		}
	})(root)
	let _arr = [...new Set(arr)].sort()
	return _arr[1] ? _arr[1] : -1
}
// @lc code=end
