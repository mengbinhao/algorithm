/*
 * @lc app=leetcode.cn id=589 lang=javascript
 *
 * [589] N叉树的前序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function (root) {
	let ret = []
	let traversal = (node) => {
		if (node) {
			ret.push(node.val)

			if (node.children && node.children.length) {
				node.children.forEach((child) => {
					traversal(child)
				})
			}
		}
	}

	traversal(root)
	return ret
}
// @lc code=end
