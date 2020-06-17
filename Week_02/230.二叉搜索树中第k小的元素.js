/*
 * @lc app=leetcode.cn id=230 lang=javascript
 *
 * [230] 二叉搜索树中第K小的元素
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
//中序遍历是升序
var kthSmallest = function (root, k) {
	let ret = []
	let traversal = (node) => {
		//optimal
		if (node && ret.length < k) {
			traversal(node.left)
			ret.push(node.val)
			traversal(node.right)
		}
	}

	traversal(root)
	return ret[k - 1]
}
// @lc code=end
// var kthSmallest = function (root, k) {
//   let res
//   let count = 0
//   function traversal(node) {
//     if (node !== null) {
//       if (count < k) {
//         traversal(node.left)
//       }
//       if (++count === k) {
//         res = node.val
//       }
//       if (count < k) {
//         traversal(node.right)
//       }
//     }
//   }
//   traversal(root)
//   return res
// }
