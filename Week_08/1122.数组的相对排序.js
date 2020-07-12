/*
 * @lc app=leetcode.cn id=1122 lang=javascript
 *
 * [1122] 数组的相对排序
 */

// @lc code=start
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
	return arr1.sort((a, b) => {
		let ia = arr2.indexOf(a)
		let ib = arr2.indexOf(b)
		if (ia === -1 && ib === -1) {
			// 如果两个元素都不在arr2中按升序排列
			return a - b
		} else if (ia === -1) {
			// 如果有一个不在arr2中（a），另一个在arr2中(b)不在arr中的元素要排在后面
			return 1
		} else if (ia !== -1 && ib !== -1) {
			// 如果两个元素都在arr2中，他们的顺序跟在arr2中一致
			return ia - ib
		}
	})
}
// @lc code=end
