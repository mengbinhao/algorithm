var maxProduct = function (nums) {
	let len = nums.length
	if (len === 0) return 0

	let dp = Array.from({ length: len }, () => new Array(2))

	dp[0][0] = nums[0]
	dp[0][1] = nums[0]

	for (let i = 1; i < len; i++) {
		if (nums[i] >= 0) {
			dp[i][0] = Math.max(nums[i], dp[i - 1][0] * nums[i])
			dp[i][1] = Math.min(nums[i], dp[i - 1][1] * nums[i])
		} else {
			dp[i][0] = Math.max(nums[i], dp[i - 1][1] * nums[i])
			dp[i][1] = Math.min(nums[i], dp[i - 1][0] * nums[i])
		}
	}

	let ret = dp[0][0]

	for (let i = 1; i < len; i++) {
		ret = Math.max(ret, dp[i][0])
	}

	return ret
}
