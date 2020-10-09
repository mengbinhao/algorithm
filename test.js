function add() {
	let args = [...arguments]

	let fn = function () {
		return add.apply(null, [args, ...arguments]))
	}

	fn.toString = () => args.reduce((acc, cur) => acc + cur)

	return fn
}

console.log(add(10))
