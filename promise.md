# Promise 相關問題

## Ref: https://ithelp.ithome.com.tw/articles/10228649  
1.
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
2.
```js
async function ex3(){
  console.log('start');
  const msg = await 'hello world';  
  // or: const msg = await Promise.resolve('hello world');
  console.log('msg: ', msg);
  console.log('end');
}

ex3(); 
// start
// msg: hello world
// end


```
