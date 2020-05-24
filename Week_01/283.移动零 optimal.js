// space:O(1)  time:O(n)
// fast and slow pointer
var moveZeroes = function (nums) {
	for (
		let lastFoundZeroIndex = 0, cur = 0, len = nums.length;
		cur < len;
		cur++
	) {
		if (nums[cur] !== 0) {
			;[nums[lastFoundZeroIndex++], nums[cur]] = [
				nums[cur],
				nums[lastFoundZeroIndex],
			]
		}
	}
}
