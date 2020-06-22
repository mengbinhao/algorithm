- 插入
```practice
target.next = source.next
source.next = target
```

![](./images/NodeList_insert.png)
- 删除`source.next = source.next.next`
![](./images/NodeList_delete.png)


- 反转整个链表
```javascript
//pre, cur, next pointer
var reverseList = function (head) {
	let pre = null,
		cur = head,
		next

	while (cur) {
		next = cur.next
		cur.next = pre
		pre = cur
		cur = next
	}

	return pre
}

//recursion
var reverseList = function(head) {
    if (!head || !head.next) return head
    const p = reverseList(head.next)
    head.next.next = head
    head.next = null
    return p
};
```

- 两两交换链表中的节点
```javascript
var swapPairs = function (head) {
	let dummy = new ListNode(-1)
	dummy.next = head

	let pre = dummy

	while (head && head.next) {
		let first = head
		let second = head.next

		//swap
		pre.next = second
		first.next = second.next
		second.next = first

		//reassign pre and head
		pre = first
		head = first.next
	}
	return dummy.next
}

//recursion
var swapPairs = function (head) {
	// 1. 终止条件：当前没有节点或者只有一个节点，肯定就不需要交换了
	if (head == null || head.next == null) return head

	// 2. 调用单元
	// 需要交换的两个节点是 head 和 head.next
	let firstNode = head,
		secondNode = head.next
	// firstNode 连接后面交换完成的子链表
	firstNode.next = swapPairs(secondNode.next)
	// secondNode 连接 firstNode
	secondNode.next = firstNode

	// 3. 返回值：返回交换完成的子链表
	// secondNode 变成了头结点
	return secondNode
}

```

- 链表中间节点
```javascript
//fast slow pointer, when fast goto end, slow must be in the middle of ListNode
var middleNode = function (head) {
	let fast = head,
		slow = head
	while (fast && fast.next) {
		slow = slow.next
		fast = fast.next.next
	}
	return slow
}

//array
var middleNode = function(head) {
  let len = 0, newHead = head, res = []
  while(newHead){
      res[len++] = newHead
      newHead = newHead.next
  }
  return res[len>>1]
}
```

- 环形链表
```javascript
//hash
var hasCycle = function (head) {
	let set = new Set(),
		node = head

	while (node) {
		if (set.has(node)) return true
		set.add(node)
		node = node.next
	}

	return false
}

//fast slow pointer
var hasCycle = function (head) {
	if (head === null || head.next === null) return false
	let slow = head,
		fast = head.next

	while (slow !== fast) {
		if (fast === null || fast.next === null) return false
		slow = slow.next
		fast = fast.next.next
	}

	return true
}
```