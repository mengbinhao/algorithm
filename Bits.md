## 基本概念

- 有符号数是利用二进制最高位表示,符号 0 代表正 1 代表负,无符号最高位的 0、1 代表正常的数
- `>>>`表示无符号右移,也叫逻辑右移,即若该数为正,则高位补 0,而若该数为负数,则右移后高位同样补 0
- `>>`表示右移,如果该数为正,则高位补 0,若为负数,则高位补 1
- `<<`表示左移,不分正负数,低位补 0

## 操作符

&、|、^、~、<<、>>

## 异或`^`(两位相同为 0,不同为 1)

- x ^ 0 = x
- x ^ 1s = ~x // 1s = ~0
- x ^ (-x) = 1s
- x ^ x = 0
- a ^ b = c => a ^ c = b, b ^ c = a //swap
- a ^ b ^ c = a ^ (b ^ c) = (a ^ b) ^ c //associative

# 解题知识点

- `x & 1 === 1` or `x & 1 === 0` 判断奇偶 `x % 2 === 1`
- `x = x & (x - 1)` 清零最低位的 1
- `x & -x` 得到最低位的 1, `-x`得到反码再加 1

### [136.只出现一次的数字](https://leetcode-cn.com/problems/single-number/)

```javascript {.line-numbers}
// X ^ 0 = X
// X ^ X = 0
// X ^ Y ^ X = Y
var singleNumber = function (nums) {
	let ret = 0
	for (let num of nums) {
		ret ^= num
	}
	return ret
}
```

### [137.只出现一次的数字 II](https://leetcode-cn.com/problems/single-number-ii/)

```javascript {.line-numbers}
//1 HashSet,将输入数组存储到 HashSet,然后使用HashSet中数字和的三倍与数组之和比较
//2 HashMap,遍历输入数组,统计每个数字出现的次数,最后返回出现次数为 1 的数字
var singleNumber = function (nums) {
	const map = new Map()

	for (let num of nums) {
		if (!map.has(num)) {
			map.set(num, 1)
		} else {
			map.set(num, map.get(num) + 1)
		}
	}

	for (let [idx, val] of map.entries()) {
		if (val === 1) return idx
	}
}

//good version
var singleNumber = function (nums) {
	let seenOnce = 0,
		seenTwice = 0

	for (let num of nums) {
		// first appearance:
		// add num to seen_once
		// don't add to seen_twice because of presence in seen_once

		// second appearance:
		// remove num from seen_once
		// add num to seen_twice

		// third appearance:
		// don't add to seen_once because of presence in seen_twice
		// remove num from seen_twice
		seenOnce = ~seenTwice & (seenOnce ^ num)
		seenTwice = ~seenOnce & (seenTwice ^ num)
	}
	return seenOnce
}
```

### [190.颠倒二进制位](https://leetcode-cn.com/problems/reverse-bits/)

```javascript {.line-numbers}
var reverseBits = function (n) {
	let result = 0
	//于位于索引i处的位，在反转之后，其位置应为31-i
	for (let i = 0; i < 32; i++) {
		//n & 1获取末位数,0或1与1相与,都等于其本身
		result = (result << 1) + (n & 1)
		n >>= 1
	}
	//convert non-Numbers to Number, the Numbers that can be expressed as 32-bit unsigned ints
	return result >>> 0
}
```

### [191.位 1 的个数](https://leetcode-cn.com/problems/number-of-1-bits/)

```javascript {.line-numbers}
//bad version
var hammingWeight = function (n) {
	let ret = 0
	for (let i = 0; i < 32; i++) {
		if (n & 1) ret++
		n = n >> 1
	}
	return ret
}

//good version
var hammingWeight = function (n) {
	let sum = 0
	while (n != 0) {
		sum++
		n &= n - 1
	}
	return sum
}
```

### [231.2 的幂](https://leetcode-cn.com/problems/power-of-two/)

```javascript {.line-numbers}
var isPowerOfTwo = function (n) {
	if (n === 0) return false
	while ((n & 1) === 0) {
		n = n >> 1
	}
	return n === 1
}

//good version
var isPowerOfTwo = function (n) {
	return n > 0 && (n & (n - 1)) === 0
}
```

### [338.比特位计数](https://leetcode-cn.com/problems/counting-bits/)

```javascript {.line-numbers}
var countBits = function (num) {
	const calculateBits = (x) => {
		let bits = 0
		while (x > 0) {
			bits++
			x = x & (x - 1)
		}
		return bits
	}

	const ret = new Array(num + 1)
	for (let i = 0, len = ret.length; i < len; i++) {
		ret[i] = calculateBits(i)
	}
	return ret
}

//good version
var countBits = function (num) {
	const ret = new Array(num + 1).fill(0)
	for (let i = 1, len = ret.length; i < len; i++) {
		ret[i] += ret[i & (i - 1)] + 1
	}
	return ret
}
```
