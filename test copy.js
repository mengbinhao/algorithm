const quick = (arr) => {
	const helper = (arr, l, r) => {
		if (l >= r) return
		const pivot = arr[l]
		let i = l - 1,
			j = r + 1
		while (i < j) {
			while (arr[++i] < pivot);
			while (arr[--j] > pivot);
			if (i < j) [arr[i], arr[j]] = [arr[j], arr[i]]
		}
		helper(arr, l, j)
		helper(arr, j + 1, r)
		return arr
	}
	return helper(arr, 0, arr.length - 1)
}

const merge = (arr) => {
	const helper = (arr, l, r, tmp) => {
		if (l >= r) return

		const mid = Math.floor((l + r) / 2)

		helper(arr, l, mid, tmp)
		helper(arr, mid + 1, r, tmp)

		let k = 0,
			i = l,
			j = mid + 1
		while (i <= mid && j <= r) tmp[k++] = arr[i] < arr[j] ? arr[i++] : arr[j++]
		while (i <= mid) tmp[k++] = arr[i++]
		while (j <= r) tmp[k++] = arr[j++]
		for (let i = l, j = 0; i <= r; i++, j++) arr[i] = tmp[j]
		return arr
	}

	return helper(arr, 0, arr.length - 1, [])
}

console.log(quick([5, 1, 3, 2, 4]))
console.log(merge([5, 1, 3, 2, 4]))
