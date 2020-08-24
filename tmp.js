let bubbleSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	let len = arr.length
	if (len < 2) return arr

	for (let i = 0; i < len - 1; i++) {
		let hasChanged = false
		for (let j = 0; j < len - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
				hasChanged = true
			}
		}
		if (!hasChanged) break
	}
	return arr
}

let insert = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	let len = arr.length
	if (len < 2) return arr

	for (let i = 1; i < len; i++) {
		let tmp = arr[i]
		j = i - 1
		while (j >= 0 && arr[j] > tmp) {
			arr[j + 1] = arr[j]
			j--
		}
		arr[j + 1] = tmp
	}

	return arr
}

let selectSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	let len = arr.length
	if (len < 2) return arr

	for (let i = 0; i < len - 1; i++) {
		let minIdx = i
		for (let j = i + 1; j < len; j++) {
			if (arr[j] < arr[minIdx]) minIdx = j
		}
		//不稳定
		;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
	}

	return arr
}

let mergeSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	let len = arr.length
	if (len < 2) return arr

	//一分为二
	let mid = Math.floor(arr.length / 2),
		left = arr.slice(0, mid),
		right = arr.slice(mid)

	//分治
	return merge(mergeSort(left), mergeSort(right))

	//使用额外空间存储中间结果
	function merge(left, right) {
		let ret = [],
			lLen = left.length,
			rLen = right.length,
			p = (q = k = 0)
		while (p < lLen && q < rLen) {
			ret[k++] = left[p] < right[q] ? left[p++] : right[q++]
		}
		while (p < lLen) ret[k++] = left[p++]
		while (q < rLen) ret[k++] = right[q++]
		return ret
	}
}

let quickSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	let len = arr.length
	if (len < 2) return arr

	return quickSorted(arr, 0, len - 1)

	function quickSorted(arr, left, right) {
		//递归排序左和右
		if (left < right) {
			//取得中轴坐标
			let pos = partition(arr, left, right)
			quickSorted(arr, 0, pos - 1)
			quickSorted(arr, pos + 1, right)
		}

		return arr
	}

	function partition(arr, left, right) {
		//最右边pivot
		let pivot = right,
			index = left

		for (let i = index; i < right; i++) {
			//若小于pivot，不稳定，大的放后小的放前
			if (arr[i] < arr[pivot]) {
				;[arr[i], arr[index]] = [arr[index], arr[i]]
				index++
			}
		}
		//pivot放左右拍好序列中间，不稳定
		;[arr[pivot], arr[index]] = [arr[index], arr[pivot]]
		return index
	}
}
let arr1 = [5, 7, 6, 3, 4, 1, 2]
let arr2 = [5, 7, 6, 3, 4, 1, 2]
let arr3 = [5, 7, 6, 3, 4, 1, 2]
let arr4 = [5, 7, 6, 3, 4, 1, 2]
let arr5 = [5, 7, 6, 3, 4, 1, 2]

console.log(bubbleSort(arr1))
console.log(insert(arr2))
console.log(selectSort(arr3))
console.log(mergeSort(arr4))
console.log(quickSort(arr5))
