var longestValidParentheses = function (s) {
	const len = s.length
	if (len < 2) return 0
	//有效括号肯定是偶数
	const end = len % 2 === 0 ? len : len - 1
	//从最长开始偶数递减loop
	for (let i = end; i >= 0; i -= 2) {
		for (let j = 0; j < len - i + 1; j++) {
			//找到即是最长的
			if (isValid(s.substring(j, j + i))) return i
		}
	}

	function isValid(s) {
		const stack = []
		for (let c of s) {
			if (c === '(') {
				stack.push(')')
			} else {
				if (c !== stack.pop()) return false
			}
		}
		return stack.length === 0
	}
}

console.log(longestValidParentheses(')()())'))
