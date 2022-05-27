var decodeString = function (s) {
	const isNumber = (val) => {
		return typeof +val === 'number' && +val === +val
	}
	const stack = []
	for (c of s) {
		if (c === ']') {
			let repeatStr = '',
				repeatCount = ''
			while (stack.length > 0 && stack[stack.length - 1] !== '[')
				repeatStr = stack.pop() + repeatStr
			//pop [
			stack.pop()
			while (stack.length > 0 && isNumber(stack[stack.length - 1]))
				repeatCount = stack.pop() + repeatCount
			stack.push(repeatStr.repeat(+repeatCount))
		} else {
			stack.push(c)
		}
	}
	return stack.join('')
}
