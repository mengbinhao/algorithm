/*
 * @lc app=leetcode.cn id=108 lang=javascript
 *
 * [108] 将有序数组转换为二叉搜索树
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
 * @param {number[]} nums
 * @return {TreeNode}
 */

function TreeNode(val) {
	this.val = val
	this.left = null
	this.right = null
}

var sortedArrayToBST = function (nums) {
	if (!nums || nums.length === 0) return null
	let traversal = (nums, left, right) => {
		if (left > right) {
			return null
		}

		let mid = Math.floor((right + left) / 2)

		let node = new TreeNode(nums[mid])
		node.left = traversal(nums, left, mid - 1)
		node.right = traversal(nums, mid + 1, right)

		return node
	}

	return traversal(nums, 0, nums.length - 1)
}
// @lc code=end
