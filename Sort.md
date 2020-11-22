### 1 bubble

> 最好时间复杂度O(n),最坏时间复杂度O(n^2),平均时间复杂度也是O(n^2)
>
> 不需要额外的空间，空间复杂度是 O(1)。排序过程中，当元素相同时不交换，稳定排序算法
>
> 原理：冒泡排序只会操作相邻的两个数据。每次冒泡操作都会对相邻的两个元素进行比较，看是否满足大小关系要求。如果不满足就让它俩互换。一次冒泡会让至少一个元素移动到它应该在的位置，重复 n 次，就完成了 n 个数据的排序工作。
```javascript
//optimal
let bubbleSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	let len = arr.length
	if (len < 2) return arr

	for (let i = 0; i < len - 1; i++) {
		let hasChanged = false
		//后面换好的不需要再继续比较
		for (let j = 0; j < len - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
				hasChanged = true
			}
		}
		//当前轮无冒泡则退出
		if (!hasChanged) break
	}
	return arr
}
```

### 2 insert

> 最好时间复杂度O(n),最坏时间复杂度O(n^2),平均时间复杂度也是O(n^2)
>
> 不需要额外的空间，空间复杂度是 O(1)。排序过程中，当元素相同时不交换，稳定排序算法
>
> 原理：将数组中的数据分为两个区间，已排序区间和未排序区间。初始已排序区间只有一个元素，就是数组的第一个元素。插入算法的核心思想是取未排序区间中的元素，在已排序区间中找到合适的插入位置将其插入，并保证已排序区间数据一直有序。重复这个过程，直到未排序区间中元素为空，算法结束。

```javascript
let insertSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
	if (len < 2) return arr

    //一开始第一个数是有序区
	for (let i = 1; i < len; i++) {
		let cur = arr[i],
			//依次跟前面有序区进行比较
			j = i - 1
		while (j >= 0 && arr[j] > cur) {
			//依次往后挪,有序区是一直有序的
			arr[j + 1] = arr[j]
			j--
		}
		arr[j + 1] = cur
	}
}
```

### 3 select

> 最好时间复杂度O(n),最坏时间复杂度O(n^2),平均时间复杂度也是O(n^2)
>
> 不需要额外的空间，空间复杂度是 O(1)。排序过程中，不稳定排序算法
>
> 原理：先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。 
>
```javascript
let selectSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	let len = arr.length
	if (len <= 1) return arr

    //双循环不重复
	for (let i = 0; i < len - 1; i++) {
		//存放当前循环中最小index,默认循环初识值
		let minIdx = i
        //update minIdx
		for (let j = i + 1; j < len; j++) {
			if (arr[j] < arr[minIdx]) {
				minIdx = j
			}
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

```javascript
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
```
### 5 quick

> 最好O(nlogn)、最坏O(n^2)、平均时间复杂度都是O(nlogn)
>
> 空间复杂度为 O(n), 不稳定的排序算法
>
> 原理：如果要排序数组中下标从 p 到 r 之间的一组数据，我们选择 p 到 r 之间的任意一个数据作为 pivot（分区点）。我们遍历 p 到 r 之间的数据，将小于 pivot 的放到左边，将大于 pivot 的放到右边，将 pivot 放到中间。经过这一步骤之后，数组 p 到 r 之间的数据就被分成了三个部分，前面 p 到 q-1 之间都是小于 pivot 的，中间是 pivot，后面的 q+1 到 r 之间是大于 pivot 的，根据分治、递归的处理思想，我们可以用递归排序下标从 p 到 q-1 之间的数据和下标从 q+1 到 r 之间的数据，直到区间缩小为 1，就说明所有的数据都有序了

```javascript
let quickSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	let len = arr.length
	if (len < 2) return arr

	return quickSorted(arr, 0, len - 1)

	function quickSorted(arr, left, right) {
		//递归排序左和右
		if (left < right) {
			//取得中轴坐标
			let idx = partition(arr, left, right)
			quickSorted(arr, 0, idx - 1)
			quickSorted(arr, idx + 1, right)
		}

		return arr
	}

	function partition(arr, left, right) {
		//最右边设为pivot
		let pivot = right,
			index = left

		for (let i = index; i < right; i++) {
			//若小于pivot，不稳定，大的放后小的放前
			if (arr[i] < arr[pivot]) {
				;[arr[i], arr[index]] = [arr[index], arr[i]]
				index++
			}
		}
		//pivot放左右排好序列中间，不稳定
		;[arr[pivot], arr[index]] = [arr[index], arr[pivot]]
		return index
	}
}
```

### 6 heap

> 最好O(nlogn)、最坏O(nlogn)、平均时间复杂度都是O(nlogn)
>
> 空间复杂度为 O(1), 稳定的排序算法
>
> 1. 将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
>
> 2. 将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；
>
> 3. 由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。

```javascript
const heapSort = (arr) => {
    if (!arr || !Array.isArray(arr)) return
	let len = arr.length
    if (len < 2) return arr
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
```

