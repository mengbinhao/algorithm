### [8. ==字符串转换整数(atoi)M==](https://leetcode-cn.com/problems/string-to-integer-atoi/)

```javascript {.line-numbers}
var myAtoi = function (str) {
	const len = str.length,
		max = 2 ** 31 - 1,
		min = -(2 ** 31)

	let ret = 0,
		i = 0,
		flag = 1

	while (i < len && str[i] === ' ') i++
	if (str[i] === '+' || str[i] === '-') {
		flag = str[i] === '+' ? 1 : -1
		i++
	}
	while (i < len && !Number.isNaN(parseInt(str[i], 10))) {
		ret = ret * 10 + +str[i]
		i++
	}
	if (ret > max || ret < min) return flag === 1 ? max : min
	return flag * ret
}
```

### [14. ==最长公共前缀==](https://leetcode-cn.com/problems/longest-common-prefix/)

```javascript {.line-numbers}
//纵向扫描 O(mn) - O(1)
//best version
var longestCommonPrefix = function (strs) {
	if (!strs || !Array.isArray(strs) || strs.length === 0) return ''
	//枚strs[0]每个char
	for (let i = 0, s0Len = strs[0].length; i < s0Len; i++) {
		for (let j = 1, strsLen = strs.length; j < strsLen; j++) {
			if (i === strs[j].length || strs[j].charAt(i) !== strs[0].charAt(i)) {
				return strs[0].substring(0, i)
			}
		}
	}
	return strs[0]
}

//横向扫描 O(mn) - O(1)
var longestCommonPrefix = function (strs) {
	if (!strs || !Array.isArray(strs) || strs.length === 0) return ''

	let prefix = strs[0]
	for (let i = 1, len = strs.length; i < len; i++) {
		//依次得到每个str的prefix
		prefix = getLCP(prefix, strs[i])
		//找不到公共前缀则直接退出
		if (prefix.length === 0) break
	}
	return prefix

	function getLCP(s1, s2) {
		const length = Math.min(s1.length, s2.length)
		let idx = 0
		while (idx < length && s1.charAt(idx) === s2.charAt(idx)) idx++
		return s1.substring(0, idx)
	}
}
```

### [58. ==最后一个单词的长度==](https://leetcode-cn.com/problems/length-of-last-word/)

```javascript {.line-numbers}
var lengthOfLastWord = function (s) {
	const len = s.length
	if (len === 0) return 0
	let i = len - 1
	while (i >= 0 && s[i] === ' ') i--
	if (i < 0) return 0
  let ret = 0
	while (i >= 0 && s[i] !== ' ') {
    ret++
    i--
  }
	return ret
}
```

### [125. ==验证回文串==](https://leetcode-cn.com/problems/valid-palindrome/)

```javascript {.line-numbers}
//O(∣s∣) - O(∣s∣)
//loop once, filter letter and digit, then compare if target str === reverse target string

//O(∣s∣)，其中 |s| 是字符串s的长度 - O(1)
var isPalindrome = function (s) {
	if (typeof s !== 'string') return false
	s = s.replace(/[^A-Za-z0-9]/g, '').toLowerCase()
	let l = 0,
		r = s.length - 1
	//two pointer， 向中间夹逼
	while (l < r) {
		if (s[l] !== s[r]) return false
		l++
		r--
	}
	return true
}
```

### [151. ==翻转字符串里的单词 M==](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

```javascript {.line-numbers}
//使用系统函数
var reverseWords = function (s) {
	return s.trim().replace(/ {2,}/g, ' ').split(' ').reverse().join(' ')
}

//deque
var reverseWords = function (s) {
	let l = 0,
		r = s.length - 1,
		word = ''
	const queue = []

	while (s[l] === ' ') l++
	while (s[r] === ' ') r--
	while (l <= r) {
		const char = s[l]
		if (char === ' ' && word) {
			queue.unshift(word)
			word = ''
		} else if (char !== ' ') {
			word += char
		}
		l++
	}
	//add last word
	queue.unshift(word)
	return queue.join(' ')
}
```

### [344. ==反转字符串 E==](https://leetcode-cn.com/problems/reverse-string/)

```javascript {.line-numbers}
//two pointer
var reverseString = function (s) {
	let l = 0,
		r = s.length - 1
	while (l < r) {
		;[s[l], s[r]] = [s[r], s[l]]
    l++
    r--
	}
	return s
}

//recursion
var reverseString = function (s) {
	helper(s, 0, s.length - 1)

	function helper(s, left, right) {
		if (left >= right) return
		;[s[left++], s[right--]] = [s[right], s[left]]
		helper(s, left, right)
	}
}
```

### [387. ==字符串中的第一个唯一字符 E==](https://leetcode-cn.com/problems/first-unique-character-in-a-string/)

```javascript {.line-numbers}
var firstUniqChar = function (s) {
	const obj = {}
	for (let c of s) {
		obj[c] ? ++obj[c] : (obj[c] = 1)
	}
	for (let i = 0; i < s.length; i++) {
		if (obj[s[i]] === 1) return i
	}
	return -1
}
```

### [415. 字符串相加](https://leetcode-cn.com/problems/add-strings/)

```javascript {.line-numbers}
var addStrings = function (num1, num2) {
	let i = num1.length - 1,
		j = num2.length - 1,
		curry = 0,
		ret = []

	while (i >= 0 || j >= 0 || curry) {
		const x = i >= 0 ? num1.charAt(i) - 0 : 0
		const y = j >= 0 ? num2.charAt(j) - 0 : 0
		const tmp = x + y + curry
		ret.push(tmp % 10)
		curry = Math.floor(tmp / 10)
		i--
		j--
	}
	return ret.reverse().join('')
}
```

### [43. 字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)

```javascript {.line-numbers}
var multiply = function (num1, num2) {
	if (num1 === '0' || num2 === '0') {
		return '0'
	}
	let ans = '0'
	const m = num1.length,
		n = num2.length
	for (let i = n - 1; i >= 0; i--) {
		let cur = '',
			add = 0
		for (let j = n - 1; j > i; j--) {
			cur += 0
		}
		let y = num2.charAt(i) - 0
		for (let j = m - 1; j >= 0; j--) {
			let x = num1.charAt(j) - 0
			let product = x * y + add
			cur += product % 10
			add = Math.floor(product / 10)
		}
		if (add !== 0) {
			cur += add % 10
		}
		ans = addStrings(ans, cur.split('').reverse().join(''))
	}
	return ans
}

function addStrings(num1, num2) {
	let i = num1.length - 1,
		j = num2.length - 1,
		curry = 0,
		ret = []

	while (i >= 0 || j >= 0 || curry) {
		const x = i >= 0 ? num1.charAt(i) - 0 : 0
		const y = j >= 0 ? num2.charAt(j) - 0 : 0
		const tmp = x + y + curry
		ret.push(tmp % 10)
		curry = Math.floor(tmp / 10)
		i--
		j--
	}
	return ret.reverse().join('')
}
```

### [459. 重复的子字符串](https://leetcode-cn.com/problems/repeated-substring-pattern/)

```javascript {.line-numbers}
var repeatedSubstringPattern = function (s) {
	if (!s || s.length === 0) return false
	let len = s.length

	//子串不可能大于总长度一半
	for (let i = 1; i * 2 <= len; i++) {
		//不超过长度一半
		if (len % i === 0) {
			let match = true
			//依次遍历后面的
			for (let j = i; j < len; j++) {
				if (s[j] !== s[j - i]) {
					match = false
					break
				}
			}
			if (match) return true
		}
	}

	return false
}
```

### [541. ==反转字符串 II==](https://leetcode-cn.com/problems/reverse-string-ii/)

```javascript {.line-numbers}
var reverseStr = function (s, k) {
	const arr = s.split(''),
		len = arr.length
	for (let start = 0; start < len; start += 2 * k) {
		let i = start,
			j = Math.min(start + k - 1, len)
		while (i < j) {
			;[arr[i++], arr[j--]] = [arr[j], arr[i]]
		}
	}
	return arr.join('')
}
```

### [557. 反转字符串中的单词 III](https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/)

```javascript {.line-numbers}
//自己写split和reverse
var reverseWords = function (s) {
	function mySplit(s) {
		let words = [],
			word = ''
		for (let i = 0; i < s.length; i++) {
			if (s[i] === ' ') {
				words.push(word)
				word = ''
			} else {
				word += s[i]
			}
		}
		words.push(word)
		return words
	}
	function myReverse(word) {
		let ret = ''
		for (let i = word.length - 1; i >= 0; i--) {
			ret += word[i]
		}
		return ret
	}
	let words = mySplit(s),
		ret = ''

	for (let word of words) {
		ret += myReverse(word) + ' '
	}
	return ret.substring(0, ret.length - 1)
}

//使用系统函数
var reverseWords = function (s) {
	let strs = s.split(' '),
		ret = ''
	for (let str of strs) {
		ret += str.split('').reverse().join('') + ' '
	}
	return ret.substring(0, ret.length - 1)
}
```

### [647. 回文子串](https://leetcode-cn.com/problems/palindromic-substrings/)

```javascript {.line-numbers}
//DP
var countSubstrings = function (s) {
	let len = s.length,
		ret = 0

	//dp[i][j] 表示字符串s在[i,j]区间的子串是否是一个回文串
	let dp = Array.from({ length: len }, () => new Array(len))

	//填写表格上半部分
	for (let j = 0; j < len; j++) {
		for (let i = 0; i <= j; i++) {
			if (i === j) {
				//单个字符
				dp[i][j] = true
				ret++
			} else if (j - i === 1 && s[i] === s[j]) {
				//两个相同的字符
				dp[i][j] = true
				ret++
			} else if (j - i > 1 && s[i] === s[j] && dp[i + 1][j - 1]) {
				//多于两个字符
				dp[i][j] = true
				ret++
			}
		}
	}
	return ret
}

//中心扩展法
var countSubstrings = function (s) {
	const n = s.length
	let ans = 0
	for (let i = 0; i < 2 * n - 1; ++i) {
		let l = i / 2,
			r = i / 2 + (i % 2)
		while (l >= 0 && r < n && s.charAt(l) == s.charAt(r)) {
			--l
			++r
			++ans
		}
	}
	return ans
}

//brute force
var countSubstrings = function (s) {
	let len = s.length,
		ret = 0
	for (let i = 0; i < len; i++) {
		for (let j = i; j < len; j++) {
			if (isPalindrome(s.substring(i, j + 1))) ret++
		}
	}

	return ret

	function isPalindrome(s) {
		let l = 0,
			r = s.length - 1
		while (l < r) {
			if (s[l] !== s[r]) return false
			l++
			r--
		}
		return true
	}
}
```

### [709. ==转换成小写字母==](https://leetcode-cn.com/problems/to-lower-case/)

```javascript {.line-numbers}
var toLowerCase = function (str) {
	return str.replace(/[A-Z]/g, (item) => {
		return String.fromCharCode(item.charCodeAt() + 32)
	})
}
```

### [917. ==仅仅反转字母==](https://leetcode-cn.com/problems/reverse-only-letters/)

```javascript {.line-numbers}
//two point
var reverseOnlyLetters = function (s) {
	const len = s.length
	const arr = [...s]
	let left = 0,
		right = len - 1
	while (true) {
		while (left < right && !/^[a-zA-Z]+$/.test(s[left])) left++
		while (right > left && !/^[a-zA-Z]+$/.test(s[right])) right--
		if (left >= right) break
		;[arr[left++], arr[right--]] = [arr[right], arr[left]]
	}
	return arr.join('')
}

//use stack
var reverseOnlyLetters = function (S) {
	const stack = []

	for (let c of S) {
		if (/[a-zA-Z]/.test(c)) stack.push(c)
	}

	let ret = ''
	for (let c of S) {
		if (/[a-zA-Z]/.test(c)) {
			ret += stack.pop()
		} else {
			ret += c
		}
	}
	return ret
}
```
