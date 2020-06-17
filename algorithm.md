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
    if (arr[middle] > inputNum) rightIndex = middle - 1;
    else if (arr[middle] < inputNum) leftIndex = middle + 1;
    else return arr[middle]
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
## String Matching - KMP

1. 定義: 
- input: 兩參數，p 為字串模板、t 為待比對字串。p 字串長度為 m、t 字串長度為 n
- output: 若有完全符合模版者，回傳字串開始的 index，若無符合者，回傳 -1 
```js
const p1 = "ABABC";
const t1 = "ABABABCCA";

function strMatching(p, t){
  // TODOS
}

console.log(strMatching(p1, t1)); // 2
// ||ABABC
// ABABABCCA
```
2. 一般解法: 複雜度 O(mn)
```js
const p1 = "ABABC";
const t1 = "ABABABCCA";

function strMatching(p, t){
  for (let i = 0; i < t.length; i++){
    let j = 0;
    while (t[i+j] === p[j] && j < p.length){
      j++;
    }
    // max compared times: p.length
    // j last time at the begining of while loop: p.length -1;
    // j last time at the end of while loop: p.length;   
    if (j === p.length) return i;
  }
  return -1;
}

console.log(strMatching(p1, t1)); // 2
```
3. KMP(Knuth-Morris-Pratt) 演算法: 複雜度 O(m+n)
- 核心精神: 若比對失敗，一次不要只右移一個 index
- 實作步驟一: 使用 failure array，記錄上次比對失敗的例子中，有哪些字串頭尾重複的部分。可定義 failed array 的長度，跟 p ( 字串模板 ) 長度一樣
- 實作步驟二: 使用 failure function ( 又稱 prefix function ) 找出 failure array，即 p (字串模板) 最前和最後的最大重複字元
- failure function: p 為字串模板， q 為字元所在的 index，k 為函式回傳值，意義為最大重複字元的長度，比如兩個字元可對應到 k = 2
- Π (pi) 或 k 的意義為，把 index 為 q 的字元當成最右邊的字元，最右邊往左數，數幾個字元，會跟從頭往右數完全一樣
- k 一定小於 q + 1 ( q + 1 為最右邊字元的 index + 1，意為所取範圍的總字元長度 )
- 實作步驟三: 搜尋待比對字串 t
- 複雜度: 計算 failure array 為 O(m)；搜尋待比對字串為 O(n)。總複雜度為 O(m+n)
```js
const p1 = "ababaca";

function computeFailureArray(p){
  let k = 0;
  const failureArray = [0];           // index = 0 只有一個字元，不會重複
  for (let q = 1; q < p.length; q++){ // 範圍是從 index = 1 兩個字元，到最大的 index = 字串模板長度減一 ( 小於 p.length )
    while (k > 0 && p[k] !== p[q]){
      k = failureArray[k];            // 如果發現末字不同，現存最大長度，減一再減一，退位檢查字元是否相同
    }
    if (p[k] === p[q]) k++;           // 如果末字一樣，重複字元長度加一
    failureArray[q] = k;
  }
  return failureArray;
}

console.log(computeFailureArray(p1));    // [0,0,1,2,3,0,1]
console.log(computeFailureArray(p1)[2]); // 字串為 aba，最大重複字元長度為 1，不能是 3 ( 一定要小於總字元長度 )
console.log(computeFailureArray(p1)[4]); // 字串為 ababa，最大重複字元長度為 3，不能是 5 ( 理由同上 )
```
```js
const p1 = "ababaca";
const t1 = "bacbabababacaab";
const p2 = "ABABC";
const t2 = "ABABABCCA";

function kmp(p, t){
  function computeFailureFunction(patternStr){
    let k = 0;
    const failureArray = [0];
    for (let q = 1; q < patternStr.length; q++){
      while (k > 0 && patternStr[k] !== patternStr[q]){
        k = failureArray[k];
      }
      if (patternStr[k] === patternStr[q]) k++;
      failureArray[q] = k;
    }
    return (index) => failureArray[index];
  }

  let matchedCharNum = 0;
  const failureFunction = computeFailureFunction(p);
  for (let i = 0; i < t.length; i++){
    while (matchedCharNum > 0 && p[matchedCharNum] !== t[i]){
      // 進入此迴圈的範例如下
      // 5 > 0 且 p[5] !== t[9] ，意為之前有 5 個字母吻合，現在第 6 個字母 (在 t 第 9 個 index) 不吻合 
      // 之前有 5 個字母吻合，failureFunction 要代入吻合字串的最右 index，即 5 - 1= 4
      matchedCharNum = failureFunction(matchedCharNum - 1); 
    }
    if (p[matchedCharNum] === t[i]) matchedCharNum++;
    if (matchedCharNum === p.length) return i - p.length + 1;
  }
  return -1;
}

console.log(kmp(p1, t1));    // 6 (t1 第 6 個 index 開始後的字串，比對後完全符合)
console.log(kmp(p2, t2));    // 2
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

# Devide and Conquer
- Step: Devide -> Conquer -> Conbine
- 優點: 
  1. 大的問題拆小容易思考
  2. 容易找出有效率的演算法
  3. 利於平行運算 ( 因為需要計算的小單元彼此獨立，可獨立計算 )
  4. 利於記憶體存取 ( 資料可分散存在不同的 cache，不用都在主記憶體 )

## Recurrence 範例 - Fibonacci 數列: 時間複雜度 O(2^n)
- 定義: 一個等式或不等式。這個等式或不等式的描述為一個函式，用「代入更小輸入值的函式本身」表示。
- [Ref](https://youtu.be/ywJJvBwha4s?t=809)
- 優點: 結構清晰
- 缺點: 效率不好
- Ex: F(n) = F(n-1) + F(n-2)
```js
// Fibonacci
function fib(n){
    if(n < 2) return 1;           // Base Case (terminal condition)           
    return fib(n-1) + fib(n-2);   // Recursive Case
}
console.log(fib(8));
// 34
```

## Fibonacci 數列的 Non-Recurrence 寫法 ( dynamic programming with bottom-up memorization )
- 優點: 效率好
- 缺點: 結構不清晰

```js
// Non-recursive Fibonacci
function nonRecurFib(n){
    if(n < 2) return 1;
    const a = [1, 1];
    for (let i = 2; i <= n; i++){
      a[i] = a[i-1] + a[i-2];
    }
    return a[n];
}
console.log(nonRecurFib(8));
// 34
```
## Recurrence 範例 - 河內塔: 時間複雜度 O(2^n)
```js
// hanoi ( n disk )
function hanoi(n, srcRod, destinationRod, sapreRad){
    if(n == 1){
        console.log(`Move ${n}-level disk from ${srcRod} to ${destinationRod}`);
    } else {
        hanoi(n-1, srcRod, sapreRad, destinationRod);
        console.log(`Move ${n}-level disk from ${srcRod} to ${destinationRod}`);
        hanoi(n-1, sapreRad, destinationRod, srcRod);
    }
}
hanoi(3, 'A', 'C', 'B');
/*
Move 1-level disk from A to C
Move 2-level disk from A to B
Move 1-level disk from C to B
Move 3-level disk from A to C
Move 1-level disk from B to A
Move 2-level disk from B to C
Move 1-level disk from A to C
*/
```
##  Recurrence 範例 - Merge Sort: 時間複雜度 O(nlogn)
- Devide => conquer => combine
- 時間複雜度分析: 
  1. devide: O(1)
  2. conquer - base case: O(1)
  3. conquer - recursive case: O(logn)
  4. combine - O(n)
- 複雜度計算: 當 T(1) 的複雜度為已知值 O(1)，故當 T(n/2^k) 為 T(1) 時，可確知複雜度為 O(1)，推導出 2^k = n
![image](https://github.com/andy770921/JS_project/blob/master/imgs/merge_sort_1.png) 
```js
function mergeSort(arr, startIndex, endIndex){
    // base case
    if (startIndex == endIndex) return;
    // recursive case
    // 1. devide
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    // 2. conquer
    mergeSort(arr, startIndex, midIndex);
    mergeSort(arr, midIndex+1, endIndex);
    // 3. combine
    merge(arr, startIndex, midIndex, endIndex);
    return arr;
}

function merge(arr, p, q, r) {
    const originalArr = [...arr];
    let indexOne = p;
    let indexTwo = q+1;
    for (let i = p; i < r+1; i++){
        if(indexOne <= q && indexTwo <= r){
            if (originalArr[indexOne] < originalArr[indexTwo]){
                arr[i] = originalArr[indexOne];
                indexOne++;
            } else {
                arr[i] = originalArr[indexTwo];
                indexTwo++;
            }
        } else if(indexOne <= q){
            arr[i] = originalArr[indexOne];
            indexOne++;
        } else if(indexTwo <= r){
            arr[i] = originalArr[indexTwo];
            indexTwo++;
        }
    }
}
console.log(mergeSort([5,2,3,4,1], 0, 4)); // [1,2,3,4,5]
console.log(mergeSort([3,5,2,4,1], 0, 4)); // [1,2,3,4,5]
```
##  Recurrence 範例 - Maximum Subarray Problem: 時間複雜度 O(nlogn)
- 找出某區間，區間內所有數累加後會是最大，回傳區間的起始 index 與結束 index
- Note: 用動態規劃可降至 O(n)

```js
const testArrayOne = [3, 7, 9, 17, 5, 28, 21, 18, 6, 4];
const testArrayTwo = [-3, 7, -9, 17, -5, 28, -21, 18, -6, 4];
const testArrayThree = [-3, -7, -9, -17, -5, -28, -21, -18, -6, -4];

function findMaxInterval(a){
    // TODOS

}
console.log(findMaxInterval(testArrayOne)); 
// { startIndex: 0, endIndex: 9 }
console.log(findMaxInterval(testArrayTwo)); 
// { startIndex: 3, endIndex: 5 }
console.log(findMaxInterval(testArrayThree)); 
// { startIndex: 0, endIndex: 0 }
```
- Brute Force: O(n^3)

```js
//  initialize a squre matrix: O(n^2)
//  calculate summation and save: O(n^3)
//  find champion: O(n^2)

const testArrayOne = [3, 7, 9, 17, 5, 28, 21, 18, 6, 4];
const testArrayTwo = [-3, 7, -9, 17, -5, 28, -21, 18, -6, 4];
const testArrayThree = [-3, -7, -9, -17, -5, -28, -21, -18, -6, -4];

function findChampion(squreMatrix){
    let max = -Infinity;
    let startIndex = -1;
    let endIndex = -1;
    for(let i = 0; i < squreMatrix.length; i++){
        for(let j = 0; j < squreMatrix.length; j++){
            if(max < squreMatrix[i][j]) {
                max = squreMatrix[i][j];
                startIndex = i;
                endIndex = j;
            }
        }
    }
    return { max, startIndex, endIndex };
}

function findMaxInterval(a){
    // initialize a squre matrix: O(n^2)
    const s = [];
    for(let i = 0; i < a.length; i++){
        s[i] = [];
        for(let j = 0; j < a.length; j++){
            s[i][j] = -Infinity;
        }
    }
    // For each possible interval, save summation in the squre matrix: O(n^3)
    for(let i = 0; i < a.length; i++){
        for(let j = i; j < a.length; j++){
            let sum = 0;
            for(let k = i; k <= j; k++){
                sum += a[k];
            }
            s[i][j] = sum;
        }
    }
    return findChampion(s); // O(n^2)
}
console.log(findMaxInterval(testArrayOne)); 
// { max:118, startIndex: 0, endIndex: 9 }
console.log(findMaxInterval(testArrayTwo)); 
// { max:40, startIndex: 3, endIndex: 5 }
console.log(findMaxInterval(testArrayThree)); 
// { max:-3, startIndex: 0, endIndex: 0 }
```
- Brute Force: O(n^2)
```js
const testArrayOne = [3, 7, 9, 17, 5, 28, 21, 18, 6, 4];
const testArrayTwo = [-3, 7, -9, 17, -5, 28, -21, 18, -6, 4];
const testArrayThree = [-3, -7, -9, -17, -5, -28, -21, -18, -6, -4];

function findChampion(squreMatrix){
    let max = -Infinity;
    let startIndex = -1;
    let endIndex = -1;
    for(let i = 0; i < squreMatrix.length; i++){
        for(let j = 0; j < squreMatrix.length; j++){
            if(max < squreMatrix[i][j]) {
                max = squreMatrix[i][j];
                startIndex = i;
                endIndex = j;
            }
        }
    }
    return { max, startIndex, endIndex };
}

function findMaxInterval(a){
    // initialize a squre matrix: O(n^2)
    const s = [];
    for(let i = 0; i < a.length; i++){
        s[i] = [];
        for(let j = 0; j < a.length; j++){
            s[i][j] = -Infinity;
        }
    }
    // build summation table in an array: O(n)
    const r = [0];
    for (let i = 1; i <= a.length; i++){
        r[i] = r[i-1] + a[i-1];
    }
    // save result in the squre matrix: O(n^2)
    for(let i = 0; i < a.length; i++){
        for(let j = i; j < a.length; j++){
            s[i][j] = r[j+1] - r[i];
        }
    }

    return findChampion(s); // O(n^2)
}
console.log(findMaxInterval(testArrayOne)); 
// { max:118, startIndex: 0, endIndex: 9 }
console.log(findMaxInterval(testArrayTwo)); 
// { max:40, startIndex: 3, endIndex: 5 }
console.log(findMaxInterval(testArrayThree)); 
// { max:-3, startIndex: 0, endIndex: 0 }
```
# Dynamic Programming 動態規劃
- 隨時間而陸續新增資料的填表法 ( time-varying tubular method )
- 核心精神 1 : 將問題拆成相依且彼此重疊的子問題，可避免重複計算
- 核心精神 2 : 大問題的最佳解，是由每個子問題的最佳解，建構出來 
- Ex: Fibonacci

## Dynamic Programming 範例 - Fibonacci 數列: 時間複雜度 O(n)
- Top-down with memorization
```js
// Fibonacci: Top-down with memorization
function memorizedFib(n){
    // initialize memo array a[]
    const a = [...Array(n)].map(() => 0);
    a[0] = 1;
    a[1] = 1;
    return memorizedFibAux(n, a);
}

function memorizedFibAux (n, memoArr){
    if (memoArr[n] > 0) return memoArr[n];
    else {
        // save the result to avoid recomputation
        memoArr[n] = memorizedFibAux(n-1, memoArr) + memorizedFibAux(n-2, memoArr);
        return memoArr[n];
    }
}

console.log(memorizedFib(8));
// 34
```
- Bottom-up with memorization
```js
// Fibonacci: Bottom-up with memorization
function memorizedFib(n){
    if(n < 2) return 1;
    const a = [1, 1];
    for (let i = 2; i <= n; i++){
      a[i] = a[i-1] + a[i-2];
    }
    return a[n];
}
console.log(memorizedFib(8));
// 34
```
