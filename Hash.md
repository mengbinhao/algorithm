### [49.==字母异位词分组 M==](https://leetcode-cn.com/problems/group-anagrams/)

```javascript
//obj version
var groupAnagrams = function (strs) {
	const hash = {}
	for (let str of strs) {
		//sort后相同的字母组成的不同的字符串肯定是相同的
		const key = [...str].sort().toString()
		hash[key] ? hash[key].push(str) : (hash[key] = [str])
	}
	return Object.values(hash)
}

//使用计数器做key，可以去掉sort的时间复杂度 O(NK) - O(NK)
//best version
var groupAnagrams = function (strs) {
	const hash = {},
		key = new Array(26)
	for (let str of strs) {
		key.fill(0)
		for (let i = 0, len = str.length; i < len; i++) {
			key[str.charCodeAt(i) - 'a'.charCodeAt(0)]++
		}
		hash[key] ? hash[key].push(str) : (hash[key] = [str])
	}
	return Object.values(hash)
}
```

### [128.最长连续序列](https://leetcode-cn.com/problems/longest-consecutive-sequence/)

```javascript
var longestConsecutive = function (nums) {
	const set = new Set(nums)
	let ret = 0
	for (let num of nums) {
		//当不存在num - 1时才从num开始枚举以跳过重复枚举的情况
		if (!set.has(num - 1)) {
			let cur = num,
				curMaxLen = 1
			while (set.has(cur + 1)) {
				cur++
				curMaxLen++
			}
			ret = Math.max(ret, curMaxLen)
		}
	}
	return ret
}
```

### [242.==有效的字母异位词 E==](https://leetcode-cn.com/problems/valid-anagram/)

```javascript
//使用系统内置函数sort O(NlogN) n为字符串长度 - O(1)
var isAnagram = function (s, t) {
	return (
		s.length === t.length && [...s].sort().join('') === [...t].sort().join('')
	)
}

//hash optimal
//good version
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
	const arr = Array.from({ length: 26 }, () => 0),
		len = s.length
	const base = 'a'.charCodeAt(0)
	for (let i = 0; i < len; i++) arr[s.charCodeAt(i) - base]++
	for (let i = 0; i < len; i++) {
		if (--arr[t.charCodeAt(i) - base] < 0) return false
	}
	return true
}
```

### [771.宝石与石头](https://leetcode-cn.com/problems/jewels-and-stones/)

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
	for (let j of J) set.add(j)
	for (let s of S) {
		if (set.has(s)) ret++
	}
	return ret
}
```
