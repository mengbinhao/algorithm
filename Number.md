> ==无论什么语言整数操作都需要考虑溢出==
>
> 计算机中所有数据的存储和运算都是以"二进制补码"进行的

### [7.==整数反转==](https://leetcode-cn.com/problems/reverse-integer/)

```javascript {.line-numbers}
//brute force
var reverse = function (x) {
	const sign = x > 0 ? 1 : -1
	//x都按整数处理
	x = x < 0 ? -x : x
	//1 整数转字符串，再转数组
	const arr = [...(x + '')]
	const len = arr.length
	const tmp = new Array(len)
	//2 反向遍历将元素放到新数组中
	for (let i = len - 1; i >= 0; i--) tmp[len - 1 - i] = arr[i]
	//3 将新数组转成字符串，在转整数输出
	//+会自动处理前导零
	const ret = +tmp.join('')
	if (ret > Math.pow(2, 31) - 1 || ret < Math.pow(2, -31)) return 0
	return ret * sign
}

//two pointer
var reverse = function (x) {
	const sign = x > 0 ? 1 : -1
	//x都按整数处理
	x = x < 0 ? -x : x
	//1 整数转字符串，在转数组
	const arr = [...(x + '')]
	let l = 0, r = arr.length - 1
	//2 交换两边值
	while (l < r) {
    [arr[l++], arr[r--]] = [arr[r], arr[l]]
  }
	//3 将原数组转成字符串，在转整数输出
	//+会自动处理前导零
	const ret = +arr.join('')
	if (ret > Math.pow(2, 31) - 1 || ret < Math.pow(2, -31)) return 0
	return ret * sign
}

// math way
var reverse = function (x) {
  const sign = x > 0 ? 1 : -1
  x = x < 0 ? -x : x
	let ret = 0
  //最高位/10 === 0 or 最高位%10 === 最高位
	while (x) {
		//x % 10无需管正负
		ret = ret * 10 + (x % 10)
		if (ret > Math.pow(2, 31) - 1 || ret < Math.pow(-2, 31)) return 0
		//强转32位有符号整数，正数向下取整，负数向上取整
		x = (x / 10) | 0
	}
	return ret * sign
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

### [12.整数转罗马数字](https://leetcode.cn/problems/integer-to-roman/)

```javascript {.line-numbers}
var intToRoman = function(num) {
  //从大到小排列
  const pairs =[[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]]
  const ret = []
  for (let [val, symbol] of pairs) {
    while (num >= val) {
      num -= val
      ret.push(symbol)
    }
    if (val === 0) break
  }
  return ret.join('')
}
```

### [13.罗马数字转整数](https://leetcode.cn/problems/roman-to-integer/)

```javascript {.line-numbers}
var romanToInt = function(s) {
  let hash = new Map()
  hash.set('I', 1)
  hash.set('V', 5)
  hash.set('X', 10)
  hash.set('L', 50)
  hash.set('C', 100)
  hash.set('D', 500)
  hash.set('M', 1000)
  let ret = 0
  for (let i = 0, len = s.length; i < len; i++) {
    const val = hash.get(s[i])
    if (i < len - 1 && val < hash.get(s[i + 1])) ret -= val
    else ret += val
  }
  return ret
}
```

### [50.Pow(x, n) M](https://leetcode-cn.com/problems/powx-n/)

```javascript
//brute force
var myPow = function (x, n) {
	if (n === 0) return 1
	if (n === 1) return x
	if (n < 0) return 1 / myPow(x, -n)
	let ret = 1
	for (let i = 1; i <= n; i++) ret *= x
	return ret
}

//recursion
var myPow = function (x, n) {
	if (n === 0) return 1
	if (n === 1) return x
	if (n < 0) return 1 / myPow(x, -n)
	//even的时候转换成子问题
	return n % 2 === 1 ? x * myPow(x, n - 1) : myPow(x * x, n / 2)
}

//divide-and-conquer
var myPow = function (x, n) {
	if (n === 0) return 1
	if (n === 1) return x
	if (n < 0) return 1 / myPow(x, -n)
	let ret = 1
	while (n > 1) {
		if (n % 2 === 1) {
			//补上当前遍历的x
			ret *= x
			n--
		}
		x *= x
		n /= 2
	}
	return ret * x
}
```

### [169.==多数元素 E==](https://leetcode-cn.com/problems/majority-element/)

```javascript
//brute force O(n^2)
var majorityElement = function (nums) {
	const len = nums.length
	for (let i = 0; i < len; i++) {
		let count = 0
		for (let j = 0; j < len; j++) {
			if (nums[i] === nums[j]) {
				if (++count > Math.floor(len / 2)) return nums[i]
			}
		}
	}
}

// O(NlogN)
// sort array then the middle is majority,due to must have an answer
var majorityElement = function (nums) {
	nums.sort((a, b) => a - b)
	return nums[Math.floor(nums.length / 2)]
}

//hash O(n)
var majorityElement = function (nums) {
	let hash = {}
	for (let i = 0, len = nums.length; i < len; i++) {
		hash[nums[i]] = hash[nums[i]] !== undefined ? hash[nums[i]] + 1 : 1
		if (hash[nums[i]] > Math.floor(len / 2)) return nums[i]
	}
}

//best 投票算法 O(n) - O(1)
var majorityElement = function (nums) {
	let ret = nums[0],
		count = 1
	for (let i = 1, len = nums.length; i < len; i++) {
		//Note check sequence!
		if (count === 0) {
			ret = nums[i]
			count++
		} else if (nums[i] === ret) {
			count++
		} else {
			count--
		}
	}
	return ret
}
```

### [172.阶乘后的零](https://leetcode-cn.com/problems/factorial-trailing-zeroes/)

```javascript {.line-numbers}
//O(n) - O(1)
const trailingZeroes = (n) => {
	let zeroCount = 0
	for (let i = 5; i <= n; i += 5) {
		let curFactor = i
		//25..75...
		while (curFactor % 5 === 0) {
			zeroCount++
			curFactor /= 5
		}
	}
	return zeroCount
}

//O(logN) - O(1) advanced version
var trailingZeroes = function (n) {
	let ret = 0
	while (n > 0) {
		n = (n / 5) | 0
		ret += n
	}
	return ret
}
```

### [202.==快乐数==](https://leetcode-cn.com/problems/happy-number/)

```javascript {.line-numbers}
//hash
const getN = n => {
	//if (n === 1 || n === 0) return n
	let res = 0
	while (n > 0) {
    let d = n % 10
		res += d * d
		n = parseInt(n / 10)
	}
	return res
}

var isHappy = function (n) {
	let set = new Set()
	while (n !== 1 && !set.has(n)) {
		set.add(n)
		n = getN(n)
	}
	return n === 1
}
```

### [229.多数元素 II](https://leetcode-cn.com/problems/majority-element-ii/)

```javascript
var majorityElement = function (nums) {
	let candidate1 = nums[0],
		count1 = 0
	let candidate2 = nums[0],
		count2 = 0
	for (let num of nums) {
		if (num === candidate1) {
			count1++
			continue
		}
		if (num === candidate2) {
			count2++
			continue
		}
		if (count1 === 0) {
			candidate1 = num
			count1++
			continue
		}
		if (count2 === 0) {
			candidate2 = num
			count2++
			continue
		}
		count1--
		count2--
	}
	// 找到了两个候选人之后，需确定票数是否满足大于 N/3
	const ret = [],
		len = nums.length
	count1 = count2 = 0

	for (let i = 0; i < len; i++) {
		if (nums[i] === candidate1) {
			count1++
		} else if (nums[i] === candidate2) {
			count2++
		}
	}
	if (count1 > len / 3) ret.push(candidate1)
	if (count2 > len / 3) ret.push(candidate2)
	return ret
}
```

### [268.==丢失的数字==](https://leetcode-cn.com/problems/missing-number/)

```javascript {.line-numbers}
var missingNumber = function (nums) {
	nums.sort((a, b) => a - b)
	const n = nums.length
	for (let i = 0; i < n; i++) {
		if (nums[i] !== i) return i
	}
	return n
}

var missingNumber = function (nums) {
	const set = new Set()
	const n = nums.length
	for (let i = 0; i < n; i++) set.add(nums[i])
	let missing = -1
	for (let i = 0; i <= n; i++) {
		if (!set.has(i)) {
			missing = i
			break
		}
	}
	return missing
}
```
