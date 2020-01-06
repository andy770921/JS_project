
# JS 中的 this

## 在 constructor function 及 class 的測試 code 

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
