## forEach, map (HOF)
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

```
## Once (HOF, closure)
```js
Q:
function once(fn){
  // TODO

}

const log = () => console.log("hello");
const onceLog = once(log);
onceLog(); // hello
onceLog();
onceLog();


A:
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
