
# JS 中的 this, class, prototype

## constructor function 及 class 的 this

```js
function A(){
  this.say = () => {
    console.log("A arrow", this);
  }
  this.sayN = function () {
    console.log("A nornal", this);
  }
}
A.prototype.sayProto = () => {
  console.log("A proto arrow", this);
}
A.prototype.sayProtoN = function() {
  console.log("A proto normal", this);
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


class B {
  constructor(){
    this.say = () => {
      console.log("B arrow", this);
    }
    this.sayN = function () {
      console.log("B nornal", this);
    }
  }
  sayOutsideConstructor = () => {
    console.log("B outside arrow", this);
  }
  sayOutsideConstructorN = function (){
    console.log("B outside normal", this);
  }
}

const y = new B;

y.say();
y.sayN();
y.sayOutsideConstructor();
y.sayOutsideConstructorN();

const y1 = y.say;
const y2 = y.sayN;
const y3 = y.sayOutsideConstructor;
const y4 = y.sayOutsideConstructorN;
y1();
y2(); // undefined
y3();
y4(); // undefined
```

1. class B 中，sayOutsideConstructor 使用箭頭函數，效用等於在 constructor 內宣告 say。效用等於在 function A 內定義 say，而不是指在原型定義。即 ```y3()``` 等於 ```y1()``` 等於 ```x1()```，效果可查關鍵字 class field
2. class B 中，sayOutsideConstructorN 使用一般函數，效用等於在 function A 定義在原型的 sayProtoN，且又附帶了嚴格模式

## class, 代入匿名函式, 及箭頭函式的 this

```js
const FB = {login: function(cb){let res = 100; cb(res);}}
//FB3.login(function(res){console.log('in Window 1', this, res)})
//FB3.login((res) =>{console.log('in Window 2', this, res)})

class Test {
  constructor(){
    this.sayHi = 'hi';
  }
  sayThisInProto(){
    //console.log('sayThisInProto',this);
    //function anonymous(res){console.log('in sayThisInProto 1', this, res)}
    //FB3.login(anonymous);
    FB.login(function(res){console.log('in sayThisInProto 1', this, res)})
    //const ano = (res) =>{console.log('in sayThisInProto 2', this, res)};
    //FB3.login(ano);
    FB.login((res) =>{console.log('in sayThisInProto 2', this, res)})
  }
}

const test = new Test();
test.sayThisInProto();

// const testObj = {a: "hi", b: function(){ console.log('testObj', this)}};
// testObj.b();
```

# JS 中的 Class 與 function 實作繼承

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
Ref: 忍者: JavaScript 開發技巧探祕 第二版  
Ref: 忍者: JavaScript 開發技巧探祕 [英文版](https://github.com/sakataa/Paper/blob/master/JS/Secrets%20of%20the%20JavaScript%20Ninja%2C%202nd%20Edition.pdf)  
## 定義:
- 尋找一個屬性時，可以被委派這項任務的物件 (p.191)。 
- 如下例，`tree.black`，tree 尋找 black 屬性時，自己沒有。noctis 物件可以被委派這項 (調出 black) 的任務，稱 noctis 是 tree 的原型
- 如果在目標物件找不到所要的屬性，原型會指向接下來要繼續在上頭尋找該屬性的物件 (p.225)。

```js
const tree = { green: true };
const noctis = { black: true };

Object.setPrototypeOf(tree, noctis); // 後者為前者的原型

console.log(tree.black);
// true
```
## 原型鏈:
每個物件都可以有一個原型，而物件原型也可以有自己的原型，依此類推，就能得到所謂的原型鏈 (p.195)。
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
//  y: 123
```
1. 函式被建立時，它會得到一個新物件，是指派到 `prototype` 屬性。 (p.198)
2. 一開始，這個 prototype 物件只有一個屬性 `constructor`，而這個屬性，是指向原來函式的位址 (p.198)
```js
function A(){};
let b = new A(); 
console.log(b);
// A {}  點開後可得到以下結果
//    __proto__:
//          constructor: ƒ A()
//          __proto__: Object
```
```js
function C(){}; 
C.prototype.sayHi = function(){ 
    return 'hi';
};
let d = new C(); 
console.log(d);
// C {}  點開後可得到以下結果
//    __proto__: 
//          sayHi: ƒ ()
//          constructor: ƒ C()
//          __proto__: Object

console.log({x:C, y:234});
// x: ƒ C()
//    length: 0
//    name: "C"
//    arguments: null
//    caller: null
//    prototype: {sayHi: ƒ, constructor: ƒ}
//    __proto__: ƒ ()
//    [[FunctionLocation]]: VM518:1
//    [[Scopes]]: Scopes[2]
// y: 234


```
3. 當我們把函式當成建構器使用時，所建立出來的新物件，其原型會被設定為，建構器函式原型所參照的物件 (p.198)
4. d 的原型會被設定為 `function C(){}` 的 prototype 屬性的 value (這個 value 是 `{sayHi: ƒ, constructor: ƒ}`)
5.  [補充] d 的原型可用 `__proto__` 得知
6. 使用 new 運算子，也會發生的事：建立新的空物件 -> 將函式的 this 指向該空物件 (設定該函式的背景空間) -> 回傳值指向這個新物件的位址 (p.197)  

## 原型複寫:
解析以下程式碼 (p.202)
```js
function Ninja(){
    this.swung = true;
}
const ninja1 = new Ninja(); 
console.log(ninja1);
//  Ninja {swung: true}  點開後可得到以下結果
//      swung: true
//      __proto__: Object
```
1. 展開上式 `__proto__` 可到如下結果。得知 ninja1 的原型為 Ninja 
```
constructor: ƒ Ninja()
__proto__: Object
```
2. 完整說法為: ninja1 的原型為， Ninja 函式的 prototype 屬性的值，這個值是 `{constructor: ƒ Ninja()}`
3. 觀察 1. 中的 `constructor` 值為 `ƒ Ninja()`。得知 `constructor` 指向 Ninja 函式的位址。意義為現在這個 instance (ninja1) 是被 Ninja 函式建立的
4. 展開 1. 中的 `constructor` 得到如下。證明 Ninja 函式擁有 `prototype` 屬性，值是 `{constructor: ƒ Ninja()}`，與 2. 的說法符合
```
constructor: ƒ Ninja()
  length: 0
  name: "Ninja"
  arguments: null
  caller: null
  prototype: {constructor: ƒ}
  __proto__: ƒ ()
  [[FunctionLocation]]: VM274:1
  [[Scopes]]: Scopes[2]
```
5. [不佳] 丟失 constructor 資訊的原型複寫方式如下。已建立的 instance 仍會參照到舊的原型，但新建立的 instance 不會 (p.204)
```js
function Ninja(){
    this.swung = true;
}
const ninja1 = new Ninja(); 
Ninja.prototype.doSwung = function(){
  return this.swung;
};
Ninja.prototype = {
    sayHi: function() {
        return 'hi';
    }
};
console.log(ninja1);
//  Ninja {swung: true}
//      swung: true
//      __proto__:
//          doSwung: ƒ ()
//          constructor: ƒ Ninja()
//          __proto__: Object

const ninja2 = new Ninja();
console.log(ninja2);
//  Ninja {swung: true}
//      swung: true
//      __proto__:
//          sayHi: ƒ ()
//          constructor: ƒ Ninja()
//          __proto__: Object
```
## 不重複使用原本的 constructor function 寫法: (p.206)
```js
// --- 重複使用原本的 constructor function 寫法 ---
function Ninja(){
    this.swung = true;
}
const ninja1 = new Ninja(); 
const ninja2 = new Ninja(); 
console.log(ninja1 !== ninja2); // true

// --- 不重複使用原本的 constructor function 寫法 ---
function Ninja(){
    this.swung = true;
}
const ninja1 = new Ninja(); 
const ninja2 = new ninja1.constructor(); 
console.log(ninja1 !== ninja2);  // true
```

## 使用 instanceof: (p.215)
檢查 instanceof 右側函式的 prototype 屬性的值，是否在 instanceof 左側物件的原型鏈上
```js
function Ninja(){}
const ninja = new Ninja();
Ninja.prototype = {}; 

console.log(ninja instanceof Ninja); // false
```
## class 與 constructor function 互轉: (p.219)
```js
// constructor function
function Ninja(name) {
    this.name = name;
}
Ninja.prototype.doSwung = function(){
    return true;
};
Ninja.checkSpecies = function() {
    return 'human';
};
console.log(new Ninja('Bob'));     // Ninja {name: "Bob"}
console.log(Ninja.checkSpecies()); // human

// class
class Ninja{
    constructor(name){
        this.name = name;
    }
    doSwung(){
        return true;
    }
    static checkSpecies(){
        return 'human';
    }
}
console.log(new Ninja('Bob'));     // Ninja {name: "Bob"}
console.log(Ninja.checkSpecies()); // human
```
## 使用 constructor function 的原型 (p.210 - 213) 及 class (p.221) 實作繼承:
```js
// constructor function
function Person(){}
Person.prototype.dance = function (){
    return true;
};

function Ninja(){}

Ninja.prototype = new Person(); // 或是 Ninja.prototype = Person.prototype; 也行，意義不同。
// 註解的寫法不推薦，會改 Ninja.prototype 連帶影響到 Person.prototype

Object.defineProperty(
  Ninja.prototype,
  'constructor',
  {
    configurable: false, // 屬性不可被改變或被刪除，若未宣告預設值為 false
    enumerable: false,   // 不可在 for-in 迴圈出現，若未宣告預設值為 false
    value: Ninja,        // 屬性的值，若未宣告預設值為 undefined
    writable: true       // 可透過 = 改變其值，若未宣告預設值為 false
  }
);

const ninja = new Ninja();
console.log(ninja.dance());  //true

// class
class Person {
    constructor(name) {
        this.name = name;
    }
    dance(){
        return true;
    }
}
class Ninja extends Person {
    constructor(name, weapon) {
        super(name);
        this.weapon = weapon;
    }
}

const ninja = new Ninja('Bob', 'sword');
console.log(ninja.dance());  //true

```
