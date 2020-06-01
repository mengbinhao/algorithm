/*
 * @Author: your name
 * @Date: 2020-06-01 15:08:33
 * @LastEditTime: 2020-06-01 17:23:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /algorithm009-class02/Users/jack/.leetcode/104.二叉树的最大深度.js
 */

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
	if (root == null) {
		return 0
	} else {
		let leftHeight = maxDepth(root.left)
		let rightHeight = maxDepth(root.right)
		return Math.max(leftHeight, rightHeight) + 1
	}
}
// @lc code=end
