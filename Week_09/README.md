学习笔记(需要好好补习 DP)

##### [14.最长公共前缀 E](https://leetcode-cn.com/problems/longest-common-prefix/)

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

##### [917.仅仅反转字母 E](https://leetcode-cn.com/problems/reverse-only-letters/)

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
