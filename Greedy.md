### [45.==跳跃游戏 II M==](https://leetcode-cn.com/problems/jump-game-ii/)

```javascript
//basic
var jump = function (nums) {
	const len = nums.length
	let steps = 0,
		start = 0,
		end = 1
	while (end < len) {
		let maxPosion = 0
		for (let i = start; i < end; i++) maxPosion = Math.max(maxPosion, i + nums[i])
		start = end // 下一次起跳点开始格子
		end = maxPosion + 1 //此步避免多跳一次
		steps++
	}
	return steps
}

//optimize
var jump = function (nums) {
	let steps = 0,
		end = 0,
		maxPosition = 0
	//若访问最后一个元素，在边界正好为最后一个位置的情况下，会多一次「不必要的跳跃次数」
	for (let i = 0, len = nums.length; i < len - 1; i++) {
		//更新当前位置能跳到的最远位置
		maxPosition = Math.max(maxPosition, nums[i] + i)
		//跳到"上一次"能跳到的最远位置更新边界
		if (i === end) {
			end = maxPosition
			steps++
		}
	}
	return steps
}
```

### [55.==跳跃游戏 M==](https://leetcode-cn.com/problems/jump-game/)

```javascript
var canJump = function (nums) {
	//能够跳到的最远位置
	let maxPosition = 0
	for (let i = 0; i < nums.length; i++) {
		//若当前位置都跳不到,后面就更跳不到了
		if (i > maxPosition) return false
		//更新max为当前能走到的最远位置
		maxPosition = Math.max(maxPosition, i + nums[i])
	}
	//当前位置跳跃距离是否能跳到数组末尾或超过数组长度
	//return maxPosition >= len - 1
	return true
}

//more rigorous
var canJump = function (nums) {
	const len = nums.length
	let maxPosition = 0
	for (let i = 0; i < len; i++) {
		if (i > maxPosition) return false
		else {
			maxPosition = Math.max(maxPosition, nums[i] + i)
			if (maxPosition >= len - 1) return true
		}
	}
	return true
}
```

### [674.==最长连续递增序列==](https://leetcode.cn/problems/longest-continuous-increasing-subsequence)

```javascript
var findLengthOfLCIS = function (nums) {
	let maxLen = 1,
		start = 0
	for (let i = 0, len = nums.length; i < len; i++) {
		if (i > 0 && nums[i] <= nums[i - 1]) start = i
		maxLen = Math.max(maxLen, i - start + 1)
	}
	return maxLen
}

//DP
var findLengthOfLCIS = function (nums) {
	const len = nums.length
	let dp = new Array(len).fill(1),
		ret = 0
	for (let i = 0; i < len; i++) {
    //nums[0] > undefined不成立故不影响最终结果
		if (i > 0 && nums[i] > nums[i - 1]) dp[i] = dp[i - 1] + 1
		ret = Math.max(ret, dp[i])
	}
	return ret
}
```

### [763.==划分字母区间==](https://leetcode.cn/problems/partition-labels/)

```javascript
var partitionLabels = function (s) {
	const len = s.length
	const codePointA = 'a'.codePointAt(0)
  //存储每个字母最后出现的下标
	let last = new Array(26)
	for (let i = 0; i < len; i++) last[s.codePointAt(i) - codePointA] = i
	let ret = [],
		start = 0,
		end = 0
	for (let i = 0; i < len; i++) {
    //对于每个访问到的字母c，得到当前字母的最后一次出现的下标位置endc,则当前片段的结束下标一定不会小于endc,因此令end = max⁡(end,endc)
		end = Math.max(end, last[s.codePointAt(i) - codePointA])
    //当访问到下标end时，当前片段访问结束
		if (i === end) {
			ret.push(end - start + 1)
			start = end + 1
		}
	}
	return ret
}
```

