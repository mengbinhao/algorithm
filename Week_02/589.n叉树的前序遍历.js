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
	let ret = [],
		stack = []
	root && stack.push(root)

	while (stack.length > 0) {
		let node = stack.pop()
		ret.push(node.val)
		for (let i = node.children.length - 1; i >= 0; i--) {
			stack.push(node.children[i])
		}
	}
	return ret
}
// @lc code=end
