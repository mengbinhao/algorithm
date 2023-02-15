### [146.==LRU 缓存机制==](https://leetcode-cn.com/problems/lru-cache/)

```javascript {.line-numbers}
//hash表 + 双向链表(头代表最新,尾代表老)
function ListNode(key, value) {
	this.key = key
	this.value = value
	this.next = null
	this.prev = null
}

var LRUCache = function (capacity) {
	// 缓存容量
	this.capacity = capacity
	// 哈希表 key -> ListNode
	this.hashTable = {}
	// 缓存数目
	this.count = 0
	// 虚拟头尾
	this.dummyHead = new ListNode()
	this.dummyTail = new ListNode()
	this.dummyHead.next = this.dummyTail
	this.dummyTail.prev = this.dummyHead
}

//若哈希表中没有对应值,返回-1。若存在节点,刷新它的位置,移动到链表头部,返回该节点值
LRUCache.prototype.get = function (key) {
	const node = this.hashTable[key]
	if (!node) return -1
	this.moveToHead(node)
	return node.value
}

LRUCache.prototype.moveToHead = function (node) {
	//从链表中删除该节点
	this.removeFromList(node)
	//将该节点添加到链表的头部
	this.addToHead(node)
}

LRUCache.prototype.removeFromList = function (node) {
	const prev = node.prev
	const next = node.next
	prev.next = next
	next.prev = prev
}

LRUCache.prototype.addToHead = function (node) {
	//插入到虚拟头结点和真实头结点之间,注意顺序，先链接node，再调整指针
	//node的prev指针指向虚拟头结点
	node.prev = this.dummyHead
	//node的next指针指向原来的真实头结点
	node.next = this.dummyHead.next
	//原来的真实头结点的prev指向node
	this.dummyHead.next.prev = node
	//虚拟头结点的next指向node
	this.dummyHead.next = node
}

//对于新数据,创建新节点,存入哈希表，并添加到链表头部(最不优先被淘汰),检查是否超容,决定是否剔除"老家伙"
//对于已有数据,更新数据值,刷新节点位置
LRUCache.prototype.put = function (key, value) {
	const node = this.hashTable[key]
  //insert
	if (!node) {
		const newNode = new ListNode(key, value)
		this.hashTable[key] = newNode
		this.addToHead(newNode)
		this.count++
    //check capacity
		if (this.count > this.capacity) {
			//删除"老家伙",将它从链表尾部删除
			const tailNode = this.dummyTail.prev
			this.removeFromList(tailNode)
			delete this.hashTable[tailNode.key]
			this.count--
		}
  //update
	} else {
		node.value = value
		this.moveToHead(node)
	}
}
```

### [155.==最小栈 E==](https://leetcode-cn.com/problems/min-stack/)

```javascript {.line-numbers}
//使用辅助栈
var MinStack = function () {
	this.stack = []
	//add an initial value
	this.minStack = [Infinity]
}

//辅助栈同步放每次最小值
MinStack.prototype.push = function (x) {
	this.stack.push(x)
	this.minStack.push(Math.min(this.minStack[this.minStack.length - 1], x))
}

//同步pop
MinStack.prototype.pop = function () {
	this.stack.pop()
	this.minStack.pop()
}

MinStack.prototype.top = function () {
	return this.stack[this.stack.length - 1]
}

MinStack.prototype.getMin = function () {
	const val = this.minStack[this.minStack.length - 1]
	return val === Infinity ? void 0 : val
}


//O(n) - O(1)
var MinStack = function () {
	this.stack = []
	this.minV = Number.MAX_VALUE
}

MinStack.prototype.push = function (val) {
	const minV = this.minV
  // update this.minV
	if (val < this.minV) this.minV = val
	//存的是真实值与min的差
  //若当次push的是小值则存的负数
	return this.stack.push(val - minV)
}

MinStack.prototype.pop = function () {
	const item = this.stack.pop()
	const minV = this.minV
	//如果栈顶元素小于0，说明栈顶是当前最小的元素，它出栈会对this.minV造成影响，需更新this.minV
	//上一个最小的是"minV - 栈顶元素",我们需要将上一个最小值更新为当前的最小值
	//因为栈顶元素入栈的时候的通过 栈顶元素 = 真实值 - 上一个最小的元素 得到的
	//而真实值 = minV， 可得出上一个最小的元素 = 真实值 - 栈顶元素
	if (item < 0) {
		this.minV = minV - item
		return minV
	}
	return item + minV
}

MinStack.prototype.top = function () {
	const item = this.stack[this.stack.length - 1]
	const minV = this.minV
	if (item < 0) return minV
	//top时候需要对数据还原，这里注意是"上一个"最小值
	return item + minV
}

MinStack.prototype.min = function () {
	return this.minV
}
```

### [208.实现 Trie](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)

```javascript {.line-numbers}
var TrieNode = function () {
	//next[i]保存着下一个字符i的节点引用
	this.next = {}
	//当前节点是否可以作为一个单词的结束位置
	this.isEnd = false
}

var Trie = function () {
	this.root = new TrieNode()
}

Trie.prototype.insert = function (word) {
	if (!word) return false

	let node = this.root

	for (let i = 0; i < word.length; i++) {
		if (!node.next[word[i]]) {
			node.next[word[i]] = new TrieNode()
		}
		node = node.next[word[i]]
	}
	node.isEnd = true
	return true
}

Trie.prototype.search = function (word) {
	if (!word) return false

	let node = this.root

	for (let i = 0; i < word.length; i++) {
		if (node.next[word[i]]) {
			node = node.next[word[i]]
		} else {
			return false
		}
	}
	return node.isEnd
}

Trie.prototype.startsWith = function (prefix) {
	if (!prefix) return true

	let node = this.root
	for (let i = 0; i < prefix.length; i++) {
		if (node.next[prefix[i]]) {
			node = node.next[prefix[i]]
		} else {
			return false
		}
	}
	return true
}
```

### [225.==用队列实现栈==](https://leetcode-cn.com/problems/implement-stack-using-queues/)

```javascript {.line-numbers}
var MyStack = function () {
	this.queue = []
}

MyStack.prototype.push = function (x) {
	this.queue[this.queue.length] = x
}

MyStack.prototype.pop = function () {
	if (this.empty()) return undefined
	const popItem = this.queue[this.queue.length - 1]
	this.queue.length = this.queue.length - 1
	return popItem
}

MyStack.prototype.top = function () {
	return this.queue[this.queue.length - 1]
}

MyStack.prototype.empty = function () {
	return this.queue.length === 0
}
```

### [232.==用栈实现队列==](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

```javascript {.line-numbers}
var MyQueue = function () {
	this.inStack = []
	this.outStack = []
}

MyQueue.prototype.push = function (x) {
	this.inStack.push(x)
}

//返回的是outStack，所以需先反向装一下
MyQueue.prototype.pop = function () {
	if (!this.outStack.length) this.in2out()
	return this.outStack.pop()
}

//返回的是outStack，所以需先反向装一下
MyQueue.prototype.peek = function () {
	if (!this.outStack.length) this.in2out()
	return this.outStack[this.outStack.length - 1]
}

MyQueue.prototype.empty = function () {
	return this.outStack.length === 0 && this.inStack.length === 0
}

MyQueue.prototype.in2out = function () {
	while (this.inStack.length) {
		this.outStack.push(this.inStack.pop())
	}
}
```

### [641.设计循环双端队列](https://leetcode-cn.com/problems/design-circular-deque/)

```javascript {.line-numbers}
var MyCircularDeque = function (k) {
	//point to first valid position
	this.front = 0
	//point to last valid position
	this.rear = 0
	this.capacity = k + 1
	this.arr = Array(this.capacity)
}

MyCircularDeque.prototype.insertFront = function (value) {
	if (this.isFull()) return false
	this.front = (this.front - 1 + this.capacity) % this.capacity
	this.arr[this.front] = value
	return true
}

MyCircularDeque.prototype.insertLast = function (value) {
	if (this.isFull()) {
		return false
	}
	this.arr[this.rear] = value
	this.rear = (this.rear + 1) % this.capacity
	return true
}

MyCircularDeque.prototype.deleteFront = function () {
	if (this.isEmpty()) {
		return false
	}
	// front 被设计在数组的开头，所以是 +1
	this.front = (this.front + 1) % this.capacity
	return true
}

MyCircularDeque.prototype.deleteLast = function () {
	if (this.isEmpty()) {
		return false
	}
	// rear 被设计在数组的末尾，所以是 -1
	this.rear = (this.rear - 1 + this.capacity) % this.capacity
	return true
}

MyCircularDeque.prototype.getFront = function () {
	if (this.isEmpty()) {
		return -1
	}
	return this.arr[this.front]
}

MyCircularDeque.prototype.getRear = function () {
	if (this.isEmpty()) {
		return -1
	}
	// 当 rear 为 0 时防止数组越界
	return this.arr[(this.rear - 1 + this.capacity) % this.capacity]
}

MyCircularDeque.prototype.isEmpty = function () {
	return this.front === this.rear
}

MyCircularDeque.prototype.isFull = function () {
	// 注意：这个设计是非常经典的做法
	return (this.rear + 1) % this.capacity == this.front
}

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */
```

### [707.设计链表](https://leetcode.cn/problems/design-linked-list/)

```javascript {.line-numbers}
var MyLinkedList = function () {
	this.size = 0
	this.head = new ListNode(0)
}

MyLinkedList.prototype.get = function (index) {
	if (index < 0 || index >= this.size) return -1
	let cur = this.head
	while (index-- >= 0) cur = cur.next
	return cur.val
}

MyLinkedList.prototype.addAtHead = function (val) {
	this.addAtIndex(0, val)
}

MyLinkedList.prototype.addAtTail = function (val) {
	this.addAtIndex(this.size, val)
}

MyLinkedList.prototype.addAtIndex = function (index, val) {
	if (index > this.size) return
	index = Math.max(0, index)
	this.size++
	let prev = this.head
	while (index-- > 0) prev = prev.next
	let newAdd = new ListNode(val)
	newAdd.next = prev.next
	prev.next = newAdd
}

MyLinkedList.prototype.deleteAtIndex = function (index) {
	if (index < 0 || index >= this.size) return
	this.size--
	let prev = this.head
	while (index-- > 0) prev = prev.next
	prev.next = prev.next.next
}
```
