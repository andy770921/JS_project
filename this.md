
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
