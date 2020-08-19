1. bubble
> 最好时间复杂度O(n),最坏时间复杂度O(n^2),平均时间复杂度也是O(n^2)
>
> 不需要额外的空间，空间复杂度是 O(1)。排序过程中，当元素相同时不交换，稳定排序算法
>
> 原理：冒泡排序只会操作相邻的两个数据。每次冒泡操作都会对相邻的两个元素进行比较，看是否满足大小关系要求。如果不满足就让它俩互换。一次冒泡会让至少一个元素移动到它应该在的位置，重复 n 次，就完成了 n 个数据的排序工作。
```javascript
let bubbleSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	let len = arr.length
	if (len <= 1) return arr

	for (let i = 0; i < len - 1; i++) {
		//后面换好的不需要再继续比较
		for (let j = 0; j < len - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
			}
		}
	}
	return arr
}


//optimal
let bubbleSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	let len = arr.length
	if (len <= 1) return arr

	for (let i = 0; i < len - 1; i++) {
		let hasChanged = false
		//后面换好的不需要再继续比较
		for (let j = 0; j < len - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
				hasChanged = true
			}
		}
		//当前轮冒泡没有交换及退出
		if (!hasChanged) break
	}
	return arr
}
```

2. insert

> 最好时间复杂度O(n),最坏时间复杂度O(n^2),平均时间复杂度也是O(n^2)
>
> 不需要额外的空间，空间复杂度是 O(1)。排序过程中，当元素相同时不交换，稳定排序算法
>
> 原理：将数组中的数据分为两个区间，已排序区间和未排序区间。初始已排序区间只有一个元素，就是数组的第一个元素。插入算法的核心思想是取未排序区间中的元素，在已排序区间中找到合适的插入位置将其插入，并保证已排序区间数据一直有序。重复这个过程，直到未排序区间中元素为空，算法结束。

```javascript
let insertSort = (arr) => {
	if (!arr || !Array.isArray(arr)) return
	let len = arr.length
	if (len <= 1) return arr

    //一开始第一个数是有序区
	for (let i = 1; i < len; i++) {
		let cur = arr[i],
			//依次跟前面有序区进行比较
			j = i - 1
		while (j >= 0 && arr[j] > cur) {
			//依次往后挪
			arr[j + 1] = arr[j]
			j--
		}
		arr[j + 1] = cur
	}
}
```

3. select

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

	for (let i = 0; i < len - 1; i++) {
		//存放当前循环中最小值得index,默认为循环初识值
		let minIdx = i
		for (let j = i + 1; j < len; j++) {
			if (arr[j] < arr[minIdx]) {
				minIdx = j
			}
		}
		//将最小值与当前循环的第一个值互换位置
		//需要交换
		if (minIdx !== i) {
			;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
		}
	}
}
```

4. merge

> 最好、最坏、平均时间复杂度都是 O(nlogn)
>
> 空间复杂度方面，由于每次合并的操作都需要开辟基于数组的临时内存空间，空间复杂度为 O(n),稳定排序算法
>
> 原理：先把数组从中间分成前后两部分，然后对前后两部分分别排序，再将排好序的两部分合并在一起，这样整个数组就都有序了。归并排序使用的就是分治思想

```javascript
let mergeSort = (nums) => {
  if (nums.length <= 1) return nums
  let mid = Math.floor(nums.length/2), 
      left = nums.slice(0, mid), 
      right = nums.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

const merge(left, right) => {
  let result = []
  while(left.length && right.length) {
    result.push(left[0] <= right[0] ? left.shift() : right.shift()
  }
  while(left.length) result.push(left.shift())
  while(right.length) result.push(right.shift())
  return result
}
```
5. quick

> 最好O(nlogn)、最坏O(n^2)、平均时间复杂度都是O(nlogn)
>
> 空间复杂度O(1)，所以空间复杂度为 O(n),不稳定的排序算法
>
> 原理：如果要排序数组中下标从 p 到 r 之间的一组数据，我们选择 p 到 r 之间的任意一个数据作为 pivot（分区点）。我们遍历 p 到 r 之间的数据，将小于 pivot 的放到左边，将大于 pivot 的放到右边，将 pivot 放到中间。经过这一步骤之后，数组 p 到 r 之间的数据就被分成了三个部分，前面 p 到 q-1 之间都是小于 pivot 的，中间是 pivot，后面的 q+1 到 r 之间是大于 pivot 的，根据分治、递归的处理思想，我们可以用递归排序下标从 p 到 q-1 之间的数据和下标从 q+1 到 r 之间的数据，直到区间缩小为 1，就说明所有的数据都有序了

```javascript
let quickSort = (nums, left, right) => {
  if (nums.length <= 1) return nums
  if (left < right) {
    index = partition(nums, left, right)
    quickSort(nums, left, index-1)
    quickSort(nums, index+1, right)
  }
}
      
const partition = (nums, left, right) => {
  let pivot = left, index = left + 1
  for (let i = index; i <= right; i++) {
    if (nums[i] < nums[pivot]) {
      [nums[i], nums[index]] = [nums[index], nums[i]]
      index++
    }
  }
  [nums[pivot], nums[index-1]] = [nums[index-1], nums[pivot]]
  return index -1
}
```
