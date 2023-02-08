### [674.==最长连续递增序列==](https://leetcode.cn/problems/longest-continuous-increasing-subsequence)

```javascript
var findLengthOfLCIS = function (nums) {
	let ret = 0,
		start = 0
	for (let i = 0, len = nums.length; i < len; i++) {
		if (i > 0 && nums[i] <= nums[i - 1]) start = i
		ret = Math.max(ret, i - start + 1)
	}
	return ret
}

//DP
var findLengthOfLCIS = function (nums) {
	const len = nums.length
	let dp = new Array(len).fill(1),
		ret = 0
	for (let i = 0; i < len; i++) {
    //nums[0] > undefined不成立故不影响最终结果
		if (nums[i] > nums[i - 1]) dp[i] = dp[i - 1] + 1
		ret = Math.max(ret, dp[i])
	}
	return ret
}
```
