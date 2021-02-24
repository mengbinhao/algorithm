var MinStack = function () {
	this.stack = []
	this.minV = Number.MAX_VALUE
}

MinStack.prototype.push = function (x) {
	// update 'min'
	const minV = this.minV
	if (x < this.minV) {
		this.minV = x
	}
	return this.stack.push(x - minV)
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
	const item = this.stack.pop()
	const minV = this.minV

	if (item < 0) {
		this.minV = minV - item
		return minV
	}
	return item + minV
}

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
	const item = this.stack[this.stack.length - 1]
	const minV = this.minV

	if (item < 0) {
		return minV
	}
	return item + minV
}

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
	return this.minV
}

var obj = new MinStack()
obj.push(3)
obj.push(34)
obj.top()
obj.push(2)
obj.pop()
