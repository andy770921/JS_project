# Interview Question

# HTML
## 何時用 `<script async>` 何時用 `<script defer>`
https://zellwk.com/blog/javascript-async-and-defer/
# CSS
## 一句話解釋
### css `left` and `translate` 渲染有何不同
- Ref: https://medium.com/starbugs/%E8%BA%AB%E7%82%BA-web-%E5%B7%A5%E7%A8%8B%E5%B8%AB-%E4%BD%A0%E6%87%89%E8%A9%B2%E8%A6%81%E7%9F%A5%E9%81%93%E7%9A%84%E7%80%8F%E8%A6%BD%E5%99%A8%E6%9E%B6%E6%A7%8B%E6%BC%94%E9%80%B2%E5%8F%B2-feat-%E6%B8%B2%E6%9F%93%E5%BC%95%E6%93%8E%E9%81%8B%E4%BD%9C%E6%A9%9F%E5%88%B6-6d95d4d960ee
- 瀏覽器渲染流程為，DOM tree 和 CSS tree 合成 Render tree => Layout => Paint => Composite，使用 `left` 會重新觸發 Layout => Paint => Composite，或稱 Reflow & Repaint，`translate` 只會重新 Composite

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

function Tom(){}
Tom.prototype = new Person();

Object.defineProperty(Tom.prototype, "constructor", {
    enumerable: false,
    value: Tom,
    writable: true
});
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

- 深入討論四: 哪些事件屬於 Macrotask / Microtask ( JavaScript Ninja 中文版 p.390 )
  1. Microtask: Promise callback, DOM 的修改
  2. Macrotask: Microtask 外的大宗，如滑鼠事件，鍵盤事件，網路事件，計時器事件，解析 HTML
  3. Microtask: 設計理念為，效能不大的任務，盡早在 UI 繪製前處理，避免不必要的繪製 UI
 
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
- Ref2: https://github.com/aszx87410/blog/issues/39?fbclid=IwAR3lBkCCba53zGAKCactSgz3bOeFqVA7XRlA5FJljGWasJO7Ro3C1o08nZc
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

const a = new MyPromise((resolve) => resolve(100));
a.then((v) => console.log(v));
const b = new MyPromise((resolve) => setTimeout(()=>{resolve(200)}, 1000));
b.then((v) => console.log(v));
const c = new MyPromise((_, reject) => setTimeout(()=>{reject(300)}, 2000));
c.catch((v) => console.log(v));
console.log('start');

// start
// 100
// 200
// 300
```
```js
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

const HANDLERS = Symbol("handlers");
const QUEUE = Symbol("queue");
const STATE = Symbol("state");
const VALUE = Symbol("value");


function processNextTick(promise) {
  let handler;
  while (promise[QUEUE].length > 0) {
    const thenablePromise = promise[QUEUE].shift();
    if (promise[STATE] === FULFILLED) {
      handler = thenablePromise[HANDLERS].onFulfilled || ((v) => v);
    } else if (promise[STATE] === REJECTED) {
      handler =
        thenablePromise[HANDLERS].onRejected ||
        ((r) => {
          throw r;
        });
    }
    try {
      const x = handler(promise[VALUE]);
      resolvePromise(thenablePromise, x);
    } catch (error) {
      transition(thenablePromise, REJECTED, error);
    }
  }
}


const nextTick = (() => {
  if (typeof global === "object" && global && global.object === Object && global.process && typeof root.process.nextTick === "function") {
    return global.process.nextTick;
  } else {
    return (f, p) => setTimeout(f.call(this, p));
  }
})();

function process(p) {
  if (p[STATE] === PENDING) return;
  nextTick(processNextTick, p);
  return p;
}

function transition(p, state, value) {
  if (p[STATE] === state || p[STATE] !== PENDING) return;
  p[STATE] = state;
  p[VALUE] = value;
  return process(p);
}

function tryFunction(promise, executor) {
  const resolve = (value) => {
    transition(promise, FULFILLED, value);
  };
  const reject = (reason) => {
    transition(promise, REJECTED, reason);
  };
  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

class Handlers {
  constructor() {
    this.onFulfilled = null;
    this.onRejected = null;
  }
}

class MyPromise {
  constructor(executor) {
    this[QUEUE] = [];
    this[HANDLERS] = new Handlers();
    this[STATE] = PENDING;
    this[VALUE] = null;
    if (typeof executor === "function") {
      tryFunction(this, executor);
    } else {
      throw new TypeError(`Promise resolver ${executor} is not a function`);
    }
  }
  
  then(onFulfilled, onRejected) {
     const promiseInstance = new MyPromise((resolve, reject) => {
      if (this[STATE] === FULFILLED && typeof onFulfilled !== "function") {
        resolve(this[VALUE]);
      } else if (this[STATE] === REJECTED && typeof onRejected !== "function") {
        reject(this[VALUE]);
      }
    });
    if (typeof onFulfilled === "function") {
      promiseInstance[HANDLERS].onFulfilled = onFulfilled;
    }
    if (typeof onRejected === "function") {
      promiseInstance[HANDLERS].onRejected = onRejected;
    }
    this[QUEUE].push(promiseInstance);
    process(this);
    return promiseInstance;
  }
  
  catch(onRejected) {
    this.then(null, onRejected);
  }
}
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
    // TODOS
 }
```

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

### CSRF
- Ref: https://blog.techbridge.cc/2017/02/25/csrf-introduction/
- CSRF 全稱是 Cross Site Request Forgery，跨站請求偽造，是一種 Web 上的攻擊手法
- 舉例：後端使用的 API 是 `https://small-min.blog.com/delete?id=3`，用 GET 實作刪除，並會驗證 cookie 有無帶 token
- 攻擊：使用假前端網站，按鈕設計成 `<a href='https://small-min.blog.com/delete?id=3'>開始測驗</a>`，或不需要按鈕，直接寫成 
`<img src='https://small-min.blog.com/delete?id=3' width='0' height='0' />`
- 攻擊二：若後端用 POST 實作刪除，可用 `<form action="https://small-min.blog.com/delete" method="POST">` 及 `document.getElementById("csrf-form").submit()` 自動送出偽造請求
- 解法：後端檢查 referer ( Request 的 Header 裡面會帶一個欄位叫做 referer，代表這個 request 是從哪個地方過來的 )
- 其他解法：加上圖形驗證碼、簡訊驗證碼，加上 CSRF token，Double Submit Cookie，Cookie 加入 `SameSite: Lax`

