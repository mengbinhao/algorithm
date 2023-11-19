Function.prototype.before = function (fun) {
	var self = this
	return function () {
		fun.apply(this, arguments)
		return self.apply(this, arguments)
	}
}

Function.prototype.after = function (fun) {
	var self = this
	return function () {
		let agent = self.apply(this, arguments)
		fun.apply(this, arguments)
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
