## 基本概念

- 有符号数是利用二进制最高位表示,符号 0 代表正 1 代表负,无符号最高位的 0、1 代表正常的数
- `>>>`表示无符号右移,也叫逻辑右移,即若该数为正,则高位补 0,而若该数为负数,则右移后高位同样补 0
- `>>`表示右移,如果该数为正,则高位补 0,若为负数,则高位补 1
- `<<`表示左移,不分正负数,低位补 0

## 操作符

&、|、^、~、<<、>>

# 解题知识点

- ==求 n 的第 k 位数字: n >> k & 1==

- ==`x = x & (x - 1)` 打掉最低位的 1==

- ==`x & -x` lowbit(n),得到最低位的 1, `-x`得到反码再加 1==

- 异或(两位相同为 0,不同为 1)

  - `x ^ 0 = x`
  - `x ^ x = 0`
  - `x ^ y ^ x = y`
  - `x ^ y ^ x = (x ^ y) ^ x = x ^ (y ^ x)`

- 去除小数

  - ~~12.22
  - 12.22 >> 0
  - 12.22 | 0

- 位运算代替乘除2

  - 24 >> 1
  - 24 << 1

- 判断奇偶数

  - `x & 1 === 1` or `x & 1 === 0` 判断奇偶 `x % 2 === 1`

- 不增加变量实现两数交换

  ```javascript
  ;[a, b] = [b, a]
  
  a = a + b
  b = a - b
  a = a - b
  
  a = a ^ b
  b = a ^ b
  a = a ^ b
  ```

# questions

### [136.==只出现一次的数字==](https://leetcode-cn.com/problems/single-number/)

```javascript {.line-numbers}
var singleNumber = function (nums) {
	let ret = 0
	for (let num of nums) ret ^= num
	return ret
}
```

### [137.只出现一次的数字 II](https://leetcode-cn.com/problems/single-number-ii/)

```javascript {.line-numbers}
//HashMap,遍历输入数组,统计每个数字出现的次数,最后返回出现次数为 1 的数字
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

### [260.只出现一次的数字 III](https://leetcode-cn.com/problems/single-number-iii/)

```javascript {.line-numbers}
var singleNumber = function (nums) {
	const map = new Map()
	for (let num of nums) {
		if (!map.has(num)) {
			map.set(num, 1)
		} else {
			map.set(num, map.get(num) + 1)
		}
	}
	let index = 0,
		ret = []
	for (let [idx, val] of map.entries()) {
		if (val === 1) ret[index++] = idx
	}
	return ret
}

var singleNumber = function (nums) {
	let bitMask = 0
	//bitMask会保留只出现一次的两个数字之间的差异
	for (let num of nums) bitMask ^= num
	//得到最右边的1,这个1要么来自x,要么来自y
	const diff = bitMask & -bitMask
	let x = 0
	//从diff分离出x
	for (let num of nums) {
		if ((num & diff) !== 0) x ^= num
	}
	return Array.of(x, bitMask ^ x)
}
```

### [171.==Excel 表列序号==](https://leetcode-cn.com/problems/excel-sheet-column-number/)

```javascript {.line-numbers}
var titleToNumber = function (columnTitle) {
	let ret = 0
	for (let i = 0; i < columnTitle.length; i++) {
		const num = columnTitle.charCodeAt(i) - 65 + 1
    //覆盖不是累加
		ret = ret * 26 + num
	}
	return ret
}
```

### [190.颠倒二进制位](https://leetcode-cn.com/problems/reverse-bits/)

```javascript {.line-numbers}
var reverseBits = function (n) {
	let result = 0
	//位于索引i处的位，在翻转之后，其位置为31-i
	for (let i = 0; i < 32; i++) {
		//1 依次获取n的第k位 ((n >> i) & 1)
		//2 二进制转10进制result << 1 + 最高位
		//n & 1获取末位数
		result = (result << 1) + ((n >> i) & 1)
	}
	//convert non-Numbers to Number, the Numbers that can be expressed as 32-bit unsigned ints
	return result >>> 0
}
```

### [191.==位 1 的个数==](https://leetcode-cn.com/problems/number-of-1-bits/)

```javascript {.line-numbers}
var hammingWeight = function (n) {
	let count = 0
	while (n !== 0) {
		count++
		n &= n - 1
	}
	return count
}
```

### [201.==数字范围按位与==](https://leetcode-cn.com/problems/bitwise-and-of-numbers-range/)

```javascript {.line-numbers}
var rangeBitwiseAnd = function (left, right) {
	let shift = 0
	while (left !== right) {
		left >>= 1
		right >>= 1
		shift++
	}
	return (left <<= shift)
}
```

### [231.==2 的幂==](https://leetcode-cn.com/problems/power-of-two/)

```javascript {.line-numbers}
var isPowerOfTwo = function (n) {
	if (n === 0) return false
	while ((n & 1) === 0) {
		n = n >> 1
	}
	return n === 1
}

var isPowerOfTwo = function (n) {
	return n > 0 && (n & (n - 1)) === 0
}

var isPowerOfTwo = function(n) {
  return n > 0 && (n & -n) === n
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

### [645.错误的集合](https://leetcode-cn.com/problems/set-mismatch/)

```javascript {.line-numbers}
// 1 brute force 双循环 O(n^2) - O(1)
// 2 brute force 双循环找到直接break
// 3 sort O(nlogn) - O(logn)
// 4 Map O(2n) - O(n)
// 5 Array 在数组中,索引代表数字,arr存储每个数字出现的次数.例如 arr[i]存储数字 i出现的次数 O(n) - O(n)
// 6 使用额外空间 O(n) - O(1)
// 7 异或 O(n) - O(1)
var findErrorNums = function (nums) {
	const n = nums.length
	let dup = -1
	for (let i = 0; i < n; i++) {
		//元素是从 1 开始的
		const index = Math.abs(nums[i]) - 1
		// nums[index] 小于0则说明重复访问
		if (nums[index] < 0) {
			dup = Math.abs(nums[i])
		} else {
			nums[index] *= -1
		}
	}

	let missing = -1
	for (let i = 0; i < n; i++)
		// nums[i] 大于 0 则说明没有访问
		if (nums[i] > 0) {
			// 将索引转换成元素
			missing = i + 1
			break
		}

	return [dup, missing]
}

var findErrorNums = function (nums) {
	let xor = 0,
		xor0 = 0,
		xor1 = 0
	for (let num of nums) xor ^= num
	const len = nums.length
	//得到x和y的xor结果
	for (let i = 1; i <= len; i++) xor ^= i

	const diff = xor & -xor
	for (let num of nums) {
		if ((num & diff) !== 0) {
			xor1 ^= num
		} else {
			xor0 ^= num
		}
	}
	for (let i = 1; i <= len; i++) {
		if ((i & diff) !== 0) {
			xor1 ^= i
		} else {
			xor0 ^= i
		}
	}
	//确定两个数字中哪个为重复数字，哪个为缺失数字
	for (let i = 0; i < len; i++) {
		if (nums[i] === xor0) return Array.of(xor0, xor1)
	}
	return Array.of(xor1, xor0)
}
```
