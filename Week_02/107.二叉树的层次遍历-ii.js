/*
 * @lc app=leetcode.cn id=107 lang=javascript
 *
 * [107] 二叉树的层次遍历 II
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
var levelOrderBottom = function (root) {
	if (root === null) {
		return []
	}

	let ret = []
	let traversal = (node, level) => {
		if (node) {
			if (!ret[level]) {
				ret[level] = []
			}

			ret[level].push(node.val)
			traversal(node.left, level + 1)
			traversal(node.right, level + 1)
		}
	}

	traversal(root, 0)
	return ret.reverse()
}
// @lc code=end
