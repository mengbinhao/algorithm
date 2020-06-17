/*
 * @lc app=leetcode.cn id=559 lang=javascript
 *
 * [559] N叉树的最大深度
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number}
 */
var maxDepth = function (root) {
	if (root === null) {
		return 0
	} else {
		let depth = 1
		function traversal(root, curDepth) {
			if (root !== null) {
				if (curDepth > depth) {
					depth = curDepth
				}
				root.children.forEach((child) => traversal(child, curDepth + 1))
			}
		}
		traversal(root, 1)
		return depth
	}
}
// @lc code=end
