var queue = [2, 3, 1]
for (const [i, q] of queue) {
	console.log(`${i}-----${q}`)
}

    int ans;
    public int sumRootToLeaf(TreeNode root) {
        sumbinary(root, 0);
        return ans;
    }

    public void sumbinary(TreeNode root, int cur){
        if(root == null){
            return;
        }
        if(root.left == null && root.right == null){
            ans += cur * 2 + root.val;
            return;
        }
        sumbinary(root.left, cur * 2 + root.val);
        sumbinary(root.right, cur * 2 + root.val);
    }

作者：java-man
链接：https://leetcode-cn.com/problems/sum-of-root-to-leaf-binary-numbers/solution/yong-shi-100nei-cun-9517-by-lzx_javaxiao-bai/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
