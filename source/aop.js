Function.prototype.before = function (fn) {
	var self = this
	return function () {
		fn.apply(this, arguments)
		return self.apply(this, arguments)
	}
}

Function.prototype.after = function (fn) {
	var self = this
	return function () {
		let agent = self.apply(this, arguments)
		fn.apply(this, arguments)
		return agent
	}
}
// 业务代码
function logic() {
	console.log('业务代码')
}
logic = logic
	.before(function () {
		console.log('切入前')
	})
	.after(function () {
		console.log('切入后')
	})

logic()
