# Promise 相關問題

## Ref: https://ithelp.ithome.com.tw/articles/10228649  
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
  console.log('start');
  const msg = afterDelay(1000, 'hello world');
  console.log('end');
}

async function ex2(){
  console.log('start');
  const msg = await afterDelay(1000, 'hello world');
  console.log('end');
}

ex1(); 
// start
// end
// value: hello world

ex2(); 
// start
// value: hello world
// end

```
2. 下列程式碼何處有何問題
```js
async function ex3(){
  const msg = await 'hello world'; // TypeScript Error: 'await' has no effect on the type of this expression.
  // 應修正為: const msg = await Promise.resolve('hello world');
  console.log('msg: ', msg);
}

async function ex4(){
  return 100;
}

ex3(); 
ex4(); 
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


