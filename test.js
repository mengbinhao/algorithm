const trailingZeroes = (n) => {
	let zeroCount = 0
	for (let i = 5; i <= n; i += 5) {
		let currentFactor = i
		while (currentFactor % 5 == 0) {
			zeroCount++
			currentFactor /= 5
		}
	}
	return zeroCount
}

const trailingZeroes2 = (n) => {
	let zeroCount = 0
	let currentMultiple = 5
	while (n >= currentMultiple) {
		zeroCount += (n / currentMultiple) | 0
		currentMultiple *= 5
	}
	return zeroCount
}

trailingZeroes2(26)
