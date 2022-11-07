### [56.==合并区间==](https://leetcode.cn/problems/merge-intervals/)

```javascript
//version 1
var merge = function (intervals) {
	intervals.sort((a, b) => a[0] - b[0])
	const arr = [[intervals[0][0], intervals[0][1]]]
	for (let i = 1; i < intervals.length; i++) {
		const L = intervals[i][0],
			R = intervals[i][1]
		if (arr[arr.length - 1][1] < L) {
			arr.push([L, R])
		} else {
			arr[arr.length - 1][1] = Math.max(arr[arr.length - 1][1], R)
		}
	}
	return arr
}

//two pointer
var merge = function (intervals) {
	intervals.sort((a, b) => a[0] - b[0])
	const len = intervals.length,
		arr = []
	for (let i = 0; i < len; ) {
		let t = intervals[i][1]
		let j = i + 1
		while (j < len && intervals[j][0] <= t) {
			t = Math.max(t, intervals[j][1])
			j++
		}
		arr.push([intervals[i][0], t])
		i = j
	}
	return arr
}
```
