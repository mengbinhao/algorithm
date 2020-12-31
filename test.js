var lengthOfLIS = function (nums) {
	const tails = new Array(nums.length)
	let res = 0
	for (let num of nums) {
		let i = 0,
			j = res
		while (i < j) {
			const m = Math.floor((i + j) / 2)
			if (tails[m] < num) i = m + 1
			else j = m
		}
		tails[i] = num
		if (res === j) res++
	}
	return res
}

lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])
