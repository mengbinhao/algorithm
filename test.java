var twoSumLessThanK = (A, K) => {
    if (A == null || A.length === 0) return -1

    A.sort(A);

    let l = 0, r = A.length - 1,result = Integer.MIN_VALUE;

    while (l < r) {
        if (A[l] + A[r] >= K) {
            r--;
        } else {
            result = Math.max(result, A[l] + A[r]);
            l++;
        }
    }

    return result == Integer.MIN_VALUE ? -1 : result;
}
