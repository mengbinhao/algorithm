### 1 bubble

> 最好时间复杂度 O(n),最坏时间复杂度 O(n^2),平均时间复杂度也是 O(n^2)
>
> 不需要额外的空间，空间复杂度是 O(1)。排序过程中，当元素相同时不交换，稳定排序算法
>
> 原理：冒泡排序只会操作相邻的两个数据。每次冒泡操作都会对相邻的两个元素进行比较，看是否满足大小关系要求。如果不满足就让它俩互换。一次冒泡会让至少一个元素移动到它应该在的位置，重复 n 次，就完成了 n 个数据的排序工作

```javascript {.line-numbers}
//best version
//两两对比，每次移动一个最大的item到最后
const bubble = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
	if (len < 2) return arr
	for (let i = 0; i < len; i++) {
    let isSwap = false
		//每轮后面换好的不需要再进行比较
		for (let j = 0; j < len - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
				isSwap = true
			}
		}
		//若当前轮无冒泡说明已排完，直接跳出
		if (!isSwap) break
	}
	return arr
}
```

### 2 insert

> 最好时间复杂度 O(n),最坏时间复杂度 O(n^2),平均时间复杂度也是 O(n^2)
>
> 不需要额外的空间，空间复杂度是 O(1)。排序过程中，当元素相同时不交换，稳定排序算法
>
> 原理：将数组中的数据分为两个区间，已排序区间和未排序区间。初始已排序区间只有一个元素，就是数组的第一个元素。插入算法的核心思想是取未排序区间中的元素，在已排序区间中找到合适的插入位置将其插入，并保证已排序区间数据一直有序。重复这个过程，直到未排序区间元素为空

```javascript {.line-numbers}
const insert = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
	if (len < 2) return arr
	//遍历无序区，一开始第一个数是有序区
	for (let i = 1; i < len; i++) {
		const cur = arr[i]
		//依次跟前面有序区进行比较
		let j = i - 1
		while (j >= 0 && arr[j] > cur) {
			//有序区依次往后挪,有序区是一直有序的,不断寻找无序区里的当前cur应该放在有序区的位置
			arr[j + 1] = arr[j]
			j--
		}
		//cur放在该放的有序区位置上
		arr[j + 1] = cur
	}
	return arr
}
```

### 3 select

> 最好时间复杂度 O(n),最坏时间复杂度 O(n^2),平均时间复杂度也是 O(n^2)
>
> 不需要额外的空间，空间复杂度是 O(1)。排序过程中，==不稳定==排序算法
>
> 原理：先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。依次类推，直到所有元素均排序完毕

```javascript {.line-numbers}
const select = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
	if (len < 2) return arr
	//双循环不重复
	//有序区
	for (let i = 0; i < len - 1; i++) {
		//存放当前循环中最小index,默认循环初始值
		//有序区的末尾坐标,此处应放下面找到的无序区的最小值
		let lastMinIdx = i
		//无序区找最小值
		for (let j = i + 1; j < len; j++) {
			if (arr[j] < arr[lastMinIdx]) lastMinIdx = j
		}
		//将最小值放到有序序列的最后(去掉这一行不稳定)
		if (lastMinIdx !== i) {
			;[arr[i], arr[lastMinIdx]] = [arr[lastMinIdx], arr[i]]
		}
	}
	return arr
}
```

### 4 quick

> 最好 O(nlogn)、最坏 O(n^2)、平均时间复杂度都是 O(nlogn)
>
> 空间复杂度为 O(n), ==不稳定==的排序算法
>
> 原理：如果要排序数组中下标从 p 到 r 之间的一组数据，我们选择 p 到 r 之间的任意一个数据作为 pivot（分区点）。我们遍历 p 到 r 之间的数据，将小于 pivot 的放到左边，将大于 pivot 的放到右边，将 pivot 放到两边的中间。经过这一步操作之后，数组 p 到 r 之间的数据就被分成了三个部分，前面 p 到 pivot-1 之间都是小于 pivot 的，后面是 pivot，后面的 pivot+1 到 r 之间是大于 pivot 的，根据分治、递归的处理思想，我们可以用递归排序下标从 p 到 q-1 之间的数据和下标从 q+1 到 r 之间的数据，直到区间缩小为 1，所有的数据都有序了

```javascript {.line-numbers}
// 大雪菜version 双指针
// 1 确定分界点 可以arr[l]、arr[r]、arr[(l + r) / 2]
// 2 调整该区间
// 3 递归处理左右子区间
const quick = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
	if (len < 2) return arr

	const helper = (arr, l, r) => {
		if (l >= r) return
		//x = arr[r] or arr[(l + r) / 2]
		//使得 nums[l..p-1] <= nums[p] < nums[p+1..r]
		const pivot = arr[l]
		let i = l - 1,
			j = r + 1
		while (i < j) {
			//上面外扩，这里直接先移动
			while (arr[++i] < pivot);
			while (arr[--j] > pivot);
			if (i < j) [arr[i], arr[j]] = [arr[j], arr[i]]
		}
		//两边对称的
		//helper(arr, l, i - 1)
		//helper(arr, i, r)
		helper(arr, l, j)
		helper(arr, j + 1, r)
		return arr
	}
	return helper(arr, 0, len - 1)
}

const quick = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
	if (len < 2) return arr
	const partition = (arr, l, r) => {
		//设最右边为pivot
		const pivot = r
		let index = l
		for (let i = index; i < r; i++) {
			if (arr[i] < arr[pivot]) {
				//大的放pivot后,小的放pivot前,不稳定
				;[arr[i], arr[index]] = [arr[index], arr[i]]
				//记录有多少个比pivot小的
				index++
			}
		}
		//pivot放左右已排好序列中间
		;[arr[index], arr[pivot]] = [arr[pivot], arr[index]]
		return index
	}

	const helper = (arr, l, r) => {
		if (l >= r) return
		//取得pivot坐标
		const pos = partition(arr, l, r)
		helper(arr, l, pos - 1)
		helper(arr, pos + 1, r)
		//返回排序好的当前区
		return arr
	}
	return helper(arr, 0, arr.length - 1)
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

### 5 merge

> 最好、最坏、平均时间复杂度都是 O(nlogn)
>
> 空间复杂度方面，由于每次合并的操作都需要开辟基于数组的临时内存空间，空间复杂度为 O(n),稳定排序算法
>
> 原理：先把数组从中间分成前后两部分，然后对前后两部分分别排序，再将排好序的两部分合并在一起，这样整个数组就都有序了。归并排序使用的就是分治思想

```javascript {.line-numbers}
// 大雪菜version
// 1 确定分界点 mid = (l + r) / 2
// 2 递归排序left, right
// 3 归并 - 合二为一
const merge = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	const len = arr.length
	if (len < 2) return arr

	const helper = (arr, l, r, tmp) => {
		if (l >= r) return
		const mid = (l + r) >> 1
		//先递
		helper(arr, l, mid, tmp)
		helper(arr, mid + 1, r, tmp)
		//再归两段数组
		let k = 0,
			i = l,
			//当前层后部分数组的开始坐标
			j = mid + 1
		while (i <= mid && j <= r) tmp[k++] = arr[i] < arr[j] ? arr[i++] : arr[j++]
		while (i <= mid) tmp[k++] = arr[i++]
		while (j <= r) tmp[k++] = arr[j++]
		//复制回当前层arr
		for (let i = l, j = 0; i <= r; i++, j++) arr[i] = tmp[j]
		return arr
	}
	return helper(arr, 0, len - 1, [])
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
const heap = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	let len = arr.length
	if (len < 2) return arr

	//堆化,查找三个点中的最大点
	const down = (arr, i) => {
		const lSon = 2 * i + 1,
			rSon = 2 * i + 2
		let largest = i
		if (lSon < len && arr[lSon] > arr[largest]) largest = lSon
		if (rSon < len && arr[rSon] > arr[largest]) largest = rSon
		if (largest != i) {
			;[arr[largest], arr[i]] = [arr[i], arr[largest]]
			//交换后继续看交换后的那个节点的子树三个节点是否满足条件
			down(arr, largest)
		}
	}

	const buildMaxHeap = (arr) => {
		//从第一个非叶子节点开始创建
		for (let i = Math.floor(len / 2) - 1; i >= 0; i--) down(arr, i)
	}

	buildMaxHeap(arr)

	//每次堆顶和最后一个元素交换，再堆化，即无序区减1，有序区加1
	for (let i = len - 1; i >= 1; i--) {
		;[arr[i], arr[0]] = [arr[0], arr[i]]
		len--
		//交换后从顶点开始down
		down(arr, 0)
	}
	return arr
}
```

> 如何手写一个小根堆（完全二叉树,坐标从 1 开始）
>
> 1. 插入一个元素 heap[++size] = x; up(size)
> 2. 求集合当中的最小值 heap[1]
> 3. 删除最小值 heap[1] = heap[size]; size--; down(1)
> 4. 删除任意一个元素 heap[k] = heap[size]; size--; down(k); up(k)
> 5. 修改任意一个元素 heap[k] = x; size--; down(k); up(k)
