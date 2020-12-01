### [172. 阶乘后的零](https://leetcode-cn.com/problems/factorial-trailing-zeroes/submissions/)

```javascript {.line-numbers}
var trailingZeroes = function (n) {
	let ret = 0,
		division = 5
	while (division <= n) {
		ret += Math.floor(n / division)
		division *= 5
	}
	return ret
}

var trailingZeroes = function (n) {
	let ret = 0
	for (let d = n; d / 5 > 0; d = d / 5) {
		ret += Math.floor(d / 5)
	}
	return ret
}
```

### [204. 计数质数](https://leetcode-cn.com/problems/count-primes/)

```javascript {.line-numbers}
var countPrimes = function (n) {
	let isPrim = new Array(n).fill(true)
	//由于因子的对称性，只需要遍历到[2,sqrt(n)]
	for (let i = 2; i * i < n; i++) {
		if (isPrim[i]) {
			//比如 n = 25，i = 4 时算法会标记 4 × 2 = 8，4 × 3 = 12 等等数字，但是这两个数字已经被 i = 2 和 i = 3 的 2 × 4 和 3 × 4 标记了
			for (let j = i * i; j < n; j += i) {
				isPrim[j] = false
			}
		}
	}
	let ret = 0
	for (let i = 2; i < n; i++) {
		if (isPrim[i]) ret++
	}
	return ret
}
```

### [372. 超级次方](https://leetcode-cn.com/problems/super-pow/)

```javascript {.line-numbers}
const base = 1337
var superPow = function (a, b) {
	if (b.length === 0) return 1

	//分解成子问题
	const part1 = myPow(a, b.pop())
	const part2 = myPow(superPow(a, b), 10)
	return (part1 * part2) % base

	// 计算 a 的 k 次方然后与 base 求模的结果
	//对乘法的结果求模，等价于先对每个因子都求模，然后对因子相乘的结果再求模
	function myPow(a, k) {
		// 对因子求模
		a %= base
		let res = 1
		for (let _ = 0; _ < k; _++) {
			// 这里有乘法，是潜在的溢出点
			res *= a
			// 对乘法结果求模
			res %= base
		}
		return res
	}

	// function myPow(a, k) {
	// 	if (k == 0) return 1
	// 	a %= base

	// 	if (k % 2 == 1) {
	// 		// k 是奇数
	// 		return (a * myPow(a, k - 1)) % base
	// 	} else {
	// 		// k 是偶数
	// 		const sub = myPow(a, k / 2)
	// 		return (sub * sub) % base
	// 	}
	// }
}
```
