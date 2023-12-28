### [49.==字母异位词分组 M==](https://leetcode-cn.com/problems/group-anagrams/)

```javascript
//obj version
var groupAnagrams = function (strs) {
	let hash = {}
	for (let str of strs) {
		//sort后相同的字母组成的不同的字符串排序相同
		const key = [...str].sort().toString()
		hash[key] ? hash[key].push(str) : (hash[key] = [str])
	}
	return Object.values(hash)
}

//使用计数器做key，可去掉sort的时间复杂度 O(NK) - O(NK)
//best version
var groupAnagrams = function (strs) {
	let hash = {},
		key = new Array(26)
  const baseCode = 'a'.charCodeAt(0)
	for (let str of strs) {
		key.fill(0)
		for (let i = 0, len = str.length; i < len; i++)
			key[str.charCodeAt(i) - baseCode]++
    //key数组调用toString转换成obj的字符串键
		hash[key] ? hash[key].push(str) : (hash[key] = [str])
	}
	return Object.values(hash)
}
```

### [128.==最长连续序列==](https://leetcode-cn.com/problems/longest-consecutive-sequence/)

```javascript
//hash
var longestConsecutive = function (nums) {
	let set = new Set(nums)
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

### [205.同构字符串](https://leetcode.cn/problems/isomorphic-strings/)

```javascript {.line-numbers}
var isIsomorphic = function (s, t) {
	let s2t = {}
	let t2s = {}
	const len = s.length
	for (let i = 0; i < len; i++) {
		const x = s[i], y = t[i]
		if ((s2t[x] && s2t[x] !== y) || (t2s[y] && t2s[y] !== x)) return false
		s2t[x] = y
		t2s[y] = x
	}
	return true
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
	let hash = {}
	for (let c of s) hash[c] ? hash[c]++ : (hash[c] = 1)
	for (let c of t) {
		if (hash[c]) {
			hash[c]--
			//meet return immediately
      //include hash[c] <= 0
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
		len = s.length,
		baseCode = 'a'.charCodeAt(0)
	//记录每个字母的个数
	for (let i = 0; i < len; i++) arr[s.charCodeAt(i) - baseCode]++
	for (let i = 0; i < len; i++)
		if (--arr[t.charCodeAt(i) - baseCode] < 0) return false
	return true
}
```

### [290.单词规律](https://leetcode.cn/problems/word-pattern/)

```javascript {.line-numbers}
var wordPattern = function (pattern, s) {
  //不能用obj,会关联到原型链属性
	let w2c = new Map()
	let c2w = new Map()
	let words = s.split(' ')
	if (pattern.length !== words.length) return false
	for (let [i, word] of words.entries()) {
		const c = pattern[i]
		if ((w2c.has(word) && w2c.get(word) !== c) || (c2w.has(c) && c2w.get(c) !== word))
			return false
		w2c.set(word, c)
		c2w.set(c, word)
	}
	return true
}
```

### [383.赎金信](https://leetcode.cn/problems/ransom-note/)

```javascript {.line-numbers}
var canConstruct = function(ransomNote, magazine) {
  const rLen = ransomNote.length
  const mLen = magazine.length
  if (rLen > mLen) return false
  let hash = {}
  for (let c of magazine) hash[c] ? hash[c]++ : hash[c] = 1
  for (let c of ransomNote) {
    if (!hash[c]) {
      return false
    } else {
      if (--hash[c] < 0) return false
    }
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
