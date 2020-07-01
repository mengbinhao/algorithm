/*
 * @lc app=leetcode.cn id=718 lang=javascript
 *
 * [718] 最长重复子数组
 */

// @lc code=start
// dp[i][j] ： 长度为 i ，以 A[i-1] 为末尾的序列，和长度为 j，以 B[j-1] 为末尾的序列，二者的最大公共序列长度
// 当 A[i-1] != B[j-1] ， dp[i][j] = 0
// 当 A[i-1] == B[j-1] , dp[i][j] = dp[i-1][j-1] + 1
// 最大公共序列长度，可能产生于某个局部，每求一个 dp[i][j] 都要和全局的最大比较，如果大于，就更新它
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var findLength = function (A, B) {
	let m = A.length,
		n = B.length,
		ret = 0,
		//init two-dimension array
		dp = new Array(m + 1)
	for (let i = 0; i < m + 1; i++) {
		dp[i] = new Array(n + 1).fill(0)
	}

	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (A[i - 1] === B[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1] + 1
			}
			ret = Math.max(ret, dp[i][j])
		}
	}
	return ret
}
// @lc code=end

// var findLength = function (A, B) {
// 	if (!A || !B || !Array.isArray(A) || !Array.isArray(B)) return
// 	if (A.length === 0 || B.length === 0) return []
// 	let maxLen = 0,
// 		ALen = A.length,
// 		BLen = B.length

// 	for (let i = 0; i < ALen; i++) {
// 		for (let j = 0; j < BLen; j++) {
// 			let k = 0
// 			while (A[i + k] === B[j + k] && i + k < ALen && j + k < BLen) {
// 				k += 1
// 			}
// 			maxLen = Math.max(maxLen, k)
// 		}
// 	}

// 	return maxLen
// }
