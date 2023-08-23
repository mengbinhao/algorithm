var search = function (nums, target) {
	const len = nums.length
	if (len === 0) return -1
	if (len === 1) return nums[0] === target ? 0 : -1
	let l = 0,
		r = len - 1
	while (l <= r) {
		const mid = Math.floor((l + r) / 2)
		if (nums[mid] === target) return mid
		//看左边
		//in case mid === l 即下标相等
		if (nums[0] <= nums[mid]) {
			//[l, mid - 1]有序
			if (nums[0] <= target && target < nums[mid]) {
				r = mid - 1
			} else {
				l = mid + 1
			}
		} else {
			// [mid + 1, r]有序
			if (nums[mid] < target && target <= nums[len - 1]) {
				l = mid + 1
			} else {
				r = mid - 1
			}
		}
	}
	return -1
}
