var removeDuplicates = function (s, k) {
	const stack = [],
		arr = s.split('')
	for (let i = 0; i < arr.length; i++) {
		if (i === 0 || arr[i] !== arr[i - 1]) {
			stack.push(1)
		} else {
			let incremented = stack.pop() + 1
			if (incremented === k) {
				arr.splice(i - k + 1, k)
				i = i - k
			} else {
				stack.push(incremented)
			}
		}
	}
	return arr.join('')
}

console.log(removeDuplicates('deeedbbcccbdaa', 3))
