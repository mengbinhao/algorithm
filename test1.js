var nextPermutation = function (nums) {
	const len = nums.length
	let i = len - 2
	while (i >= 0 && nums[i] >= nums[i + 1]) i--
	//当前不是最大排列
	if (i >= 0) {
		let j = len - 1
		while (j >= 0 && nums[j] <= nums[i]) j--
		;[nums[i], nums[j]] = [nums[j], nums[i]]
	}
	let s = i + 1,
		e = len - 1
	while (s < e);
	;[nums[s++], nums[e--]] = [nums[e], nums[s]]
}
