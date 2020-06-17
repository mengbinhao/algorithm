/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
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
var levelOrder = function (root) {
	const ret = []
	function traversal(root, depth) {
		if (root !== null) {
			if (!ret[depth]) {
				ret[depth] = []
			}
			traversal(root.left, depth + 1)
			ret[depth].push(root.val)
			traversal(root.right, depth + 1)
		}
	}
	traversal(root, 0)
	return ret
}
// @lc code=end
