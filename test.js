var strStr = function (haystack, needle) {
	const L = needle.length,
		n = haystack.length
	if (L == 0) return 0

	let pn = 0
	while (pn < n - L + 1) {
		// find the position of the first needle character
		// in the haystack string
		while (pn < n - L + 1 && haystack[pn] !== needle[0]) ++pn

		// compute the max match string
		let currLen = 0,
			pL = 0
		while (pL < L && pn < n && haystack[pn] === needle[pL]) {
			++pn
			++pL
			++currLen
		}

		// if the whole needle string is found,
		// return its start position
		if (currLen === L) return pn - L

		// otherwise, backtrack
		pn = pn - currLen + 1
	}
	return -1
}
