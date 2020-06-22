//array 去掉一个最高分，去掉一个最低分，求和再平均
// 1 遍历找到最大和最小index和val
// 2 基于index做删除操作
// 3 再次循环求结果
var getScore = () => {
	let a = [2, 5, 4, 1, 3],
		maxIndex = -1,
		maxVal = -1,
		minIndex = -1,
		minVal = 99,
		inx1,
		inx2
	for (let i = 0; i < a.length; i++) {
		if (a[i] > maxVal) {
			maxVal = a[i]
			maxIndex = i
		}
		if (a[i] < minVal) {
			minVal = a[i]
			minIndex = i
		}
	}

	inx1 = maxIndex
	inx2 = minIndex
	if (maxIndex < minIndex) {
		inx1 = minIndex
		inx2 = maxIndex
	}
	for (let i = inx1; i < a.length - 1; i++) {
		a[i] = a[i + 1]
	}
	for (let i = inx2; i < a.length - 1; i++) {
		a[i] = a[i + 1]
	}
	sumScore = 0
	for (let i = 0; i < a.length - 2; i++) {
		sumScore += a[i]
	}
	avg = sumScore / 3.0
	console.log(avg)
}

getScore()
