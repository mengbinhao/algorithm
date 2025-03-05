const { bubbleSort } = require('../source/sort')
describe('Bubble Sort', () => {
	// Test case 1: Empty array
	test('should return an empty array when given an empty array', () => {
		expect(bubbleSort([])).toEqual([])
	})

	// Test case 2: Array with one element
	test('should return the same array when given an array with one element', () => {
		expect(bubbleSort([5])).toEqual([5])
	})

	// Test case 3: Already sorted array
	test('should return the same array when given an already sorted array', () => {
		expect(bubbleSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
	})

	// Test case 4: Reverse sorted array
	test('should correctly sort a reverse sorted array', () => {
		expect(bubbleSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5])
	})

	// Test case 5: Array with duplicate elements
	test('should correctly sort an array with duplicate elements', () => {
		expect(bubbleSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([
			1, 1, 2, 3, 4, 5, 5, 6, 9,
		])
	})

	// Test case 6: Array with negative numbers
	test('should correctly sort an array with negative numbers', () => {
		expect(bubbleSort([5, -1, 3, -7, 0])).toEqual([-7, -1, 0, 3, 5])
	})

	// Test case 7: Array with decimal numbers
	test('should correctly sort an array with decimal numbers', () => {
		expect(bubbleSort([3.5, 1.2, 3.5, 2.8, 0.9])).toEqual([
			0.9, 1.2, 2.8, 3.5, 3.5,
		])
	})

	// Test case 8: Non-array input
	test('should throw TypeError when given a non-array input', () => {
		expect(() => bubbleSort('not an array')).toThrow(TypeError)
		expect(() => bubbleSort(123)).toThrow(TypeError)
		expect(() => bubbleSort(null)).toThrow(TypeError)
		expect(() => bubbleSort(undefined)).toThrow(TypeError)
		expect(() => bubbleSort({})).toThrow(TypeError)
	})

	// Test case 9: Performance optimization - early termination
	test('should terminate early when no swaps are needed', () => {
		// This is more of a functional test to ensure the optimization works
		const mockArray = [1, 2, 3, 5, 4]
		const result = bubbleSort(mockArray)
		expect(result).toEqual([1, 2, 3, 4, 5])
		// We can't directly test the early termination, but we can verify the result
	})

	// Test case 10: Original array is not modified
	test('should not modify the original array', () => {
		const original = [5, 3, 1, 4, 2]
		const sorted = bubbleSort(original)
		expect(original).toEqual([5, 3, 1, 4, 2])
		expect(sorted).toEqual([1, 2, 3, 4, 5])
		expect(sorted).not.toBe(original)
	})
})
