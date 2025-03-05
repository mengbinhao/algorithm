/**
 * Sorts an array using bubble sort algorithm
 * @param {Array} arr - The array to sort
 * @returns {Array} A new sorted array
 * @throws {TypeError} If input is not an array
 */
const bubbleSort = (arr) => {
	if (!Array.isArray(arr)) throw new TypeError('Input must be an array')
	if (arr.length <= 1) return [...arr]
	const sortedArray = [...arr]
	const len = sortedArray.length
	for (let i = 0; i < len - 1; i++) {
		let isSwap = false
		for (let j = 0; j < len - 1 - i; j++) {
			if (sortedArray[j] > sortedArray[j + 1]) {
				;[sortedArray[j], sortedArray[j + 1]] = [
					sortedArray[j + 1],
					sortedArray[j],
				]
				isSwap = true
			}
		}
		if (!isSwap) break
	}
	return sortedArray
}

module.exports = bubbleSort
