var rotate = function (nums, k) {
	const len = nums.length
	for (let i = 0; i < k % len; i++) {
		let previous = nums[len - 1]
		for (let j = 0; j < len; j++) {
			;[nums[j], previous] = [previous, nums[j]]
		}
	}
}
