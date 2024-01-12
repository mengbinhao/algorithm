### [151. ==反转字符串里的单词 M==](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

```javascript {.line-numbers}
// 1 字符串按空格切割，再反转每个单词的字母（数组/栈/双端队列），拼接成新字符串，处理多余空格（多处时机可处理）
var reverseWords = function (s) {
	if (!s || !s.trim().length) return ''
	return s.trim().split(/ +/).reverse().join(' ')
}
// 2 反转整个字符串，再反转每个单词的字母，处理多余空格（多处时机可处理）
var reverseWords = function (s) {
	if (!s || !s.trim().length) return ''
	const arr = s.split(' ')
  let ret = ''
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i]) ret += ' ' + arr[i]
  }
  return ret.substring(1)
}

//使用系统函数
var reverseWords = function (s) {
	return s.trim().replace(/ {2,}/g, ' ').split(' ').reverse().join(' ')
}

//two pointer
var reverseWords = function (s) {
	if (!s || !s.trim().length) return ''
	const len = s.length
	const arr = new Array(len)
	let l = (r = -1),
		idx = 0
	for (let i = len - 1; i >= 0; i--) {
		if (s[i] !== ' ') {
			//未使用或被还原
			if (r === -1) r = i
			if (i === 0) l = i
		} else {
			if (r !== -1) l = i + 1
		}
		if (l >= 0 && r >= 0) {
			if (idx > 0) arr[idx++] = ' '
			while (l <= r) {
				arr[idx++] = s[l]
				l++
			}
			l = r = -1
		}
	}
	return arr.join('')
}

//two pointer better
var reverseWords = function (s) {
	s = s.trim() // 删除首尾空格
	let r = s.length - 1,
		l = r
	let res = ''
	while (l >= 0) {
		while (l >= 0 && s[l] !== ' ') l-- // 搜索首个空格
		res += s.substring(l + 1, r + 1) + ' ' // 添加单词
		while (l >= 0 && s[l] === ' ') l-- // 跳过单词间空格
		r = l // j 指向下个单词的尾字符
	}
	return res.substring(0, res.length - 1)
}

//use queue
var reverseWords = function (s) {
	let l = 0,
		r = s.length - 1,
		word = ''
	queue = []
	while (s[l] === ' ') l++
	while (s[r] === ' ') r--
	//check if s still has letters
	while (l <= r) {
		let c = s[l]
		if (c !== ' ') {
			word += c
			//排除单词间有多个空格的情况,如example    good a
		} else {
      if (word) {
        queue.unshift(word)
				word = ''
      }	
		}
		l++
	}
	//add last word
	if (word) queue.unshift(word)
	return queue.join(' ')
}
```

### [933. 最近的请求次数](https://leetcode.cn/problems/number-of-recent-calls/)

```javascript {.line-numbers}
//use arrya
var RecentCounter = function () {
	//存放所有的请求
	this.array = new Array(10000).fill(0)
}

RecentCounter.prototype.ping = function (t) {
	//最近一次请求的索引
	let end = 0
	for (let i = 0; i < 10000; i++) {
		if (this.array[i] === 0) {
			this.array[i] = t
			end = i
			break
		}
	}
	let cnt = 0
	//统计3000ms之前的请求次数
	while (this.array[end] >= t - 3000) {
		cnt++
		if (--end < 0) break
	}
	return cnt
}

//two pointer
var RecentCounter = function () {
	//最大合法请求3001
	this.len = 3002
	this.array = new Array(this.len)
	//起止索引
	this.l = 0
	this.r = 0
}

RecentCounter.prototype.ping = function (t) {
	this.array[this.r++] = t
	this.r = this.r === this.len ? 0 : this.r
	while (this.array[this.l] < t - 3000) {
		this.l++
		this.l = this.l === this.len ? 0 : this.l
	}
	//请求次数超过数组容量
	if (this.l > this.r) return this.len - (this.l - this.r)
	return this.r - this.l
}

//use queue
var RecentCounter = function () {
	this.queue = []
}

RecentCounter.prototype.ping = function (t) {
	this.queue.push(t)
	while (this.queue[0] < t - 3000) this.queue.shift()
	return this.queue.length
}

```

