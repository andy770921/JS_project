# JS code 觀念

## 同步/非同步
https://www.youtube.com/watch?v=NOprCnnjHm0
## ES6語法與ES5差異，及call by ref解析27:22
https://youtu.be/pr7JFQaAYjg
## Array或Object，避免用=指定，因此兩者為call by ref
1. [1]==[1]，會是false，因為指向不同記憶體位置
2. 若要比較，要用_.isEqual([1],[1])，會回傳true
3. copy array方法，將a複製進b，用slice複製完全一樣的出來到不同記憶體位置: b = a.slice();
4. copy Object方法，將a複製進b，把a放到空陣列，會是新的記憶體位置: b= Object.assign({}, a);

## this的用法
https://www.youtube.com/watch?v=tpheRywjVQk  
https://youtu.be/XJzDF9bj368
## 計算機概論
https://youtu.be/QuCu4iDpPTU
## 解構賦值
文章關鍵字:使用於函式的傳入參數之中的解構賦值  
https://ithelp.ithome.com.tw/articles/10185430
## Array常用的方法
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

## Object常用的方法
1. 取得物件中的值，用students.name，或是students["name"]
2. for-in loop 遍歷物件元素
Note: propName指的是物件內的key，可換變數名稱，要與for迴圈內的統一即可。  
&emsp; Note: students[propName]指的是每個key的值，不能用students.propName，因為會找students物件中，名為propName的key，但是沒有此 key  
&emsp; Note: console.log連續輸出不同字串，可用逗號間隔不同之字串  
```
var students = {
  name: "Dave",
  grade: [80, 85, 90]
};

for (var propName in students) {
  console.log(propName, ", ", students[propName]);
}
```
3. 二維陣列改寫為物件，取值法也相應變化  
原:  
```
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
```
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
## 與HTML DOM的互動
1. 事件監聽，以ID選: addEventListener()
https://ithelp.ithome.com.tw/articles/10192015  
HTML:
```
  <body>
    <script src="app.js"></script>
    <h1 id="myHeading">JavaScript and the DOM</h1>
    <p>Making a web page interactive</p>
  </body>
```
&emsp;  JS:
```
const myHeading = document.getElementById('myHeading');
myHeading.addEventListener('click', ()=>{
  myHeading.style.color = 'red';
});
```
2. 以Type多重選，HTML 要用 const myHeading = document.getElementsByTagName('h1');
3. 以Type單選清單內第三個元素，HTML 要用 const myList = document.getElementsByTagName('li')[2];
4. 以Class多重選，HTML 要用 const excludeColor = document.getElementsByClassName('notPurple');
5. document.getElementsByClassName('notPurple'); 也可寫成 document.querySelectorAll('.notPurple');
6. document.getElementById('myHeading'); 也可寫成 document.querySelector('#myHeading');
7. document.querySelector('li'); 會找出```<li>```的第一個元素
8. ul的ID，其下層的li全選，寫成document.querySelectorAll('#rainbow li');
9. ```HTML: <p title="label">123456</p>```可用 document.querySelector('[title=label]'); 找到
10. 偽class與document.querySelectorAll('li:nth-child(even)');搭配使用
```
const evens = document.querySelectorAll('li:nth-child(even)');

for (let i = 0; i < evens.length; i++ ){
  evens[i].style.backgroundColor = 'lightgray';
}
```
11. 選擇某nav下的超連結，可如下
```
let navigationLinks =  document.querySelectorAll('nav > ul > li > a');
```
12.選擇某p下的class(名稱description) 第一個出現的物件，可如下
```
let p = document.querySelector('p.description');
```
13.可用.innerHTML，取得內部資料回傳值，也可重新指定HTML Tag內部資料
```
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
```
let myHeading =  document.querySelector('h1');
h1.textContent = "This is new Heading";
```
15. 取得 <input type="text" id="linkName"> 輸入字串欄位的值:
```
var inputValue = document.getElementById('linkName').value;
```
