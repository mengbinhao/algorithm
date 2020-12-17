var generateTrees = function (n) {
	if (n === 0) return []

	const buildTree = (start, end) => {
		const ret = []
		if (start > end) {
			ret.push(null)
			return ret
		}

		//loop root node
		for (let i = start; i <= end; i++) {
			//获得所有可行的左子树集合
			const treeLeft = buildTree(start, i - 1)
			//获得所有可行的右子树集合
			const treeRight = buildTree(i + 1, end)

			// 从左子树集合中选出一棵左子树，从右子树集合中选出一棵右子树，拼接到根节点上
			for (let tl of treeLeft) {
				for (let tr of treeRight) {
					const curTree = new TreeNode(i)
					curTree.left = tl
					curTree.right = tr
					ret.push(curTree)
				}
			}
		}
		return ret
	}
	return buildTree(1, n)
}

generateTrees(1)

function TreeNode(val) {
	this.val = val
	this.left = null
	this.right = null
}
