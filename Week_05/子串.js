var repeatSubString = (str1, str2) => {
	if (!str1 || !str2) return false
	let len1 = str1.length,
		len2 = str2.length

	for (let i = 0; i < len1 - len2 + 1; i++) {
		if (str1[i] === str2[0]) {
			let count = 0
			for (let j = 0; j < len2; j++) {
				if (str1[i + j] !== str2[j]) break
				count++
			}
			if (count === len2) return true
		}
	}

	return false
}

console.log(repeatSubString('goodgoogle', 'google'))
