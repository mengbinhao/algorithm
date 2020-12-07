var multiply = function (num1, num2) {
	if (num1 === '0' || num2 === '0') {
		return '0'
	}
	let ans = '0'
	const m = num1.length,
		n = num2.length
	for (let i = n - 1; i >= 0; i--) {
		let curr = '',
			add = 0
		for (let j = n - 1; j > i; j--) {
			curr += 0
		}
		let y = num2.charAt(i) - 0
		for (let j = m - 1; j >= 0; j--) {
			let x = num1.charAt(j) - 0
			let product = x * y + add
			curr += product % 10
			add = Math.floor(product / 10)
		}
		if (add !== 0) {
			curr += add % 10
		}
		ans = addStrings(ans, curr.split('').reverse().join(''))
	}
	return ans
}

function addStrings(num1, num2) {
	let i = num1.length - 1,
		j = num2.length - 1,
		curry = 0,
		ret = []

	while (i >= 0 || j >= 0 || curry) {
		const x = i >= 0 ? num1.charAt(i) - 0 : 0
		const y = j >= 0 ? num2.charAt(j) - 0 : 0
		const tmp = x + y + curry
		ret.push(tmp % 10)
		curry = Math.floor(tmp / 10)
		i--
		j--
	}
	return ret.reverse().join('')
}

multiply('123', '456')
