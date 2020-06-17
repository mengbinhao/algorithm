var rotate = (nums, k) => {
	let a = new Array(nums.length)
	for (let i = 0; i < nums.length; i++) {
		a[(i + k) % nums.length] = nums[i]
	}
	for (let i = 0; i < nums.length; i++) {
		nums[i] = a[i]
	}
}
rotate([1, 2, 3, 4, 5, 6, 7], 3)
