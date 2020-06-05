# JS 觀念
## clean code 中文版
https://github.com/AllJointTW/clean-code-javascript
## 同步/非同步
https://www.youtube.com/watch?v=NOprCnnjHm0  
https://youtu.be/yswb4SkDoj0  
## 同步/非同步 - async function 會回傳 promise 物件 / await
https://noob.tw/js-async/  
https://www.oxxostudio.tw/articles/201908/js-async-await.html  
https://developers.google.com/web/fundamentals/primers/async-functions?hl=zh-tw  
封裝錯誤處理 HOC:  
https://www.youtube.com/watch?v=DwQJ_NPQWWo  
## 同步/非同步 - event loop
https://youtu.be/cCOL7MC4Pl0  
https://www.youtube.com/watch?v=8aGhZQkoFbQ  
## async/await, event loop
https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke
## ES6語法與ES5差異，及call by ref解析27:22
https://youtu.be/pr7JFQaAYjg
## constructor function 寫法，new 的意義
1. 建立空物件 `{}`
2. 將 function 內的 this 指向此空物件
3. 將此空物件的原型，指向名稱為 函數名稱 的空物件 (`{}.__proto__ = 函數名稱 的空物件`)
4. 執行 function ，完畢後自動 return 1. 產生出的物件。所以用此用法，function 最後不用寫 return。有寫 return 的函數稱作 factory function
5. Ref: https://youtu.be/PFmuCDHHpwk?t=1257
6. new 與 call 相等寫法
```js
function Circle(radius){
    this.radius = radius;
}

let a = {};
Circle.call(a, 1);
// Circle.apply(a, [1]); 也可以

const b = new Circle(1);
```
7. 指定原型鏈原生寫法
```js
const person = {
    name: 'default',
    greet: function (){
        console.log("hi "+ this.name);
    }
};

const john = Object.create(person);
// 不要用 john.__proto__ = person; 會有效能問題

john.name = "john";
// 不能用 john = { name: "john" }; 因為大括號會新建的物件，設定自己的 prototype 為 Object.prototype

```
7-2. 指定原型鏈使用 new 的寫法
```js
const Person = function(name) {
    this.name = name;
}

Person.prototype = {
    name: 'default',  // 實做上通常不會將變數放在原型，只會放方法
    constructor: Person, // 要加這行
    greet: function (){
        console.log("hi "+ this.name);
    },
    sayBye: function (){
        console.log("bye");
    }
};
// 要加入 constructor:，否則用 { } 建立的物件，會喪失 Person.constructor 的屬性
// 若使用 Person.prototype.greet =  function (){ ...} 、Person.prototype.xxx = ooo; 不會喪失 Person.constructor 的屬性

const john = new Person("john");
john.greet();

```
Note: constructor 屬性補充: https://stackoverflow.com/questions/8453887/why-is-it-necessary-to-set-the-prototype-constructor  
8. 使用原型鏈，取用私有變數方法，要另建函數，或是另建公開變數才能取得: https://stackoverflow.com/questions/436120/accessing-private-member-variables-from-prototype-defined-functions  
```js
// 實作練習
function A (myPublic){
  // public variable/method
  this.myPublic = myPublic;
  this.myPublicFn = function (){
    console.log("myPublicFn");
  }
  
  // private variable/method
  let myPrivate = "PRIVATE";
  const myPrivateFn = function (){
    console.log("myPrivateFn");
  }
  
  // public read-only getter/setter
  Object.defineProperty(this, 'pri', {
    get: function(){
      console.log(myPrivate);
      return myPrivate
    },
    set: function(value){
      myPrivate = value;
    }
  });
}

// public method on prototype
A.prototype.getPrivate = function (){
  console.log(this.myPublic);
  this.pri;
}

const obj = new A("PUBLIC");
obj.getPrivate();
obj.pri = 1000;
obj.pri;
```
9. 與 class 的比較: https://tylermcginnis.com/beginners-guide-to-javascript-prototype/
10. class 目前沒語法可以直接使用私有變數。目前已在審核中的方法，建議使用井字號: https://www.sitepoint.com/javascript-private-class-fields/
11. class 目前使用私有變數的實作法 https://tw.twincl.com/javascript/*6937

## 深層複製 / 淺層複製
https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089
## 函數內部變數往外傳遞 - 閉包
https://ithelp.ithome.com.tw/articles/10193009
## new創造物件，與建立建構式
https://ithelp.ithome.com.tw/articles/10193747
## 原型鍊，實現 class 繼承功能
https://www.youtube.com/watch?v=Fsp42zUNJYU
## class 的 constructor、super、get、set
https://www.youtube.com/watch?v=8gWvJx-NP-w  
https://www.youtube.com/watch?v=CwAU1wYeHiM  
https://www.youtube.com/watch?v=1WnRom8Yjac  
https://www.youtube.com/watch?v=aZAYj7mqa4c  

## super
Super is not calling parent method, but calling parent constructor which is not valid call outside of the constructor.  
https://stackoverflow.com/questions/46234103/error-call-super-outside-of-class-constructor  
```js
class People {
  say(){
    console.log('hi');
  }
  sleep(){
    console.log('I want to sleep');
  }
}

class Engineer extends People{
  say(){
    console.log('hello world');
  }
}

class Elaine extends Engineer{
  say(){
    super.say();
    console.log('I am Elaine');
    super.sleep();
  }
}

const elaine = new Elaine();
elaine.say(); 
// hello world
// I am Elaine
// I want to sleep
```
## Dan 說明 super 在 React 中的使用
https://overreacted.io/zh-hant/why-do-we-write-super-props/
## Array 或 Object ，避免用= 指定，因為這兩者為 call by ref
1. [1]==[1]，會是false，因為指向不同記憶體位置
2. 若要比較，要用_.isEqual([1],[1])，會回傳true
2-2. 實際安裝.isEqual Ref: https://stackoverflow.com/questions/43479464/how-to-import-a-single-lodash-function
3. copy array方法，將a複製進b，用slice複製完全一樣的出來到不同記憶體位置: b = a.slice();
4. copy Object方法，將a複製進b，把a放到空陣列，會是新的記憶體位置: b = Object.assign({}, a);
5. copy Object方法 2，用展開運算子，會是新的記憶體位置: b = { ...a };

## this的用法
https://www.youtube.com/watch?v=tpheRywjVQk  
https://youtu.be/XJzDF9bj368
## 計算機概論
https://youtu.be/QuCu4iDpPTU
## 解構賦值
文章關鍵字: 使用於函式的傳入參數之中的解構賦值  
https://ithelp.ithome.com.tw/articles/10185430    
解構賦值加預設值
https://medium.com/@pyrolistical/destructuring-nested-objects-9dabdd01a3b8  
深層的解構賦值  
```js
    const data = null;
    const {
        shopCategoryList: { categoryList },
    } = data || { shopCategoryList: { categoryList: [] } };
    console.log(categoryList); // []
```
```js
const defaultButtonStyle = { x: 'styleX', y: 'styleY' };

const possibleInputStyle1 = { button: { x: 'customX', y: 'customY' }, text: { a: 'customA' } };
const possibleInputStyle2 = { button: { x: 'customX', y: 'customY' } };
const possibleInputStyle3 = {};
const possibleInputStyle4 = { button: {}, text: {} };
const possibleInputStyle5 = { button: { x: '' }, text: { y: '' } };
const possibleInputStyle6 = { text: { a: 'customA' } };

const getButtonStyle = possibleInputStyle => {
    const { button } = possibleInputStyle;
    let outputX = '';
    let outputY = '';
    if (button) {
        outputX = button.x ? button.x : defaultButtonStyle.x;
        outputY = button.y ? button.y : defaultButtonStyle.y;
    } else {
        outputX = defaultButtonStyle.x;
        outputY = defaultButtonStyle.y;
    }
    return { x: outputX, y: outputY };
};

console.log(getButtonStyle(possibleInputStyle1)); // {x: "customX", y: "customY"}
console.log(getButtonStyle(possibleInputStyle2)); // {x: "customX", y: "customY"}
console.log(getButtonStyle(possibleInputStyle3)); // {x: "styleX", y: "styleY"}
console.log(getButtonStyle(possibleInputStyle4)); // {x: "styleX", y: "styleY"}
console.log(getButtonStyle(possibleInputStyle5)); // {x: "styleX", y: "styleY"}
console.log(getButtonStyle(possibleInputStyle6)); // {x: "styleX", y: "styleY"}

const solutionOne = possibleInputStyle => {
    const { x: defaultX, y: defaultY } = defaultButtonStyle;
    const {
        button: { x, y },
    } =
        Object.keys(possibleInputStyle).length > 0
            ? possibleInputStyle
            : {
                  button: {
                      x: defaultX,
                      y: defaultY,
                  },
              };
    return { x, y };
};

console.log(solutionOne(possibleInputStyle1)); // {x: "customX", y: "customY"}
console.log(solutionOne(possibleInputStyle2)); // {x: "customX", y: "customY"}
console.log(solutionOne(possibleInputStyle3)); // {x: "styleX", y: "styleY"}
console.log(solutionOne(possibleInputStyle4)); // {x: undefined, y: undefined}
console.log(solutionOne(possibleInputStyle5)); // {x: "", y: undefined}
console.log(solutionOne(possibleInputStyle6)); // error: Uncaught TypeError: Cannot read property 'x' of undefined


const solutionTwo = possibleInputStyle => {
    const { x: defaultX, y: defaultY } = defaultButtonStyle;
    const {
        button: { x = defaultX , y = defaultY } = { x: defaultX, y: defaultY } 
    } =
        Object.keys(possibleInputStyle).length > 0
            ? possibleInputStyle
            : {
                  button: {
                      x: defaultX,
                      y: defaultY,
                  },
              };
    return { x, y };
};

console.log(solutionTwo(possibleInputStyle1)); // {x: "customX", y: "customY"}
console.log(solutionTwo(possibleInputStyle2)); // {x: "customX", y: "customY"}
console.log(solutionTwo(possibleInputStyle3)); // {x: "styleX", y: "styleY"}
console.log(solutionTwo(possibleInputStyle4)); // {x: "styleX", y: "styleY"}
console.log(solutionTwo(possibleInputStyle5)); // {x: "", y: "styleY"}
console.log(solutionTwo(possibleInputStyle6)); // {x: "styleX", y: "styleY"}

const solutionThree = possibleInputStyle => {
    const { x: defaultX, y: defaultY } = defaultButtonStyle;
    const {
        button: { x = null , y = null } = {} 
    } = possibleInputStyle;
       
    return (x && y) ? {x, y} : {x: defaultX, y: defaultY};
};

console.log(solutionThree(possibleInputStyle1)); // {x: "customX", y: "customY"}
console.log(solutionThree(possibleInputStyle2)); // {x: "customX", y: "customY"}
console.log(solutionThree(possibleInputStyle3)); // {x: "styleX", y: "styleY"}
console.log(solutionThree(possibleInputStyle4)); // {x: "styleX", y: "styleY"}
console.log(solutionThree(possibleInputStyle5)); // {x: "styleX", y: "styleY"}
console.log(solutionThree(possibleInputStyle6)); // {x: "styleX", y: "styleY"}

```

## hoisting 提升
https://blog.techbridge.cc/2018/11/10/javascript-hoisting/?fbclid=IwAR3No5aPr4uqhVN3CiusRV37RDQa6TTCeW7zw_1k3uCm_r_1LF9sLkXCNTg

## 物件的位址
1. 跳出三次各不同的名字
```js
function sayHi(person) {
  const name = person.name;
  setTimeout(() => {
    alert('Hello, ' + name);
  }, 3000);
}

let someone = {name: 'Dan'};
sayHi(someone);

someone = {name: 'Yuzhi'};
sayHi(someone);

someone = {name: 'Dominic'};
sayHi(someone);
```
2. 跳出三次各不同的名字
```js
function sayHi(person) {
  setTimeout(() => {
    alert('Hello, ' + person.name);
  }, 3000);
}

let someone = {name: 'Dan'};
sayHi(someone);

someone.name= 'Yuzhi';
sayHi(someone);

someone.name='Dominic';
sayHi(someone);
```
3. 跳出三次相同的名字 (Dominic)
```js
function sayHi(person) {
  setTimeout(() => {
    alert('Hello, ' + person.name);
  }, 3000);
}

let someone = {name: 'Dan'};
sayHi(someone);

someone = {name: 'Yuzhi'};
sayHi(someone);

someone = {name: 'Dominic'};
sayHi(someone);

```
## Array 常用的方法
https://wcc723.github.io/javascript/2017/06/29/es6-native-array/
1. .push(1, 2, 3): 變更原陣列-多三個元素(可文字或數字)在陣列最後面，並回傳新增後的陣列長度
2. .unshift(1, 2, 3): 變更原陣列-多三個元素(可文字或數字)在陣列最前面，並回傳減少後的陣列長度
3. .shift(): 變更原陣列-移除陣列第一個元素，並回傳被移除的值
4. .pop(): 變更原陣列-移除陣列最後一個元素，並回傳被移除的值
5. .join(', '): 每個元素後面，加入, ，除了最後一個元素外
6. .concat (陣列變數名): 結合兩陣列，回傳一個全新陣列
7. .indexOf('陣列中其中一個元素名稱'): 輸出該元素的index，若不是該陣列的元素會輸出-1，可判斷此元素是否在陣列中
8. .map(function(element,index){ return.......;}): 遍歷陣列元素，在...內可打每個element要做甚麼事情，若需要跟index有關也可以寫進去。回傳一個全新的陣列
9. [ES6] .filter(function(element){return 判斷式;}): 遍歷陣列元素，判斷式為真的元素，才會回傳。也可.filter(function(element,index){return 判斷式;})
10. Array: Splice, sort, revserse  會改到本來的 
11. Array: slice, concat, join, filter 不會改到本來的
12. sort 函數會直接改到本來的陣列，一般情況，若陣列沒包很多層，要先淺層拷貝一份
```js
const list = [ {name: 'x', order: 1}, {name: 'y', order: 2}];
const sortedList = [...list].sort((a, b) => a.order - b.order);
```
13. map 函數不會改到本來的陣列會回傳新的陣列，若之後接 sort 不用先淺層拷貝，因為 sort 改到的陣列是新的。  
```js
const list = [ {name: 'x', order: 1}, {name: 'y', order: 2}, {name: 'z', order: 0} ];
const sortedList = list
                   .map(el => el.order === 0 ? { ...el, order: 100 } : el )
                   .sort((a, b) => a.order - b.order);
```
14. 若直接使用 map ，比較好的做法是，不要改到傳進去 map 函數的 element  
```js
const list = [ {name: 'x', order: 1}, {name: 'y', order: 2} ];
const newList = list
                .map(el => {
                    let newEl = { ...el };
                    newEl.order = 100;
                    return newEl;
                 })
```
15. reduce 用法
```js
// 用 reduce 在陣列裡面，再區分兩個陣列的方法，初級
const list = [ {name: 'x', order: 1}, {name: 'y', order: 2}, {name: 'z', order: 0}, {name: 'hi', order: 0}  ];
const seperateList = list.reduce(
  ( acc, cur ) => {
    if (cur.order !== 0){
      acc[0].push(cur);
    } else {
      acc[1].push(cur);
    }
    return acc;
  }
  ,
  [[],[]]
);
console.log(seperateList);

// 中級
const seperateList = list.reduce(
  ( acc, cur ) => (cur.order !== 0 ? 
                   [acc[0],[...acc[1], cur]]: 
                   [[...acc[0], cur],acc[1]]
                  )
  ,
  [[],[]]
);
console.log(seperateList);

// 高級
const seperateList = list
  .reduce(
    ([noneZeroAry, zeroAry], { order, ...props }) => order !== 0
      ? [[...noneZeroAry, { order, ...props }], zeroAry]
      : [noneZeroAry, [...zeroAry, { order, ...props }]],
    [[], []]
  );
console.log(seperateList);
```

## String 常用的方法
1. slice 不會改到本來的
## Object 常用的方法
1. 合併Object寫法: 合併後的Object  = {...obj1, ...obj2};
```js
var obj1 = { food: 'pizza', car: 'ford' }
var obj2 = { animal: 'dog' }
let merged = {...obj1, ...obj2};
```
2. 取得物件中的值，用students.name，或是students["name"]
3. for-in loop 遍歷物件元素
Note: propName指的是物件內的key，可換變數名稱，要與for迴圈內的統一即可。  
&emsp; Note: students[propName]指的是每個key的值，不能用students.propName，因為會找students物件中，名為propName的key，但是沒有此 key  
&emsp; Note: console.log連續輸出不同字串，可用逗號間隔不同之字串  
```js
var students = {
  name: "Dave",
  grade: [80, 85, 90]
};

for (var propName in students) {
  console.log(propName, ", ", students[propName]);
}
```
4. 二維陣列改寫為物件，取值法也相應變化  
原:  
```js
var questions = [
  ['How many states are in the United States?', 50],
  ['How many continents are there?', 7],
  ['How many legs does an insect have?', 6]
];

for (var i = 0; i < questions.length; i += 1) {
  question = questions[i][0];
  answer = questions[i][1];
  response = prompt(question);
  response = parseInt(response);
  if (response === answer) {
    correctAnswers += 1;
  } 
}
```
&emsp; 後:
```js
var questions = [
  { question: 'How many states are in the United States?', answer: 50 },
  { question: 'How many continents are there?', answer: 7},
  { 'How many legs does an insect have?', answer: 6}
];

for (var i = 0; i < questions.length; i += 1) {
  question = questions[i].question;
  answer = questions[i].answer;
  response = prompt(question);
  response = parseInt(response);
  if (response === answer) {
    correctAnswers += 1;
  } 
}
```
## 與 HTML DOM 的互動
1. 事件監聽，以ID選: addEventListener()。```<script src="app.js"></script>```要在</body>前加，否則會讀取不到HTML的Tag出現錯誤
https://ithelp.ithome.com.tw/articles/10192015  
HTML:
```html
  <body>
    <h1 id="myHeading">JavaScript and the DOM</h1>
    <p>Making a web page interactive</p>
    <script src="app.js"></script>
  </body>
```
&emsp;  JS:
```js
const myHeading = document.getElementById('myHeading');
myHeading.addEventListener('click', ()=>{
  myHeading.style.color = 'red';
});
```
2. 以Type多重選，HTML 要用 const myHeading = document.getElementsByTagName('h1');，會回傳HTML collection的陣列，需要再用取出物件的方式，取得第一、第二等的元素，或是用陣列的性質詢問找出幾個h1，如document.getElementsByTagName('h1')[0]、document.getElementsByTagName('h1')['length']或document.getElementsByTagName('h1').length
3. 以Type單選清單內第三個元素，HTML 要用 const myList = document.getElementsByTagName('li')[2];
4. 以Class多重選，HTML 要用 const excludeColor = document.getElementsByClassName('notPurple');，找出有該class的元素物件(HTML collection)
5. document.getElementsByClassName('notPurple'); 也可寫成 document.querySelectorAll('.notPurple');，找出有該class的元素物件(HTML collection)
6. document.getElementById('myHeading'); 也可寫成 document.querySelector('#myHeading');，直接找出該元素(非取出陣列，不需再加[0])
7. document.querySelector('li'); 會找出```<li>```的第一個元素
8. ul的ID，其下層的li全選，寫成document.querySelectorAll('#rainbow li');
9. ```HTML: <p title="label">123456</p>```可用 document.querySelector('[title=label]'); 找到
10. 偽class與document.querySelectorAll('li:nth-child(even)');搭配使用
```js
const evens = document.querySelectorAll('li:nth-child(even)');

for (let i = 0; i < evens.length; i++ ){
  evens[i].style.backgroundColor = 'lightgray';
}
```
11. 選擇某nav下的超連結，可如下
```js
let navigationLinks =  document.querySelectorAll('nav > ul > li > a');
```
12.選擇某p下的class(名稱description) 第一個出現的物件，可如下
```js
let p = document.querySelector('p.description');
```
13.可用.innerHTML，取得內部資料回傳值，也可重新指定HTML Tag內部資料
```js
let ul =  document.querySelector('ul');
ul.innerHTML = "<li>red</li> <li>blue</li>";

const input = document.querySelector('input');
const p = document.querySelector('p.description');
const button = document.querySelector('button');
button.addEventListener('click', ()=>{
  p.innerHTML = input.value;
});
```
14.可用.textContent，取得文字內容回傳值，也可重新指定HTML Tag內部文字
```js
let myHeading =  document.querySelector('h1');
h1.textContent = "This is new Heading";
```
15. 取得 <input type="text" id="linkName"> 輸入字串欄位的值:
```js
var inputValue = document.getElementById('linkName').value;
```
16. .createElement('li');
```js
let li = document.createElement('li');
li.textContent = addItemInput.value;
```
17. .appendChild(li);與createElement合用，最後清除字串欄位的值
```js
let ul = document.getElementsByTagName('ul')[0];
let li = document.createElement('li');
  li.textContent = addItemInput.value;
  ul.appendChild(li);
  addItemInput.value = '';
```
18. 指定HTML元素class:
```js
newParagraph.className = "panel";
```
## 設計 HTML 互動的流程 - 按鈕可移除最後文字

1. 在HTML創造按鈕如下
```html
<button class="removeItemButton">Remove Last Item</button>
```
2. 創建query selector，在JS打如下
```js
const removeItemButton = document.querySelector('button.removeItemButton');
```
3. 創建addEventListener，在JS打如下
```js
removeItemButton.addEventListener('click', () => {
  let ul = document.getElementByTagName('ul')[0];
  let li = document.querySelector('li:last-child');
  ul.removeChild(li);
});
```
## Callback function

意義: We want to call it back after certain amount of time has passed.

Ex: (something) 為 Callback function
```js
window.setTimeout((something) => {
  console.log(something);
  }, 3000 ,'Hi');
```
Ex: listener 為 Callback function，常被稱呼為event handler，因為其目的為處理事件
```js
target.addEventListener(type, listener[, options]);
```
## Event Bubbling 、 Event Delegation

意義: 當li元素收到 click 事件，接著父元素 ul 也收到 click 事件，接著父元素 body 也收到 click 事件，接著父元素 Document 也收到 click 事件。可用父元素為代表，以下的子元素可一併套用 click 觸發後的效果。若要防止 Event Bubbling ，可參考此 https://ithelp.ithome.com.tw/articles/10192015

## Event Object

意義: 當event handler 被觸發時，它同時會收到一個event object，這個object有些關於這個事件的有用資訊，還有一些方法(method)

event.target，會指向第一個收到此事件(如點擊)的元素 

## 綜合練習

HTML:
```html
  <body>
    <div class="list">
      <p class="description">Things that are purple:</p>
      <ul>
        <li>grapes</li>
        <li>amethyst</li>
        <li>lavender</li>
        <li>plums</li>
      </ul>
    </div>
    <script src="app.js"></script>
  </body>
```
app.js:
```js
const listDiv = document.querySelector('.list');
listDiv.addEventListener('mouseover', (event) => {
  if(event.target.tagName == "LI"){
    event.target.textContent = event.target.textContent.toUpperCase();
  }
});
listDiv.addEventListener('mouseout', (event) => {
  if(event.target.tagName == "LI"){
    event.target.textContent = event.target.textContent.toLowerCase();
  }
});
```

## Traverse 穿越: 到上層父元素，用.parentNode
刪除Child，用法如下  
HTML:
```html
<ul class="list">
  <li>grapes <button>Remove</button></li>
  <li>amethyst <button>Remove</button></li>
  <li>lavender <button>Remove</button></li>
  <li>plums <button>Remove</button></li>
</ul>
```

JS:
```js
const listUl = document.querySelector('.list');
listUl.addEventListener('click', (event) => {
  if(event.target.tagName == BUTTON"){
    let li = event.target.parentNode;
    let ul = li.parentNode;
    ul.removeChild(li);
  }
});
```

## Traverse 穿越: 到同層兄弟姊妹元素，用.previousElementSibling
.previousSibling，與.previousElementSibling 差異為，全部節點都選(有元素節點、文字節點、註釋節點等)，或是只選元素節點(含```<  >```的才選)，一般用.previousElementSibling  
https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/273054/  
HTML:
```html
<ul class="list">
  <li>grapes <button class="up">Up</button></li>
  <li>amethyst <button class="up">Up</button></li>
  <li>lavender <button class="up">Up</button></li>
  <li>plums <button class="up">Up</button></li>
</ul>
```
將元素往上移動的JS:
```js
listUl.addEventListener('click', (event) => {
  if (event.target.className== 'up') {
    let li = event.target.parentNode;
    let prevLi = li.previousElementSibling;
    let ul = li.parentNode;
    if (prevLi){ // 防止拉到第一個後，持續上拉出現置底
      ul.insertBrfore(li, prevLi);
    }
  }
});
```
將元素往下移動的JS:
```js
listUl.addEventListener('click', (event) => {
  if (event.target.className== 'down') {
    let li = event.target.parentNode;
    let nextLi = li.nextElementSibling;
    let ul = li.parentNode;
    if (nextLi){ // 防止拉到第一個後，持續上拉出現置底
      ul.insertBrfore(nextLi, li);
    }
  }
});
```
## Traverse 穿越: 到第一個/最後一個子元素，用.firstElementChild / .lastElementChild
1. .firstElementChild同義於.children[0]
2. .children可全選所有該元素的其下child
```js
const firstListItem = document.querySelector('.list > ul').firstElementChild;
firstListItem.style.backgroundColor = 'lightskyblue'
```


## 創建附帶按鈕之函數，用.appendChild
```js
function attachListBtn(li) {
  let up = document.createElement('button');
  up.className = "up";
  up.textContent = "Up";
  li.appendChild(up);
}
```

## 點擊子層之外，關閉父層
- 使用 `if(e.target === e.currentTarget)`
- e.currentTarget: 綁定事件的元素
- e.target: 觸發事件的元素
- 以下範例，將綁定事件的元素，設定為父層滿版。子層顯示在父層上
- 點擊子層 ( Alert 彈窗 ) 時 `if(e.target === e.currentTarget)` 為 `if(子層元素 === 父層元素)`，故不會觸發關閉彈窗
- 補充: event.currentTarget 是註冊事件時所指向的元素，而 event.target 是響應事件的最小子元素，也就是最深層級的觸發事件的元素
```js
import React, { useState } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

const Overlay = styled.div`
    position: fixed;
    background-color: #333;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
`;

const Component = () => {
    const [isShow, setIsShow] = useState(true);
    
    const closeAlertBox = (e: React.BaseSyntheticEvent) => {
        if(e.target === e.currentTarget) setIsShow(false);
    }
    return (
        <Overlay style={{display: isShow? 'block': 'none'}} onClick={closeAlertBox}>
            <div style={{backgroundColor: 'red'}}>Alert</div>
        </Overlay>
    )
}

render(<Component />, document.getElementById('root'));
```
## Scroll 事件相關，彈窗使用 Position: fixed 時，隱藏瀏覽器滑動捲軸
```js
import React, { FC, useState, useEffect } from 'react';

const Component: FC<{ list: [] }> = ({ list }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const handleModalClose = () => {
        setIsOpenModal(false);
    };
    useEffect(() => {
        document.body.style.overflowY = isOpenModal ? 'hidden' : 'auto';
    }, [isOpenModal]);
    return (
        <>
            {list.map(
                // ...
            )}
            {isOpenModal && (
                <ProductToCartModal onClose={handleModalClose} />
            )}
        </>
    );
};
```
## Scroll 事件相關，當捲軸下拉到底，用 AJAX 擴展頁面

1. 座標定義 https://andyyou.github.io/2017/01/31/understand-coordinate-of-dom/  
2. (圖中 A B) 動態取得相對於目前視窗座標軸上，元件座標位置: document.getElementsByClassName('container-5')[0].getBoundingClientRect().bottom; (或.top)  
https://juejin.im/entry/59c1fd23f265da06594316a9?fbclid=IwAR1j1TZ7TWBkqipedDJMi5EDLj3v9ZEdI9WHnrZ34ZAEGmM8G4A7NNqwhps  
3. (圖中 C) 動態取得目前scroll bar捲動長度，可直接使用範例程式碼。: 引入事件監聽函數，隨時可取得當下位置y座標 scroll_pos，或自己一次性使用window.scrollY  
https://developer.mozilla.org/zh-TW/docs/Web/API/Document/scroll_event  
4. (圖中 D) 取得瀏覽器當下視窗高度: window.innerHeight  
https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/294280/  
5. (圖中 E) 靜態取得網頁總高度: document.body.clientHeight  
https://blog.csdn.net/china_skag/article/details/30512877  
