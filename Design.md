### [146.==LRU 缓存机制==](https://leetcode-cn.com/problems/lru-cache/)

```javascript {.line-numbers}
//hash表 + 双向链表(头代表新,尾代表老)
var ListNode = function (key, value) {
	this.key = key
	this.value = value
	this.prev = null
	this.next = null
}

var LRUCache = function (capacity) {
	// 缓存容量
	this.capacity = capacity
 	// 缓存数目
	this.count = 0
	// 哈希表 key -> ListNode
	this.hashTable = {}
	// 虚拟头尾
	this.dummyHead = new ListNode()
	this.dummyTail = new ListNode()
	this.dummyHead.next = this.dummyTail
	this.dummyTail.prev = this.dummyHead
}

//若哈希表中没有对应值,返回-1
//若存在节点,刷新它的位置,移动到链表头部,返回该节点值
LRUCache.prototype.get = function (key) {
	const node = this.hashTable[key]
	if (!node) return -1
	this.moveToHead(node)
	return node.value
}

LRUCache.prototype.moveToHead = function (node) {
	this.removeFromList(node)
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
	//原来的真实头结点的prev指向node,与下句不能弄反
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
	//Note:add an initial value
	this.minStack = [Infinity]
}

//同步放
MinStack.prototype.push = function (val) {
	this.stack.push(val)
	this.minStack.push(Math.min(this.minStack[this.minStack.length - 1], val))
}

//同步弹
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


//O(n) - O(1) better
var MinStack = function () {
	this.stack = []
	this.min = Infinity
}

MinStack.prototype.push = function (val) {
  //上一次的最小min
	const min = this.min
  // update this.min
	if (val < min) this.min = val
	//存的是真实值与"上一次"的最小min的差
  //若当次push的是小值则存的是负数
  // 3 - Infinity = -Infinity
	this.stack.push(val - min)
}

MinStack.prototype.pop = function () {
	const val = this.stack.pop()
	const min = this.min
	//若栈顶元素小于0，说明栈顶是当前最小的元素，它出栈会对this.min造成影响，需更新this.min
	//因为栈顶元素入栈是 栈顶元素 = 真实值 - 上一个最小的元素
	//而真实值 = min，故上一个最小元素 = 真实值 - 栈顶元素
	if (val < 0) this.min = min - val
}

MinStack.prototype.top = function () {
	const val = this.stack[this.stack.length - 1]
	const min = this.min
  //stack为空
  if (val === undefined) return void 0
  //真实值 = min
	if (val < 0) return min
	//还原数据，注意是"上一个"最小值
	return val + min
}

MinStack.prototype.getMin = function () {
  const min = this.min
	return min === Infinity ? void 0 : min
}
```

### [208.==实现 Trie(前缀树)==](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)

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
	if (!word) return
	let node = this.root
	for (let c of word) {
		if (!node.next[c]) node.next[c] = new TrieNode()
		node = node.next[c]
	}
	node.isEnd = true
}

Trie.prototype.search = function (word) {
	if (!word) return false
	let node = this.root
	for (let c of word) {
		if (!node.next[c]) {
			return false
		} else {
			node = node.next[c]
		}
	}
	return node.isEnd
}

Trie.prototype.startsWith = function (prefix) {
	if (!prefix) return true
	let node = this.root
	for (let c of prefix) {
		if (!node.next[c]) {
			return false
		} else {
			node = node.next[c]
		}
	}
	return true
}
```

### [225.用队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues/)

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

//返回的是outStack，故先反装一下
MyQueue.prototype.pop = function () {
	if (!this.outStack.length) this.in2out()
	return this.outStack.pop()
}

//返回的是outStack，故先反装一下
MyQueue.prototype.peek = function () {
	if (!this.outStack.length) this.in2out()
	return this.outStack[this.outStack.length - 1]
}

MyQueue.prototype.empty = function () {
	return this.outStack.length === 0 && this.inStack.length === 0
}

MyQueue.prototype.in2out = function () {
	while (this.inStack.length > 0) {
		this.outStack.push(this.inStack.pop())
	}
}
```

### [380.O(1) 时间插入、删除和获取随机元素](https://leetcode.cn/problems/insert-delete-getrandom-o1/)

```javascript {.line-numbers}
var RandomizedSet = function () {
	//search O(1)
	this.nums = []
	//add、delete O(1)
  //key -> val, val -> idx
	this.hash = new Map()
}

RandomizedSet.prototype.insert = function (val) {
	if (this.hash.has(val)) return false
	//插入到最后一个位置
	const idx = this.nums.length
	this.nums.push(val)
	this.hash.set(val, idx)
	return true
}

RandomizedSet.prototype.remove = function (val) {
	if (!this.hash.has(val)) return false
  //nums最后一个位置移到要删除的位置，删除nums最后一个元素
	let idx = this.hash.get(val)
	this.nums[idx] = this.nums[this.nums.length - 1]
	this.hash.set(this.nums[idx], idx)
	this.nums.pop()
	this.hash.delete(val)
	return true
}

RandomizedSet.prototype.getRandom = function () {
	const randomIdx = Math.floor(Math.random() * this.nums.length)
	return this.nums[randomIdx]
}
```

### [622.设计循环队列](https://leetcode.cn/problems/design-circular-queue/)

> 在循环队列中，当队列为空，`front=rear`；而当所有队列空间全占满时，也有`front=rear`。为了区别这两种情况，假设队列使用的数组有`capacity`个存储空间，则此时规定循环队列最多只能有`capacity−1`个队列元素，当循环队列中只剩下一个空存储单元时，则表示队列已满。
>
> 综上，队列判空条件是 **`front = rear`**，而队列判满条件是 **`front = (rear + 1) mod capacity`**
> 对于一个固定大小的数组，只要知道队尾`rear`与队首`front`，可计算出队列长度：
> **`(rear − front + capacity) mod capacity`**
>
> 循环队列的属性如下:
> elements：一个固定大小的数组，用于保存循环队列的元素
> capacity：循环队列的容量，即队列中最多可以容纳的元素数量
> front：队列首元素对应的数组的索引
> rear：队列尾元素对应的索引的**下一个索引**

```javascript {.line-numbers}
//数组实现
var MyCircularQueue = function (k) {
  //多开一个空间不存储数据
	this.capacity = k + 1
	this.elements = new Array(this.capacity)
  this.front = 0
  this.rear = 0
}

MyCircularQueue.prototype.enQueue = function (value) {
	if (this.isFull()) return false
	this.elements[this.rear] = value
	this.rear = (this.rear + 1) % this.capacity
	return true
}

//直接update front
MyCircularQueue.prototype.deQueue = function () {
	if (this.isEmpty()) return false
	this.front = (this.front + 1) % this.capacity
	return true
}

MyCircularQueue.prototype.Front = function () {
	if (this.isEmpty()) return -1
	return this.elements[this.front]
}

//rear在[0, capacity - 1]循环，当-1为负数需加个this.capacity
MyCircularQueue.prototype.Rear = function () {
	if (this.isEmpty()) return -1
	return this.elements[(this.rear - 1 + this.capacity) % this.capacity]
}

MyCircularQueue.prototype.isEmpty = function () {
	return this.front == this.rear
}

MyCircularQueue.prototype.isFull = function () {
	return (this.rear + 1) % this.capacity === this.front
}
```

### [641.设计循环双端队列](https://leetcode-cn.com/problems/design-circular-deque/)

> 在循环队列的基础上，增加`insertFront`和`deleteFront`

```javascript {.line-numbers}
var MyCircularDeque = function (k) {
	this.capacity = k + 1
	this.elements = new Array(k + 1).fill(0)
	this.rear = 0
	this.front = 0
}

MyCircularDeque.prototype.insertFront = function (value) {
	if (this.isFull()) return false
	this.front = (this.front - 1 + this.capacity) % this.capacity
	this.elements[this.front] = value
	return true
}

MyCircularDeque.prototype.insertLast = function (value) {
	if (this.isFull()) return false
	this.elements[this.rear] = value
	this.rear = (this.rear + 1) % this.capacity
	return true
}

MyCircularDeque.prototype.deleteFront = function () {
	if (this.isEmpty()) return false
	this.front = (this.front + 1) % this.capacity
	return true
}

MyCircularDeque.prototype.deleteLast = function () {
	if (this.isEmpty()) return false
	this.rear = (this.rear - 1 + this.capacity) % this.capacity
	return true
}

MyCircularDeque.prototype.getFront = function () {
	if (this.isEmpty()) return -1
	return this.elements[this.front]
}

MyCircularDeque.prototype.getRear = function () {
	if (this.isEmpty()) return -1
	return this.elements[(this.rear - 1 + this.capacity) % this.capacity]
}

MyCircularDeque.prototype.isEmpty = function () {
	return this.rear == this.front
}

MyCircularDeque.prototype.isFull = function () {
	return (this.rear + 1) % this.capacity == this.front
}
```

### [707.设计链表](https://leetcode.cn/problems/design-linked-list/)

```javascript {.line-numbers}
var MyLinkedList = function () {
	this.size = 0
	//sentinel
	this.head = new ListNode()
}

MyLinkedList.prototype.get = function (index) {
  //List index from 0 to size - 1
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
	if (index < 0 || index > this.size) return
	let prev = this.head
	while (index-- > 0) prev = prev.next
	const newNode = new ListNode(val)
	newNode.next = prev.next
	prev.next = newNode
	this.size++
}

MyLinkedList.prototype.deleteAtIndex = function (index) {
  //List index from 0 to size - 1
	if (index < 0 || index >= this.size) return
	let prev = this.head
	while (index-- > 0) prev = prev.next
	prev.next = prev.next.next
	this.size--
}
```
