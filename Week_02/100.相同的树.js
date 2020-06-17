/*
 * @lc app=leetcode.cn id=100 lang=javascript
 *
 * [100] 相同的树
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
	let traversal = (node1, node2) => {
		if (node1 === null && node2 !== null) {
			return false
		} else if ((node1 !== null) & (node2 === null)) {
			return false
		} else if (node1 === null && node2 === null) {
			return true
		} else {
			return (
				node1.val === node2.val &&
				traversal(node1.left, node2.left) &&
				traversal(node1.right, node2.right)
			)
		}
	}

	return traversal(p, q)
}
// @lc code=end
