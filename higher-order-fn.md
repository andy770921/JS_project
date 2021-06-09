## forEach, map, reduce (HOF)
- map: https://codesandbox.io/s/mocha-unit-test-map-yf80h?file=/src/index.js
- reduce: https://codesandbox.io/s/mocha-unit-test-reduce-f8d1r?file=/src/index.js
```js
// Q:
function forEach(list, fn){
  // CODE HERE:
};

const log = (text) => console.log(text);
forEach([2, 3, 4], log); // 2 3 4

// A:
function forEach(list, fn){
  for(let i = 0; i < list.length; i++){
    fn(list[i]);
  }
};

// Q:
function map(list, fn){
  // CODE HERE:
}

const ans = map([2, 3, 4], x => x*2 ); 
console.log(ans);  // [4, 6, 8]

// A:
function map(list, fn){
  const newList = [];
  for(let i = 0; i < list.length; i++){
    newList.push(fn(list[i]));
  }
  return newList;
}

// Q:
function reduce(list, fn){
  // CODE HERE:

}

console.log(reduce([1, 2, 3], (acc, cur) => (acc + cur))); // 6
console.log(reduce([1, 2, 3], (acc, cur) => (acc * acc * cur))); // 12

// A:
function reduce(list, fn){
  let sum = list[0];
  for (let i = 1; i < list.length; i++){
    sum = fn(sum, list[i]);
  }
  return sum;
}

```
## Reduce 寫成 instance 的方法
```js
class CustomArray {
    constructor(arr){
        this.arr = arr;
    }
    reduce(fn){
        let sum = this.arr[0];
        for (let i = 1; i < this.arr.length; i++){
            sum = fn(sum, this.arr[i]);
        }
        return sum;
    }
}

const a = new CustomArray([1,2,3]);
console.log(a.reduce((acc, cur) => (acc + cur))); // 6
console.log(a.reduce((acc, cur) => (acc * acc * cur))); // 12
```
## Once (HOF, closure)
```js
// Q:
function once(fn){
  // TODOS
  
}

const log = () => console.log("hello");
const onceLog = once(log);
onceLog(); // hello
onceLog();
onceLog();


// A:
function once(fn){
  let times = 0;
  return () => {
    times ++;
    if (times <= 1) fn();
  }
}

```
## debounce (HOF, closure)
```js
// debounce
// threashold      : |   |
// event stream    : |  |  |  |
// expected outcome:              |
function debounce(fn, interval=300){
  let startTime = null;
  let endTime = null;
  return () => {
    startTime = Date.now();
    setTimeout(
      () => {
        endTime = Date.now();
        if (endTime - startTime >= interval){ 
          fn(); 
        }
      }
      ,interval);
  }
}
function A(){
  console.log("hi");
}
let B = debounce(A, 2000);

```

```js
function debounce(fn, interval = 300){
  let timeoutId = null;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(
      () => fn();
      ,interval);
  }
}
function A(){
  console.log("hi");
}
let B = debounce(A, 2000);
```
better:
```js
function debounce(fn, interval = 300){
  let timeoutId = null;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(()=>{
      timeoutId = null;
      fn(...args);
      },interval);
  }
}
function A(x){
  console.log(x);
}
let B = debounce(()=>A("hi"), 2000);
```
Ref: https://gist.github.com/nmsdvid/8807205

```js
function debounce(func, delay) {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, args)
    }, delay);
  }
}
```
Ref: https://mropengate.blogspot.com/2017/12/dom-debounce-throttle.html

## Debounce & Throttle 中文解釋，與程式碼寫法
https://medium.com/@alexian853/debounce-throttle-%E9%82%A3%E4%BA%9B%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC%E6%87%89%E8%A9%B2%E8%A6%81%E7%9F%A5%E9%81%93%E7%9A%84%E5%B0%8F%E4%BA%8B-%E4%B8%80-76a73a8cbc39

## pipe (closure, HOF, rest parameter)
https://playcode.io/603416/
```js
// Q:
function pipe(...funcs){
  // TODOS
  
}

const testFuncA = pipe(
  value => value + 5,
  value => value * 9,
  value => `$${value}`,
);

console.log(testFuncA(2)) // $63

const testFuncB = pipe(
  (value1, value2) => value1 + value2,
  value => value - 654,
  value => value * 987.987,
  Math.abs,
  Math.round
);

console.log(testFuncB(17, 10)) // 619468
console.log(testFuncB(2, 1)) // 643180


// Ans 類別一 - 使用 accumulator (returnValue) 記錄運算結果:
const pipe = (...funcs) => {
  return (...args) => {
    let returnValue = funcs[0](...args);
    for(let i = 1; i < funcs.length; i++){
      returnValue = funcs[i](returnValue);
    }
    return returnValue;
  }
}

// Ans - 最精簡的版本:
const pipe = (...funcs) => {
  return  (...args) => funcs.reduce((res, func, i) =>  i === 1 ? func(...args): func(res));
}

// another Ans:
const pipe = (...funcs) => {
  const recurFn = (fn, ...args) => {
    return fn(...args);
  }
  return (...args) => {
    let sum = recurFn(funcs[0], ...args);
    for(let i = 1; i < funcs.length; i++){
        sum = recurFn(funcs[i], sum);
        if (i === funcs.length -1) return sum;
    }
    // TARGET: 
    // return recurFn(funcs[1], (recurFn(funcs[0], ...args)));
  }
}


// Ans 類別二 - 使用 accumulator 記錄越包越多層的函式:
const pipe = (...funcs) => {
  return funcs.reduce((res, func) => (...args) => func(res(...args)));
}

// another Ans:
const pipe = (...funcs) => {
  let res = funcs[0];
  for (let i = 1; i < funcs.length; i ++){
    res = (function(f){
      return (...args) => funcs[i](f(...args));
    }(res));
  }
  return res;
}

// another Ans:
const pipe = (...funcs) => {
  function combineTwoFns (innerFn ,outerFn) {
    return (...args) => outerFn(innerFn(...args));
  }
  let accumulator = funcs[0];
  for (let i = 1; i < funcs.length; i ++){
    accumulator = combineTwoFns(accumulator, funcs[i]);
  }
  return accumulator;
}

// Ans 類別三 - 遞迴 + 累計值:
function pipe(...funcs){
  return (...args) => {
    function recursiveFn(n){
      if (n === 1) return funcs[1](funcs[0](...args))
      return funcs[n](recursiveFn(n-1))
    }
    return recursiveFn(funcs.length - 1);
  }
}

// Ans 類別三 - 遞迴 + 累計越包越多層的函式:
function pipe(...funcs){
    function recursiveFn(n, ...arguments){
      if (n === 0) return funcs[0](...arguments)
      return funcs[n](recursiveFn(n-1, ...arguments))
    }
    return (...args) => recursiveFn(funcs.length - 1, ...args);
}
```

