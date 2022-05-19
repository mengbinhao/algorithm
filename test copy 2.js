var mergeTwoLists = function (list1, list2) {
	const dummyHead = ListNode(-1)
	let prev = dummyHead
	while (list1 && list2) {
		if (list1.val < list2.val) {
			prev.next = list1
			list1 = list1.next
		} else {
			prev.next = list2
			list2 = list2.next
		}
		prev = prev.next
	}
	prev.next = list1 || list2
	return dummyHead.next
}
