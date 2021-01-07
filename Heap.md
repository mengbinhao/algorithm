==heap 就是完全二叉树==

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
