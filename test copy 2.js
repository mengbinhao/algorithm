var longestValidParentheses = function (s) {
	const len = s.length
	if (len < 2) return 0

	//始终保持栈底元素为遍历过的最后一个没有匹配的右括号的下标
	const stack = [-1]
	let maxLen = 0
	for (let i = 0; i < len; i++) {
		if (s[i] === '(') {
			stack.push()
		} else {
			stack.pop()
			if (stack.length === 0) {
				stack.push(i)
			} else {
				maxLen = Math.max(maxLen, i - stack[stack.length - 1])
			}
		}
	}
	return maxLen
}
