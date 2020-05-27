var arr = [3, 4, 1, 2]
function test(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		for (let j = i + 1; j < arr.length - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				;[arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
			}
		}
	}
}

function bubbleSort(arr) {
	for (var j = 0; j < arr.length - 1; j++) {
		// 这里要根据外层for循环的j，逐渐减少内层for循环的次数
		for (var i = 0; i < arr.length - 1 - j; i++) {
			if (arr[i] > arr[i + 1]) {
				;[arr[i + 1], arr[i]] = [arr[i], arr[i + 1]]
			}
		}
	}
	return arr
}

//console.log(bubbleSort(arr))
console.log(bubbleSort(arr))
