# 类型

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
    - 若满足,再判断是否需要更新最优解,如果需要则更新最优解.并尝试通过移动 l 指针缩小 窗口大小循环执行 3.1
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

### ==[3.无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)==

```javascript {.line-numbers}
//more simple version
var lengthOfLongestSubstring = function (s) {
	let ret = 0,
		left = 0
	const map = new Map()

	for (let right = 0, len = s.length; right < len; right++) {
		const char = s[right]
		//更新滑动窗口的left
		if (map.has(char)) left = Math.max(left, map.get(char) + 1)
		ret = Math.max(ret, right - left + 1)
		//字符位置
		map.set(char, right)
	}
	return ret
}

var lengthOfLongestSubstring = function (s) {
	const window = {},
		len = s.length
	let left = 0,
		right = 0,
		ret = 0
	while (right < len) {
		const rightChar = s[right]
		right++
		window[rightChar] ? window[rightChar]++ : (window[rightChar] = 1)

		//左边界一直缩到rightChar不重复
		while (window[rightChar] > 1) {
			left++
			window[s[left]]--
		}
		ret = Math.max(ret, right - left)
	}
	return ret
}
```

### ==[76.最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/)==

```javascript {.line-numbers}
//labuladuo version
var minWindow = function (s, t) {
	let sLen = s.length,
		tLen = t.length

	if (sLen === 0 || tLen === 0 || sLen < tLen) return ''

	let window = {},
		need = {},
		begin = 0,
		left = 0,
		right = 0,
		minLen = Infinity,
		//表示窗口中满足 need 条件的字符个数,如果 valid 和 need.size 的大小相同,则说明窗口已满足条件,已经完全覆盖了串t
		valid = 0

	for (let c of t) {
		need[c] ? need[c]++ : (need[c] = 1)
	}

	while (right < sLen) {
		//移入字符
		let rightChar = s[right]
		//右移
		right++

		//进行窗口内数据一系列更新
		if (need[rightChar]) {
			!window[rightChar] ? (window[rightChar] = 1) : window[rightChar]++
			if (window[rightChar] === need[rightChar]) valid++
		}

		//t中的所有字符是否已经覆盖,则判断是否要收缩
		while (valid === Object.keys(need).length) {
			//更新最小覆盖子串
			if (right - left < minLen) {
				begin = left
				minLen = right - left
			}
			//移出字符
			let leftChar = s[left]
			//左移
			left++

			//进行窗口内数据一系列更新
			if (need[leftChar]) {
				if (window[leftChar] === need[leftChar]) valid--
				window[leftChar]--
			}
		}
	}
	return minLen === Infinity ? '' : s.substring(begin, begin + minLen)
}
```

### ==[209.长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)==

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
				break
			}
		}
	}

	return ret === Infinity ? 0 : ret
}

// 2 前缀和 + 二分查找
// 3 双指针 O(n) - O(1)
var minSubArrayLen = function (s, nums) {
	const len = nums.length
	if (len === 0) return 0

	let ret = Number.MAX_SAFE_INTEGER,
		left = 0,
		right = 0,
		sum = 0
	while (right < len) {
		sum += nums[right]
		while (sum >= s) {
			ret = Math.min(ret, right - left + 1)
			sum -= nums[left]
			left++
		}
		right++
	}
	return ret === Number.MAX_SAFE_INTEGER ? 0 : ret
}
```

### ==[239.滑动窗口最大值 H ](https://leetcode-cn.com/problems/sliding-window-maximum/)==

- brute force O(n \* k) - O(n - k +1)

  ```javascript {.line-numbers}
  var maxSlidingWindow = function (nums, k) {
  	let slideWindow = []
  	const ret = [],
  		len = nums.length
  	//能形成的最大窗口个数
  	for (let i = 0; i < len - k + 1; i++) {
  		for (let j = 0; j < k; j++) {
  			slideWindow.push(nums[i + j])
  		}
  		ret.push(Math.max(...slideWindow))
  		//需要清
  		slideWindow = []
  	}
  	return ret
  }
  ```

- deque O(n) - O(n)

  ```javascript {.line-numbers}
  var maxSlidingWindow = function (nums, k) {
  	//放的下标,递减队列,第一个第一大的index,依此类推
  	const deque = [],
  		ret = []
  	//头尾尾头
  	for (let i = 0, len = nums.length; i < len; i++) {
  		//队列满了移出去一个
  		//L,R 来标记窗口的左边界和右边界,当窗口大小形成时,L 和 R 一起向右移,每次移动时,判断队首的值的数组下标是否在 [L,R] 中,如果不在则需要弹出队首的值
  		if (deque.length && deque[0] < i - k + 1) deque.shift()

  		//维护递减队列
  		while (deque.length && nums[deque[deque.length - 1]] < nums[i])
  			deque.pop()

  		deque.push(i)

  		//开始检查结果
  		if (i >= k - 1) ret.push(nums[deque[0]])
  	}
  	return ret
  }
  ```

- stack

  ```javascript {.line-numbers}
  var maxSlidingWindow = function (nums, k) {
  	let l = 0,
  		r = -1
  	//单调递减
  	const stack = [],
  		ans = []

  	for (let i = 0, len = nums.length; i < len; i++) {
  		if (i - k + 1 > stack[l]) l++
  		//缩小右边界直到满足条件
  		while (l <= r && nums[stack[r]] < nums[i]) r--
  		stack[++r] = i
  		//满足条件才放答案
  		if (i >= k - 1) ans.push(nums[stack[l]])
  	}
  	return ans
  }
  ```

### ==[438.找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)==

```javascript {.line-numbers}
var findAnagrams = function (s, p) {
	let sLen = s.length,
		pLen = p.length

	if (sLen === 0 || pLen === 0 || pLen > sLen) return []

	let left = 0,
		right = 0,
		valid = 0,
		need = {},
		windows = {},
		ret = []

	for (let c of p) {
		need[c] ? need[c]++ : (need[c] = 1)
	}

	while (right < sLen) {
		let rightChar = s[right]

		if (need[rightChar]) {
			windows[rightChar] ? windows[rightChar]++ : (windows[rightChar] = 1)
			if (windows[rightChar] === need[rightChar]) valid++
		}
		right++

		while (right - left >= pLen) {
			if (valid === Object.keys(need).length) {
				ret.push(left)
			}
			let leftChar = s[left]
			left++
			if (need[leftChar]) {
				if (windows[leftChar] === need[leftChar]) valid--
				windows[leftChar]--
			}
		}
	}
	return ret
}
```

### ==[567.字符串的排列 M](https://leetcode-cn.com/problems/permutation-in-string/)==

```javascript {.line-numbers}
//labuladong version
var checkInclusion = function (s, t) {
	let sLen = s.length,
		tLen = t.length

	if (sLen === 0 || sLen > tLen) return false

	let window = {},
		need = {},
		left = 0,
		right = 0,
		//表示窗口中满足 need 条件的字符个数,如果 valid 和 need.size 的大小相同,则说明窗口已满足条件,已经完全覆盖了串t
		valid = 0

	for (let c of s) {
		need[c] ? need[c]++ : (need[c] = 1)
	}

	while (right < tLen) {
		//移入字符
		let rightChar = t[right]
		//右移
		right++

		//进行窗口内数据一系列更新
		if (need[rightChar]) {
			!window[rightChar] ? (window[rightChar] = 1) : window[rightChar]++
			if (window[rightChar] === need[rightChar]) valid++
		}

		//t中的所有字符是否已经覆盖,则判断是否要收缩
		while (right - left >= sLen) {
			//更新最小覆盖子串
			if (valid === Object.keys(need).length) {
				return true
			}
			//移出字符
			let leftChar = t[left]
			//左移
			left++

			//进行窗口内数据一系列更新
			if (need[leftChar]) {
				if (window[leftChar] === need[leftChar]) valid--
				window[leftChar]--
			}
		}
	}
	return false
}
```
