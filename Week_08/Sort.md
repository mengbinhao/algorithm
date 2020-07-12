1. bubble
> 最好时间复杂度O(n),最坏时间复杂度O(n*n),平均时间复杂度也是O(n*n)
>
> 不需要额外的空间，所以空间复杂度是 O(1)。排序过程中，当元素相同时不做交换，所以是稳定的排序算法
```javascript
let bubbleSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	let len = arr.length
	if (len === 0) return

	for (let i = 0; i < len - 1; i++) {
		//后面换好的不需要再继续比较
		for (let j = 0; j < len - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
			}
		}
	}
	return arr
}


//optional
let bubbleSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	let len = arr.length
	if (len === 0) return

	for (let i = 0; i < len - 1; i++) {
		let isChanged = false
		//后面换好的不需要再继续比较
		for (let j = 0; j < len - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
				isChanged = true
			}
		}

		if (!isChanged) break
	}
	return arr
}
```

2. insert

> 最好时间复杂度O(n),最坏时间复杂度O(n*n),平均时间复杂度也是O(n*n)
>
> 不需要额外的空间，所以空间复杂度是 O(1)。排序过程中，当元素相同时不做交换，所以是稳定的排序算法

```javascript
var insert = (arr) => {
	console.log('原始数据: ' + arr)

	for (let i = 1; i < arr.length; i++) {
		let temp = arr[i]
		let j = i - 1
		for (; j >= 0; j--) {
			if (arr[j] > temp) {
				arr[j + 1] = arr[j]
			} else {
				break
			}
		}
		arr[j + 1] = temp
	}
	console.log('插入排序: ' + arr)
}

insert([2, 3, 5, 1, 23, 6, 78, 34])
```

3. 归并

> 最好、最坏、平均时间复杂度都是 O(nlogn)
>
> 空间复杂度方面，由于每次合并的操作都需要开辟基于数组的临时内存空间，所以空间复杂度为 O(n),稳定的排序算法

```javascript
let merge = (arr) => {
	let customDoubleMerge = (arr, left, mid, right) => {
		let tmp = Array(arr.length)
		let p1 = left,
			p2 = mid + 1,
			k = left
		while (p1 <= mid && p2 <= right) {
			if (arr[p1] <= arr[p2]) tmp[k++] = arr[p1++]
			else tmp[k++] = arr[p2++]
		}
		while (p1 <= mid) tmp[k++] = arr[p1++]
		while (p2 <= right) tmp[k++] = arr[p2++]
		// 复制回原素组
		for (let i = left; i <= right; i++) arr[i] = tmp[i]
	}

	let customMergeSort = (arr, start, end) => {
		if (start < end) {
			let mid = Math.floor((start + end) / 2)
			// 对左侧子序列进行递归排序
			customMergeSort(arr, start, mid)
			// 对右侧子序列进行递归排序
			customMergeSort(arr, mid + 1, end)
			// 合并
			customDoubleMerge(arr, start, mid, end)
		}
	}
	console.log('原始数据: ' + arr)
	customMergeSort(arr, 0, arr.length - 1)
	console.log('归并排序: ' + arr)
}

merge([49, 38, 65, 97, 76, 13, 27, 50])
```
4. 快排

> 最好O(nlogn)、最坏O(n*n)、平均时间复杂度都是O(nlogn)
>
> 空间复杂度O(1)，所以空间复杂度为 O(n),不稳定的排序算法

```javascript
let quickSort = (arr) => {
	let customQuickSort = (arr, low, high) => {
		let i, j, temp, t
		if (low >= high) {
			return
		}
		i = low
		j = high
		temp = arr[low]
		while (i < j) {
			// 先看右边，依次往左递减
			while (temp <= arr[j] && i < j) {
				j--
			}
			// 再看左边，依次往右递增
			while (temp >= arr[i] && i < j) {
				i++
			}
			t = arr[j]
			arr[j] = arr[i]
			arr[i] = t
		}
		arr[low] = arr[i]
		arr[i] = temp
		// 递归调用左半数组
		customQuickSort(arr, low, j - 1)
		// 递归调用右半数组
		customQuickSort(arr, j + 1, high)
	}
	console.log('原始数据: ' + arr)
	customQuickSort(arr, 0, arr.length - 1)
	console.log('快速排序: ' + arr)
}

quickSort([6, 1, 2, 7, 9, 11, 4, 5, 10, 8])
```
