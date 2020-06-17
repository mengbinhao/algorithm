/*
 * @lc app=leetcode.cn id=897 lang=javascript
 *
 * [897] 递增顺序查找树
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
 * @return {TreeNode}
 */
var increasingBST = function (root) {
	const arr = []
	function traversal(root) {
		if (root !== null) {
			traversal(root.left)
			arr.push(root.val)
			traversal(root.right)
		}
	}
	traversal(root)
	const res = new TreeNode(arr[0])
	let currentNode = res
	for (let i = 0; i < arr.length - 1; i++) {
		currentNode.left = null
		currentNode.right = new TreeNode(arr[i + 1])
		currentNode = currentNode.right
	}
	return res
}
// @lc code=end
