==无论什么语言整数操作都需要考虑溢出==

### [7.整数反转](https://leetcode-cn.com/problems/reverse-integer/)

```javascript {.line-numbers}
var reverse = function (x) {
	let ret = 0
	while (x !== 0) {
		const pop = x % 10
		if (ret > 214748364 || (ret === 214748364 / 10 && pop > 7)) return 0
		if (ret < -214748364 || (ret === -214748364 && pop < -8)) return 0
		ret = ret * 10 + pop
		if (x > 0) {
			x = Math.floor(x / 10)
		} else {
			x = Math.ceil(x / 10)
		}
	}
	return ret
}

//advanced version
var reverse = function (x) {
	let result = 0
	while (x !== 0) {
		//x % 10无需管正负
		result = result * 10 + (x % 10)
		//强转32位有符号整数，正数向下取整，负数向上取整
		x = (x / 10) | 0
	}
	//超过32位的整数转换结果不等于自身，用作溢出判断
	return (result | 0) === result ? result : 0
}
```

### [9.回文数](https://leetcode-cn.com/problems/palindrome-number/)

```javascript {.line-numbers}
//no overflow check
var isPalindrome = function (x) {
	if (x < 0 || (x % 10 === 0 && x > 0)) return false
	let ret = 0,
		num = x
	while (num !== 0) {
		ret = ret * 10 + (num % 10)
		num = (num / 10) | 0
	}
	return ret === x
}

//advanced version
//revert half of x
var isPalindrome = function (x) {
	if (x < 0 || (x % 10 === 0 && x > 0)) return false
	let ret = 0
	while (x > ret) {
		ret = ret * 10 + (x % 10)
		x = (x / 10) | 0
	}
	return ret === x || x === ((ret / 10) | 0)
}
```

### [172.阶乘后的零](https://leetcode-cn.com/problems/factorial-trailing-zeroes/)

```javascript {.line-numbers}
//O(logN) - O(1) simplest version
var trailingZeroes = function (n) {
	let ret = 0
	while (n > 0) {
		n = (n / 5) | 0
		ret += n
	}
	return ret
}

//O(logN) - O(1) same as above
const trailingZeroes2 = (n) => {
	let zeroCount = 0
	let currentMultiple = 5
	while (n >= currentMultiple) {
		zeroCount += (n / currentMultiple) | 0
		currentMultiple *= 5
	}
	return zeroCount
}

//O(n) - O(1)
const trailingZeroes = (n) => {
	let zeroCount = 0
	for (let i = 5; i <= n; i += 5) {
		let currentFactor = i
		//25..75...
		while (currentFactor % 5 == 0) {
			zeroCount++
			currentFactor /= 5
		}
	}
	return zeroCount
}
```
