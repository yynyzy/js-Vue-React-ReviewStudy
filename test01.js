/*
有一个序列，仅包含 1 和 -1 两种数字。
问有多少个连续的子序列，序列中的数字乘积为正。n <= 5000。
*/
```js
function helper(arr,n){
    let ans = 0
    for(let i=0;i<n;i++){
        let temp=1
        for(let j=i;j<n;++j){
           temp*=arr[j]
           if(temp>0){
               ans++
           }
        }
    }

    return ans
 }
console.log(helper([1,-1,-1,1],4));
```
