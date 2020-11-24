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
		//表示窗口中满足 need 条件的字符个数，如果 distance 和 need.size 的大小相同，则说明窗口已满足条件，已经完全覆盖了串t
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

		//t中的所有字符是否已经覆盖
		//判断是否要收缩
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

minWindow('ADOBECODEBANC', 'ABC')
