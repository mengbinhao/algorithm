> 1. 分析二分查找代码时，最好不要出现 else，全部展开成 else if 方便理解
> 2. 注意==「搜索区间」和 while 的终止条件==，如果存在漏掉的元素，记得在最后检查
> 3. 如需定义左闭右开的「搜索区间」搜索左右边界，只要在 `nums[mid] == target` 时做修改即可，搜索右侧时需要减一
> 4. 如果将「搜索区间」全都统一成两端都闭，好记，只要稍改 `nums[mid] == target` 条件处的代码和返回的逻辑即可

1. basic template

```javascript
let left = 0,
	right = arr.length - 1, //Note!!!!!!!!
	mid
while (left <= right) {   //Note!!!!!!!!
	// left + (right - left) / 2
	// left + (right - left) >> 2
	mid = Math.floor((left + right) / 2)
	if (arr[mid] === target) {
		return mid
	} else if (arr[mid] > target) {
		right = mid - 1  //Note!!!!!!!!
	} else if (arr[mid] < target){
		left = mid + 1   //Note!!!!!!!!
	}
}
return -1
```

2. 查找第一个值等于给定值的元素

```javascript
let left = 0, right = arr.length - 1, mid
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
```

3. 查找最后一个值等于给定值的元素

```javascript
let left = 0, right = arr.length - 1, mid
while (left <= right) {
	mid = Math.floor(left + (right - left) / 2)
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
let left = 0,
	right = arr.length - 1,
	mid
while (left <= right) {
	mid = Math.floor(left + (right - left) / 2)
	if (arr[mid] >= value) {
		if (mid === 0 || arr[mid - 1] < value) {
			return mid
		} else {
			right = mid - 1
		}
	} else {
		left = mid + 1
	}
}
return -1
```

5. 查找最后一个小于等于给定值的元素

```javascript
let left = 0,
	right = arr.length - 1,
	mid
while (left <= right) {
	mid = Math.floor(left + (right - left) / 2)
	if (arr[mid] <= value) {
		if (mid === arr.length - 1 || arr[mid + 1] > value) {
			return mid
		} else {
			left = mid + 1
		}
	} else {
		right = mid - 1
	}
}
return -1
```
