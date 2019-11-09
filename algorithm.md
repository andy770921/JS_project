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
## Maze Problem - Using stack data structure
Q: 迷宮左上進，右下出，可以走的路線為 0 ，牆壁為 1，求路線為何 ?     
```js
const maze = [
  [0,0,0,0],
  [0,1,1,1],
  [0,0,0,0]
]
```
Ans: 定義左右為 x 軸、上下為 y 軸，最左上為座標原點 (0,0)，原點右方一格為 (1,0)，紀錄為 modifiedMaze[0][1]  
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
    pathStack.pop();
    let i = step.x; 
    let j = step.y; 
    let d = step.nextDirNum;
    while (d < 4){
      let g = i + move[d].hor;
      let h = j + move[d].ver;
      if (g === endY && h ===endX){
        console.log("find path! axis hostioy:", JSON.stringify(pathStack));
        console.log(mark)
        return;
      } else if (modifiedMaze[h][g] === 0 && mark[h][g] === 0){
        mark[h][g] = 1;
        path = {x: i, y: j, nextDirNum: d+1};
        pathStack.push(path);
        i = g; j = h; d = 0;
      } else { d++; }
    }
  } 
  console.log("there's no path to the end point")
}
findPath();
```
