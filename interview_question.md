# Interview Question

# HTML
## 何時用 `<script async>` 何時用 `<script defer>`
- `defer` 會讓 `scripts` 的檔案先開始被下載，但在 HTML 文件準備好後才開始執行，同時會確保各個 script 檔案執行的順序
- `async` 會讓 scripts 的檔案先開始被下載，但它不會確保各個 script 檔案被執行的順序，先下載好的就先執行
- `defer` 和傳統只使用 `<script>` 的方式一樣，使用 defer 能夠保證 scripts 的檔案會按照 document 中的順序執行
- `async` 適合用在每個 `<script>` 的 JS 檔彼此之間沒有相依性，不需要誰先執行才能換另一個執行的這種情況（例如，Google Analytics），async 會在該 JS 檔下載完成後，就會馬上被執行
- 傳統上，為了解決單純使用 `<script>` 會卡住瀏覽器繪製，以及 HTML 可能還沒完全繪製完，會取不到 DOM 的問題（例如，jQuery 取不到元素），因此會把 `<script>` 放到 `<body>` 的最後才執行，看起來看 defer 的效果很像，但最大的差別是該 JS 檔開始被下載的時間點。
- Ref1: https://pjchender.dev/javascript/js-async-defer/
- Ref2: https://zellwk.com/blog/javascript-async-and-defer/  
- Ref3: https://www.youtube.com/watch?v=BMuFBYw91UQ  
# CSS
## 一句話解釋
### css `left` and `translate` 渲染有何不同
- Ref: https://medium.com/starbugs/%E8%BA%AB%E7%82%BA-web-%E5%B7%A5%E7%A8%8B%E5%B8%AB-%E4%BD%A0%E6%87%89%E8%A9%B2%E8%A6%81%E7%9F%A5%E9%81%93%E7%9A%84%E7%80%8F%E8%A6%BD%E5%99%A8%E6%9E%B6%E6%A7%8B%E6%BC%94%E9%80%B2%E5%8F%B2-feat-%E6%B8%B2%E6%9F%93%E5%BC%95%E6%93%8E%E9%81%8B%E4%BD%9C%E6%A9%9F%E5%88%B6-6d95d4d960ee
- 瀏覽器渲染流程為，DOM tree 和 CSS tree 合成 Render tree => Layout => Paint => Composite，使用 `left` 會重新觸發 Layout => Paint => Composite，或稱 Reflow & Repaint，`translate` 只會重新 Composite

### css `relative, absolute, fix, static` 有何不同
1. static 是 css position 屬性的預設值，正常由上到下排版，該在甚麼位置就在甚麼位置。
2. relative: 加入這個屬性後，若再加上 `top/bottom/left/right`，該元素會以目前自己位置的四邊框當基準線，偏離目前所在位置
3. absolute: 加上這個屬性後，會跳脫目前排版，若再加上 `top/bottom/left/right`，會以父層最靠近的 relative 畫面元件當定位基礎
4. fixed: 畫面元件會跳脫目前排版。若未設定 `top: 0` 或 `left: 0` ，表現出的行為，像是 `position: static` 的位置但是附加螢幕固定效果，不受滑動卷軸影響。若有設定 `top: 0` 或 `left: 0` ，表現出的行為，直接對齊 `HTML viewport` ( 根元素 `<body>` ) 的左上且因 `top, left` 的設定而位移，且附加螢幕固定效果

### 什麼是 堆疊環境 Stacking Context
- Ref: https://andyyou.github.io/2016/03/03/z-index/
- CSS 為了控制畫面中誰顯示在上面，會採用一套標準。stacking context 是一個父元素及它的所有子元素總稱，如全域根元素 `<HTML>` 建立的 stacking context，和它包含的每個子 / 孫子元素就算一種。排序的邏輯為：在同個 stacking context 所有子元素會照 stacking order 大小排序，越大的排越前面，不同 stacking context 之間，也會比較 stacking context 唯一父元素的 stacking order 排序。
- 除了 `<HTML>` 外，若這些元素加入了 CSS 特別設定時，stack context 也可被創造出來，比如當我們有一個 `<div id="special">`，包著一群 `<div class="child">` 元素，這整個群組的就是 stacking context，它們的堆疊順序通常會一起被移動 ( 從父原則 )
- 可以建立新 stacking context 的 CSS 特別設定如下：
  1. 當元素被設定 position 除了 static 以外的值，然後 z-index 設定為除了 auto 以外的值
  2. 當元素設定了 opacity 且值小於 1
- Example 加入 `class="special"` 設定前:
```html
<div><!-- 1 -->
  <div class="red"><!-- 6 --></div>
</div>
<div><!-- 2 -->
  <div class="green"><!-- 4 --></div>
</div>
<div><!-- 3 -->
  <div class="blue"><!-- 5 --></div>
</div>
```
```css
.red, .green, .blue {
  width: 100px;
  height: 100px;
  position: absolute;
}

.red {
  z-index: 1;
  background: red;
  top: 20px;
  left: 20px;
}

.green {
  background: green;
  top: 40px;
  left: 40px;
}

.blue {
  background: blue;
  top: 60px;
  left: 60px;
}
```
- Example 加入 `class="special"` 設定後:
  1. 解釋一：單看 1, 2, 3，因為 stacking order 有個排序規則是，「如果寫了小於 1 的 opacity，那自己就比較其他元素重要」，所以 `<div class="special">` 的排序重要性升為 3 
  2. 解釋二：單看 3, 3.1，因為 stacking context 有個建立規則是，「如果寫了小於 1 的 opacity，那就建立新的 context」，所以影響了 `<div class="red">` 的排序重要性變成 3.1 
```html
<div class="special"><!-- 3 -->
  <div class="red"><!-- 3.1 --></div>
</div>
<div><!-- 1 -->
  <div class="green"><!-- 4 --></div>
</div>
<div><!-- 2 -->
  <div class="blue"><!-- 5 --></div>
</div>
```
```css
/* 其他與前者相同 */
.special {
  opacity: .99;
}
```
# JS
## 一句話解釋
### 提升 hoisting:
- 中文為「提升」，意義: 變數或函數的宣告，會在程式運行第一行之前就發生，意為提升 ( 賦值不會 )。
- 詳細規格在 ECMA 有規範，原理為，每當 JS 進入一個 function 的時候，就會產生一個 Execution Contexts，或是在 Global 環境也有 Global Execution Context，裡面儲存跟這個 function 有關的一些資訊。每個 Execution Context 都會有相對應的 variable object，在該 Execution Context 裡面，首先宣告的所有變數跟函式都會被加進裡面，之後再執行程式。
- 範例如下 `console.log(a); var a = 100; // 印出 undefined 而不是 ReferenceError: a is not defined`
- Ref: https://blog.techbridge.cc/2018/11/10/javascript-hoisting/?fbclid=IwAR3No5aPr4uqhVN3CiusRV37RDQa6TTCeW7zw_1k3uCm_r_1LF9sLkXCNTg

### 閉包: 
- 函數內部變數，若被參考，會一直被保留
```js
function getAdd(){
  let foo = 1;
  return function(){
    foo = foo + 1;
    return foo;
  }
}
const add = getAdd();
console.log(add()); // 2
console.log(add()); // 3
```
### 原型: 
- 尋找一個屬性時，可以被委派這項任務的物件 ( JavaScript Ninja 中文版 p.191 )
```js
const a = { canEat: true };
const b = { canSleep: true };
Object.setPrototypeOf(b, a);
console.log(b.canEat); // true 
```
- 實際上不會用一個物件指定給另一物件，在 ES5 的用法
```js
function Person(){}
Person.prototype.dance = function(){};

function Student(){}
Student.prototype = new Person();

Object.defineProperty(Student.prototype, "constructor", {
    enumerable: false,
    value: Student,
    writable: true
});

const Tom = new Student();

console.log(Tom.__proto__ === Student.prototype); // true
console.log(Student.prototype.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null
```
### Event Loop: 
- 當瀏覽器處理完整份 HTML 時，瀏覽器會將所有已發生的事件，如使用者產生的事件，放入 Task Queue。Event Loop 意思是瀏覽器持續循環的檢查 Task Queue，若有事件，從頂部開始處理。若無，繼續下一輪檢查。( JavaScript Ninja 中文版 p.27 )

- 深入討論一: 處理完整份 HTML 指，重複進行以下兩件事直到全部完成
  1. 從 HTML 建立 DOM 結構
  2. 執行 `<script>` 的 JS 程式碼

- 深入討論二: 所有已發生的事件，共分四類
  1. 瀏覽器事件: 如 onload 事件。可用 `window.onload = function(){}` 註冊
  2. 網路事件: 來自伺服器的回應，AJAX
  3. 使用者事件: 如移動滑鼠，點滑鼠，按鍵盤
  4. 計時器事件: setTimeout / setInterval

- 深入討論三: 持續循環的檢查 Task Queue，詳細流程說明如下，會重複進行 1. 到 3.
  1. 檢查 Macrotask queue 使否為空，若有任務，執行一件後再進到 2.
  2. 檢查 Microtask queue 使否為空，若有任務，執行一件後再檢查自己，直到自己都空，再進到 3.
  3. 是否需要更新頁面，要的話，更新後回到 1.
  4. 可參考圖 https://juejin.cn/post/6945319439772434469

- 深入討論四: 哪些事件屬於 Macrotask / Microtask ( JavaScript Ninja 中文版 p.390 )
  1. Microtask: Promise callback, DOM 的修改
  2. Macrotask: Microtask 外的大宗，如滑鼠事件，鍵盤事件，網路事件，計時器事件，解析 HTML
  3. Microtask: 設計理念為，效能不大的任務，盡早在 UI 繪製前處理，避免不必要的繪製 UI
  4. 實際上的 Macrotask / Microtask 如何用 NodeJS 及瀏覽器環境產生出來，可參考 https://juejin.cn/post/6945319439772434469
 
## Inheritance
```js
// Q: what does the console show?

class A {
  constructor(){
    this.play = () => console.log('A');
  }
}

class B extends A {
  constructor(){
    super();
    this.play = () => console.log('B');
  }
}

class C extends A {
  constructor(){
    super();
  }
}
C.prototype.play = () => console.log('C');

const arr = [new A(), new B(), new C()];

for (let i = 0; i < 3; i ++){
  arr[i].play();
}

// A B A
```

## call, apply, bind

```js
// Q: what does console show?

const a = { elem: 5 };

const b = { 
  elem: 10,
  getElem(num) {
    return this.elem * num;
  }
};

const getElem = b.getElem;
const boundGetElem = getElem.bind(b);

console.log(boundGetElem(10));  // 100
console.log(getElem.call(a, 10));  // 50
console.log(boundGetElem.apply(b, 10));  // TypeError: CreateListFromArrayLike called on non-object

```
## this, expression statement, and comma
- Ref: https://github.com/mqyqingfeng/Blog/issues/7
- Ref2: https://github.com/aszx87410/blog/issues/39
```js
var value = 1;

var obj = {
    value: 2,

    foo: function () {
        return this.value;
    },
};

console.log(obj.foo()); // 2
console.log((obj.foo)()); // 2
console.log((obj.foo = obj.foo)()); // 1
console.log((false || obj.foo)());  // 1
console.log((obj.foo, obj.foo)());  // 1
```
# 實作原生程式碼

## Promise
- Ref: https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/implement-promise-aed55f3e84e9
- Ref: https://realdennis.medium.com/promise-%E9%A1%9E%E7%9A%84%E5%AF%A6%E4%BD%9C%E8%88%87%E9%80%90%E6%AD%A5%E8%A7%A3%E6%9E%90-4a87a4121d35
- Ref: https://juejin.cn/post/6945319439772434469
```js
class MyPromise {
  constructor(fn) {
    this.state = 0;
    this.value = undefined;
    this.todos = [];
    fn(value => this.resolve(value), reason => this.reject(reason));
  }
  fulfill(value) {
    if (this.state !== 0) return;
    this.state = 1;
    this.value = value;
    this.run();
  }
  resolve(result) {
    let done = false;
    if (this === result)
      throw new TypeError('Chaining cycle detected for promise');
    if (result === Object(result) && typeof result.then === 'function') {
      // result is thenable
      try {
        result.then(
          value => {
            if (done) return;
            done = true;
            this.resolve(value);
          },
          reason => {
            if (done) return;
            done = true;
            this.reject(reason);
          }
        );
      } catch (e) {
        // resolve thenable fail
        if (done) return;
        done = true;
        this.reject(e);
      }
    } else this.fulfill(result);
  }
  reject(reason) {
    if (this.state !== 0) return;
    this.state = 2;
    this.value = reason;
    this.run();
  }
  run() {
    let callbackName, resolver;
    if (this.state === 0) return;
    if (this.state === 1) {
      callbackName = 'onFulfilled';
      resolver = 'resolve';
    }
    if (this.state === 2) {
      callbackName = 'onRejected';
      resolver = 'reject';
    }
    setTimeout(() => {
      this.todos.forEach(todo => {
        try {
          let cb = todo[callbackName];
          if (cb) {
            todo.resolve(cb(this.value));
          } else todo[resolver](this.value);
        } catch (e) {
          todo.reject(e);
        }
        this.todos.shift();
      });
    });
  }
  then(onFulfilled, onRejected) {
    let todo = new MyPromise(() => {});
    todo.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    todo.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.todos.push(todo);
    this.run();
    return todo;
  }
  catch(onRejected) {
    this.then(null, onRejected);
  }
}

const a = new MyPromise((resolve) => resolve(0));
a.then((v) => console.log(v));
const b = new MyPromise((resolve) => setTimeout(() => { resolve(100); }, 1000));
b.then((v) => console.log(v));
const c = new MyPromise((_, reject) => setTimeout(() => { reject(200); }, 2000));
c.catch((v) => console.log(v));
console.log('start');

const sleep = (sec) => new MyPromise((resolve) => setTimeout(resolve, sec * 1000));
sleep(3).then(() => {
  console.log(300);
  return sleep(1);
})
  .then(
    () => console.log(400),
  );

// start
// 0
// 100
// 200
// 300
// 400
```
```js
class MyPromise {
  constructor(fn) {
    this.QUEUE = [];
    this.HANDLERS = { onFulfilled: null, onRejected: null };
    this.STATE = 'PENDING'; // 'PENDING' | 'FULFILLED' | 'REJECTED'
    this.VALUE = null;

    if (typeof fn === 'function') {
      try {
        fn(
          (value) => this.transitionAndProcess('FULFILLED', value),
          (reason) => this.transitionAndProcess('REJECTED', reason),
        );
      } catch (err) {
        this.transitionAndProcess('REJECTED', err);
      }
    } else {
      throw new TypeError(`Promise resolver ${fn} is not a function`);
    }
  }

  // private
  transitionAndProcess(state, value) {
    if (this.STATE === state || this.STATE !== 'PENDING') return;
    this.STATE = state;
    this.VALUE = value;

    this.process();
  }

  // private
  process() {
    if (this.STATE === 'PENDING') return;

    setTimeout(() => {
      let handler;
      while (this.QUEUE.length > 0) {
        const thenablePromise = this.QUEUE.shift();
        if (this.STATE === 'FULFILLED') {
          handler = thenablePromise.HANDLERS.onFulfilled || ((v) => v);
        } else if (this.STATE === 'REJECTED') {
          handler = thenablePromise.HANDLERS.onRejected || ((r) => { throw r; });
        }
        try {
          const x = handler(this.VALUE);
          thenablePromise.resolvePromise(x);
        } catch (error) {
          thenablePromise.transitionAndProcess('REJECTED', error);
        }
      }
    });

    return this;
  }

  // private
  resolvePromise(x) {
    if (this === x) {
      throw new TypeError('TypeError: Chaining cycle detected for promise');
    }
    let called;
    if (typeof x === 'function' || typeof x === 'object') {
      try {
        const thenFunction = x.then;
        if (thenFunction && typeof thenFunction === 'function') {
          const onFulfilled = (y) => {
            if (called) return;
            called = true;
            this.resolvePromise(y);
          };
          const onRejected = (r) => {
            if (called) return;
            called = true;
            this.transitionAndProcess('REJECTED', r);
          };
          thenFunction.call(x, onFulfilled, onRejected);
        } else {
          this.transitionAndProcess('FULFILLED', x);
        }
      } catch (error) {
        if (called) return;
        called = true;
        this.transitionAndProcess('REJECTED', error);
      }
    } else {
      this.transitionAndProcess('FULFILLED', x);
    }
  }

  then(onFulfilled, onRejected) {
    const promiseInstance = new MyPromise((resolve, reject) => {
      if (this.STATE === 'FULFILLED' && typeof onFulfilled !== 'function') {
        resolve(this.VALUE);
      } else if (this.STATE === 'REJECTED' && typeof onRejected !== 'function') {
        reject(this.VALUE);
      }
    });
    if (typeof onFulfilled === 'function') {
      promiseInstance.HANDLERS.onFulfilled = onFulfilled;
    }
    if (typeof onRejected === 'function') {
      promiseInstance.HANDLERS.onRejected = onRejected;
    }
    this.QUEUE.push(promiseInstance);
    this.process();
    return promiseInstance;
  }

  catch(onRejected) {
    this.then(null, onRejected);
  }
}

const a = new MyPromise((resolve) => resolve(0));
a.then((v) => console.log(v));
const b = new MyPromise((resolve) => setTimeout(() => { resolve(100); }, 1000));
b.then((v) => console.log(v));
const c = new MyPromise((_, reject) => setTimeout(() => { reject(200); }, 2000));
c.catch((v) => console.log(v));
console.log('start');

const sleep = (sec) => new MyPromise((resolve) => setTimeout(resolve, sec * 1000));
sleep(3).then(() => {
  console.log(300);
  return sleep(1);
})
  .then(
    () => console.log(400),
  );

// start
// 0
// 100
// 200
// 300
// 400
```

```js
// 目標一: 完成下列基本功能
const promise = new Promise((resolve, reject) => {
   resolve('success')
   reject('err')
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})
// 輸出 resolve success

// 實現目標一:
// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 新建 MyPromise 类
class MyPromise {
  constructor(executor){
    // executor 是一个执行器，进入会立即执行
    executor(this.resolve, this.reject)
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING;

  // resolve 和 reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数 this 指向的是 window 或者 undefined
  // 用箭头函数就可以让this指向当前实例对象
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
    }
  }

  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
    }
  }
  
  then(onFulfilled, onRejected) {
    // 判断状态
    if (this.status === FULFILLED) {
      // 调用成功回调，并且把值返回
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      // 调用失败回调，并且把原因返回
      onRejected(this.reason);
    }
  }
}
// 目標二: 處理非同步
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000); 
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})
// 希望印出 'success'，如果用目標一的程式碼，會甚麼都沒印出
// 原因是，主线程代码立即执行，setTimeout 是异步代码，then 会马上执行
// 这个时候判断 Promise 状态，状态是 Pending，然而之前并没有判断等待这个状态

// 實現目標二: 完善 Promise 功能，.then 加入 onFulfilledCallback 及 onRejectedCallback
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor){
    executor(this.resolve, this.reject)
  }
  status = PENDING;
  value = null;
  reason = null;
  // 存储成功回调函数
  onFulfilledCallback = null;
  // 存储失败回调函数
  onRejectedCallback = null;

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      // 判断成功回调是否存在，如果存在就调用
      this.onFulfilledCallback && this.onFulfilledCallback(value);
    }
  }

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      // 判断失败回调是否存在，如果存在就调用
      this.onRejectedCallback && this.onRejectedCallback(reason)
    }
  }
  
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      onRejected(this.reason);
    } else if (this.status === PENDING) {
      // ==== 新增 ====
      // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
      // 等到执行成功失败函数的时候再传递
      this.onFulfilledCallback = onFulfilled;
      this.onRejectedCallback = onRejected;
    }
  }
}

/* 目標三: 完善 Promise 功能 
  a. 處理多個 promise.then() 都要被執行到 
  b. chaining method 
*/
const promise = new MyPromise((resolve, reject) => {
  // 目前这里只处理同步的问题
  resolve('success')
})

function other () {
  return new MyPromise((resolve, reject) =>{
    resolve('other')
  })
}
promise.then(value => {
  console.log(1)
  console.log('resolve', value)
  return other()
}).then(value => {
  console.log(2)
  console.log('resolve', value)
})

// 希望不要出現 TypeError: Cannot read property 'then' of undefined
// 而是出現 1 / resolve success / 2 / resolve other

// 實現目標三: 完善 Promise 功能，.then 修正為 onFulfilledCallbacks 及 onRejectedCallbacks，新增 promise2
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor){
    executor(this.resolve, this.reject)
  }
  status = PENDING;
  value = null;
  reason = null;
  // 存储成功回调函数
  onFulfilledCallbacks = [];
  // 存储失败回调函数
  onRejectedCallbacks = [];

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }
  
  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
      // 这里的内容在执行器中，会立即执行
      if (this.status === FULFILLED) {
        // 获取成功回调函数的执行结果
        const x = onFulfilled(this.value);
        if(x instanceof MyPromise) {
          // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
          // x.then(value => resolve(value), reason => reject(reason))
          // 简化之后
          x.then(resolve, reject);
        } else {
          // 普通值
          resolve(x);
        }
      } else if (this.status === REJECTED) {
        onRejected(this.reason);
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }
    })
    
    return promise2;
  }
}


/* 目標四與實現: 完善 Promise 功能 
  a. 避免 return 自己循環調用
  b. 程式運作錯誤時，要用 reject 處理
  c. 靜態方法
  d. .catch()
*/
// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 新建 MyPromise 类
class MyPromise {
  constructor(executor){
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING;
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;

  // 存储成功回调函数
  onFulfilledCallbacks = [];
  // 存储失败回调函数
  onRejectedCallbacks = [];

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
      // resolve里面将所有成功的回调拿出来执行
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }

  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
      // resolve里面将所有失败的回调拿出来执行
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () =>  {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = realOnFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          } 
        })  
      }

      const rejectedMicrotask = () => { 
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = realOnRejected(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          } 
        }) 
      }
      // 判断状态
      if (this.status === FULFILLED) {
        fulfilledMicrotask() 
      } else if (this.status === REJECTED) { 
        rejectedMicrotask()
      } else if (this.status === PENDING) {
        // 等待
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    }) 
    
    return promise2;
  }
  
  catch(onRejected) {
    this.then(null, onRejected);
  }

  // resolve 静态方法
  static resolve (parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise(resolve =>  {
      resolve(parameter);
    });
  }

  // reject 静态方法
  static reject (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 判断x是不是 MyPromise 实例对象
  if(x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else{
    // 普通值
    resolve(x)
  }
}

const a = new MyPromise((resolve) => resolve(0));
a.then((v) => console.log(v));
const b = new MyPromise((resolve) => setTimeout(() => { resolve(100); }, 1000));
b.then((v) => console.log(v));
const c = new MyPromise((_, reject) => setTimeout(() => { reject(200); }, 2000));
c.catch((v) => console.log(v));
console.log('start');

const sleep = (sec) => new MyPromise((resolve) => setTimeout(resolve, sec * 1000));
sleep(3).then(() => {
  console.log(300);
  return sleep(1);
})
  .then(
    () => console.log(400),
  );

// start
// 0
// 100
// 200
// 300
// 400
```

## Promise.all
- https://jsvault.com/promise-all/
- Q:
```js
newPromiseAll(promises)
  .then(results => {
  })
  .catch(e => {
  })
```
- A:
```js
function myPromiseAll(taskList) {
  const results = []
  let promisesCompleted = 0;
  return new Promise((resolve, reject) => {
    taskList.forEach((promise, index) => {
      promise.then((val) => {
        results[index] = val;
        promisesCompleted += 1;
        if (promisesCompleted === taskList.length) {
          resolve(results)
        }
      })
        .catch(error => {
          reject(error)
        })
    })
  });
}
```

## Promise 相關問題

- Ref: https://ithelp.ithome.com.tw/articles/10228649 

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

# Object Oriented Programming

## Design a parking log system
```
Must:

1. It can hold up to N cars and the fee is M per hour.

2. auto record: car registration number, color and allocate slot.

3. calculate the parking fee by car registration number.

Nice to have:

4. record in/out logs and provide query functions.

5. function show available parking lots.

6. function to return a list of cars by X color.

7. function to show parking lot by car registration number and current fee.

Reminder: your code should be extendable for future use cases.
```
- Q: 
```js
// Parking lot system

/**
 * Class Parking {
 *    constructor (ParkingLotCount, feePerHour) {
 *       
 *    }
 *   
 *    enter (carNumber, color) {
 *        
 *    }
 *  
 *    exit (carNumber) {
 *
 *       ...
 *       return fee
 *    }  
 * }
 *
 **/
```
- A: 
```js
class Parking {


}
```
## Implement the missing code

- You may not modify the pre-existing code.
- Implement `Tracker` with two methods as follows:
- `allocate(hostType)`: reserves the first available hostname and returns it;
- `deallocate(hostname)`: release that hostname back into the pool.

- Input/Output

```
* [execution time limit] 4 seconds (js)
* [input] array.string queries An array of strings representing queries to the tracker.
    * queries[i] = "A <hostType>" means that you should call tracker.allocate(<hostType>) and return the reserved hostname.
    * queries[i] = "D <hostname>" means that you should call tracker.deallocate(<hostname>) and return nothing.
* It is guaranteed that all host numbers of the deallocating queries won't exceed 999. Guaranteed constraints: 1 ≤ queries.length ≤ 103. 
* [output] array.string An array of responses from the tracker.
```

- Example:
```
>> tracker.allocate('apibox');
"apibox1"

>> tracker.allocate('apibox');
"apibox2"

>> tracker.deallocate('apibox1');

>> tracker.allocate('apibox');
"apibox1"

>> tracker.allocate('sitebox');
"sitebox1"
```

- Q:
```js
// Given
function hostAllocation(queries) {
  const tracker = new Tracker();
  const results = [];
  queries.forEach((query) => {
    const [action, name] = query.split(' ');
    if (action === 'A') {
      results.push(tracker.allocate(name));
    } else if (action === 'D') {
      tracker.deallocate(name);
    }
  });
  return results;
}

class Tracker {
  // TODOS
}

console.log(hostAllocation(['A apibox',
  'A apibox',
  'D apibox1',
  'A apibox',
  'A sitebox']));
// to be: ['apibox1', 'apibox2', 'apibox1', 'sitebox1'] 
```

- A:
```js
// Given
function hostAllocation(queries) {
  const tracker = new Tracker();
  const results = [];
  queries.forEach((query) => {
    const [action, name] = query.split(' ');
    if (action === 'A') {
      results.push(tracker.allocate(name));
    } else if (action === 'D') {
      tracker.deallocate(name);
    }
  });
  return results;
}

class Tracker {
    reservedList = [];
    
      allocate(hostType){
        const sameTypeList = this.reservedList.filter((name) =>
            name.slice(0, hostType.length) === hostType);
        if(sameTypeList.length === 0){
            this.reservedList = [...this.reservedList, hostType + 1];
            return hostType + 1;
        } else {
            const existedNumberList = sameTypeList.map((name) => {
                return parseInt(name.slice(hostType.length, name.length), 10)
            });
            
            const allNumberSeries = [...Array(existedNumberList[existedNumberList.length-1])].map((_, idx) => {
                if(existedNumberList.includes(idx)) return idx;
                return null;
            })
            
            for(let i = 0; i < allNumberSeries.length - 1; i++){
                if(allNumberSeries[i + 1] - allNumberSeries[i] !== 1){
                    this.reservedList = [...this.reservedList, `${hostType}${i + 1}`]; 
                    return `${hostType}${i + 1}`;
                }
            }
            this.reservedList = [...this.reservedList, `${hostType}${allNumberSeries.length + 1}` ];
            return `${hostType}${allNumberSeries.length + 1}`;
        }
    }
    deallocate(hostname) {
        this.reservedList = this.reservedList.filter(name => name !== hostname);
    }
}

console.log(hostAllocation(['A apibox',
  'A apibox',
  'D apibox1',
  'A apibox',
  'A sitebox']));
// to be: ['apibox1', 'apibox2', 'apibox1', 'sitebox1'] 
```

# Algorithm

## String, Array, Hash Table - check if string is beautiful

- Coding with test: https://codesandbox.io/s/mocha-unit-test-isbeautifulstr-vcer9?file=/src/index.js
- Explain & Example:

```
For inputString = "bbbaacdafe", the output should be isBeautifulString(inputString) = true.

This string contains 3 a, 3 b, 1 c, 1 d, 1 e, and 1 f (and 0 of every other letter), 
so since there aren't any letters that appear more frequently than the previous letter, this string qualifies as beautiful.

For inputString = "aabbb", the output should be isBeautifulString(inputString) = false.

Since there are more bs than as, this string is not beautiful.

For inputString = "bbc", the output should be isBeautifulString(inputString) = false.

Although there are more bs than cs, this string is not beautiful because there are no as, so therefore there are more bs than as.
```

- Input/Output     
    execution time limit: 4 seconds (js)
```
[input] string inputString

A string of lowercase English letters.

Guaranteed constraints:
3 ≤ inputString.length ≤ 50.

[output] boolean

Return true if the string is beautiful, false otherwise.
```

- Q:
```js
function isBeautifulString(inputString) {
  // TODOS
}
```

- A:
```js
// Ans:
function isBeautifulString(inputString) {
    const charTimesHashTable = [...Array(26)].map(() => 0);
    inputString.split("").forEach(char => {
        const charCode = char.charCodeAt();
        if (charCode <= 122 && charCode >= 97) charTimesHashTable[charCode - 97] += 1;
    });
    
    
    for (let i = 0; i < charTimesHashTable.length - 1; i++){
        if(charTimesHashTable[i] < charTimesHashTable[i + 1]) return false;
    }
    return true;
}
```

## LeetCode - 5. Longest Palindromic Substring (Medium)
- https://leetcode.com/problems/longest-palindromic-substring/

- Q:
```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    // TODOS
};
```

- A1 (dynamic programming): https://leetcode.com/problems/longest-palindromic-substring/discuss/2921/Share-my-Java-solution-using-dynamic-programming
- Time complexity : O(n^2), Space complexity : O(n^2)
```js
var longestPalindrome = function(s) {
    const n = s.length;
    let maxLength = 0;
    let palindromeStartsAt = 0;
    
    const dpBooleanTable = [...Array(n)].map(() => []);
    
    for(let i = n - 1; i >= 0; i--){
        for(let j = i; j < n; j++){
            if (j - i < 3){
                dpBooleanTable[i][j] = s.charAt(i) === s.charAt(j);
            }  else {
                dpBooleanTable[i][j] = 
                    s.charAt(i) === s.charAt(j) && dpBooleanTable[i+1][j-1];
            }
            
            if(dpBooleanTable[i][j] && (j-i+1 > maxLength)) {
                palindromeStartsAt = i;
                maxLength = j-i+1;
            }
        }
    }
    
    return s.substring(palindromeStartsAt, palindromeStartsAt + maxLength);
};
```
- A2 (Expand Around Center): https://leetcode.com/problems/longest-palindromic-substring/discuss/2928/Very-simple-clean-java-solution
- Time complexity : O(n^2), Space complexity : O(1)
```js
var longestPalindrome = function(s) {
    let maxLength = 0;
    let maxPalindromic = '';
    
    s.split("").forEach((element, currentIndex, array)=>{
        let leftIndex = currentIndex - 1;
        let rightIndex = currentIndex + 1;
        let currentPalindromicLength = 1;
        let currentStr = element;
        
        while(element === array[rightIndex]){
            currentPalindromicLength++;
            currentStr += element;
            rightIndex++;
        }
        
        while(leftIndex > 0 || rightIndex < array.length){
            if(array[leftIndex] === array[rightIndex]){
                currentPalindromicLength+=2;
                currentStr = array[leftIndex] + currentStr + array[leftIndex];
                leftIndex--;
                rightIndex++;
            } else {
                break;
            }
        }
        if(currentPalindromicLength > maxLength){
            maxLength = currentPalindromicLength;
            maxPalindromic = currentStr;
        }
    })
    
    return maxPalindromic;
};
```
## LeetCode - 442. Find All Duplicates in an Array (Medium)

- Q:
```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
    // TODOS
};
```
- A1: O(n) 的 sort，見以下 while 內的
```js
var findDuplicates = function (nums) {
  if (nums.length === 1) {
    return [];
  }
  let i = 0;
  let length = nums.length;
  while (i < length) {
    let j = nums[i] - 1;
    if (nums[i] != nums[j]) {
      const correctPlaceValue = nums[j];
      nums[j] = nums[i];
      nums[i] = correctPlaceValue;
      console.log({ i, j, nums });
    } else {
      i++;
    }
  }
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    const element = nums[i];
    if (element !== i + 1) {
      result.push(element);
    }
  }
  return result;
};
```
- A2: 變更原始陣列，掃過加入負號

```js
var findDuplicates = function(nums) {
    const result = []; nums.unshift(0);
    
    for(let i = 0; i < nums.length; i++) {
        const idx = Math.abs(nums[i]);
        if(nums[idx] < 0) result.push(idx);
        nums[idx] *= -1;
    }
    return result;    
};
```

## LeetCode - 15. 3Sum 及變形 (Medium)
- https://leetcode.com/problems/3sum/
- Q:  
Have the function ThreeSum(arr) take the array of integers stored in arr, and determine if any three distinct numbers (excluding the first element) in the array can sum up to the first element in the array. For example: if arr is `[8, 2, 1, 4, 10, 5, -1, -1]` then there are actually three sets of triplets that sum to the number 8: `[2, 1, 5]`, `[4, 5, -1]` and `[10, -1, -1]`. Your program should return the string true if 3 distinct elements sum to the first element, otherwise your program should return the string false. The input array will always contain at least 4 elements  
Examples  
Input: [10, 2, 3, 1, 5, 3, 1, 4, -4, -3, -2]  
Output: true  
Input: [12, 3, 1, -5, -4, 7]  
Output: false  

```js
function ThreeSum(arr) { 
  // code goes here  
}
   
console.log(ThreeSum([10, 2, 3, 1, 5, 3, 1, 4, -4, -3, -2])); // true
console.log(ThreeSum([12, 3, 1, -5, -4, 7])); // false
```
## LeetCode - 78. Subsets (Medium)
- https://leetcode.com/problems/subsets/
- Q:  
Given an integer array `nums` of unique elements, return all possible subsets (the power set).
The solution set must not contain duplicate subsets. Return the solution in any order.
Examples    
Input: `[1,2,3]`    
Output: `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`   
Input: `[0]`   
Output: `[[],[0]]`    

```js
var subsets = function(nums) { 
  // code goes here  
}
 
```
- A1: 暴力解，依序找出 `[] ==> [1],[2],[3] ==> [1,2],[1,3],[2,3] ==> [1,2,3]` 
```js
var subsets = function(nums) {
  const allPossibilityList = nums;  
  let answerBatch = nums.map((num) => [num]); 
  // Ex: answerBatch = [[1],[2],[3],[4]];
  let ans = [[]];
  
  while(ans[ans.length - 1].length < nums.length){
    ans = [...ans, ...answerBatch];
    
    const nextAnswerBatch = answerBatch.reduce((acc, cur) => {
      const lastElement = cur[cur.length - 1];
      const appendList = allPossibilityList.slice(allPossibilityList.indexOf(lastElement) + 1);

      appendList.forEach((appendItem) => {
        acc = [...acc, [...cur, appendItem]];
      })
      
      return acc;
    }, []);

    answerBatch = nextAnswerBatch;
  }
    
  return ans;
};

console.log(subsets([1,2,3]));
// [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
```
- A2: using stack
```js
var subsets = function (nums) {
  const firstIndexList = [0];
  const stack = [];
  const ans = [[]];

  stack.push(firstIndexList);
  while (stack.length > 0) {
    const indexList = stack.pop();
    const lastItem = indexList[indexList.length - 1];

    ans.push(indexList.map((i) => nums[i]));
      
    if (lastItem < nums.length - 1) {
      stack.push([
          ...indexList.slice(0, indexList.length - 1),
          lastItem + 1,
        ]);

      stack.push([...indexList, lastItem + 1]);
    }
  }

  return ans;
};

console.log(subsets([1,2,3]));
// [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]
```
- A3:
```js
var subsets = function(nums) {
  const res = [[]];
    
  for (const num of nums) {
    res.push(...res.map(x => [...x, num]));
  }
  
  return res;
};

console.log(subsets([1,2,3]));
// [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
```
- A4:
```js
function subsets(nums) {
  const result = [[]];
  for (const currentEle of nums) {
    /**
     * Set is currentEle added to the current result;
     * [[],[a]] new is b
     * [[], [a], [b], [a,b]]
     * */
    const initialLength = result.length;
    for (let i = 0; i < initialLength; i++) {
      result.push([...result[i], currentEle]);
    }
  }
  return result;
}

console.log(subsets([1,2,3]));
// [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
```
# 資料結構

## Array Tree Conversion
- Given a binary tree `[3,9,1,null,null,7,17]` represent by array:
```
    3
   / \
  9   1
    /  \
   7   17
```
and a TreeNode function:
```js
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}
```
write a function which transfer array into binary tree.
```
input: {Array}

output: {TreeNode} root
```
- Q:
```js
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function arrayToBinaryTree(array) {
  // TODOS
}
```
- A:
```js
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function arrayToBinaryTree(array) {
  const root = new TreeNode(array.shift());
  const parentQueue = [root];
  
  while(parentQueue.length > 0){
    const currentParent = parentQueue.shift();
    if(array.length > 0){
      const leftValue = array.shift();
      const leftChild =  leftValue ? new TreeNode(leftValue) : null;
      if(currentParent !== null) {
        currentParent.left = leftChild;
      }
      parentQueue.push(leftChild);
    }
    if(array.length > 0){
      const rightValue = array.shift();
      const rightChild =  rightValue ? new TreeNode(rightValue) : null;
      if(currentParent !== null) {
        currentParent.right = rightChild;
      }
      parentQueue.push(rightChild);
    }
  }
  return root;
}

console.log(arrayToBinaryTree([3,9,1,null,null,7,17]));
/*
 {
  left: {
    left: null,
    right: null,
    val: 9
  },
  right: {
    left:  { val: 7, left: null, right: null },
    right: { val: 17, left: null, right: null },
    val: 1
  },
  val: 3
}
*/

console.log(arrayToBinaryTree([3,null,1,null,null,null,17]));
/*
 {
  left: null,
  right: {
    left:  null,
    right: { val: 17, left: null, right: null },
    val: 1
  },
  val: 3
}
*/
```
# React
## 一句話解釋
### useRef
- Ref: https://zh-hant.reactjs.org/docs/hooks-reference.html#useref
- 在 react component 內使用這個 hook，用法如 `const item = useRef(null)`，可以得到一個不隨 react render 而變化的記憶體空間 (item)，讓我們獨立記憶控制，可以用它取得實際 HTML 畫面上的 DOM 元素，或是需要客製化控制某些值，不希望它與 render 連動時，就可用。官方定義為: useRef 回傳一個 mutable 的 ref object，.current 屬性被初始為傳入的參數（initialValue）。回傳的 object 在 component 的生命週期將保持不變。
### useMemo
- 在 react component 內使用這個 hook，用法如 `const list = useMemo(() =>(["a", "b", "c"]), [dep1, dep2])`，可以得到一個不隨 render 變化，只隨 dependency array 變化而變的記憶體空間 (list) ，需要傳入兩個參數，第一個參數帶函式，第二個參數帶陣列，陣列裡看那些東西改變時，需要重新執行第一個參數的函式就放入。得到的值是第一個參數 return 的結果，比如 const list 最後結果會是 `["a", "b", "c"]`，當 dep1, dep2 都沒變化時，不論 react render 幾次，`const list` 都可得到同樣位址的陣列
### useContext
- 官方範例 https://beta.reactjs.org/reference/react/useContext
- 要在 react component 內使用這個 hook，使用前提是，它的父層要被同個 `Context.Provider` 元件包著。同個 `Context.Provider` 元件包住的所有 Children Component，都可共享 Context 內的資料，並用 useContext 取出資料。詳細的用法，要搭配 `createContext` 等，可參考之前的筆記 https://github.com/andy770921/JS_project/blob/master/context.md#%E5%8A%A0%E4%B8%8A-hook-%E7%9A%84%E4%BD%BF%E7%94%A8

# 網路
## 一句話解釋
### CORS:
- Ref: https://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/
- CORS，全名為 Cross-Origin Resource Sharing，跨來源資源共享。是規範：「如果你想在不同 origin 之間傳輸資料的話，你應該怎麼做」
- 深入討論一: 跨來源，網址第一段斜線前，算不同，可參考同源政策 https://developer.mozilla.org/zh-TW/docs/Web/Security/Same-origin_policy
- 深入討論二: 規範內容是，後端 Response Header 必須要加 `Access-Control-Allow-Origin: *`，若需要其他限制，還可加 Access-Control-Allow-Headers 跟 Access-Control-Allow-Methods
- 深入討論三: 若不是「[簡單請求](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS#%E7%B0%A1%E5%96%AE%E8%AB%8B%E6%B1%82)」，會發兩次請求給後端，第一次是 Method 為 OPTIONS 的「預檢請求」( Preflight Request )
### HTTP Cache:
- Ref: https://blog.techbridge.cc/2017/06/17/cache-introduction/
- 第一次瀏覽這個網頁的時候需要重新下載，第二次瀏覽的時候，圖片就可以直接從瀏覽器的快取裡面去抓
- 實作方法：server 回傳的 response header 加入 `Cache-Control: max-age=30`，代表快取過期時間是 30 秒
- 進階實作方法：server 回傳的 response header 加入 `Cache-Control: max-age=30` 及 `Etag: xxx`，代表快取過期時間是 30 秒，30 秒後，若前端送出 request 會在 request header 加入 `If-None-Match: xxx` 詢問 server 檔案是不是有被更動過
- 需要前端每次都檢查有無新的檔案：server 回傳的 response header 加入 `Cache-Control: no-cache` 及 `Etag: xxx`
- 用在 SPA 的策略：`script-qd3j2orjoa.js` 設定 `Cache-Control: max-age=31536000`，`index.html` 設定 `Cache-Control: no-cache`
### session 
 - Session 就是它英文的原意之一，代表著：「具有狀態的一段期間」或者是「上下文」
 - Ref: https://github.com/aszx87410/blog/issues/45
### cookies, session storage, local storage
  1. cookies:   
    i. 儲存容量限制較嚴苛: not exceed 50 cookies per domain with a maximum of 4 KB per cookie  
    ii. 可前端自己設定，或是後端經由 HTTP response 請前端設定  
    iii. 打 API 時會自動帶上: 每次打 API 時，都會經由 request header 的 Cookie: xxx=ooo; 帶給後端  
    iv. 後端可依照自己需要，請前端紀錄資料，供下一次打 API 用: 後端回給前端的 response header 可帶 Set-Cookie: xxx=ooo;，請求前端設定必要的資料，下一次打同源的 API 時，會自動帶上這些資料  
  2. session storage:  
    i. 儲存容量限制較寬鬆: 5 MB per domain  
    ii. 只能純粹由前端自己設定，後端無法操作  
    iii. 打 API 時不會自動帶上  
    iv. 若網頁操作到一半，關閉頁面，session storage 就會消失  
    v. 新開同個網域的分頁，另個新分頁會是完全空的 session storage。  
  3. local storage:   
    i.- iii. 同 session storage  
    iv. 若網頁操作到一半，關閉頁面，local storage 不會消失，想清除需要在適當時機，自己清除  
    v. 新開同個網域的分頁，另個新分頁會和本來頁面共用 local storage。  
### cookies, session storage, local storage 在 SSR 的 server side 會發生甚麼問題 ? 如何解決 ? 
  - Ref: https://stackoverflow.com/questions/70835428/how-i-can-get-localstorage-data-inside-getserversideprops/70835625
  - 因為 cookies/session storage/local storage 都是儲存在瀏覽器的空間內，換句話說，server side 產生頁面時，不會知道 chrome ( 或其他瀏覽器 ) 內有甚麼資料，因此不能直接使用相關的操作方式如 `localStorage.getItem('something')`
  - 有兩個解法
    1. 使用 `if(typeof window !== 'undefined')` 避免，如 `if (typeof window !== 'undefined') { const data = JSON.parse(localStorage.getItem('something')); }`
    2. 使用 dynamic import 加上 ssr 設定避免，以 `React + NextJS` 為例，如 `import dynamic from 'next/dynamic'; const DynamicButtonNoSSR = dynamic(() => import('../components/button'), { ssr: false })`

### CSRF
- Ref: https://blog.techbridge.cc/2017/02/25/csrf-introduction/
- CSRF 全稱是 Cross Site Request Forgery，跨站請求偽造，是一種 Web 上的攻擊手法
- 舉例：後端使用的 API 是 `https://small-min.blog.com/delete?id=3`，用 GET 實作刪除，並會驗證 cookie 有無帶 token
- 攻擊：使用假前端網站，按鈕設計成 `<a href='https://small-min.blog.com/delete?id=3'>開始測驗</a>`，或不需要按鈕，直接寫成 
`<img src='https://small-min.blog.com/delete?id=3' width='0' height='0' />`
- 攻擊二：若後端用 POST 實作刪除，可用 `<form action="https://small-min.blog.com/delete" method="POST">` 及 `document.getElementById("csrf-form").submit()` 自動送出偽造請求
- 解法：後端檢查 referer ( Request 的 Header 裡面會帶一個欄位叫做 referer，代表這個 request 是從哪個地方過來的 )
- 其他解法：加上圖形驗證碼、簡訊驗證碼，加上 CSRF token，Double Submit Cookie，Cookie 加入 `SameSite: Lax`

# 益智問答
- 想像你正被綁在椅子上動彈不得，歹徒拿著一把6個槍膛全空的槍，再裝兩顆子彈進兩個緊鄰的槍膛內，並旋轉槍膛。然後對著你的腦袋扣板機一下，很幸運你還活著，這時他說再扣一次板機就放你走，你希望先旋轉後再扣或直接扣板機

# 系統設計
## grokking the system design interview
- original: https://www.educative.io/courses/grokking-the-system-design-interview
- 中文序: https://juejin.cn/post/7051577356754812965
- 中文第一章 - 短網址: 
 1. https://juejin.cn/post/6844903967256739847
 2. https://juejin.cn/post/6844903976006057991
 3. https://juejin.cn/post/6844903983404810247
 4. https://juejin.cn/post/6844903992212848648
## AppWorks School Video
- 短網址: https://www.youtube.com/watch?v=K1PnGF4CwCc
- FB: https://www.youtube.com/watch?v=kEfB4CGmbeg
- Yelp & Uber: https://www.youtube.com/watch?v=OiYJl3WnHjY
## 設計 Instagram
- https://www.jyt0532.com/2020/02/11/design-instagram/
