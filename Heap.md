# 基本概念

- `heap`是一种非线性结构,可看作一个完全二叉树,通俗来讲`heap`其实就是利用==完全二叉树==结构来描述一维数组,堆就是动态帮你求极值的
- 大顶堆：每个结点的值都==大于或等于==其左右孩子结点的值，求 topK 小
- 小顶堆：每个结点的值都==小于或等于==其左右孩子结点的值，求 topK 大

# 解题要素

- 一个中心:动态求极值,动态和极值二者缺一不可
- 两个实现:跳表、二叉堆(heappop、heappush)
- 三种技巧:多路归并、固定堆、事后小诸葛
- 四大应用:topK、带权最短距离、因子分解、堆排序

### [215.==数组中的第 K 个最大元素==](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

```javascript {.line-numbers}
//基于快速排序的选择方法O(n) - O(logN)
var findKthLargest = function (nums, k) {
	const quickSelect = (arr, l, r, index) => {
		let idx = partition(arr, l, r)
		if (idx === index) {
			return arr[idx]
		} else {
			return idx < index
				? quickSelect(arr, idx + 1, r, index)
				: quickSelect(arr, l, idx - 1, index)
		}
	}
	const partition = (arr, l, r) => {
		let x = arr[r],
			i = l - 1
		for (let j = l; j < r; j++) {
			if (arr[j] < x) {
				;[arr[i], arr[j]] = [arr[j], arr[++i]]
			}
		}
		;[arr[i], arr[r]] = [arr[r], arr[++i]]
		return i
	}
	//返回的即是nums.length - k的下标
	return quickSelect(nums, 0, nums.length - 1, nums.length - k)
}

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
	for (let i = nums.length - 1; i >= nums.length - k + 1; i--) {
		;[nums[i], nums[0]] = [nums[0], nums[i]]
		len--
		down(nums, 0)
	}
	return nums[0]
}
```

### [347.前 K 个高频元素 M](https://leetcode-cn.com/problems/top-k-frequent-elements/)

```javascript {.line-numbers}
//do not meet the requirement
//时间复杂度优于O(nlogn),n是数组的大小
var topKFrequent = function (nums, k) {
	const hash = {}
	//使用hash统计每个item次数
	for (let i = 0, len = nums.length; i < len; i++) {
		hash[nums[i]] ? hash[nums[i]]++ : (hash[nums[i]] = 1)
	}
	//desc sort
	const list = []
	Object.keys(hash).forEach((key) => {
		list.push({ key, value: hash[key] })
	})
	list.sort((a, b) => b.value - a.value)

	//build return
	const ret = []
	list.forEach((obj, index) => {
		if (index < k) {
			ret.push(Number.parseInt(obj.key, 10))
		}
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
```
