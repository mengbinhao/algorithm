### [5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)

```javascript
//brute force + reverse()     
//O(N^3) - O(1)
var longestPalindrome = function(s) {
  if (!s) return ''
  const len = s.length
  if (len < 2) return s

  let maxLen = 1, begin = 0

  const isPalindrome = (s, l, r) => {
    while (l < r) {
      if (s[l] !== s[r]) return false
      l++
      r--
    }
    return true
  }

  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (j - i + 1 > maxLen && isPalindrome(s, i, j)) {
        maxLen = j - i + 1
        begin = i
      }
    }
  }

  return s.substring(begin, begin + maxLen)
}

//DP  O(n^2) - O(n^2)
var longestPalindrome = function (s) {
	if (!s) return ''
	const len = s.length
	if (len < 2) return s

    //dp[i..j] 表示从i到j的子串是否是回文
	const dp = Array.from({ length: len }, () => new Array(len))

	let begin = 0,
		maxLen = 1

 	//i、j相等的情况
	// for (let i = 0; i < len; i++) {
	//   dp[i][j] = true
	// }

	for (let j = 1; j < len; j++) {
		for (let i = 0; i < j; i++) {
			if (s[i] !== s[j]) {
				dp[i][j] = false
			} else {
				//j - i + 1 < 4，即当子串s[i..j]的长度等于2 or 3的时候，只需要判断一下头尾两个字符是否相等就可以直接下结论了
				if (j - i < 3) dp[i][j] = true
				else dp[i][j] = dp[i + 1][j - 1]
			}

             //每次update result
			if (dp[i][j] && j - i + 1 > maxLen) {
				maxLen = j - i + 1
				begin = i
			}
		}
	}

	return s.substring(begin, begin + maxLen)
}

//中心扩展法 O(n^2) - O(1) 更易于理解的一种code
var longestPalindrome = function (s) {
	if (!s) return ''
	const len = s.length
	if (len < 2) return s

	let ret = ''

    //共2 * len - 1个中心(0,0)、(0,1)、(1,1)、(1,2)...
	for (let i = 0; i < len * 2 - 1; i++) {
        //left和right指针和中心点的关系
        //left有一个很明显的2倍关系的存在
        //right，可能和left指向同一个（偶数时），也可能往后移动一个（奇数）
		let left = Math.floor(i / 2)
		let right = left + (i % 2)
		while (left >= 0 && right < len && s[left] == s[right]) {
			let tmp = s.substring(left, right + 1)
			if (tmp.length > ret.length) ret = tmp
			left--
			right++
		}
	}
	return ret
}
```

### [8. 字符串转换整数(atoi)M](https://leetcode-cn.com/problems/string-to-integer-atoi/)

```javascript
var myAtoi = function (str) {
	let len = str.length,
		ret = 0,
		i = 0,
		flag = 1,
		max = Math.pow(2, 31) - 1,
		min = -Math.pow(2, 31)
    //handle blank space
	while (str[i] === ' ' && i < len) i++
    //hanle sign bit
	if (str[i] === '+' || str[i] === '-') {
		flag = str[i] === '+' ? 1 : -1
		i++
	}
    
	while (i < len && isDigit(str[i])) {
		let val = +str[i]
		ret = ret * 10 + val
		i++
	}
	//check range
	if (ret > max || ret < min) {
		return flag > 0 ? max : min
	}

	return ret * flag

	function isDigit(val) {
		return !Number.isNaN(Number.parseInt(val))
	}
}
```

### [125. 验证回文串](https://leetcode-cn.com/problems/valid-palindrome/)

```javascript
//O(∣s∣) - O(∣s∣)
//loop once, filter letter and digit, compare if target str === reverse target string


//O(∣s∣)，其中 |s| 是字符串s的长度 - O(1)
var isPalindrome = function(s) {
    if (typeof s !== 'string') return false

    s = s.replace(/[^A-Za-z0-9]/g, '').toLowerCase()
    
    let l = 0, r = s.length - 1
	//two pointer， 向中间夹逼
    while (l < r) {
      if (s[l] !== s[r]) return false
      l++
      r--
    }

    return true
}
```

### [151. 翻转字符串里的单词M](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

```javascript
//使用系统函数
var reverseWords = function (s) {
	return s.trim().replace(/ {2,}/g, ' ').split(' ').reverse().join(' ')
}

//使用deque_1
var reverseWords = function (s) {
	let left = 0
	let right = s.length - 1
	let queue = []
	let word = ''
	while (s.charAt(left) === ' ') left++
	while (s.charAt(right) === ' ') right--
	while (left <= right) {
		let char = s.charAt(left)
		if (char === ' ' && word) {
			queue.unshift(word)
			word = ''
		} else if (char !== ' ') {
			word += char
		}
		left++
	}
	queue.unshift(word)
	return queue.join(' ')
}

//使用deque_2
```

### [344. 反转字符串E](https://leetcode-cn.com/problems/reverse-string/)

```javascript
//two pointer
var reverseString = function (s) {
	helper(s, 0, s.length - 1)

	function helper(s, left, right) {
		if (left >= right) return
		;[s[left++], s[right--]] = [s[right], s[left]]
		helper(s, left, right)
	}
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

### [387. 字符串中的第一个唯一字符E](https://leetcode-cn.com/problems/first-unique-character-in-a-string/)

```javascript
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

### [394. 字符串解码M](https://leetcode-cn.com/problems/decode-string/)

```javascript
var decodeString = function (s) {
	let numStack = [],
		strStack = [],
		multiple = 0,
		ret = ''

	for (let c of s) {
		if (!isNaN(c)) {
			multiple = multiple * 10 + Number(c)
		} else if (c === '[') {
             //前面的字母和倍数都压入栈，并释放临时变量
			numStack.push(multiple)
			multiple = 0
			strStack.push(ret)
			ret = ''
		} else if (c === ']') {
            //合并两个栈顶
			ret = strStack.pop() + ret.repeat(numStack.pop())
		} else {
			ret += c
		}
	}
	return ret
}
```

### [415. 字符串相加](https://leetcode-cn.com/problems/add-strings/)

```javascript
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

### [459. 重复的子字符串](https://leetcode-cn.com/problems/repeated-substring-pattern/)

```javascript
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

### [438. 找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)

```javascript
var findAnagrams = function (s, p) {
	let sLen = s.length,
		pLen = p.length

	if (sLen === 0 || pLen === 0 || pLen > sLen) return []

	let left = 0,
		right = 0,
		match = 0,
		needs = {},
		windows = {},
		ret = []

	for (let c of p) {
		needs[c] ? needs[c]++ : (needs[c] = 1)
	}

	let needLen = Object.keys(needs).length
	while (right < sLen) {
		let rightChar = s[right]

		if (needs[rightChar]) {
			windows[rightChar] ? windows[rightChar]++ : (windows[rightChar] = 1)
			if (windows[rightChar] === needs[rightChar]) match++
		}
		right++

		while (right - left >= pLen) {
			if (match === needLen) {
				ret.push(left)
			}
			let leftChar = s[left]
			if (needs[leftChar]) {
				if (windows[leftChar] === needs[leftChar]) match--
				windows[leftChar]--
			}
			left++
		}
	}
	return ret
}
```

### [541. 反转字符串 II](https://leetcode-cn.com/problems/reverse-string-ii/)

```javascript
var reverseStr = function (s, k) {
	let arr = s.split('')
	for (let start = 0; start < arr.length; start += 2 * k) {
		let i = start,
			j = Math.min(start + k - 1, arr.length)
		while (i < j) {
			;[arr[i++], arr[j--]] = [arr[j], arr[i]]
		}
	}
	return arr.join('')
}
```

### [557. 反转字符串中的单词 III](https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/)

```javascript
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

### [567. 字符串的排列M](https://leetcode-cn.com/problems/permutation-in-string/)

```javascript
var checkInclusion = function (s1, s2) {
	let s1Len = s1.length,
		s2Len = s2.length
	if (s1Len === 0 || s1Len === 0 || s1Len > s2Len) return false

	let left = 0,
		right = 0,
		windows = {},
		needs = {},
		match = 0

	for (let c of s1) {
		needs[c] ? needs[c]++ : (needs[c] = 1)
	}
	let needsLen = Object.keys(needs).length
	while (right < s2Len) {
		let rightChar = s2[right]
		if (needs[rightChar]) {
			windows[rightChar] ? windows[rightChar]++ : (windows[rightChar] = 1)
			if (windows[rightChar] === needs[rightChar]) match++
		}
		right++
		while (match === needsLen) {
			if (right - left === s1Len) {
				return true
			}
			let leftChar = s2[left]
			if (needs[leftChar]) {
				if (windows[leftChar] === needs[leftChar]) match--
				windows[leftChar]--
			}
			left++
		}
	}
	return false
}
```

### [647. 回文子串](https://leetcode-cn.com/problems/palindromic-substrings/)

```javascript
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

