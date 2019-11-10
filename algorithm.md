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
let arr = [1, -100, 200, 2, 300];

for (let i = 0; i < arr.length - 2; i++){
  let minIndex = i;
  for (let j = i + 1; j < arr.length - 1; j++){
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
  // create stack to recoed path
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
      if (g === endY && h === endX){ // reach exit
        console.log("find path! axis hostioy:", JSON.stringify(pathStack));
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
