const integerBreak = (n) => {
	let res = 0
	for (let i = 1; i <= n - 1; i++) {
		res = Math.max(res, i * (n - i), i * integerBreak(n - i))
	}
	return res
}

console.log(integerBreak(3))

var A = [
	[1, 2, 3],
	[4, 5, 6],
]

var a = Array.from({ length: A[0].length }, (_v, i) => {
	return A.map((v) => {
		console.log(v)
		return v[i]
	})
})

debugger
