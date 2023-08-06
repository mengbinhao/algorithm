# Algorithm

Some frequent leetcode questions implement by JavaScript

### 易混淆

- 盛最多水的容器
  - 双循环不重复
  - 双指针夹逼
- 最大矩形的面积
  - 固定高向两边扫一遍求最长底边
  - 单调递增栈
    - 哨兵消除循环一遍后stack非空的逻辑
- 接雨水
  - 固定i，左右扫
  - 单调递减栈
  - 双指针夹逼

### 前缀和

- 53
- 238 前缀积
- 560 前缀和 + hash

### 最长系列

#### 最长公共前缀

- 纵向扫描(better)
- 横向扫描

#### 无重复字符的最长子串

- slideWindow

#### 最长连续序列

- hash

#### 最长连续递增序列

- greedy

#### 最长有效括号

- brute force
- stack
- 正逆向
- DP

#### 最长回文子串

- brute force
- DP
- 中心扩展法

#### DP

- 最长递增子序列
- 最长回文子序列
- 最长公共子序列
- 最长重复子数组
- 连续子数组的最大和
