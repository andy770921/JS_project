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
最上的根節點編號是 1  
編號 3 的位置，他的父節點是編號 1 位置  
編號 4 的位置，他的父節點是 2 位置  
可用除以 2 再捨小數點，得到父節點編號  
```js
class MaxHeap {
  constructor(heapArr){
    this.maxHeap = heapArr;
  }
  insert = function (n){
    let treePositionOfN = this.maxHeap.length + 1;
    for(let i = treePositionOfN; i >= 1; i = Math.floor(i/2)){
      if (i === 1) break; // at root
      
      const parentIndex = Math.floor(i/2) -1;
      const currentIndex = i - 1;
      if (n <= this.maxHeap[parentIndex]) break;
      this.maxHeap[currentIndex] = this.maxHeap[parentIndex]; // move parent to current
      treePositionOfN = Math.floor(i/2);
    }
    this.maxHeap[treePositionOfN - 1] = n;
    return this.maxHeap;
  }

}

const demoMaxHeap = new MaxHeap([20, 15, 2, 14, 10]);
console.log(demoMaxHeap.insert(21)); // [21, 15, 20, 14, 10, 2]
// [20, 15, 2, 14, 10, 2] =>  [20, 15, 20, 14, 10, 2] => [21, 15, 20, 14, 10, 2]
```
