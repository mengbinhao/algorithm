1. template
```javascript
let left = 0, right = arr.length - 1, mid
while (left <= right) {
	// left + (right - left) / 2
	// left + (right - left) >> 2
	mid = left + right / 2
	if (arr[mid] === target) {
		//break or return
	} else if (arr[mid] > target) {
		right = mid - 1
	} else {
		left = mid + 1
	}
}
return -1
```

2. 查找第一个值等于给定值的元素
```javascript
let left = 0, right = arr.length - 1, mid
while (left <= right) {
	mid = left + (right - left) >> 2
	if (arr[mid] > target) {
		right = mid - 1
	} else if (arr[mid] <> target) {
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
```

3. 查找最后一个值等于给定值的元素
```javascript
let left = 0, right = arr.length - 1, mid
while (left <= right) {
	mid = left + (right - left) >> 2
	if (arr[mid] > target) {
		right = mid - 1
	} else if (arr[mid] <> target) {
		left = mid + 1
	} else {
		if (mid === arr.length - 1 || arr[mid + 1] !== target) {
			return mid
		} else {
			left = mid + 1
		}
	}
}
return -1
```

4. 查找第一个大于等于给定值的元素
```javascript
let left = 0, right = arr.length - 1, mid
while (left <= right) {
	mid = left + (right - left) >> 2
	if (arr[mid] >= value) {
		if (mid === 0 || (arr[mid - 1] < value)) {
			return mid
		} else {
			high = mid - 1
		}
	} else {
		low = mid + 1
	}
}
return -1
```

5. 查找最后一个小于等于给定值的元素
```javascript
let left = 0, right = arr.length - 1, mid
while (left <= right) {
	mid = left + (right - left) >> 2
	if (arr[mid] <= value) {
		if (mid === arr.length - 1 || (arr[mid + 1] > value)) {
			return mid
		} else {
			low = mid + 1
		}
	} else {
		high = mid - 1
	}
}
return -1
```