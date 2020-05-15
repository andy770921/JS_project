## forEach, map, reduce (HOF)
```js
// Q:
function forEach(list, fn){
  // CODE HERE:
};

forEach([2, 3, 4], console.log); // 2 3 4

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

## pipe (closure, HOF, rest parameter)
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


// Ans 類別一 - 使用 accumulator 記錄運算結果:
const pipe = (...funcs) => {
  return (...args) => {
    let returnValue = funcs[0](...args);
    for(let i = 1; i < funcs.length; i++){
      returnValue = funcs[i](returnValue);
    }
    return returnValue;
  }
}

// Ans 類別一 - 最精簡的版本:

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

```

