## Array
- 可實作出 Hash Table
- Array List ( 動態長度的 Array )
- String Builder ( 避免以下範例 sentence 複製 5 個、10 個、15 個字元，若每複製一個字元時間相等，時間複雜度會變成 O(n^2) )
- Note: 共複製三次，每次複製的字元個數越來越多
```js
const strArray = ['aaaaa', 'bbbbb', 'ccccc']; // Array 長度 n，此例為 3
const sentence = '';
for(let i = 0; i < strArray.length; i++){
    sentence += strArray[i];
}
```
### Array 運用 Hash Table 的概念，題目範例

1. 確認一個字串是否所有字元都是唯一
```js
function checkIsUniqueChars(str) {
  // TODOS
}
  
console.log(checkIsUniqueChars('abc')); // true
console.log(checkIsUniqueChars('aabc')); // false
```
- 做題前確認：字元編碼為何
- 字元編碼：分為 ASCII (使用 8 bit，共定義了 128 個字元，首位為 0 ) 及 Unicode ( 使用 16 bit，可以表示 2^16 = 65536 個字元 )
- Unicode, UTF-8, UTF-16：[Ref](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/709738/)
- EASCII：Extended ASCII，是將 ASCII 碼由 7 bit 擴充為 8 bit 而成
- ASCII characters are a subset of Unicode. [Ref](https://stackoverflow.com/questions/40008875/can-we-convert-unicode-to-ascii-in-javascript-charcodeat-is-only-for-unicode)
- JS string 可用 .charCodeAt(index)，執行此方法後，可得到 0 到 65535 之間的整數，表示給定索引處的 UTF-16 代碼單元
- 解法一：使用總長為 128 的布林值陣列，若字串長度為 n，時間複雜度 O(n), 空間複雜度 O(128) = O(1)
```js
function checkIsUniqueChars(str) {
  // assume using ASCII 
  if (str.length > 128) return false;
  
  const existedCharCodeList = [...Array(128)].map(() => false);
  
  for (let i = 0; i < str.length; i++){
    const code = str.charCodeAt(i);
    if (existedCharCodeList[code]) {
      // was appeared once
      return false;
    }
    existedCharCodeList[code] = true;
  }
  return true;
}
  
console.log(checkIsUniqueChars('abc')); // true
console.log(checkIsUniqueChars('aabc')); // false
```
- 解法二：巢狀迴圈比字串的每個字元
- 解法三：先排序再比鄰近的

2. 確認兩字串是否重組後會一致
```js
function checkIsPermutation(strX, strY) {
  // TODOS
}

console.log(checkIsPermutation('abc', 'xyz')); // false
console.log(checkIsPermutation('god', 'dog')); // true
console.log(checkIsPermutation('God', 'dog')); // false
```
- 做題前確認：輸入字串的大小寫是判定為不同的、空白會被計入字元
- 解法一：運用陣列排序比較，易讀
```js
function sortString(str) {
  return Array.from(str).sort().join('');
}

function checkIsPermutation(strX, strY) {
  if (strX.length !== strY.length) return false;
  return sortString(strX) === sortString(strY);
}

console.log(checkIsPermutation('abc', 'xyz')); // false
console.log(checkIsPermutation('god', 'dog')); // true
console.log(checkIsPermutation('God', 'dog')); // false
```
- 解法二：使用 hash table 記錄出現的字元次數
```js
function checkIsPermutation(strX, strY) {
  if (strX.length !== strY.length) return false;
  
  // assume using ASCII, initial 0 means times of appearance 
  const existedLetterCodeList = [...Array(128)].map(() => 0);

  for (let i = 0; i < strX.length; i++){
    existedLetterCodeList[strX.charCodeAt(i)] += 1;
  }
  
  for (let i = 0; i < strY.length; i++){
    existedLetterCodeList[strY.charCodeAt(i)] -= 1;
    if(existedLetterCodeList[strY.charCodeAt(i)] < 0) {
      return false;
    } 
  }
  return true;
}

console.log(checkIsPermutation('abc', 'xyz')); // false
console.log(checkIsPermutation('god', 'dog')); // true
console.log(checkIsPermutation('God', 'dog')); // false
```

## Linked List
Ref: https://hiskio.com/courses/126/lectures/4310  
Ex: 製造兩個節點的 Linked List  
![image](https://github.com/andy770921/JS_project/blob/master/imgs/linkedList_1.png)  
```js
function ListNode(value) {
  this.data = value;
  this.link = null;
}

function createLinkedList() {
  const first = new ListNode(10);
  first.link = new ListNode(20);
  
  console.log(first);         //  [Object] { data: 10, link: [Object] }
  console.log(first.link);    //  [Object] { data: 20, link: null }
}

createLinkedList();
```
Ex: 承上題，在值為 10 及 20 的節點中間，加入一個值為 50 的節點  
![image](https://github.com/andy770921/JS_project/blob/master/imgs/linkedList_2.png)  
```js
function ListNode(value) {
  this.data = value;
  this.link = null;
}

// 將 new ListNode(10) 的位址指定給 first， first 會指向 new ListNode(10)
const first = nodeTen = new ListNode(10);

// 對 new 出的 ListNode(10) instance ，修改裡面的內容
first.link = new ListNode(20);

// insert new node after node x
function insert50 (x){
  const insertNode = new ListNode(50);
  
  // 如果整串 List 是空的，將 insertNode 的位址，指定給 first
  if (first === undefined){
    first = insertNode;
    return;
  }
  // 如果整串 List 不是空的，且有給定 x ，欲在 x 後面加入節點
  insertNode.link = x.link;
  x.link = insertNode;
}
insert50(nodeTen);

console.log(first);         //  [Object] { data: 10, link: [Object] }
console.log(first.link);    //  [Object] { data: 50, link: [Object] }
```
### 建構 Linked List、新增節點、刪除節點
```js
class Node {
  constructor(d){
    this.next = null;
    this.data = d;
  }

  appendToTail(d){
    const endNode = new Node(d);
    let currentNode = this;
    while(currentNode.next !== null){
      currentNode = currentNode.next;
    }
    currentNode.next = endNode;
    return this;
  }

  deleteNode(head, dataToBeDeleted){
    if (head.data === dataToBeDeleted){
      // 如果首節點的資料和待刪除資料一致，移動首節點
      return head.next;
    }

    const currentNode = head;
    while (currentNode.next !== null){
      if (currentNode.next.data === dataToBeDeleted){
        currentNode.next = currentNode.next.next;
        return head;
      }
      currentNode = currentNode.next;
    }
    return head;
  }
}

const headNode = new Node(1);
const linkedList = headNode.appendToTail(2).appendToTail(3);

console.log(linkedList);
// Node { next: { next: { next: null, data:3 }, data:2 }, data:1 }

console.log(linkedList.deleteNode(headNode, 2));
// Node { next: { next: null, data:3 }, data:1 }
```

## Stack 
- 使用 Linked List，實作 Stack (TypeScript)
```ts
class Node<T> {
  public data: T;
  public next: Node<T> | null;

  constructor(data: T){
    this.data = data;
    this.next = null;
  }
}

class Stack<T> {
  private top: Node<T> | null;

  constructor(arr?: T[]){
    this.top = null;
    if(arr?.length > 1) {
      for(let i = 0; i < arr.length; i++){
        this.push(arr[i]);
      }
    }
  }

  public pop(){
    if(this.top === null) throw new Error('stack is empty');
    const item: T = this.top.data;
    this.top = this.top.next;
    return item;
  } 

  public push(item: T){
    const node = new Node<T>(item);
    node.next = this.top;
    this.top = node;
  } 

  public peek(){
    if (this.top === null) throw new Error('stack is empty');
    return this.top.data;
  }

  public isEmpty(){
    return this.top === null;
  }
}

const myStack = new Stack<number>([1,2,3]);
myStack.pop();
console.log(myStack.peek()); // 2
myStack.push(100);
console.log(myStack.peek()); // 100
myStack.pop();
console.log(myStack.peek()); // 2
```
- 使用 Resized Array，實作 Stack  
  Ref: https://www.coursera.org/lecture/algorithms-part1/resizing-arrays-WTFO7  
  可變大小 array 縮小的邏輯是，當 array 變成 1/4 滿，就減半當下長度 ( 減半後，原本 1/4 滿，變成半滿 )  
  不設計成當長度半滿時減半，原因是可避免在剛好滿的狀態重複操作 pop push，每操作一次就改變大小一次 ( 避免 thrashing = 往復移動 )  
```js
class Stack {
  arr = [...Array(1)];
  N = 0;

  resize(capacity){ // private
    const copy =  [...Array(capacity)];
    for(let i = 0; i < this.N; i++){
      copy[i] = this.arr[i];
    }
    this.arr = copy;
  }

  push(item){
    if(this.N === this.arr.length) this.resize(2 * this.arr.length);
    this.arr[this.N++] = item;
  }

  pop(){
    if(this.N === 0) throw new Error('stack is empty');
    const item = this.arr[--this.N];
    //  this.arr[this.N] = null; <= for Java, avoid loitering (holding reference no longer needed)
    if(this.N > 0 && this.N === this.arr.length / 4) this.resize(this.arr.length / 2);
    return item;
  }
}

const myStack = new Stack();
myStack.push(100);
myStack.push(200);
console.log(myStack.pop());  // 200
console.log(myStack.pop());  // 100
```
- Resized Array 相比於 Linked List 優點：  
  Resized Array 使用更少空間，Linked list 每多一筆資料，需要多一個物件，物件裡面又要存 next 和 data，也多一個名稱為 Node 的 class，這些消耗加起來，比可改變大小的 array 大
- Resized Array 相比於 Linked List 缺點：  
  Resized Array 在最差的情況 (pop 或 push 剛好要改變 array 大小時)，運算的時間複雜度為 O(N) 

- 使用不變長度的 Array，實作三等份 Stack
```js
class FixedMultiStack {
  constructor(originalArr, numOfStacks){
    this.values = [...originalArr];
    this.numOfStacks = numOfStacks;
    this.maxStackSize = originalArr.length / numOfStacks;
    this.currentStackSizes = [...Array(numOfStacks)].map((_, stackNum) => {
        let currentSize = 0;
        for(let i = stackNum * this.maxStackSize; i < (stackNum + 1) * this.maxStackSize; i++){
          if (originalArr[i] !== undefined) currentSize++;
        }
        return currentSize;
      });
  }

  isEmpty(stackNum){
    return this.currentStackSizes[stackNum] === 0;
  }

  isFull(stackNum){
    return this.currentStackSizes[stackNum] === this.maxStackSize;
  }

  indexOfTop(stackNum){
    const offset = stackNum * this.maxStackSize;
    const size = this.currentStackSizes[stackNum];
    return offset + size - 1;
  }
  push(stackNum, value){
    if(this.isFull(stackNum)) throw new Error(`stack number ${stackNum} is full`);
    this.currentStackSizes[stackNum]++;
    this.values[this.indexOfTop(stackNum)] = value;
    return value;
  }
  
  pop(stackNum){
    if(this.isEmpty(stackNum)) throw new Error(`stack number ${stackNum} is empty`);
    const value = this.values[this.indexOfTop(stackNum)];
    this.values[this.indexOfTop(stackNum)] = 0;
    this.currentStackSizes[stackNum]--;
    return value;
  }

  peek(stackNum){
    if(this.isEmpty(stackNum)) throw new Error(`stack number ${stackNum} is empty`);
    return this.values[this.indexOfTop(stackNum)];;
  }
}
const testMultiStack = new FixedMultiStack([1,2,3,4,5,6,7,8,9,10,11,12], 3);

console.log(testMultiStack.pop(1)); // 8
console.log(testMultiStack.pop(1)); // 7
console.log(testMultiStack.pop(2)); // 12
console.log(testMultiStack.peek(2)); // 11
console.log(testMultiStack.push(1, 100)); // 100
console.log(testMultiStack.values) 
// [1,2,3,4,5,6,100,0,9,10,11,0]
```
- 在 O(1) 的限制下，實作能取出最小值的 Stack (TypeScript)
```ts
class Node<T> {
  public data: T;
  public next: Node<T> | null;

  constructor(data: T){
    this.data = data;
    this.next = null;
  }
}

class Stack<T> {
  private top: Node<T>| null;

  constructor(arr?: T[]){
    this.top = null;
    if(arr?.length > 1) {
      for(let i = 0; i < arr.length; i++){
        this.push(arr[i]);
      }
    }
  }

  public pop(){
    if(this.top === null) throw new Error('stack is empty');
    const item: T = this.top.data;
    this.top = this.top.next;
    return item;
  } 

  public push(item: T){
    const node = new Node(item);
    node.next = this.top;
    this.top = node;
  } 

  public peek(){
    if (this.top === null) throw new Error('stack is empty');
    return this.top.data;
  }

  public isEmpty(){
    return this.top === null;
  }
}

class NodeWithMin {
  min: number;
  value: number;
  constructor(value: number, min: number){
    this.value = value;
    this.min = min;
  }
}

class StackWithMin extends Stack<NodeWithMin> {
  constructor(arr?: number[]){
    super();
    if(arr?.length > 1) {
      for(let i = 0; i < arr.length; i++){
        this.push(arr[i]);
      }
    }
  }
  
  min(){
    if(this.isEmpty()){
      return Infinity; // edge value
    } else {
      return this.peek().min;
    }
  }

  push(value: any){ // type should be number
    const newMin = Math.min(value, this.min());
    super.push(new NodeWithMin(value, newMin));
  }
}

const myStackWithMin = new StackWithMin([2,1,3]);
myStackWithMin.push(100);
console.log(myStackWithMin.peek().value); // 100
console.log(myStackWithMin.peek().min); // 1
myStackWithMin.pop();
console.log(myStackWithMin.peek().value); // 3
console.log(myStackWithMin.peek().min); // 1
myStackWithMin.pop();
console.log(myStackWithMin.peek().value); // 1
console.log(myStackWithMin.peek().min); // 1
myStackWithMin.pop();
console.log(myStackWithMin.peek().value); // 2
console.log(myStackWithMin.peek().min); // 2
```
- Note: TypeScript 型別在繼承後，要統一，不然會出錯，本處使用的型別不同，難以修正，[Ref](https://stackoverflow.com/questions/38025364/typescript-child-class-function-overloading)

## Binary Tree
1. Inorder, post-order, pre-order, level-order Traverse:
![image](https://github.com/andy770921/JS_project/blob/master/imgs/BinaryTree_2.png) 
2. Inorder Traverse:
![image](https://github.com/andy770921/JS_project/blob/master/imgs/BinaryTree_1.png) 
```js
class TreeNode {
  constructor(data, leftChild = null, rightChild = null){
    this.data = data;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }

}
class BinaryTree{
  constructor(rootNode){
    this.root = rootNode;
  }
  
  static inorderTraverse = (currentNode) => {
    if(currentNode){
      this.inorderTraverse(currentNode.leftChild);
      console.log(currentNode.data);
      this.inorderTraverse(currentNode.rightChild);
    }
  }
  static preorderTraverse = (currentNode) => {
    if(currentNode){
      console.log(currentNode.data);
      this.preorderTraverse(currentNode.leftChild);
      this.preorderTraverse(currentNode.rightChild);
    }
  }
  static postorderTraverse = (currentNode) => {
    if(currentNode){
      this.postorderTraverse(currentNode.leftChild);
      this.postorderTraverse(currentNode.rightChild);
      console.log(currentNode.data);
    }
  }
  static inorderNonRecursive = (currentNode) => {
    const stack = [];
    while (true){
      while(currentNode){
        stack.push(currentNode);
        currentNode = currentNode.leftChild;
      }
      if(stack.length >= 1){
        currentNode = stack.pop();
        console.log(currentNode.data);
        currentNode = currentNode.rightChild;
      } else break;
    }
  }
  static levelOrderTraverse = (currentNode) => {
    const queue = [];
    while (true){
      console.log(currentNode.data);
      if (currentNode.leftChild){
        queue.push(currentNode.leftChild);
      }
      if (currentNode.rightChild){
        queue.push(currentNode.rightChild);
      }
      if(queue.length >= 1){
        currentNode = queue.shift();
      } else break;
    }
  }
  static copyTree = (InputBinaryTree) => {
    function copyNode(originalNode){
      if(originalNode){
        let temp = new TreeNode('default data');
        temp.data = originalNode.data;
        temp.leftChild = copyNode(originalNode.leftChild);
        temp.rightChild = copyNode(originalNode.rightChild);
        return temp;
      } else return null;
    }
    return new BinaryTree(copyNode(InputBinaryTree.root)); 
  }
  static isEuqal = (BinaryTreeA, BinaryTreeB) => {
    function equal(treeNodeX, treeNodeY){
      if (!treeNodeX && !treeNodeY) return true; // both x and y are 0
      if (treeNodeX && treeNodeY // both x and y are not 0
          && (treeNodeX.data === treeNodeX.data) // data is the same
          && equal(treeNodeX.leftChild, treeNodeY.leftChild) // subtrees are the same
          && equal(treeNodeX.rightChild, treeNodeY.rightChild)) return true;
      return false;
    }
    return equal(BinaryTreeA.root, BinaryTreeB.root); 
  }
}

const demoTwoLevelD = new TreeNode('D');
const demoTwoLevelE = new TreeNode('E');

const demoOneLevelB = new TreeNode('B', demoTwoLevelD, demoTwoLevelE);
const demoOneLevelC = new TreeNode('C');

const demoRootNode = new TreeNode('A', demoOneLevelB, demoOneLevelC);


const demoTree = new BinaryTree(demoRootNode);
console.log("inorderTraverse:");
BinaryTree.inorderTraverse(demoTree.root);  // D B E A C 應用: 100 * 50 + 1

console.log("inorderNonRecursive:");
BinaryTree.inorderNonRecursive(demoTree.root);  // D B E A C

console.log("preorderTraverse:");
BinaryTree.preorderTraverse(demoTree.root);  // A B D E C

console.log("postorderTraverse:");
BinaryTree.postorderTraverse(demoTree.root);  // D E B C A

console.log("levelOrderTraverse:");
BinaryTree.levelOrderTraverse(demoTree.root);  // A B C D E

console.log("copiedTree:");
console.log(BinaryTree.copyTree(demoTree)); // BinaryTree {root: TreeNode}

console.log("test isEqual:");
const copiedTree = BinaryTree.copyTree(demoTree);
console.log(BinaryTree.isEuqal(demoTree, copiedTree));  // true
```
3. Heap
![image](https://github.com/andy770921/JS_project/blob/master/imgs/Heap_1.png)  
Heap 定義：是 complete binary tree，且每個節點上的數值不能比父節點大 / 小。  
父節點找法：可用除以 2 再捨小數點，得到父節點編號  
Ex：最上的根節點編號是 1，編號 3 的位置，他的父節點是編號 1 位置  
Ex：編號 4 的位置，他的父節點是 2 位置  
  
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
    if(this.maxHeap.length === 0){
      return this.maxHeap;  // or return maxNumber;
    }
    // i: parent level ( total 1 node ), j: children level ( total 2 nodes )
    let i = 0;
    for(let j = 1; j <= this.maxHeap.length - 1; j = j*2 + 1){
      if(j < this.maxHeap.length - 1 && this.maxHeap[j] < this.maxHeap[j + 1]){
        j++; // j points to the larger child
      }
      if(k > this.maxHeap[j]) break;
      this.maxHeap[i] = this.maxHeap[j];
      i = j;
    }
    this.maxHeap[i] = k;
    return this.maxHeap; 
    // or return maxNumber;
  }
}

const demoMaxHeap = new MaxHeap([20, 15, 2, 14, 10]);
console.log(demoMaxHeap.insert(21)); // [21, 15, 20, 14, 10, 2]
// [20, 15, 2, 14, 10, 2] =>  [20, 15, 20, 14, 10, 2] => [21, 15, 20, 14, 10, 2]

const demoMaxHeap2 = new MaxHeap([20, 15, 2, 14, 10]);
console.log(demoMaxHeap2.delete()); // [15, 14, 2, 10]
console.log(demoMaxHeap2.delete()); // [14, 10, 2]
```
4. Binary Search Tree  
![image](https://github.com/andy770921/JS_project/blob/master/imgs/bst_1.png)      
定義：每個節點上有一個唯一且非 0 的數值 (key) ，且左邊 child 節點的數值不能比該節點小 / 大。   
Left Size：以自己當作 root，左邊 subtree 的節點個數 + 1 即為 Left Size  
第 k 個數字：從小到大排序，第 k 個數字
```js
class TreeNode {
  constructor(key, leftChild = null, rightChild = null){
    this.key = key;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
  // 透過計算得到 leftSize
  calculateLeftSize(node){
    let count = 0;
    let currentNode = node;
    while(currentNode){
      count++;
      currentNode = currentNode.leftChild;
    }
    this.leftSize = count;
  }
}

class BinarySearchTree {
  constructor(rootNode){
    this.root = rootNode;
    // BinarySearchTree 一旦被建立，馬上算出每個節點的 leftSize
    this.inorderTraverseAndCountLeftSize(rootNode);
  }
  inorderTraverseAndCountLeftSize(node) {
    let currentNode = node;
    const stack = [];
    while (true){
      while(currentNode){
        stack.push(currentNode);
        currentNode = currentNode.leftChild;
      }
      if(stack.length >= 1){
        currentNode = stack.pop();
        currentNode.calculateLeftSize(currentNode);
        currentNode = currentNode.rightChild;
      } else break;
    }
  }
  search(node, value){
    if (!node) return false;
    if (value === node.key) return node; // or return true
    if (value < node.key) return this.search(node.leftChild, value);
    return this.search(node.rightChild, value);
  }
  searchNonRecursive(value){
    let currentNode = this.root;
    while(currentNode !== null){
      if (value === currentNode.key) return currentNode;
      if (value < currentNode.key) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }
    return false;
  }
  findKth(k){
    let currentNode = this.root;
    while(currentNode !== null){
      if (k === currentNode.leftSize) return currentNode;
      if (k < currentNode.leftSize) {
        currentNode = currentNode.leftChild;
      } else {
        k -= currentNode.leftSize;
        currentNode = currentNode.rightChild;
      }
    }
    return false;
  }
  insert(value){
    const newNode = new TreeNode(value);
    newNode.leftSize = 1;
    let currentNode = this.root;
    while(currentNode !== null){
      if (value < currentNode.key) {
        currentNode.leftSize++;
        if(currentNode.leftChild){
          currentNode = currentNode.leftChild
        } else {
          currentNode.leftChild = newNode;
          break;
        }
      } else {
        if(currentNode.rightChild){
          currentNode = currentNode.rightChild;
        } else {
          currentNode.rightChild = newNode;
          break;
        }
      }
    }
    return this.root;
  }
}

const demoTwoLevelD = new TreeNode(2);   // leftSize = 1
const demoTwoLevelF = new TreeNode(32);  // leftSize = 1
const demoTwoLevelG = new TreeNode(45);  // leftSize = 1

const demoOneLevelB = new TreeNode(5, demoTwoLevelD);                   // leftSize = 2
const demoOneLevelC = new TreeNode(40, demoTwoLevelF, demoTwoLevelG);   // leftSize = 2

const demoRootNode = new TreeNode(30, demoOneLevelB, demoOneLevelC);    // leftSize = 3

const demoTree = new BinarySearchTree(demoRootNode);

console.log(demoTree.search(demoTree.root, 40)); // TreeNode {key: 40, ...}
console.log(demoTree.search(demoTree.root, 15)); // false

console.log(demoTree.searchNonRecursive(40)); // TreeNode {key: 40, ...}
console.log(demoTree.searchNonRecursive(15)); // false

console.log(demoTree.findKth(2)); // TreeNode {key: 5, ...}
console.log(demoTree.findKth(5)); // TreeNode {key: 40, ...}

console.log(demoTree.insert(1)); // TreeNode {key: 30, leftSize: 4 ...}
console.log(demoTree.insert(500)); // TreeNode {key: 30, leftSize: 3 ...}
```
## Balanced Tree

1. 二元平衡樹 - AVL Tree
- Proposed by Adelson-Velsky and Evgenii Landis in 1962
- 特性：對任意節點，左子樹與右子樹高度平衡。
- 高度平衡意義：左樹高減右樹高 (又叫平衡因子 balance factor)，絕對值 >= 1
- 數學表示：BF(T)= -1, 0, 1  (某個代號 T 的 Tree Node 的左子樹高減右子樹高，可能為 -1, 0, 1 )
- 若插入 Node Y，使距離最近的上方的父 Node A 違反了 BF(T)= -1, 0, 1，此時 Y 節點的所在位置會有以下四種狀況，依照不同狀況決定怎麼調整 Tree
    1. LL: Y 在 A 的 Left 子樹的 Left  
    2. LR: Y 在 A 的 Left 子樹的 Right  
    3. RR: Y 在 A 的 Right 子樹的 Right  
    4. RL: Y 在 A 的 Right 子樹的 Left   
- 圖示說明一，MAR 是 A，NOV 是 Y，兩者關係是 RR
![image](https://github.com/andy770921/JS_project/blob/master/imgs/AVL_1.png) 
- 圖示說明二，MAR 是 A，APR 是 Y，兩者關係是 LL
- MAY 是 A，JAN 是 Y，兩者關係是 LR
![image](https://github.com/andy770921/JS_project/blob/master/imgs/AVL_2.png) 

## Hash Table

- Ref: https://www.coursera.org/lecture/algorithms-part1/hash-tables-CMLqa
- 目標: 儲存資料在以 key 為索引條件的表格中。如下圖，儲存黑 "it" 在以紅 "it" 為索引條件的表格中
- 實作方法:  將 key 經過函式運算，算出數字的 index (索引)，對應到陣列的某位置。如下圖，紅 "it" 經過函式運算，算出數字的 3 為 index
<div align="center">
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs/hash_table_1.png"/>
</div>
 
- 與 JavaScript Object 比較: 儲存 "v" 在以 "key" 為索引條件的表格中，"key" 經過函式運算，算出數字的 3 為 index
<div align="center">
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs/hash_table_2.png"/>
</div>

- Hash Function: 運算 key 的函式，輸入為 key 的資料型別，輸出為數字
- 需要思考的問題:
  1. 如何設計 hash function 的運算 ? 特別是當 key 的資料型態變複雜時，不單純用 string 當 key
  2. Equality Test: 如何比較兩個 key 相等 ?
  3. Collision Resolution: 兩個不同 key 經 Hash Function 算出相同 array index，怎處理
- 如何設計 hash function
  1. 目的: 均勻的將 key 打散至每個 index，且運算有效率
  2. 實務上，不同的 key 型別，會有不同做法
  3. Java 的做法: 先將各型別，產生 hashCode 數字，再將數字轉成 0 到 array 長度減一 的 index
  
- Java's hash code convention: 數字，字串，布林值，繼承 `.hashCode()` 方法，回傳 32-bit 的整數 ( 值可能為 -2 的 31 次方到 2 的 31 次方減 1 )
  1. 必定成立: 若 x 與 y 相同，則 `x.hashCode()` 與 `y.hashCode()` 相同
  2. 大多數時成立: 若 x 與 y 不同，則 `x.hashCode()` 與 `y.hashCode()` 不同
- hash code 方法實作方式
  1. 預設的實作方式: 回傳該 key 的記憶體位置
  2. 合法 ( 但很差 ) 的實作方式: 永遠回傳 17
  3. 客製化的實作方式: 針對不同型別 (Integer, Double, String, File...)，不同做法
  4. Java 針對 String 用的 hash code 計算法: Horner's method，這樣計算一元高次方程運算速度較快。取 31 的概念是，int 可能有 2 的 32 次方種可能。邏輯轉寫成 JavaScript 如下
```js
String.prototype.hashCode = function (){
  const s = this;
  let hash = 0;
  
  for(let i = 0; i < s.length; i++){
    hash = s[i].charCodeAt() + 31 * hash;
  }
  return hash;
}

const str = "call";

console.log(str.hashCode()); // 3045982
// 3045982 = 99 x 31^3 + 97 x 31^2 + 108 x 31^1 + 108 x 31^0
```
- 實際上，Java 有優化，加入快取功能，避免重算，邏輯轉寫成 JavaScript 如下
```js
class HashableString extends String {
  hash = 0;

  hashCode(){
    const s = this;
    let h = this.hash;
    if(h !== 0) return h;
    for(let i = 0; i < s.length; i++){
      h = s[i].charCodeAt() + 31 * h;
    }
    this.hash = h;
    return h;
  }
}

const str = new HashableString("call");

console.log(str.hashCode()); // 3045982
```
- hash function 實作方式
  1. 若 array 長度為 M，hash function 希望產生的 index 為 0 到 M - 1，概念上可能的方法為 `key.hashCode() % M`
  2. 實際上，要取絕對值，但取了又會有 2 的 31 次方，超過範圍的問題，故可用以下方法
  3. Note: & 意為「位元 AND」
```js
function hash(key){
  return (key.hashCode() & 0x7fffffff) % M;
}
```
```js
function hash(key){
  return (key.hashCode() & 0x7fffffff) % 97;
}

class HashableString extends String {
  hash = 0;

  hashCode(){
    const s = this;
    let h = this.hash;
    if(h !== 0) return h;
    for(let i = 0; i < s.length; i++){
      h = s[i].charCodeAt() + 31 * h;
    }
    this.hash = h;
    return h;
  }
}

const str = new HashableString("call");

console.log(hash(str)); // 30
```
- 假設完全隨機，數學推導結果
  1. 均勻 hash 假設 : 每個 key 都能被運算出 0 到 M - 1 的整數，且均勻分布
  2. 加入多少 key 才會 collision ? 等於古典機率桶球問題 Birthday Problem，持續丟球，相同桶出現兩顆球，要丟 sqrt(Pi x M / 2) 次
  3. 加入多少 key 才會滿 ? 等於古典機率桶球問題 Coupon Collector Problem，持續丟球，每桶至少出現一顆球，要丟 M x ln(M) 次
  4. 加入 M 個 key，單個 address 中最多幾個值 ? 等於丟 M 次之後，桶內最多有幾顆球，Ans: log M / log log M ( Load Balancing )

### Separate Chaining (a collision resolution strategy)
- 1953 年提出，使用 M 長度的 array 加上 Linked List 處理 collision ( M < key-value 對 總數 )

<div align="center">
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs/hash_table_3.png"/>
</div>

- 實作 get, put ( 含 insert 及 update ) 方法
```js
String.prototype.hashCode = function (){
  const s = this;
  let hash = 0;
  
  for(let i = 0; i < s.length; i++){
    hash = s[i].charCodeAt() + 31 * hash;
  }
  return hash;
}

class Node {
  constructor(key = null, value = null, next = null){
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class SeparateChainingHashTable {
  M = 97;  // number of chains，共幾條鏈
  chainList = [...Array(this.M)].fill(null);  // array of chains，裝有鏈的 array，初始值為 M 個 null

  hash(k){
    return (k.hashCode() & 0x7fffffff) % this.M;
  }

  get(k){
    const i = this.hash(k);
    
    for(let x = this.chainList[i]; x !== null; x = x.next){
      if(k === x.key) return x.value;
    }

    return null;
  }

  put(k, val){
    const i = this.hash(k);
    
    for(let x = this.chainList[i]; x !== null; x = x.next){
      if(k === x.key){
        x.value = val;
        return 'update succcessfully';
      }
    }
    this.chainList[i] = new Node(k, val, this.chainList[i]);
    
    return 'insert succcessfully';
  }
}

const hashTable = new SeparateChainingHashTable();

console.log(hashTable.get("something"));  // null
console.log(hashTable.put("awesomeKey", 100));  // insert succcessfully
console.log(hashTable.get("awesomeKey"));  // 100
console.log(hashTable.put("awesomeKey", 50));  // update succcessfully
console.log(hashTable.get("awesomeKey"));  // 50
```

- 分析: (英文文字 Ref: https://algs4.cs.princeton.edu/34hash/)
  1. 若遵守均勻 hash 假設，且 key 總數 N / 清單數量 M 為常數且很小，則每個清單 key 數量的機率接近 1 (O(1))
  2. list 長度的分布，遵守二項式定理 (圖類似常態分布)
  3. 清單數量 M，key 總數 N，執行比較運算 ( .equal() ) 的次數，正比於 N / M
  4. M 過大會浪費空間，M 過小會讓鏈過長，實務上一般選擇 M 的值，大概是 N / 5
  5. 綜合比較

<div align="center">
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs/hash_table_4.png"/>
</div>

### Linear Probing / Open Addressing (another collision resolution strategy)
- 1953 年提出，使用 M 長度的 array，若相撞 index 往後順移一位儲存，處理 collision ( M 一定要大於 key-value 對 總數 )
- Hash: Map the key to integer i between 0 and M-1
- Insert: Put at table index i if free; if not, try i, i+1, i+2, etc.
- Search: Search table index i; if occupied but no match, try i+1, i+2, etc.
- 當 Array 快滿，需要再調整 Array 長度，增長
- 實作: (省略 Array 倍增或減半)
```js
String.prototype.hashCode = function (){
  const s = this;
  let hash = 0;
  
  for(let i = 0; i < s.length; i++){
    hash = s[i].charCodeAt() + 31 * hash;
  }
  return hash;
}

class LinearProbingHashTable {
  // array 倍增和減半的程式碼省略
  M = 30001;  // array 空間
  keyList = [...Array(this.M)] // array of keys，初始值為 M 個 undefined
  valueList = [...Array(this.M)] // array of values，初始值為 M 個 undefined
  
  hash(k){
    return (k.hashCode() & 0x7fffffff) % this.M;
  }

  get(k){
    for(let i = this.hash(k); this.keyList[i] !== undefined; i = (i + 1) % this.M){
      if(k === this.keyList[i]) return this.valueList[i];
    }

    return null;
  }

  put(k, val){
    let i;
    for(i = this.hash(k); this.keyList[i] !== undefined; i = (i + 1) % this.M){
      if(k === this.keyList[i]) break;
    }
    this.keyList[i] = k;
    this.valueList[i] = val;
  }
}

const hashTable = new LinearProbingHashTable();

console.log(hashTable.get("something"));  // null
hashTable.put("awesomeKey", 100);
console.log(hashTable.get("awesomeKey"));  // 100
hashTable.put("awesomeKey", 50)
console.log(hashTable.get("awesomeKey"));  // 50
```


- 分析
  1. 可類比於找停車位問題: 一條路，我們的車只能往前走，右方有隨機共 M 個車位，隨機被其他車占 N 個，請問我們的車，要前進幾車身長才找到車位？
  2. Donald Knuth (KMP 演算法的 K) 於 1963 年，得出近似。百分之多少滿 (下方公式的 alpha) 會影響前進幾車身長，前進幾車身長同意於單次 search 和 insert 戳幾次中，如下公式
  3. 若半滿 (alpha 等於 0.5): search 1.5 次，insert 2.5 次  => 不錯，實務上通常也選半滿
  4. 若九分滿 (alpha 等於 0.9): search 5.5 次，insert 50.5 次 => 糟
  5. 綜合比較，結果和 Separate Chaining 相同

<div align="center">
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs/hash_table_5.png"/>
</div>

### Separate Chaining 與 Linear Probing 比較
- Separate Chaining 優點: 
  1. 容易實現 insert 和 delete
  2. Performance 下降慢
  3. 當 hash function 設計不佳時，叢集 (資料高度集中在 array 特定一段) 較不會影響
- Linear Probing 優點:
  1. 更少記憶體空間浪費
  2. 有實作快取的情況下，有更好的表現
- 延伸思考: 
  1. 兩者如何 delete key? 
  2. 兩者如何 resize array?
- 其他進階方式
  1. Two-Probe Hashing: Separate Chaining 延伸變化
  2. Double Hashing: Linear Probing 延伸變化
  3. Cuckoo Hashing: Linear Probing 延伸變化
  
### Hash Table 與 平衡搜尋樹 比較
- Hash Table 優點: 
  1. 容易實作 ( 若不考慮實作 hash function 的話 )
  2. 若 key 未排序，hash 不需要進行 compare 的運算，目前 hash table 外並無更有效的方式
  3. 若 key 很簡單，只需要進行簡單的數學計算，會比平衡搜尋樹進行 log N 次比較更快
  4. 若用 java 語言，原生系統較支持 ( 如，hashCode 已有幫我們實作了快取 )
- 平衡搜尋樹優點: 
  1. 更強的效能保證，不需要隨機分布的假設，直接保證效能 log N
  2. 支持有排序過的資料
  3. 容易正確的實作 compareTo() ( 正確的實作 equals() 和 hashCode() 較難 )
  
## Doubly Lisked List 與 HashMap 組成 LRU Cache 的應用
- LRU Cache: Least Recently Used Cache
- 說明: 當空間滿時，先刪除最久遠沒被用到的 ( least recently ) 資料，保留最近 ( most recently ) 的資料
- 題目: https://leetcode.com/problems/lru-cache/description/
- 實作 1: 利用 ES6 Map 保序的性質 (  Map 在呼叫 `.keys()` 或 `.values()` 時，會回傳 `iterator`，Map 會依照每筆資料 insert 的順序，用 `.next().value` 依序取出最早 insert 的 )
```js
// Ref: https://leetcode.com/problems/lru-cache/solutions/399146/clean-javascript-solution/
class LRUCache {
  constructor(capacity) {
    this.cache = new Map();
    this.capacity = capacity;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    const v = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, v);
    return this.cache.get(key);
  };

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);  // keys().next().value returns first item's key
      // 也可寫成 const [keyToDelete] = this.map.keys(); this.cache.delete(keyToDelete);
    }
  };
}
```
- 實作 2: 用 Doubly Lisked List 與 HashMap
```js
// Ref: https://leetcode.com/problems/lru-cache/solutions/617415/javascript-2-solutions-es6-map-vs-doubly-linked-list/
class Node {
  constructor(key, val) {
      this.key = key;
      this.val = val;
      this.next = null;
      this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
  }
  
  push(key, val) {
      const newNode = new Node(key, val);
      if(!this.head) {
          this.head = newNode;
          this.tail = newNode;
      } else {
          this.tail.next = newNode;
          newNode.prev = this.tail;
          this.tail = newNode;
      }
      this.length++;
      return newNode;
  }
  
  remove(node) {
      if(!node.next && !node.prev) { // if there's only 1 node
          this.head = null;
          this.tail = null;
      } else if(!node.next) { // if the node is tail node
          this.tail = node.prev;
          this.tail.next = null;
      } else if(!node.prev) { // if the node is head node
          this.head = node.next;
          this.head.prev = null;
      } else { // if the node is in between
          const prev = node.prev;
          const next = node.next;
          prev.next = next;
          next.prev = prev;
      }
      this.length--;
  }
}

class LRUCache {
  constructor(capacity) {
      this.DLL = new DoublyLinkedList();
      this.map = {};
      this.capacity = capacity;
  }

  get(key) {
      if(!this.map[key]) return -1;
      const value = this.map[key].val;
      this.DLL.remove(this.map[key]);
      this.map[key] = this.DLL.push(key, value);
      return value;
  }

  put(key, value) {
      if(this.map[key]) this.DLL.remove(this.map[key]);
      this.map[key] = this.DLL.push(key, value);
      if(this.DLL.length > this.capacity) {
          const currKey = this.DLL.head.key;
          delete this.map[currKey];
          this.DLL.remove(this.DLL.head);
      }
  }
}
```
## Stack 實際應用

```ts
interface ShopCategoryItem {
    id: number;
    name: string;
    childList: ShopCategoryItem[] | null;
    isThereChild?: boolean;
}

class Stack<T> {
    private arr: T[];

    constructor(array: T[] = []) {
        this.arr = array.slice();
    }

    pop() {
        return this.arr.pop();
    }

    push(...x: T[]) {
        this.arr.push(...x);
    }

    isEmpty() {
        return this.arr.length === 0;
    }

    top() {
        return this.arr[this.arr.length - 1];
    }
}

const hasChild = (item: ShopCategoryItem) => Boolean(item.childList) && item.childList.length > 0;

export const generateBreadcrumbsPathMap = (data: ShopCategoryItem[] = []) => {
    if (!data || data.length === 0) {
        return new Map<number, ShopCategoryItem[]>();
    }

    const pathMap = new Map<number, ShopCategoryItem[]>();
    const pathStack = new Stack<ShopCategoryItem[]>();
    const currStack = new Stack(data.slice().reverse());

    while (!currStack.isEmpty()) {
        const curr = currStack.pop();
        const prevPath = pathStack.pop() || [];
        const currPath = [...prevPath, curr];

        pathMap.set(
            curr.id,
            currPath.map(({ id, name }) => ({ id, name, childList: null }))
        );

        if (hasChild(curr)) {
            const { childList } = curr;
            currStack.push(...childList.slice().reverse());

            for (let i = 0; i < childList.length; i += 1) {
                pathStack.push(currPath);
            }
        }
    }

    return pathMap;
};

export const generateCategoryMap = (data: ShopCategoryItem[] = []) => {
    if (!data || data.length === 0) {
        return new Map<number, ShopCategoryItem>();
    }

    const categoryMap = new Map<number, ShopCategoryItem>();
    const currStack = new Stack(data.slice().reverse());

    while (!currStack.isEmpty()) {
        const curr = currStack.pop();
        const isThereChild = hasChild(curr);

        categoryMap.set(curr.id, { ...curr, isThereChild });

        if (isThereChild) {
            const { childList } = curr;
            currStack.push(...childList.slice().reverse());
        }
    }

    return categoryMap;
};
// 以下為測試
const testState: ShopCategoryItem[] = [
    {
        id: 1,
        name: 'A',
        childList: [
            {
                id: 2,
                name: 'A-1',
                childList: null,
            },
            {
                id: 3,
                name: 'A-2',
                childList: [
                    {
                        id: 4,
                        name: 'A-2-1',
                        childList: null,
                    },
                ],
            },
        ],
    },
    {
        id: 5,
        name: 'B',
        childList: [
            {
                id: 6,
                name: 'B-1',
                childList: [
                    {
                        id: 7,
                        name: 'B-1-1',
                        childList: [
                            {
                                id: 8,
                                name: 'B-1-1-1',
                                childList: null,
                            },
                            {
                                id: 9,
                                name: 'B-1-1-2',
                                childList: [
                                    {
                                        id: 10,
                                        name: 'B-1-1-2-1',
                                        childList: null,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 11,
        name: 'C',
        childList: null,
    },
];


const getFormattedResult = (data: ShopCategoryItem[] = []) => data.map(x => x.name);

describe('generateBreadcrumbsPathMap', () => {
    let breadcrumbsPathMap: Map<number, ShopCategoryItem[]>;

    beforeAll(() => {
        breadcrumbsPathMap = generateBreadcrumbsPathMap(testState);
    });

    afterAll(() => {
        breadcrumbsPathMap = null;
    });

    it('when no data', () => {
        const id = 4;
        const emptyBreadcrumbsPathMap = generateBreadcrumbsPathMap(null);
        const isThereID = emptyBreadcrumbsPathMap.has(id);
        expect(isThereID).toBe(false);
    });

    it('when no id found', () => {
        const id = 999;
        const isThereID = breadcrumbsPathMap.has(id);
        expect(isThereID).toBe(false);
    });

    it('when 1 level', () => {
        const id = 1;
        const breadcrumbsPath = breadcrumbsPathMap.get(id);
        expect(getFormattedResult(breadcrumbsPath)).toEqual(['A']);
    });

    it('when 3 level', () => {
        const id = 4;
        const breadcrumbsPath = breadcrumbsPathMap.get(id);
        expect(getFormattedResult(breadcrumbsPath)).toEqual(['A', 'A-2', 'A-2-1']);
    });

    it('when 5 level', () => {
        const id = 10;
        const breadcrumbsPath = breadcrumbsPathMap.get(id);
        expect(getFormattedResult(breadcrumbsPath)).toEqual(['B', 'B-1', 'B-1-1', 'B-1-1-2', 'B-1-1-2-1']);
    });
});

describe('generateCategoryMap', () => {
    let categoryMap: Map<number, ShopCategoryItem>;

    beforeAll(() => {
        categoryMap = generateCategoryMap(testState);
    });

    afterAll(() => {
        categoryMap = null;
    });

    it('when no data', () => {
        const id = 4;
        const emptyCategoryMap = generateCategoryMap(null);
        const isThereID = emptyCategoryMap.has(id);
        expect(isThereID).toBe(false);
    });

    it('when no id found', () => {
        const id = 31415926;
        const isThereID = categoryMap.has(id);
        expect(isThereID).toBe(false);
    });

    it('when id exists', () => {
        const id = 9;
        const categoryItem = categoryMap.get(id);
        const name = categoryItem.name;
        expect(name).toBe('B-1-1-2');
    });
});

```

