// const b = true
// const c = false

// const a = b || 1 > 2

// if (c) {
// 	console.log('Hi')
// }

const oneInsert = (shorter, longer) => {
	const length1 = shorter.length,
		length2 = longer.length
	let index1 = 0,
		index2 = 0
	while (index1 < length1 && index2 < length2) {
		if (shorter[index1] == longer[index2]) {
			index1++
		}
		index2++
		if (index2 - index1 > 1) {
			return false
		}
	}
	return true
}
oneInsert('ple', 'pale')
