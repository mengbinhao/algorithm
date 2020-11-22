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
		// if (i !== minIdx)
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

let heapSort = (arr) => {
	let len = arr.length
	function buildMaxHeap(arr) {
		//从第一个非叶子节点开始创建
		for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
			heapify(arr, i)
		}
	}
	function heapify(arr, i) {
		let left = 2 * i + 1,
			right = 2 * i + 2,
			largest = i
		if (left < len && arr[left] > arr[largest]) largest = left
		if (right < len && arr[right] > arr[largest]) largest = right

		if (largest != i) {
			;[arr[i], arr[largest]] = [arr[largest], arr[i]]
			//调整后继续看调整后的那个节点的子树是否满足
			heapify(arr, largest)
		}
	}

	buildMaxHeap(arr)

	for (let i = len - 1; i > 0; i--) {
		//每次第一个节点跟当前长度最后一个节点置换
		;[arr[0], arr[i]] = [arr[i], arr[0]]
		len--
		//从顶点开始堆化
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
