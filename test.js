function findKthLargest(nums, k) {
	const swap = (a, i, j) => ([a[i], a[j]] = [a[j], a[i]])
	const heapSort = (a) => {
		const len = a.length
		let heapSize = len

		for (let i = len >> 1; i >= 0; i--) heapify(a, i, heapSize)

		for (let i = len - 1; i > len - k; i--) {
			swap(a, i, 0)
			heapify(a, 0, --heapSize)
		}
		return a[0]
	}
	const heapify = (a, i, heapSize) => {
		const l = i * 2 + 1,
			r = i * 2 + 2
		let max = i

		if (l < heapSize && a[l] > a[max]) max = l
		if (r < heapSize && a[r] > a[max]) max = r

		if (max !== i) {
			swap(a, i, max)
			heapify(a, max, heapSize)
		}
	}
	return heapSort(nums)
}

console.log(findKthLargest([-1, 2, 0], 2))
