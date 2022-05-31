var search = function (nums, target) {
	const len = nums.length
	if (len === 0) return -1

	let l = 0,
		r = len - 1,
		mid

	while (l <= r) {
		mid = Math.floor(l + (r - l) / 2)
		if (nums[mid] === target) return mid

		//l is asc
		//incase mid === l 坐标相等
		//[start, mid]有序
		if (nums[mid] >= nums[l]) {
			if (target < nums[mid] && target >= nums[l]) {
				r = mid - 1
			} else {
				l = mid + 1
			}
			// [mid, end]有序
		} else {
			if (target > nums[mid] && target <= nums[r]) {
				l = mid + 1
			} else {
				r = mid - 1
			}
		}
	}
	return -1
}

search([4, 5, 6, 7, 0, 1, 2], 0)
