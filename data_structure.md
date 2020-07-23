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
### Array 實作出 Hash Table 的題目範例

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

## 白板題

1. 輸入一陣列，每個元素代表大樓高度，最右邊是海。輸出和輸入陣列等長的布林值陣列，標示該棟大樓是否看得到海
```js
// input example: [6, 3, 4, 1, 2, 1] ~~sea~~

function checkIsSeaVisible(arr){
  // TODOS
}
console.log(checkIsSeaVisible([6, 3, 4, 1, 2, 1]));
// [true, false, true, false, true, true]
```
