## Insertion Sort: 時間複雜度 O(n^2)

```js
function insertionSort(arr){
  for (let i = 1; i < arr.length; i++){
    const numToBeSorted = arr[i];
    let j = 0;
    for (j = i; j > 0 && arr[j-1] > numToBeSorted; j--){
      //  第 j 個 和第 j-1 個交換，步驟 1.: j-1 的值往後移至 j
      arr[j] = arr[j-1];
    }
    // 步驟 2.: 原先最右邊的值 ( arr[i] ) 指定到最左邊 第 j 個 ( 內層迴圈跑完後， j 是在需要交換的一串數字中最左邊的位置 )
    arr[j] = numToBeSorted;
  }
  console.log(arr);
}
insertionSort([1, -100, 200, 2, 300]);
```
## Selection Sort: 時間複雜度 O(n^2)

```js
function selectionSort(arr){
  for (let i = 0; i < arr.length - 1; i++){
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++){
      if (arr[j] < arr[minIndex]){
          minIndex = j;
        } 
      }
    // SWAP 交換 第 i 個 和第 minIndex 個
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  console.log(arr);
}
selectionSort([1, -100, 200, 2, 300]);
```

## Bubble Sort: 時間複雜度 O(n^2)

```js
function bubbleSort(arr){
  for (let i = 0; i < arr.length -1; i++){
    for (let j = arr.length -1; j > i; j--){
      if (arr[j] < arr[j-1]){
        // 交換 arr[j] 和 arr[j-1]
        const temp = arr[j];
        arr[j] = arr[j-1];
        arr[j-1] = temp;
      }
    }
  }
  console.log(arr);
}
bubbleSort([1, -100, 200, 2, 300, -5]);
```

## Binary Search: 時間複雜度 O(log n)
```js
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
## Merge Sort: 時間複雜度 O(nlogn)
解法一: https://www.youtube.com/watch?v=o1V9J3QR1ZQ  
```js
function mergeSort(arr){
  if (arr.length < 2){
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}
function merge(left, right){
  let result = [];
  while (left.length && right.length){
    if (left[0] <= right[0]){
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}
console.log(
  mergeSort([1, -100, 200, 2, 300, -5, 400, -500])
  );
```
解法二: merge 函數，用雙 index 移動的方式  
```js
function mergeSort(arr){
  if (arr.length < 2){
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}
function merge(left, right){
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (leftIndex <= left.length -1 && rightIndex <= right.length - 1){
    if (left[leftIndex] <= right[rightIndex]){
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  while (leftIndex <= left.length -1) {
    result.push(left[leftIndex]);
    leftIndex++;
  }
  while (rightIndex <= right.length - 1) {
    result.push(right[rightIndex]);
    rightIndex++;
  }
  return result;
}
console.log(
  mergeSort([1, -100, 200, 2, 300, -5, 400, -500])
  );
```

## Heap Sort: 不是 comparison based ，時間複雜度 O(nlogn)

1. heap 是 complete binary tree，且每個節點上的數值不能比父節點大/小。 heap 常用來實做 priority queue。
2. bottom-up insert 進 heap 一次，複雜度為 logn。
3. top-down delete heap 的 Min/Max 一次，複雜度為 logn
4. Heap Sort: 將 n 個數字 ，先逐一加入 Min/Max Heap ( 複雜度為 n x logn )，再將此 Heap delete 其 Min/Max 值 n 次 ( 複雜度 n x logn )，把 delete 的值逐一加入空陣列

```js
class MaxHeap {
  constructor(heapArr){
    this.maxHeap = heapArr;
  }
  insert(n){
    let newPosition = this.maxHeap.length + 1;
    while(newPosition >= 1){
      if (newPosition === 1) break; // at root
      
      const parentIndex = Math.floor(newPosition / 2) - 1;
      const currentIndex = newPosition - 1;
      if (n <= this.maxHeap[parentIndex]) break;
      this.maxHeap[currentIndex] = this.maxHeap[parentIndex]; // move parent to current
      newPosition = Math.floor(newPosition / 2);
    }
    this.maxHeap[newPosition - 1] = n;
    return this.maxHeap;
  }
  delete(){
    if (this.maxHeap.length === 0) return [];
    const maxNumber = this.maxHeap[0];
    const k = this.maxHeap[this.maxHeap.length - 1]; // keep the last value
    this.maxHeap.pop(); // delete last element in the original heap array
    let i = 0;
    for(let j = 1; j <= this.maxHeap.length - 1; j *= 2){
      if(j < this.maxHeap.length - 1){
        if(this.maxHeap[j] < this.maxHeap[j + 1]) j++;
        if(k > this.maxHeap[j]) break;
        this.maxHeap[i] = this.maxHeap[j];
        i = j; 
      }
    }
    this.maxHeap[i] = k;
    return maxNumber;
  }
}

function heapSort(arr){
  let heap = new MaxHeap([]);
  let sortedArr = [];
  for(let i = 0; i < arr.length; i++){
    heap.insert(arr[i]);
  }
  for(let i = 0; i < arr.length; i++){
    sortedArr.unshift(heap.delete()); // 可從小排到大
    // sortedArr.push(heap.delete()); // 可從大排到小
  }
  console.log(sortedArr);
  return sortedArr;
}


heapSort([1, -100, 200, 2, 300, -5]); // [-100, -5, 1, 2, 200, 300]

```
## Bucket Sort (Radix sort 基數排序): 不是 comparison based ，時間複雜度 O(nk)
1. n 個數字、最高 k 位數
2. k 決定了進行多少輪處理，而 n 是每輪處理的運算數目
3. Radix-Exchange sort (most significant bit MSB)
```js
function bucketSortMSB(arr){

  // 定義分類 bucket 函式，且當 bucket 內超過兩個數字以上，呼叫自身再遞迴計算
  function getBucketSort(stringArr, digit){
    const bucket = [[], [], [], [], [], [], [], [], [], []];
    for (let i = 0; i < stringArr.length; i++){
      const strNum = stringArr[i].slice(digit, digit + 1);
      bucket[Number(strNum)].push(stringArr[i]);
    }
    let sortedArr = [];
    for (let i = 0; i < bucket.length; i++){
      // 僅剩一個數在陣列中，就將字串轉成數字，丟回 sortedArr
      if (bucket[i].length === 1) sortedArr.push(Number(bucket[i][0])); 
      // 剩兩個數以上在陣列中，就遞迴再分類，遞迴算完的結果，丟回 sortedArr
      if (bucket[i].length >= 2) {
        const nextDigit = digit + 1;
        const nextSortedArr = getBucketSort(bucket[i], nextDigit);
        for (let j = 0; j < nextSortedArr.length; j++){
          sortedArr.push(nextSortedArr[j]);
        }
      }
    }
    
    return sortedArr;
  }
  // 產生字串陣列，找出最高位數的數字
  let maxDigit = 0;
  let stringArr = [];
  for(let i = 0; i < arr.length; i++){
    if (maxDigit < arr[i].toString().length){
      maxDigit = arr[i].toString().length;
    }
  }
  // 不足最高位數左邊補零
  for (let i = 0; i < arr.length; i++){
    let zeroSeries = '';
    if (maxDigit > arr[i].toString().length){
      const zeroAmount = maxDigit - arr[i].toString().length;
      for (let j = 0; j < zeroAmount; j++){ zeroSeries += '0'; }
    }
    stringArr.push(zeroSeries + arr[i].toString());
  }
  
  // 遞迴分類排序
  const sortedArray = getBucketSort(stringArr, 0);
  console.log(sortedArray);
  return sortedArray;
}

// 適用正數、非小數，數字不能重複。若是負數、小數、數字有重複，要寫額外邏輯，另外處理
bucketSortMSB([1, 200, 2, 300]); // [1, 2, 200, 300]
```
4. Straight-Radix sort (least significant bit LSB)
```js
function bucketSortLSB(arr){
  
  // array element with maximum k digit
  let k = 0;
  for(let i = 0; i < arr.length; i++){
    if (k < arr[i].toString().length){
      k = arr[i].toString().length;
    }
  }
  
  // convert to string array
  let stringArr = [];
  for (let i = 0; i < arr.length; i++){
    let zeroSeries = '';
    if (k > arr[i].toString().length){
      const zeroAmount = k - arr[i].toString().length;
      for (let j = 0; j < zeroAmount; j++){ zeroSeries += '0'; }
    }
    stringArr.push(zeroSeries + arr[i].toString());
  }
  
  // --- Straight Radix Algorithm begins ---
  
  // all element are initially in a global queue
  let globalQueue = [...stringArr];
  
  // Sort
  for(let i = k; i >= 1; i--){
    // initialize bucket queue to be empty
    let digitBucket = [];
    for (let x = 0; x < 10; x++){
      digitBucket.push([]);
    }
    
    // 從 Global Queue 取出並分類
    while(globalQueue.length > 0){
      const numberStr = globalQueue.shift();
      const d = Number(numberStr[i-1]);
      digitBucket[d].push(numberStr);
    }
    
    // 分類好之後，逐一放回 Global Queue
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < digitBucket[i].length; j++){
        globalQueue.push(digitBucket[i][j]);
      }
    }
  }
  
  let sortedArray = [];
  for(let i = 0; i < stringArr.length; i++){
    // pop stringArr[i] from global queue
    sortedArray.push(Number(globalQueue.shift()));
  }

  console.log(sortedArray);
  return sortedArray;
}

// 適用正數、非小數，數字可重複。若是負數、小數，要寫額外邏輯，另外處理
bucketSortLSB([1, 200, 2, 300, 2, 50]); // [1, 2, 2, 50, 200, 300]
```
5. Straight-Radix sort 應用 (找出最新版本號)
- `tagInfoList` 可能的值為 `[{tag: '1.2.3'}, {tag: '4.5.6'}, {tag: '4.5.7'}, {tag: '4.16.6'}]`
- n 個數字 (陣列有 4 個元素)、最高 k 位數 (被點點隔開有 3 個數字)，時間複雜度 O(nk) = O(4 * 3)
- 為了決定 bucket 數量，需找出最大數字，思路為: 掃一遍 (n 個元素的) 陣列，每一遍之內要再掃一次 (k 個) 被隔開的數字，複雜度也為 O(nk)
- 若陣列元素從 4 個擴展到 n 個，時間複雜度 O(3n)
```js
function findLatestVersion(tagInfoList) {
    const maxDigit = tagInfoList[0].tag.split('.').length;
    let maxNumber = 0;
    tagInfoList.forEach(tagInfoItem => {
        const numberList = tagInfoItem.tag.split('.');
        numberList.forEach(numStr => {
            if (maxNumber < Number(numStr)) {
                maxNumber = Number(numStr);
            }
        });
    });

    // all element are initially in a Global Queue
    const globalQueue = [...tagInfoList];

    // Sort
    for (let i = maxDigit; i >= 1; i -= 1) {
        // initialize bucket queue to be empty
        const digitBucket = [];
        for (let x = 0; x < maxNumber + 1; x += 1) {
            digitBucket.push([]);
        }

        // 從 Global Queue 取出並分類
        while (globalQueue.length > 0) {
            const tagInfo = globalQueue.shift();
            const d = Number(tagInfo.tag.split('.')[i - 1]);   
            digitBucket[d].push(tagInfo);
        }

        // 分類好之後，逐一放回 Global Queue
        for (let j = 0; j < maxNumber + 1 ; j += 1) {
            for (let k = 0; k < digitBucket[j].length; k += 1) {
                globalQueue.push(digitBucket[j][k]);
            }
        }
    }
 
    return globalQueue.pop();
}
console.log(findLatestVersion([{tag: '1.2.3'}, {tag: '4.5.6'}, {tag: '4.5.7'}, {tag: '4.6.6'}])); // { tag:'4.6.6'}
```


## Maze Problem - Using stack data structure
Q: 迷宮左上進，右下出，可以走的路線為 0 ，牆壁為 1，求路線為何 ?     
```js
const maze = [
  [0,0,0,0],
  [0,1,1,1],
  [0,0,0,0]
]
```
Ans: 定義左右為 x 軸、上下為 y 軸，最左上為座標原點 (0,0)，原點右方一格為 (1,0)，紀錄為 maze[0][1]。  
需要先將四周牆壁定出，故擴展原先二維陣列，變成 modifiedMaze 四週都環繞數值 1  
解題觀念: 需要有 可走的方向陣列 move、紀錄歷史路徑的陣列 mark 、剩餘可嘗試方向 & 答案座標的陣列 pathStack

```js
function findPath(){
  const modifiedMaze = [
    [1,1,1,1,1,1],
    [1,0,0,0,0,1],
    [1,0,1,1,1,1],
    [1,0,0,0,0,1],
    [1,1,1,1,1,1]
  ];
  let mark = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
  ]
  const move = [
    {name: 'north', hor: 0, ver: -1},
    {name: 'east', hor: 1, ver: 0},
    {name: 'south', hor: 0, ver: 1},
    {name: 'west', hor: -1, ver: 0},
  ];
  const endX = modifiedMaze[0].length - 2;
  const endY = modifiedMaze.length - 2;
  console.log(endX,endY);
  console.log(modifiedMaze[endY][endX]);
  // start at (1,1)
  mark[1][1] = 1;
  // create stack to record path
  let pathStack = [];
  let path = {x: 1, y: 1, nextDirNum: 0};
  pathStack.push(path);
  while(pathStack.length !== 0 ){ 
    // stack is not empty
    const step = pathStack[pathStack.length -1];
    pathStack.pop(); // unstack
    let i = step.x; 
    let j = step.y; 
    let d = step.nextDirNum;
    while (d < 4){
      let g = i + move[d].hor;
      let h = j + move[d].ver;
      if (g === endX && h === endY){ // reach exit
        path = {x: i, y: j };
        pathStack.push(path);
        console.log("find path! step histioy:", JSON.stringify(pathStack));
        return;
      } else if (modifiedMaze[h][g] === 0 && mark[h][g] === 0){ // new position
        mark[h][g] = 1;
        path = {x: i, y: j, nextDirNum: d+1};
        pathStack.push(path); // stack it. 
        // record history info: 
        // 1. step (i,j) 
        // 2. next triable direction if it goes back to (i,j) 
        i = g; j = h; d = 0; // move to (g,h)
      } else { d++; } // try next direction
    }
  } 
  console.log("there's no path to the end point")
}
findPath();
```
## forEach, map (HOF)
```js
// Q:

function forEach(list, fn){
  // CODE HERE:
};

forEach([2, 3, 4], console.log); // 2 3 4

// A:
function forEach(list, fn){
  for(let i = 0; i < list.length; i++){
    fn(list[i]);
  }
};

// Q:

function map(list, fn){
  // CODE HERE:
}

const ans = map([2, 3, 4], x => x*2 ); 
console.log(ans);  // [4, 6, 8]

// A:
function map(list, fn){
  const newList = [];
  for(let i = 0; i < list.length; i++){
    newList.push(fn(list[i]));
  }
  return newList;
}

```
## Once (HOF, closure)
```js
Q:
function once(fn){
  // TODO

}

const log = () => console.log("hello");
const onceLog = once(log);
onceLog(); // hello
onceLog();
onceLog();


A:
function once(fn){
  let times = 0;
  return () => {
    times ++;
    if (times <= 1) fn();
  }
}

```
## debounce (HOF, closure)
```js
// debounce
// threashold      : |   |
// event stream    : |  |  |  |
// expected outcome:              |
function debounce(fn, interval=300){
  let startTime = null;
  let endTime = null;
  return () => {
    startTime = Date.now();
    setTimeout(
      () => {
        endTime = Date.now();
        if (endTime - startTime >= interval){ 
          fn(); 
        }
      }
      ,interval);
  }
}
function A(){
  console.log("hi");
}
let B = debounce(A, 2000);

```

```js
function debounce(fn, interval = 300){
  let timeoutId = null;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(
      () => fn();
      ,interval);
  }
}
function A(){
  console.log("hi");
}
let B = debounce(A, 2000);
```
better:
```js
function debounce(fn, interval = 300){
  let timeoutId = null;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(()=>{
      timeoutId = null;
      fn(...args);
      },interval);
  }
}
function A(x){
  console.log(x);
}
let B = debounce(()=>A("hi"), 2000);
```
Ref: https://gist.github.com/nmsdvid/8807205
