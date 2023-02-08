> ==无论什么语言整数操作都需要考虑溢出==

### [7.==整数反转==](https://leetcode-cn.com/problems/reverse-integer/)

```javascript {.line-numbers}
//simple version
var reverse = function (x) {
	let ret = 0
	while (x) {
    //x % 10无需管正负
		ret = ret * 10 + (x % 10)
    if (ret > Math.pow(2, 31) - 1 || ret < Math.pow(-2, 31)) return 0
    //强转32位有符号整数，正数向下取整，负数向上取整
		x = (x / 10) | 0
	}
	return ret
}

//advanced version
var reverse = function (x) {
	let ret = 0
	while (x !== 0) {
		//x % 10无需管正负
		ret = ret * 10 + (x % 10)
		//强转32位有符号整数，正数向下取整，负数向上取整
		x = (x / 10) | 0
	}
	//超过32位的整数转换结果不等于自身，用作溢出判断
	return (ret | 0) === ret ? ret : 0
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

### [50.==Pow(x, n) M==](https://leetcode-cn.com/problems/powx-n/)

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
	const len = nums.length,
		count
	for (let i = 0; i < len; i++) {
		count = 0
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
var majorityElement = function(nums) {
  const map = {}
  const n = nums.length >> 1
  for(let i = 0; i < nums.length; i++){
      map[nums[i]] = map[nums[i]] !== undefined ? map[nums[i]] + 1 : 1
      if(map[nums[i]] > n) return nums[i]
  }
}

//best 投票算法 O(n) - O(1)
var majorityElement = function (nums) {
	let ret = nums[0],
		count = 1
	for (let i = 1; i < nums.length; i++) {
		//note check sequence!
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

### [172.==阶乘后的零==](https://leetcode-cn.com/problems/factorial-trailing-zeroes/)

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
```

### [202.==快乐数==](https://leetcode-cn.com/problems/happy-number/)

```javascript {.line-numbers}
function getN(n) {
	if (n == 1 || n == 0) return n
	let res = 0
	while (n) {
		res += (n % 10) * (n % 10)
		n = parseInt(n / 10)
	}
	return res
}

var isHappy = function (n) {
	const set = new Set()
	while (n !== 1 && !set.has(n)) {
		set.add(n)
		n = getN(n)
	}
	return n === 1
}

//solution 2
var isHappy = function (n) {
	let set = new Set()
	let totalCount
	while (totalCount !== 1) {
		let arr = ('' + (totalCount || n)).split('')
		totalCount = arr.reduce((total, num) => {
			return total + num * num
		}, 0)
		if (set.has(totalCount)) return false
		set.add(totalCount)
	}
	return true
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
	for (let i = 0; i < n; i++) {
		set.add(nums[i])
	}
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
