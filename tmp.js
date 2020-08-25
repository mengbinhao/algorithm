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
		let cur = arr[i]
		j = i - 1
		while (j >= 0 && arr[j] > cur) {
			arr[j + 1] = arr[j]
			j--
		}
		arr[j + 1] = cur
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
	let mid = Math.floor(len / 2),
		left = arr.slice(0, mid),
		right = arr.slice(mid)

	//分治
	return merge(mergeSort(left), mergeSort(right))

	function merge(left, right) {
		//使用额外空间存储中间结果
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
		//最右边设为pivot
		let pivot = right,
			index = left

		for (let i = index; i < right; i++) {
			if (arr[i] < arr[pivot]) {
				//若小于pivot，不稳定，大的放后小的放前
				;[arr[i], arr[index]] = [arr[index], arr[i]]
				index++
			}
		}
		//pivot放左右拍好序列中间，不稳定
		;[arr[index], arr[pivot]] = [arr[pivot], arr[index]]

		return index
	}
}

//因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
let len

function buildMaxHeap(arr) {
	len = arr.length
	//对下标从2n​开始到1的数据进行堆化，下标是2n​+1到n的节点是叶子节点，我们不需要堆化
	//实际上，对于完全二叉树来说，下标从2n​+1到n的节点都是叶子节点
	for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
		heapify(arr, i)
	}
}

function heapify(arr, i) {
	// 堆调整
	// 左右节点下标
	let left = 2 * i + 1,
		right = 2 * i + 2,
		largest = i

	if (left < len && arr[left] > arr[largest]) {
		largest = left
	}

	if (right < len && arr[right] > arr[largest]) {
		largest = right
	}

	if (largest != i) {
		swap(arr, i, largest)
		heapify(arr, largest)
	}
}

function swap(arr, i, j) {
	let temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

function heapSort(arr) {
	buildMaxHeap(arr)

	for (let i = arr.length - 1; i > 0; i--) {
		swap(arr, 0, i)
		len--
		heapify(arr, 0)
	}
	return arr
}
let arr1 = [5, 7, 6, 3, 4, 1, 2]
let arr2 = [5, 7, 6, 3, 4, 1, 2]
let arr3 = [5, 7, 6, 3, 4, 1, 2]
let arr4 = [5, 7, 6, 3, 4, 1, 2]
let arr5 = [5, 7, 6, 3, 4, 1, 2]
let arr6 = [5, 7, 6, 3, 4, 1, 2]

//console.log(bubbleSort(arr1))
//console.log(insert(arr2))
//console.log(selectSort(arr3))
//console.log(mergeSort(arr4))
//console.log(quickSort(arr5))
console.log(heapSort(arr6))
