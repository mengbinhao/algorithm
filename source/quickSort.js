function partition(arr, low, high) {
	let pivot = arr[low]
	while (low < high) {
		while (low < high && arr[high] > pivot) {
			--high
		}
		arr[low] = arr[high]
		while (low < high && arr[low] <= pivot) {
			++low
		}
		arr[high] = arr[low]
	}
	arr[low] = pivot
	return low
}

function quickSort(arr, low, high) {
	if (low < high) {
		let pivot = partition(arr, low, high)
		quickSort(arr, low, pivot - 1)
		quickSort(arr, pivot + 1, high)
	}
	return arr
}
const arr = [5, 3, 2, 4, 1]
quickSort(arr, 0, arr.length - 1)
