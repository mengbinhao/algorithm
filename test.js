var mySqrt = function (x) {
	if (x < 2) return x
	let l = 0,
		r = x,
		mid

	while (l <= r) {
		mid = Math.floor(l + (r - l) / 2)
		if (mid * mid < x) {
			l = mid + 1
		} else if (mid * mid > x) {
			r = mid - 1
		} else if (mid * mid === x) {
			return mid
		}
	}
	return r
}

mySqrt(8)
