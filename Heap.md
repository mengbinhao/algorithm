> `heap`是一种非线性结构,可看作一个完全二叉树,通俗来讲`heap`其实就是利用完全二叉树结构来维一维数组
>
> 大顶堆：每个结点的值都大于或等于其左右孩子结点的值
>
> 小顶堆：每个结点的值都小于或等于其左右孩子结点的值
>
> 最大堆求 topk 小，最小堆求 topk 大

### [215.数组中的第 K 个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

```javascript {.line-numbers}
//基于快速排序的选择方法O(n) - O(logN)

//基于堆排序的选择方法
function findKthLargest(nums, k) {
	let len = nums.length
	buildMaxHeap(nums)
	for (let i = nums.length - 1; i >= nums.length - k + 1; --i) {
		;[nums[i], nums[0]] = [nums[0], nums[i]]
		--len
		maxHeapify(nums, 0)
	}
	return nums[0]

	function buildMaxHeap(arr) {
		for (let i = Math.floor(len / 2) - 1; i >= 0; --i) {
			maxHeapify(arr, i)
		}
	}

	function maxHeapify(arr, i) {
		let l = i * 2 + 1,
			r = i * 2 + 2,
			largest = i
		if (l < len && arr[l] > arr[largest]) largest = l

		if (r < len && arr[r] > arr[largest]) largest = r

		if (largest != i) {
			;[arr[largest], arr[i]] = [arr[i], arr[largest]]
			maxHeapify(arr, largest)
		}
	}
}
```

### [347.前 K 个高频元素 M](https://leetcode-cn.com/problems/top-k-frequent-elements/)

```javascript {.line-numbers}
//do not meet the requirement
//时间复杂度优于O(nlogn),n是数组的大小
var topKFrequent = function (nums, k) {
	const hash = {}
	//统计每个item次数到hash table
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

//小顶堆 O(nlogk)
var topKFrequent = function (nums, k) {
	const hash = {}

	for (let num of nums) {
		hash[num] ? hash[num] : (hash[num] = 1)
	}

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
