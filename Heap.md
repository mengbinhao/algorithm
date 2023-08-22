## 基本概念

- `heap`是一种非线性结构,可看作一个完全二叉树,通俗来讲`heap`其实就是利用==完全二叉树==结构来描述一维数组,堆就是动态帮你求极值的
- 大顶堆：每个结点的值都==大于或等于==其左右孩子结点的值，求 topK 小
- 小顶堆：每个结点的值都==小于或等于==其左右孩子结点的值，求 topK 大

## 解题要素

- 一个中心:动态求极值,动态和极值二者缺一不可
- 两个实现:跳表、二叉堆(heappop、heappush)
- 三种技巧:多路归并、固定堆、事后小诸葛
- 四大应用:topK、带权最短距离、因子分解、堆排序

## TopK

> 从arr[1, n]这n个数中，找出最大的k个数

1. 全局排序 O(nlogn)
2. 局部排序   冒泡O(nk)
3. 堆 只找到TopK，不排序TopK

## questions

### [215.==数组中的第 K 个最大元素==](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

```javascript {.line-numbers}
//基于快速排序的选择方法，随机数据下是O(n) - O(logN)
var findKthLargest = function (nums, k) {
	const quickSelect = (arr, l, r, index) => {
		const idx = partition(arr, l, r)
		if (idx === index) {
			return arr[idx]
		} else {
			return idx < index
				? quickSelect(arr, idx + 1, r, index)
				: quickSelect(arr, l, idx - 1, index)
		}
	}
	const partition = (arr, l, r) => {
		let pivot = arr[r],
			index = l
		for (let i = l; i < r; i++) {
			if (arr[i] < pivot) {
				;[arr[i], arr[index]] = [arr[index], arr[i]]
				index++
			}
		}
		;[arr[index], arr[r]] = [arr[r], arr[index]]
		return index
	}
  //只要某次划分的q为倒数第k个下标的时候，即下标是nums.length - k，即为答案
	return quickSelect(nums, 0, nums.length - 1, nums.length - k)
}
```

```javascript
//基于堆排序的选择方法
function findKthLargest(nums, k) {
	let len = nums.length
	const down = (arr, i) => {
		const lSon = 2 * i + 1,
			rSon = 2 * i + 2
		let largest = i
		if (lSon < len && arr[lSon] > arr[largest]) largest = lSon
		if (rSon < len && arr[rSon] > arr[largest]) largest = rSon
		if (largest != i) {
			;[arr[largest], arr[i]] = [arr[i], arr[largest]]
			down(arr, largest)
		}
	}
	const buildMaxHeap = (arr) => {
		for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) down(arr, i)
	}
	buildMaxHeap(nums)
	//大顶堆，换一次，小的下沉，第二大上到堆顶
  //注意遍历结束条件
	for (let i = nums.length - 1; i >= nums.length - k + 1; i--) {
		;[nums[i], nums[0]] = [nums[0], nums[i]]
		len--
		down(nums, 0)
	}
	return nums[0]
}
```

### [347.==前 K 个高频元素M==](https://leetcode-cn.com/problems/top-k-frequent-elements/)

```javascript {.line-numbers}
//do not meet the requirement
//时间复杂度优于O(nlogn),n是数组的大小
var topKFrequent = function (nums, k) {
	const hash = {}
	for (let i = 0, len = nums.length; i < len; i++) {
		hash[nums[i]] ? hash[nums[i]]++ : (hash[nums[i]] = 1)
	}
	const list = []
	Object.keys(hash).forEach((key) => {
		list.push({ key, value: hash[key] })
	})
  //desc sort
	list.sort((a, b) => b.value - a.value)
	const ret = []
	list.forEach((obj, index) => {
		if (index < k) ret.push(Number.parseInt(obj.key, 10))
	})
	return ret
}

//do not meet the requirement
var topKFrequent = function (nums, k) {
	const map = new Map(),
		arr = [...new Set(nums)]
	nums.forEach((num) => {
		if (map.has(num)) {
			map.set(num, map.get(num) + 1)
		} else {
			map.set(num, 1)
		}
	})
	return arr.sort((a, b) => map.get(b) - map.get(a)).slice(0, k)
}

//meet requirement
let topKFrequent = function (nums, k) {
	let map = new Map(),
		heap = [,]
	nums.map((num) => {
		if (map.has(num)) map.set(num, map.get(num) + 1)
		else map.set(num, 1)
	})
	if (map.size <= k) return [...map.keys()]
	let i = 0
	map.forEach((value, key) => {
		if (i < k) {
			heap.push(key)
			if (i === k - 1) buildHeap(heap, map, k)
		} else if (map.get(heap[1]) < value) {
			// 替换并堆化
			heap[1] = key
			// 自上而下式堆化第一个元素
			heapify(heap, map, k, 1)
		}
		i++
	})
	heap.shift()
	return heap
}

// 原地建堆，从后往前，自上而下式建小顶堆
let buildHeap = (heap, map, k) => {
	if (k === 1) return
	// 从最后一个非叶子节点开始，自上而下式堆化
	for (let i = Math.floor(k / 2); i >= 1; i--) {
		heapify(heap, map, k, i)
	}
}

// 堆化
let heapify = (heap, map, k, i) => {
	// 自上而下式堆化
	while (true) {
		let minIndex = i
		if (2 * i <= k && map.get(heap[2 * i]) < map.get(heap[i])) minIndex = 2 * i
		if (2 * i + 1 <= k && map.get(heap[2 * i + 1]) < map.get(heap[minIndex]))
			minIndex = 2 * i + 1
		if (minIndex !== i) {
			;[heap[i], heap[minIndex]] = [heap[minIndex], heap[i]]
			i = minIndex
		} else {
			break
		}
	}
}
```
