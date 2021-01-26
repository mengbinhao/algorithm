var removeKdigits = function (num, k) {
	const stack = [],
		remain = num.length - k
	for (let digit of num) {
		while (k > 0 && stack.length > 0 && stack[stack.length - 1] > digit) {
			stack.pop()
			k -= 1
		}
		stack.push(digit)
	}
	return stack.join('').trim('')
}

removeKdigits('1432219', 3)
