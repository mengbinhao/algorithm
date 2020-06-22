//maxLengthSubStr
var maxLengthSubStr = (s1, s2) => {
	let maxSubStr = '',
		maxLen = 0,
		len1 = s1.length,
		len2 = s2.length

	for (let i = 0; i < len1; i++) {
		for (let j = 0; j < len2; j++) {
			if (s1[i] == s2[j]) {
				for (let m = i, n = j; m < len1 && n < len2; m++, n++) {
					if (s1[m] != s2[n]) {
						break
					}
					if (maxLen < m - i + 1) {
						maxLen = m - i + 1
						maxSubStr = s1.substring(i, m + 1)
					}
				}
			}
		}
	}
	return maxSubStr
}

maxLengthSubStr('13452439', '123456')
