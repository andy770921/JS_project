## Linked List
Ex: 製造兩個節點的 Linked List
```js
function ListNode (value){
  this.data = value;
  this.link = null;
}

const first = new ListNode(10);
first.link = new ListNode(20);

console.log(first);         //  [Object] {data: 10, link: [Object] }
console.log(first.link);    //  [Object] {data: 20, link: null}
```
