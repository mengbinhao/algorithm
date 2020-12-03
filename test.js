const binarySearch = (arr, target) => {
	let left = 0,
		right = arr.length - 1,
		mid
	while (left <= right) {
		mid = Math.floor(left + (right - left) / 2)
		if (arr[mid] > target) {
			right = mid - 1
		} else if (arr[mid] < target) {
			left = mid + 1
		} else {
			if (mid === 0 || arr[mid - 1] !== target) {
				return mid
			} else {
				right = mid - 1
			}
		}
	}
	return -1
}

function leftBound(arr, target) {
	let left = 0,
		right = arr.length - 1
	// 搜索区间为 [left, right]
	while (left <= right) {
		let mid = Math.floor(left + (right - left) / 2)
		if (arr[mid] < target) {
			// 搜索区间变为 [mid+1, right]
			left = mid + 1
		} else if (arr[mid] > target) {
			// 搜索区间变为 [left, mid-1]
			right = mid - 1
		} else if (arr[mid] === target) {
			// 收缩右侧边界
			right = mid - 1
		}
	}
	// 检查出界情况
	if (left >= arr.length || arr[left] !== target) return -1
	return left
}

function rightBound(arr, target) {
	let left = 0,
		right = arr.length - 1
	// 搜索区间为 [left, right]
	while (left <= right) {
		let mid = Math.floor(left + (right - left) / 2)
		if (arr[mid] < target) {
			// 搜索区间变为 [mid+1, right]
			left = mid + 1
		} else if (arr[mid] > target) {
			// 搜索区间变为 [left, mid-1]
			right = mid - 1
		} else if (arr[mid] === target) {
			// 收缩右侧边界
			left = mid + 1
		}
	}
	// 检查出界情况
	if (right < 0 || arr[right] !== target) return -1
	return right
}

console.log(binarySearch([1, 2, 2, 2, 3], 2))
console.log(binarySearch([2, 3, 5, 7], 1))
console.log(binarySearch([2, 3, 5, 7], 8))

console.log(leftBound([1, 2, 2, 2, 3], 2))
console.log(leftBound([2, 3, 5, 7], 1))
console.log(leftBound([2, 3, 5, 7], 8))

console.log(rightBound([1, 2, 2, 2, 3], 2))
console.log(rightBound([2, 3, 5, 7], 1))
console.log(rightBound([2, 3, 5, 7], 8))
