/*
 * @lc app=leetcode.cn id=771 lang=javascript
 *
 * [771] 宝石与石头
 */

// @lc code=start
/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function (J, S) {
	let ret = 0,
		set = new Set()
	for (let j of J) {
		set.add(j)
	}

	for (let s of S) {
		if (set.has(s)) ret++
	}
	return ret
}
// @lc code=end

//brute force
// var numJewelsInStones = function (J, S) {
// 	let ret = 0
// 	for (let s of S) {
// 		for (let j of J) {
// 			if (s === j) {
// 				ret++
// 				break
// 			}
// 		}
// 	}
// 	return ret
// }
