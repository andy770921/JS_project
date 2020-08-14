# Promise 相關問題

Ref: https://ithelp.ithome.com.tw/articles/10228649 

## 問題

1. 請問 console 會出現甚麼
```js
function afterDelay(ms, value){
  return new Promise (resolve =>{
    setTimeout(()=>{ 
      console.log('value: ', value);
      resolve(value); 
      }, ms);
  });
}

async function ex1(){
  console.log('ex1 start');
  const msg = afterDelay(1000, 'hello world');
  console.log('ex1 end. print msg: ', msg);
}

async function ex2(){
  console.log('ex2 start');
  const msg = await afterDelay(500, 'hello world 2');
  console.log('ex2 end. print msg: ', msg);
}

ex1(); 
ex2(); 
// ex1 start
// ex1 end. print msg: Promise {<pending>}
// ex2 start
// value: hello world 2
// ex2 end. print msg: hello world 2
// value: hello world

```
2. 下列程式碼有無問題
```js
async function ex3(){
  const msg = await 'hello world'; 
  console.log('msg: ', msg);
}

async function ex4(){
  return 100;
}

ex3(); 
ex4(); 

// const msg = await 'hello world'; 寫法不佳 JS 不會報錯，但 TypeScript 會報錯: 'await' has no effect on the type of this expression.
// 應修正為: const msg = await Promise.resolve('hello world');
```
3. 請問 console 會出現甚麼
```js
async function ex3(){
  const msg = await Promise.resolve('hello world');
  console.log('msg: ', msg);
}

async function ex4(){
  return 100;
}

ex3();
console.log(ex4());
// Promise {<fulfilled>: 100}
// msg:  hello world
```
4. 請問 console 會出現甚麼
```js
function afterDelay(ms, value){
  return new Promise (resolve =>{
    setTimeout(()=>{ 
      console.log('value: ', value);
      resolve(value); 
      }, ms);
  });
}

async function first(){
  console.log('enter first');
  return await afterDelay(1000, 'hello');
}

async function second(){
  console.log('enter second');
  const result = await first();
  console.log('in the middle');
  await afterDelay(2000, 'world');
  return result;
}

second().then(console.log); 

}

second().then(console.log); 
// enter second
// enter first
// value: hello
// in the middle
// value: world
// hello
```
5. 請問 console 會出現甚麼
```js
(async () => {
  console.log('1');
  await (async() => { console.log('3')})();
  console.log('2');
})();
```



