### [56.==合并区间==](https://leetcode.cn/problems/merge-intervals/)

```javascript
var merge = function (intervals) {
	//precondition, 按起点排序
	intervals.sort((a, b) => a[0] - b[0])
	let ret = [[intervals[0][0], intervals[0][1]]]
	for (let i = 1, len = intervals.length; i < len; i++) {
		const L = intervals[i][0],
			R = intervals[i][1]
    //新区间
		if (ret[ret.length - 1][1] < L) {
			ret.push([L, R])
		} else {
			ret[ret.length - 1][1] = Math.max(ret[ret.length - 1][1], R)
		}
	}
	return ret
}

//two pointer
var merge = function (intervals) {
	//precondition, 按起点排序
	intervals.sort((a, b) => a[0] - b[0])
	const len = intervals.length,
		ret = []
	for (let i = 0; i < len; ) {
		let R = intervals[i][1]
		let j = i + 1
		//后面的左边界小于等于前面的右边，更新R
		while (j < len && intervals[j][0] <= R) {
			R = Math.max(R, intervals[j][1])
			j++
		}
		ret.push([intervals[i][0], R])
		i = j
	}
	return ret
}
```

### [228.==汇总区间==](https://leetcode.cn/problems/summary-ranges/)

```javascript
var summaryRanges = function(nums) {
  const len = nums.length
  let i = 0
  let ret = []
  while (i < len) {
    const low = i
    i++
    while (i < len && nums[i] === nums[i - 1] + 1) i++
    const high = i - 1
    let tmp = ['' + nums[low]]
    if (high > low) {
      tmp.push('->')
      tmp.push('' + nums[high])
    }
    ret.push(tmp.join(''))
  }
  return ret
}
```
