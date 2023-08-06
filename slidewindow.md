# 类型

## Concept

- 固定窗口大小
  - l 初始化为 0
  - 初始化 r,使得 r - l + 1 等于窗口大小
  - 同时移动 l 和 r
  - 判断窗口内的连续元素是否满足题目限定的条件
    - 若满足,再判断是否需要更新最优解,如果需要则更新最优解
    - 若不满足,则继续
- 窗口大小不固定,求解最大的满足条件的窗口
- 窗口大小不固定,求解最小的满足条件的窗口
  - l 和 r 都初始化为 0
  - r 指针移动一步
  - 判断窗口内的连续元素是否满足题目限定的条件
    - 3.1 若满足,再判断是否需要更新最优解,如果需要则更新最优解.并尝试通过移动 l 指针缩小窗口大小循环执行
    - 3.2 如果不满足,则继续

> 1、我们在字符串 S 中使用双指针中的左右指针技巧,初始化 left = right = 0,把索引左闭右开区间 [left, right) 称为一个「窗口」
>
> 2、我们先不断地增加 right 指针扩大窗口 [left, right),直到窗口中的字符串符合要求(包含了 t 中的所有字符)
>
> 3、此时,我们停止增加 right,转而不断增加 left 指针缩小窗口 [left, right),直到窗口中的字符串不再符合要求(不包含 t 中的所有字符了).同时,每次增加 left,我们都要更新一轮结果
>
> 4、重复第 2 和第 3 步,直到 right 到达字符串 S 的尽头
>
> 这个思路其实也不难,第 2 步相当于在寻找一个「可行解」,然后第 3 步在优化这个「可行解」,最终找到最优解,也就是最短的覆盖子串.左右指针轮流前进,窗口大小增增减减,窗口不断向右滑动,这就是「滑动窗口」这个名字的来历

## Questions

### [3.==无重复字符的最长子串==](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

```javascript {.line-numbers}
//window version   better
var lengthOfLongestSubstring = function (s) {
	const slideWindow = {},
		len = s.length
	let l = 0,
		r = 0,
		ret = 0
	while (r < len) {
		const rChar = s[r++]
		slideWindow[rChar] ? slideWindow[rChar]++ : (slideWindow[rChar] = 1)
		//缩小window左边界，l一直缩到window里当前rChar不重复的位置
		while (slideWindow[rChar] > 1) slideWindow[s[l++]]--
		ret = Math.max(ret, r - l)
	}
	return ret
}

var lengthOfLongestSubstring = function (s) {
	const len = s.length,
		map = new Map()
	let l = 0,
		r = 0,
		ret = 0
	while (r < len) {
		const rChar = s[r]
		//update left
		if (map.has(rChar)) l = Math.max(l, map.get(rChar) + 1)
		ret = Math.max(ret, r - l + 1)
		map.set(rChar, r++)
	}
	return ret
}
```

### [76.==最小覆盖子串==](https://leetcode-cn.com/problems/minimum-window-substring/)

```javascript {.line-numbers}
var minWindow = function (s, t) {
	let sLen = s.length,
		tLen = t.length
	if (sLen === 0 || tLen === 0 || sLen < tLen) return ''
	let slideWindow = {},
    need = {}, //t中需要哪些字母及个数
		valid = 0, //当t中某个字母找够了加1
		l = 0,
		r = 0,
    begin = 0,
		minLen = Infinity,
	for (let c of t) need[c] ? need[c]++ : (need[c] = 1)
	while (r < sLen) {
		const rChar = s[r++]
		if (need[rChar]) {
			slideWindow[rChar] ? slideWindow[rChar]++ : (slideWindow[rChar] = 1)
			if (slideWindow[rChar] === need[rChar]) valid++
		}
		//当前扫过的s字母已覆盖t中的所有字母,收缩左边界
		while (valid === Object.keys(need).length) {
			if (r - l < minLen) {
				minLen = r - l
				begin = l
			}
			const lChar = s[l++]
			if (need[lChar]) {
				if (slideWindow[lChar] === need[lChar]) valid--
				slideWindow[lChar]--
			}
		}
	}
	return minLen === Infinity ? '' : s.substring(begin, begin + minLen)
}
```

### [209.长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)

```javascript {.line-numbers}
// 1 brute force O(n^2) - O(1)
var minSubArrayLen = function (s, nums) {
	if (nums.length === 0) return 0
	let len = nums.length,
		ret = Infinity
	for (let i = 0; i < len; i++) {
		let sum = 0
		for (let j = i; j < len; j++) {
			sum += nums[j]
			if (sum >= s) {
				ret = Math.min(ret, j - i + 1)
				//找最短,找到即返回
				break
			}
		}
	}
	return ret === Infinity ? 0 : ret
}

// 2 前缀和 + 二分查找

// 3 双指针滑动窗口  O(n) - O(1)
var minSubArrayLen = function (s, nums) {
	const len = nums.length
	if (len === 0) return 0
	let ret = Infinity,
		l = 0, //滑动窗口起始位置
		r = 0, //滑动窗口结束位置
		sum = 0
	while (r < len) {
		sum += nums[r++]
		while (sum >= s) {
			ret = Math.min(ret, r - l)
			sum -= nums[l++]
		}
	}
	return ret === Infinity ? 0 : ret
}
```

### [239.==滑动窗口最大值==](https://leetcode-cn.com/problems/sliding-window-maximum/)

```javascript
//brute force O(nk) - O(k)
var maxSlidingWindow = function (nums, k) {
	const len = nums.length
	let slideWindow = [],
		ret = []
	//优化：能形成的最大窗口个数
	for (let i = 0; i < len - k + 1; i++) {
		for (let j = 0; j < k; j++) slideWindow.push(nums[i + j])
		ret.push(Math.max(...slideWindow))
		slideWindow.length = 0
	}
	return ret
}

//deque O(n) - O(n)，存下标，单调递减，第一个元素是第一大的index,依此类推
//头尾尾头
var maxSlidingWindow = function (nums, k) {
	let deque = [],
		ret = []
	for (let i = 0, len = nums.length; i < len; i++) {
		//队列满了移出去一个
		//L,R 来标记窗口的左边界和右边界,当窗口大小形成时,L 和 R 一起向右移,每次移动时,判断队首的值的数组下标是否在 [L,R] 中,如果不在则需要弹出队首的值
		if (deque.length && deque[0] < i - k + 1) deque.shift()
		//维护递减队列
		while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop()
		deque.push(i)
		//开始检查结果
		if (i >= k - 1) ret.push(nums[deque[0]])
	}
	return ret
}
```

### [438.==找到字符串中所有字母异位词==](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)

```javascript {.line-numbers}
var findAnagrams = function (s, p) {
	let sLen = s.length,
		pLen = p.length
	if (sLen === 0 || pLen === 0 || pLen > sLen) return []
	let l = 0,
		r = 0,
    need = {}, //p中需要哪些字母及个数
		valid = 0, //当p中某个字母找够了加1
		slideWindow = {},
		ret = []
	for (let c of p) need[c] ? need[c]++ : (need[c] = 1)
	while (r < sLen) {
		const rChar = s[r++]
		if (need[rChar]) {
			slideWindow[rChar] ? slideWindow[rChar]++ : (slideWindow[rChar] = 1)
			if (slideWindow[rChar] === need[rChar]) valid++
		}
    //收集结果, 这样写会不停update left
		while (r - l >= pLen) {
			if (valid === Object.keys(need).length) ret.push(l)
			const lChar = s[l++]
			if (need[lChar]) {
				if (slideWindow[lChar] === need[lChar]) valid--
				slideWindow[lChar]--
			}
		}
	}
	return ret
}
```

### [567.字符串的排列 M](https://leetcode-cn.com/problems/permutation-in-string/)

```javascript {.line-numbers}
var checkInclusion = function (s, t) {
	let sLen = s.length,
		tLen = t.length
	if (sLen === 0 || sLen > tLen) return false
	let slideWindow = {},
		need = {},
		l = 0,
		r = 0,
		//表示窗口中满足 need 条件的字符个数,如果 valid 和 need.size 的大小相同,则说明窗口已满足条件,已经完全覆盖了串t
		valid = 0
	for (let c of s) need[c] ? need[c]++ : (need[c] = 1)
	while (r < tLen) {
		const rChar = t[r++]
		//过滤需要的字符
		if (need[rChar]) {
			slideWindow[rChar] ? slideWindow[rChar]++ : (slideWindow[rChar] = 1)
			if (slideWindow[rChar] === need[rChar]) valid++
		}
		//长度够则判断
		if (r - l >= sLen) {
			if (valid === Object.keys(need).length) return true
			//更新左边界
			const lChar = t[l++]
			//过滤需要的字符
			if (need[lChar]) {
				if (slideWindow[lChar] === need[lChar]) valid--
				slideWindow[lChar]--
			}
		}
	}
	return false
}
```
