/*
 * @lc app=leetcode.cn id=103 lang=javascript
 *
 * [103] 二叉树的锯齿形层次遍历
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
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
	if (root === null) {
		return []
	} else {
		let ret = []
		let traversal = (node, level) => {
			if (node !== null) {
				if (ret[level] === undefined) {
					ret[level] = []
				}
				if (level % 2 === 1) {
					ret[level].unshift(node.val)
				} else {
					ret[level].push(node.val)
				}

				traversal(node.left, level + 1)
				traversal(node.right, level + 1)
			}
		}

		traversal(root, 0)
		return ret
	}
}
// @lc code=end
