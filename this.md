
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
const x = new A();
x.say();
x.sayN();
const x1 = x.say;
const x2 = x.sayN;
x1();
x2();


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
y2();
y3();
y4();
```
