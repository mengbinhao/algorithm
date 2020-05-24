/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
	let deque = [],
		ret = [],
		len = nums.length
	for (let i = 0; i < len; i++) {
		//remove invalid items, like i = 4, k = 3, remove i - k + 1
		while (deque[0] < i - k + 1) {
			deque.shift()
		}
		//双端队列是一个递减队列
		while (nums[deque[deque.length - 1]] < nums[i]) {
			deque.pop()
		}

		deque.push(i)

		//双端队列是一个递减队列
		if (i >= k - 1) {
			ret.push(nums[deque[0]])
		}
	}
	return ret
}
// @lc code=end
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))
