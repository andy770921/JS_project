# Interview Question

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
## Object Oriented Programming - Implement the missing code

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

## LeetCode - 5. Longest Palindromic Substring (Medium)
- https://leetcode.com/problems/longest-palindromic-substring/
- Given a string `s`, return the *longest palindromic substring* in `s`
- Ex1
```
Input: s = "babad"
Output: "bab"
Note: "aba" is also a valid answer.
```
- Ex2
```
Input: s = "cbbd"
Output: "bb"
```
- Ex3
```
Input: s = "a"
Output: "a"
```
- Ex4
```
Input: s = "ac"
Output: "a"
```
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

# 網路
## 一句話解釋
### CORS:
- Ref: https://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/
- CORS，全名為 Cross-Origin Resource Sharing，跨來源資源共享。是規範：「如果你想在不同 origin 之間傳輸資料的話，你應該怎麼做」
- 深入討論一: 跨來源，網址第一段斜線前，算不同，可參考同源政策 https://developer.mozilla.org/zh-TW/docs/Web/Security/Same-origin_policy
- 深入討論二: 規範內容是，後端 Response Header 必須要加 `Access-Control-Allow-Origin: *`，若需要其他限制，還可加 Access-Control-Allow-Headers 跟 Access-Control-Allow-Methods
- 深入討論三: 若不是「[簡單請求](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS#%E7%B0%A1%E5%96%AE%E8%AB%8B%E6%B1%82)」，會發兩次請求給後端，第一次是 Method 為 OPTIONS 的「預檢請求」( Preflight Request )

### CSRF
- Ref: https://blog.techbridge.cc/2017/02/25/csrf-introduction/
- CSRF 全稱是 Cross Site Request Forgery，跨站請求偽造，是一種 Web 上的攻擊手法
- 舉例：後端使用的 API 是 `https://small-min.blog.com/delete?id=3`，用 GET 實作刪除，並會驗證 cookie 有無帶 token
- 攻擊：使用假前端網站，按鈕設計成 `<a href='https://small-min.blog.com/delete?id=3'>開始測驗</a>`，或不需要按鈕，直接寫成 
`<img src='https://small-min.blog.com/delete?id=3' width='0' height='0' />`
- 攻擊二：若後端用 POST 實作刪除，可用 `<form action="https://small-min.blog.com/delete" method="POST">` 及 `document.getElementById("csrf-form").submit()` 自動送出偽造請求
- 解法：後端檢查 referer ( Request 的 Header 裡面會帶一個欄位叫做 referer，代表這個 request 是從哪個地方過來的 )
- 其他解法：加上圖形驗證碼、簡訊驗證碼，加上 CSRF token，Double Submit Cookie，Cookie 加入 `SameSite: Lax`

