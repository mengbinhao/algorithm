var rotateRight = function (head, k) {
	if (k === 0 || !head || !head.next) return head
	let len = 1,
		cur = head
	//get lenth
	while (cur.next) {
		cur = cur.next
		len++
	}
	// 当k大于长度时, 又是一个轮回, 所以对长度取余
	const num = k % len
	if (num === 0) return head
	//form ring
	cur.next = head
	let index = 1,
		newTail = head
	//find new tail
	while (index < len - num) {
		newTail = newTail.next
		index++
	}
	const newHead = newTail.next
	//break ring
	newTail.next = null
	return newHead
}
