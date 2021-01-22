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

### [190.颠倒二进制位](https://leetcode-cn.com/problems/reverse-bits/)

```javascript {.line-numbers}
var reverseBits = function (n) {
	let result = 0
	for (let i = 0; i < 32; i++) {
		result = (result << 1) + (n & 1)
		n >>= 1
	}
	return result >>> 0
}
```

### [191.位 1 的个数](https://leetcode-cn.com/problems/number-of-1-bits/)

```javascript {.line-numbers}
var hammingWeight = function (n) {
	let sum = 0
	while (n != 0) {
		sum++
		n &= n - 1
	}
	return sum
}
```
