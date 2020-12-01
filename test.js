var findDisappearedNumbers = function (nums) {
	const n = nums.length
	let res = 0
	// 新补的索引
	res += n - 0
	// 剩下索引和元素的差加起来
	for (let i = 0; i < n; i++) {
		res += i - nums[i]
	}
	return res
}

findDisappearedNumbers([0, 3, 1, 4])
