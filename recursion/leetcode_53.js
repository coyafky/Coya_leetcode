//  最大子序列和
// 求取数组中最大连续子序列和，例如给定数组为 A = [1， 3， -2， 4， -5]， 则最大连续子序列和为 6，即 1 + 3 +（-2）+ 4 = 6。 去


// 题目说的子数组是连续的
// 题目只需要求和，不需要返回子数组的具体位置。
// 数组中的元素是整数，但是可能是正数，负数和 0。
// 子序列的最小长度为 1。
// 比如：
// 对于数组 [1, -2, 3, 5, -3, 2], 应该返回 3 + 5 = 8
// 对于数组 [0, -2, 3, 5, -1, 2], 应该返回 3 + 5 + -1 + 2 = 9
// 对于数组 [-9, -2, -3, -5, -3], 应该返回 -2

//  force

function LSS(list){
    const len = list.length;
    let max = -Number.MAX_VALUE;
    let sum = 0;
    for(let i = 0; i < len; i++){
        sum =0;
        for(let j = i; j < len; j++){
            sum+=list[j];
            max = Math.max(max, sum);
        }
    }

    return max;
}


// let a = [1, -2, 3, 5, -3, 2];
// console.time();
// console.log(LSS(a));
// console.timeEnd();
// default: 10.325ms


// 分治法

// 我们来分析一下这个问题， 我们先把数组平均分成左右两部分。
// 此时有三种情况：
// 最大子序列全部在数组左部分
// 最大子序列全部在数组右部分
// 最大子序列横跨左右数组
// 对于前两种情况，我们相当于将原问题转化为了规模更小的同样问题。
// 对于第三种情况，由于已知循环的起点（即中点），我们只需要进行一次循环，分别找出 左边和右边的最大子序列即可。

function divider (list , left, right){
    if(left === right) return list[left];
    let sum =0;
    let lmax =-Number.MAX_VALUE;
    let rmax = -Number.MAX_VALUE;

    let mid = Math.floor((left + right) / 2);

    const l  = divider(list, left, mid);
    const r = divider(list, mid + 1, right);

    for(let i = mid; i >= left; i--){
        sum += list[i];
        if(sum>lmax){
            lmax = sum;
        }
    }
    sum =0;

    for (let i= mid+1; i <= right; i++){
        sum+=list[i];
        if(sum>rmax){
            rmax = sum;
        }
    }

return Math.max(l, r, lmax + rmax);
}

function LSS(list){
    return divider(list, 0, list.length - 1);
}

let a = [1, -2, 3, 5, -3, 2,1,-2,3,5,-3,2];
console.time();
console.log(LSS(a));
console.timeEnd();
// default: 10.325ms