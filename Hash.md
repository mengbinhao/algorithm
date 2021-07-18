### ==[49.字母异位词分组 M](https://leetcode-cn.com/problems/group-anagrams/)==

```javascript
//sort数组放到hash里面，根据不同的key，放对应的异位词 O(NKlogK) - O(NK)
var groupAnagrams = function (strs) {
	if (strs.length === 0) return [[]]
	const hash = new Map()
	for (let str of strs) {
		const arr = Array.from(str)
		arr.sort()
		const key = arr.toString()
		const list = hash.get(key) ? hash.get(key) : new Array()
		list.push(str)
		hash.set(key, list)
	}
	return Array.from(hash.values())
}

//使用计数器做key，可以去掉sort的时间复杂度 O(NK) - O(NK)
var groupAnagrams = function (strs) {
	if (strs == null) return [[]]
	const hash = {},
		count = new Array(26)
	for (let str of strs) {
		count.fill(0)
		for (let c of str) {
			count[c.charCodeAt() - 'a'.charCodeAt()]++
		}
		hash[count] ? hash[count].push(str) : (hash[count] = [str])
	}
	return Object.values(hash)
}
```

### ==[242.有效的字母异位词 E](https://leetcode-cn.com/problems/valid-anagram/)==

```javascript
//使用系统内置函数sort O(NlogN) n为字符串长度 - O(1)
var isAnagram = function (s, t) {
	return (
		s.length === t.length && [...s].sort().join('') === [...t].sort().join('')
	)
}

//hash 统计每个字符出现的频次,枚s增加，枚t减小，最后检查全部hash值是否为0
//O(n) - O(1)
var isAnagram = function (s, t) {
	if (s.length !== t.length) return false
	const hash = {}
	for (let c of s) {
		hash[c] ? hash[c]++ : (hash[c] = 1)
	}
	for (let c of t) {
		hash[c] ? hash[c]-- : (hash[c] = -1)
	}
	return Object.values(hash).every((val) => val === 0)
}

//hash optimal
var isAnagram = function (s, t) {
	if (s.length !== t.length) return false

	const hash = {}
	for (let c of s) {
		hash[c] ? hash[c]++ : (hash[c] = 1)
	}

	for (let c of t) {
		if (hash[c]) {
			hash[c]--
			//meet return immediately
		} else {
			return false
		}
	}
	return true
}

//use array store each letter
var isAnagram = function (s, t) {
	if (s.length !== t.length) return false

	const letterArr = Array.from({ length: 26 }, () => 0),
		len = s.length

	for (let i = 0; i < len; i++) {
		letterArr[s.codePointAt(i) - 'a'.codePointAt(0)]++
	}

	for (let i = 0; i < len; i++) {
		if (--letterArr[t.codePointAt(i) - 'a'.codePointAt(0)] < 0) return false
	}
	return true
}
```

### ==[771.宝石与石头](https://leetcode-cn.com/problems/jewels-and-stones/)==

```javascript
//brute force
var numJewelsInStones = function (J, S) {
	let ret = 0
	for (let s of S) {
		for (let j of J) {
			if (s === j) {
				ret++
				break
			}
		}
	}
	return ret
}

var numJewelsInStones = function (J, S) {
	let ret = 0,
		set = new Set()
	for (let j of J) {
		set.add(j)
	}

	for (let s of S) {
		if (set.has(s)) ret++
	}
	return ret
}
```
