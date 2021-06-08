### 1 bubble

> 最好时间复杂度 O(n),最坏时间复杂度 O(n^2),平均时间复杂度也是 O(n^2)
>
> 不需要额外的空间，空间复杂度是 O(1)。排序过程中，当元素相同时不交换，稳定排序算法
>
> 原理：冒泡排序只会操作相邻的两个数据。每次冒泡操作都会对相邻的两个元素进行比较，看是否满足大小关系要求。如果不满足就让它俩互换。一次冒泡会让至少一个元素移动到它应该在的位置，重复 n 次，就完成了 n 个数据的排序工作

```javascript {.line-numbers}
//optimal
const bubbleSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
	if (len < 2) return arr

	for (let i = 0; i < len - 1; i++) {
		let hasChanged = false
		//后面换好的不需要再进行比较
		for (let j = 0; j < len - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
				hasChanged = true
			}
		}
		//当前轮无冒泡则跳出循环
		if (!hasChanged) break
	}
	return arr
}
```

### 2 insert

> 最好时间复杂度 O(n),最坏时间复杂度 O(n^2),平均时间复杂度也是 O(n^2)
>
> 不需要额外的空间，空间复杂度是 O(1)。排序过程中，当元素相同时不交换，稳定排序算法
>
> 原理：将数组中的数据分为两个区间，已排序区间和未排序区间。初始已排序区间只有一个元素，就是数组的第一个元素。插入算法的核心思想是取未排序区间中的元素，在已排序区间中找到合适的插入位置将其插入，并保证已排序区间数据一直有序。重复这个过程，直到未排序区间中元素为空，算法结束

```javascript {.line-numbers}
const insertSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
	if (len < 2) return arr

	//一开始第一个数是有序区
	for (let i = 1; i < len; i++) {
		const cur = arr[i]
		//依次跟前面有序区进行比较
		let j = i - 1
		while (j >= 0 && arr[j] > cur) {
			//依次往后挪,有序区是一直有序的
			arr[j + 1] = arr[j]
			j--
		}
		//cur放置在该放的位置上
		arr[j + 1] = cur
	}
}
```

### 3 select

> 最好时间复杂度 O(n),最坏时间复杂度 O(n^2),平均时间复杂度也是 O(n^2)
>
> 不需要额外的空间，空间复杂度是 O(1)。排序过程中，==不稳定==排序算法
>
> 原理：先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕

```javascript {.line-numbers}
const selectSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
	if (len < 2) return arr

	//双循环不重复
	for (let i = 0; i < len - 1; i++) {
		//存放当前循环中最小index,默认循环初识值
		let minIdx = i
		//update minIdx
		for (let j = i + 1; j < len; j++) {
			if (arr[j] < arr[minIdx]) minIdx = j
		}
		//minIdx有更新的话，将最小值放到有序序列的最后
		//去掉这一行不稳定
		if (minIdx !== i) {
			;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
		}
	}
}
```

### 4 merge

> 最好、最坏、平均时间复杂度都是 O(nlogn)
>
> 空间复杂度方面，由于每次合并的操作都需要开辟基于数组的临时内存空间，空间复杂度为 O(n),稳定排序算法
>
> 原理：先把数组从中间分成前后两部分，然后对前后两部分分别排序，再将排好序的两部分合并在一起，这样整个数组就都有序了。归并排序使用的就是分治思想

```javascript {.line-numbers}
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

//大雪菜version
// 1 确定分界点 mid = (l + r) / 2
// 2 递归排序left, right
// 3 归并 - 合二为一
const mergeSort = (arr) => {
	const helper = (arr, l, r, tmp) => {
		if (l >= r) return
		const mid = (l + r) >> 1

		helper(arr, l, mid, tmp)
		helper(arr, mid + 1, r, tmp)

		//归的过程
		let k = 0,
			i = l,
			j = mid + 1

		while (i <= mid && j <= r) {
			tmp[k++] = arr[i] < arr[j] ? arr[i++] : arr[j++]
		}
		while (i <= mid) tmp[k++] = arr[i++]
		while (j <= r) tmp[k++] = arr[j++]
		//复制回arr
		for (let i = l, j = 0; i <= r; i++, j++) arr[i] = tmp[j]
		return arr
	}
	return helper(arr, 0, arr.length - 1, [])
}
```

### 5 quick

> 最好 O(nlogn)、最坏 O(n^2)、平均时间复杂度都是 O(nlogn)
>
> 空间复杂度为 O(n), ==不稳定==的排序算法
>
> 原理：如果要排序数组中下标从 p 到 r 之间的一组数据，我们选择 p 到 r 之间的任意一个数据作为 pivot（分区点）。我们遍历 p 到 r 之间的数据 f，将小于 pivot 的放到左边，将大于 pivot 的放到右边，将 pivot 放到中间。经过这一步骤之后，数组 p 到 r 之间的数据就被分成了三个部分，前面 p 到 q-1 之间都是小于 pivot 的，中间是 pivot，后面的 q+1 到 r 之间是大于 pivot 的，根据分治、递归的处理思想，我们可以用递归排序下标从 p 到 q-1 之间的数据和下标从 q+1 到 r 之间的数据，直到区间缩小为 1，就说明所有的数据都有序了

```javascript {.line-numbers}
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

//大雪菜version 双指针
// 1 确定分界点 可以arr[l]、arr[r]、arr[(l + r) / 2]
// 2 调整该区间
// 3 递归处理左右子区间
const quickSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
	if (len < 2) return arr

	const helper = (arr, l, r) => {
		if (l >= r) return
		const x = arr[l]
		let i = l - 1,
			j = r + 1
		while (i < j) {
			//不管三七二十一先移动，所以上面定义的时候外移1位
			while (arr[++i] < x);
			while (arr[--j] > x);
			if (i < j) [arr[i], arr[j]] = [arr[j], arr[i]]
		}

		helper(arr, l, j)
		helper(arr, j + 1, r)
		return arr
	}

	return helper(arr, 0, len - 1)
}

//快选
const quickChoose = (arr, n, k) => {
	const helper = (arr, l, r, k) => {
		if (l === r) return arr[l]
		const x = arr[l]
		let i = l - 1,
			j = r + 1
		while (i < j) {
			while (arr[++i] < x);
			while (arr[--j] > x);
			if (i < j) [arr[i], arr[j]] = [arr[j], arr[i]]
		}

		//排完后看左边的数字个数
		const sl = j - l + 1
		if (k <= sl) return helper(arr, l, j, k)
		return helper(arr, j + 1, r, k - sl)
	}
	return helper(arr, 0, n - 1, k)
}
```

### 6 heap

> 最好 O(nlogn)、最坏 O(nlogn)、平均时间复杂度都是 O(nlogn)
>
> 空间复杂度为 O(1), 稳定的排序算法
>
> 1. 将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
>
> 2. 将堆顶元素 R[1]与最后一个元素 R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足 R[1,2…n-1]<=R[n]；
>
> 3. 由于交换后新的堆顶 R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，然后再次将 R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为 n-1，则整个排序过程完成

```javascript {.line-numbers}
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
```
