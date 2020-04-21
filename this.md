
# JS 中的 this

## constructor function 及 class 的 this

```js
function A(){
  this.say = () =>{
    console.log("A arrow",this);
  }
  this.sayN = function () {
    console.log("A nornal",this);
  }
}
A.prototype.sayProto = () =>{
  console.log("A proto arrow",this);
}
A.prototype.sayProtoN = function() {
  console.log("A proto normal",this);
}
const x = new A();
x.say(); 
x.sayN();
x.sayProto(); // window
x.sayProtoN();
const x1 = x.say;
const x2 = x.sayN;
const x3 = x.sayProto;
const x4 = x.sayProtoN;
x1();
x2();  // window
x3();  // window
x4();  // window


class B  {
  constructor(){
    this.say = () =>{
      console.log("B arrow",this);
    }
    this.sayN = function () {
      console.log("B nornal",this);
    }
  }
  sayOutsideConst = () =>{
    console.log("B outside arrow",this);
  }
  sayOutsideConstN = function (){
    console.log("B outside normal",this);
  }
}

const y = new B;

y.say();
y.sayN();
y.sayOutsideConst();
y.sayOutsideConstN();

const y1 = y.say;
const y2 = y.sayN;
const y3 = y.sayOutsideConst;
const y4 = y.sayOutsideConstN;
y1();
y2(); // undefined
y3();
y4(); // undefined
```

1. class B 中，sayOutsideConst 使用箭頭函數，效用等於在 constructor 內宣告 say。效用等於在 function A 內定義 say，而不是指在原型定義。可查關鍵字 class field
2. class B 中，sayOutsideConstN 使用一般函數，效用等於在 function A 定義在原型的 sayProtoN，且又附帶了嚴格模式

# JS 中的 Class 與 function 實做繼承

## class
https://codepen.io/jackblackevo/pen/veyNKJ?editors=0010&fbclid=IwAR0yaCXye7ogklCrUK0avmi5-CYXRC2Gn03G0Q4UMfNSQJ4nx77ria2DCLQ
```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greeting() {
    console.log("Hi! I'm " + this.name + ".");
  }
}

class Developer extends Person {
  constructor(name, programLang) {
    super(name);
    this.programLang = programLang;
  }

  coding() {
    console.log('console.log("Hello world!")');
  }
}

var ryan = new Developer("Chiang", "JavaScript");
ryan.coding();
ryan.greeting();
console.log(ryan.hasOwnProperty('name'));
console.log(ryan.hasOwnProperty('programLang'));
```
## function
https://codepen.io/jackblackevo/pen/oGYXKL?editors=0010&fbclid=IwAR2UWw5tTT9Pgm_cbZaD5P5MiXIumVtqnXty2JQGurj8PZRwmAUkdVwx8lU
```js
function Person(name) {
  this.name = name;
}

Object.defineProperty(
  Person.prototype,
  'greeting',
  {
    configurable: true,
    enumerable: false,
    value: function() {
      console.log("Hi! I'm " + this.name + ".");
    },
    writable: true
  }
);

function Developer(name, programLang) {
  Person.call(this, name);
  this.programLang = programLang;
}

Developer.prototype = Object.create(Person.prototype);
Object.defineProperty(
  Developer.prototype,
  'coding',
  {
    configurable: true,
    enumerable: false,
    value: function() {
      console.log('console.log("Hello world!")');
    },
    writable: true
  }
);
Object.defineProperty(
  Developer.prototype,
  'constructor',
  {
    configurable: true,
    enumerable: false,
    value: Developer,
    writable: true
  }
);

var ryan = new Developer("Chiang", "JavaScript");
ryan.coding();
ryan.greeting();
console.log(ryan.hasOwnProperty('name'));
console.log(ryan.hasOwnProperty('programLang'));
```

# JS 中的原型
## 定義:
尋找一個屬性時，可以被委派這項任務的物件 (p.191)。  
如下例，`tree.black`，tree 尋找 black 屬性時，自己沒有。noctis 物件可以被委派這項 (調出 black) 的任務  
稱 noctis 是 tree 的原型
```js
const tree = { green: true };
const noctis = { black: true };

Object.setPrototypeOf(tree, noctis); // 後者為前者的原型

console.log(tree.black);
// true
```
## 原型鍊:
每個物件都可以有一個原型，而物件原型也可以有自己的原型，依此類推，就能得到所謂的原型鍊 (p.195)。
## function, constructor function 與原型:
解析以下程式碼  
```js
function A(){};
console.log(A);  
// ƒ A() {}  看不出來細節
console.log({x:A, y:123}); 
// {y: 123, x: ƒ}
// 點開 x 細看內容後
// x: ƒ A()
//    length: 0
//    name: "A"
//    arguments: null
//    caller: null
//    prototype: {constructor: ƒ}
//    __proto__: ƒ ()
//    [[FunctionLocation]]: VM105:1
//    [[Scopes]]: Scopes[2]
```
1. 函式被建立時，它會得到一個新物件，是指派到 `prototype` 屬性。
2. 一開始，這個 prototype 物件只有一個屬性 `constructor`，而這個屬性，是指向原來函式的位址 (p.198)
```js
function A(){};
let b = new A(); 
console.log(b);
// A {}  看不出來細節
console.log({x:b, y:123}); 
// {x: A, y: 123}
// 點開 x 細看內容後
// x: A
//    __proto__:
//          constructor: ƒ A()
//          __proto__: Object
// y: 123
// __proto__: Object
```
```js
function C(){}; 
C.prototype.sayHi = function(){ 
    return 'hi';
};
let d = new C(); 
console.log({x:d, y:123}); 
// 點開 x 細看內容後
// x: C
//    __proto__:
//          sayHi: ƒ ()
//          constructor: ƒ C()
//          __proto__: Object
// y: 123
// __proto__: Object
```
3. 當我們把函式當成建構器使用時，所建立出來的新物件，其原型會被設定為，建構器函式原型所參照的物件 (p.198)
