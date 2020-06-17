/*
 * @lc app=leetcode.cn id=199 lang=javascript
 *
 * [199] 二叉树的右视图
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
 * @return {number[]}
 */
var rightSideView = function (root) {
	const arr = []
	let traversal = (node, level) => {
		if (node) {
			if (!arr[level]) {
				arr[level] = []
			}

			arr[level].push(node.val)
			traversal(node.left, level + 1)
			traversal(node.right, level + 1)
		}
	}

	traversal(root, 0)

	const ret = []

	for (let i = 0; i < arr.length; i++) {
		ret.push(arr[i][arr[i].length - 1])
	}

	return ret
}
// @lc code=end
