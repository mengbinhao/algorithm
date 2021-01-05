var trap = function (height) {
	let ret = 0,
		len = height.length
	//the last item can not store water
	for (let i = 0; i < len - 1; i++) {
		//two pointer
		let leftMax = 0,
			rightMax = 0
		//Search the left part for max bar size
		for (let j = i; j >= 0; j--) {
			leftMax = Math.max(leftMax, height[j])
		}
		//Search the right part for max bar size
		for (let j = i; j < len; j++) {
			rightMax = Math.max(rightMax, height[j])
		}
		ret += Math.min(leftMax, rightMax) - height[i]
	}
	return ret
}

trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])
