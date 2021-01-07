const bubbleSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
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

const insert = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
	if (len < 2) return arr

	for (let i = 1; i < len; i++) {
		const cur = arr[i]
		let j = i - 1
		while (j >= 0 && arr[j] > cur) {
			arr[j + 1] = arr[j]
			j--
		}
		arr[j + 1] = cur
	}
	return arr
}

const selectSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
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

const mergeSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
	if (len < 2) return arr

	//一分为二
	const mid = Math.floor(len / 2),
		left = arr.slice(0, mid),
		right = arr.slice(mid)

	const merge = (left, right) => {
		//使用额外空间存储中间结果
		const ret = [],
			lLen = left.length,
			rLen = right.length
		let p = (q = k = 0)

		while (p < lLen && q < rLen) {
			ret[k++] = left[p] < right[q] ? left[p++] : right[q++]
		}

		while (p < lLen) ret[k++] = left[p++]
		while (q < rLen) ret[k++] = right[q++]
		return ret
	}
	//分治
	return merge(mergeSort(left), mergeSort(right))
}

const quickSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
	if (len < 2) return arr

	const quickSorted = (arr, left, right) => {
		if (left > right) return
		//取得中轴坐标
		const pos = partition(arr, left, right)
		quickSorted(arr, left, pos - 1)
		quickSorted(arr, pos + 1, right)
		//返回排序好的当前区
		return arr
	}

	const partition = (arr, left, right) => {
		//设最右边为pivot
		let pivot = right,
			index = left

		//right是pivot
		for (let i = index; i < right; i++) {
			if (arr[i] < arr[pivot]) {
				//大的放pivot后,小的放pivot前,不稳定
				;[arr[i], arr[index]] = [arr[index], arr[i]]
				index++
			}
		}
		//pivot放左右已排好序列中间
		;[arr[index], arr[pivot]] = [arr[pivot], arr[index]]
		return index
	}
	return quickSorted(arr, 0, len - 1)
}

const heapSort = (arr) => {
	let len = arr.length
	const buildMaxHeap = (arr) => {
		//从第一个非叶子节点开始创建
		for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
			heapify(arr, i)
		}
	}
	//堆化
	const heapify = (arr, i) => {
		const left = 2 * i + 1,
			right = 2 * i + 2
		let largest = i
		if (left < len && arr[left] > arr[largest]) largest = left
		if (right < len && arr[right] > arr[largest]) largest = right

		if (largest !== i) {
			;[arr[i], arr[largest]] = [arr[largest], arr[i]]
			//调整后继续看调整后的那个节点的子树是否满足
			heapify(arr, largest)
		}
	}
	//step1 build MaxHeap,全部都是无序的
	buildMaxHeap(arr)

	//每次堆顶和最后一个元素交换，再堆化，即无序区减1，有序区加1
	for (let i = len - 1; i > 0; i--) {
		//每次第一个节点跟当前长度最后一个节点置换
		;[arr[0], arr[i]] = [arr[i], arr[0]]
		len--
		//交换后从顶点开始堆化
		heapify(arr, 0)
	}
	return arr
}

const arr = [5, 6, 3, 4, 1, 2]

//console.log(bubbleSort([...arr]))
//console.log(insert([...arr]))
//console.log(selectSort([...arr]))
//console.log(mergeSort([...arr]))
//console.log(quickSort([...arr]))
console.log(heapSort([...arr]))
