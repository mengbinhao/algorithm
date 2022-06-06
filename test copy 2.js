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
maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)
