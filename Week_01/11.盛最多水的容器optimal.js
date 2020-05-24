//two pointer, walk to center
//O(1) O(n)
var maxArea = function (height) {
	let maxArea = 0,
		l = 0,
		r = height.length - 1
	while (l < r) {
		maxArea = Math.max(maxArea, Math.min(height[l], height[r]) * (r - l))
		height[l] < height[r] ? l++ : r--
	}
	return maxArea
}
