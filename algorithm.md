## Selection Sort

```js
let arr = [1, -100, 200, 2, 300];

for (let i = 0; i < arr.length; i++){
  let minIndex = i;
  for (let j = i + 1; j < arr.length; j++){
    if (arr[j] < arr[i]){
        minIndex = j;
      } 
    }
  // SWAP 交換 第 i 個 和第 minIndex 個
  let arr_i = arr[i];
  arr[i] = arr[minIndex];
  arr[minIndex] = arr_i;
}
console.log(arr);
```
## Binary Search
```
function binarySearch(arr, inputNum){
  let leftIndex = 0;
  let rightIndex = arr.length - 1;
  while (leftIndex <= rightIndex){
    let middle = Math.floor((leftIndex + rightIndex) /2);
    if (arr[middle] > inputNum) {rightIndex = middle - 1;}
    else if (arr[middle] < inputNum) {leftIndex = middle + 1;}
    else { return arr[middle]}


  }
}
console.log(binarySearch([-100, 1, 2, 200, 300],200));
```
