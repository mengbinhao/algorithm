学习笔记(需要好好补习DP)

##### [14.最长公共前缀E](https://leetcode-cn.com/problems/longest-common-prefix/)

```javascript
//取第一个单词一个一个字符比
var longestCommonPrefix = function (strs) {
	if (!strs || !Array.isArray(strs) || !strs.length) return ''
	const first = strs[0],
		firstLen = first.length
	for (let i = 0; i < firstLen; i++) {
		for (let j = 1; j < strs.length; j++) {
			let str = strs[j]
			//i === str.length剪枝
			if (str[i] !== first[i] || i === str.length) {
				return first.substring(0, i)
			}
		}
	}
	return first
}


//二分
var longestCommonPrefix = function (strs) {
	if (!strs || !Array.isArray(strs) || !strs.length) return ''

	let minLength = Number.MAX_SAFE_INTEGER

    //取最短的字符串
	for (let str of strs) {
		minLength = Math.min(minLength, str.length)
	}

	let isCommonPrefix = (strs, len) => {
		let str0 = strs[0].substring(0, len)
		for (let i = 1; i < strs.length; i++) {
			let str = strs[i]
			for (let j = 0; j < len; j++) {
				if (str0.charAt(j) !== str.charAt(j)) {
					return false
				}
			}
		}
		return true
	}

	let left = 0,
		right = minLength,
		mid

    //二分比较
	while (left < right) {
		mid = Number.parseInt(left + (right - left) / 2)
		if (isCommonPrefix(strs, mid)) {
			left = mid
		} else {
			right = mid - 1
		}
	}
	//截取0到left
	return strs[0].substring(0, left)
}
```

##### 344[反转字符串E](https://leetcode-cn.com/problems/reverse-string/)

```javascript
//two pointer
var reverseString = function (s) {
	for (let i = 0, j = s.length - 1; i < j; i++, j--) {
		;[s[i], s[j]] = [s[j], s[i]]
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

##### [541反转字符串2E](https://leetcode-cn.com/problems/reverse-string-ii/)

```javascript
var reverseStr = function (s, k) {
	let arr = s.split('')
	for (let start = 0; start < arr.length; start += 2 * k) {
		let i = start,
			j = Math.min(start + k - 1, arr.length - 1)
		while (i < j) {
			;[arr[i++], arr[j--]] = [arr[j], arr[i]]
		}
	}
	return arr.join('')
}
```

##### [557反转字符串中的单词3E](https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/)

```javascript
//使用系统函数
var reverseWords = function (s) {
	let strs = s.split(' '),
		ret = ''
	for (let str of strs) {
		ret += str.split('').reverse().join('') + ' '
	}
	return ret.substring(0, ret.length - 1)
}

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
```


##### [151翻转字符串里的单词M](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

```javascript
//使用系统函数
var reverseWords = function (s) {
	return s.trim().replace(/ {2,}/g, ' ').split(' ').reverse().join(' ')
}

//使用queue
var reverseWords = function (s) {
	let left = 0
	let right = s.length - 1
	let queue = []
	let word = ''
    //去首空格
	while (s.charAt(left) === ' ') left++
    //去首空格
	while (s.charAt(right) === ' ') right--
	while (left <= right) {
		let char = s.charAt(left)
        //忽略中间空格，有值则加
		if (char === ' ' && word) {
			queue.unshift(word)
			word = ''
		} else if (char !== ' ') {
			word += char
		}
		left++
	}
    //加入最后一个单词
	queue.unshift(word)
	return queue.join(' ')
}
```

##### [917仅仅反转字母E](https://leetcode-cn.com/problems/reverse-only-letters/)

```javascript
//use stack
var reverseOnlyLetters = function (S) {
	let stack = []

	for (let c of S) {
		if (/[a-zA-Z]/.test(c)) {
			stack.push(c)
		}
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

//反向指针
var reverseOnlyLetters = function (S) {
	function isLetter(letter) {
		return /[a-zA-Z]/.test(letter)
	}
	let ret = '',
		end = S.length - 1

	for (let i = 0; i < S.length; i++) {
		if (isLetter(S[i])) {
			while (!isLetter(S[end])) end--
			ret += S[end--]
		} else {
			ret += S[i]
		}
	}
	return ret
}
```

##### [680验证回文字符串2E](https://leetcode-cn.com/problems/valid-palindrome-ii/)

```javascript
var validPalindrome = function (s) {
	function isPalindrome(str, l, r) {
		while (l < r) {
			if (str[l] !== str[r]) {
				return false
			}
			l++
			r--
		}
		return true
	}
	let l = 0,
		r = s.length - 1

	while (l < r) {
		if (s[l] !== s[r]) {
			return isPalindrome(s, l + 1, r) || isPalindrome(s, l, r - 1)
		}
		l++
		r--
	}
	return true
}
```

##### [5最长回文子串M](https://leetcode-cn.com/problems/longest-palindromic-substring/)

```javascript
//brute force
var longestPalindrome = function (s) {
	function isValidPalindrome(str, l, r) {
		while (l < r) {
			if (str[l] !== str[r]) {
				return false
			}
			l++
			r--
		}
		return true
	}

	let len = s.length,
        
		length
	if (len < 2) return s

	let maxLen = 1,
		begin = 0

	for (let i = 0; i < len - 1; i++) {
		for (let j = i + 1; j < len; j++) {
			if (j - i + 1 > maxLen && isValidPalindrome(s, i, j)) {
				maxLen = j - i + 1
				begin = i
			}
		}
	}

	return s.substring(begin, begin + maxLen)
}
```

