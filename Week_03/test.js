/*
 * @Author: your name
 * @Date: 2020-06-07 09:39:46
 * @LastEditTime: 2020-06-07 09:48:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /algorithm009-class02/Week_03/test.js
 */

var myPow = function (x, n) {
	if (n < 0) return 1 / myPow(x, -n)
	if (n === 0) return 1
	if (n === 1) return x

	let res = 1
	for (let i = 0; i <= n - 1; i++) {
		res *= x
	}
	return res
}

console.log(myPow(2, 5))
