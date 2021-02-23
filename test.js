var plusOne = function (digits) {
	const len = digits.length
	//从后往前+
	for (let i = len - 1; i >= 0; i--) {
		digits[i]++
		//变回个位数
		digits[i] %= 10
		if (digits[i] !== 0) return digits
	}
	digits = [...Array(len + 1)].map((_) => 0)
	digits[0] = 1
	return digits
}
console.log(plusOne([1, 9]))
