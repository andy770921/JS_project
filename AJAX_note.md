# AJAX 觀念
## Cookie
https://medium.com/@hulitw/session-and-cookie-15e47ed838bc  
https://shubo.io/cookies/  
https://blog.miniasp.com/post/2008/02/22/Explain-HTTP-Cookie-in-Detail  
https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/24542/  
https://yu-jack.github.io/2019/06/02/ajax-with-session/  
https://flaviocopes.com/cookies/  
https://pjchender.dev/webdev/web-session-cookie/  
## Fetch 和 Axios 差別
https://medium.com/@thejasonfile/fetch-vs-axios-js-for-making-http-requests-2b261cdd3af5

## CORS

https://shubo.io/what-is-cors/

## 使用 Fetch API 處理 Error 的方式
- Ref 1: 
https://medium.com/enjoy-life-enjoy-coding/jacascript-fetch-%E8%AE%93-es6-%E6%93%81%E6%9C%89%E4%B8%80%E5%B0%8D%E7%BF%85%E8%86%80-%E5%9F%BA%E7%A4%8E%E6%95%99%E5%AD%B8-2f98efe55ba4
- Ref 2: https://www.youtube.com/watch?v=AoBSB00vW5A
```js
const getData = async (url) => {
    const response = await fetch(url);
    if (response.status !== 200){
        throw new Error(`cannot fetch the data, status code: ${response.status}`);
    }
    return response.json();
};

getData('https://api.appworks-school.tw/api/1.0/marketing/campaigns').then(data => {
    console.log('resolved: ', data);
}).catch(err => {
    console.log('rejected: ', err);
});
// resolved: {data: Array(3)}

getData('https://api.appworks-school.tw/api/9.0').then(data => {
    console.log('resolved: ', data);
}).catch(err => {
    console.log('rejected: ', err);
});
// rejected:  Error: cannot fetch the data, status code: 404

getData('https://abc').then(data => {
    console.log('resolved', data);
}).catch(err => {
    console.log('rejected', err);
});
// rejected: TypeError: Failed to fetch

```
## 使用 Fetch API 帶 query string 的方式
```js
(function () {
    const url = new URL(
        'https://a.b.com/api/'
    );
    url.search = new URLSearchParams({ first: 'valueX', second: 'valueY' }).toString();
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);
        });
})();
```
## 使用 Fetch API 用 POST 帶 body 的方式
```js
(function () {
    const data = {
        foo: 'bar',
        hello: ['world']
    };
    fetch(
        'https://a.b.com/api/',
        { body: JSON.stringify(data), method: 'POST' }
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);
        });
})();
```
## Axios 使用法
https://ithelp.ithome.com.tw/articles/10212120  
https://github.com/axios/axios  

## JWT
https://youtu.be/7Q17ubqLfaM  

## 彭彭講 AJAX
https://youtu.be/OkphAk_cWPM?t=362


# 非同步程式的使用

## callback 使用
```js
function A(fn){
  console.log('first');
  fn('X');
}
function B(fn){
  console.log('second');
  fn('Y');
}
A(function(dataOne){
  B(function(dataTwo){
      console.log('last');
      console.log('data list: ', dataOne, dataTwo);
   })
});

// first
// second
// last
// data list: X Y
``` 

```js
function A(fn){
  console.log('first');
  setTimeout(()=>{
    fn('X');
  }, 2000);
}

function B(fn){ 
  console.log('second');
  setTimeout(()=>{
    fn('Y');
  }, 2000);
}

A(function(dataOne){
  B(function(dataTwo){
    console.log('last');
    console.log('data list: ', dataOne, dataTwo);
  })
});

// first
// second
// last
// data list: X Y
``` 
## GET 使用 - 原生 XMLHttpRequest 封裝成 callback

```js

function ajax(src, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status == 200) {
        callback(JSON.parse(xhr.responseText));
      }
  };
  xhr.open('GET', src);
  xhr.send();
}

function getFeedback(parsedData) {
  console.log(parsedData);
}

ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns', getFeedback);


```

## POST 使用 - 原生 XMLHttpRequest 封裝成 callback

1. 簡潔寫法 Ref: https://gist.github.com/EtienneR/2f3ab345df502bd3d13e
2. 英文說明 Ref: https://www.quora.com/What-is-the-way-to-send-a-JSON-object-via-a-POST-request-in-JavaScript-not-jQuery-or-Nodejs 
3. 中文說明 Ref: https://segmentfault.com/a/1190000004322487
4. 實際包成函數的寫法
```js
function postAjax(src, sentObj, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", src, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.onload = function () {
    var parsedData = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {
      callback(parsedData);
    } else {
      console.error(parsedData);
    }
  }
  var sentJSON = JSON.stringify(sentObj);
  xhr.send(sentJSON);
}

const sentURL = "https://api.appworks-school.tw/api/1.0/order/checkout";
const sentJsonObj = {
      "name": "andy",
      "phone": "0912345678"
    };
function getFeedback(parsedData){
  console.log(parsedData);
}

postAjax(sentURL, sentJsonObj, getFeedback);

```

## GET 使用 - 使用 Promise 寫法

```js

function ajax(src) {
  const p = new Promise(function(resolve, reject){ 
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        }
    };
    xhr.open('GET', src);
    xhr.send();
    });
  return p;
}

function getFeedback() {
  const promise = ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
  promise.then(function(parsedData){
    console.log(parsedData);
  });
}

getFeedback();

```
前者 ajax 函數，可使用簡化寫法  
```js
function ajax(src) {
  return new Promise(function(resolve, reject){ 
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        }
    };
    xhr.open('GET', src);
    xhr.send();
    });
}

function getFeedback() {
  const promise = ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
  promise.then(function(parsedData){
    console.log(parsedData);
  });
}

getFeedback();
```
前者 ajax 函數，可使用完整的寫法，包含錯誤處理 [Ref: Secrets of the JavaScript Ninja](https://github.com/sakataa/Paper/blob/master/JS/Secrets%20of%20the%20JavaScript%20Ninja%2C%202nd%20Edition.pdf?fbclid=IwAR0dZsY8dbslDcDY5H5Im4kVSxSwJTIDru58robGeFOrD0RQpTH5YHWPYEc)  

```js
function ajax(src) {
  return new Promise(function(resolve, reject){ 
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      try {
        if (this.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(this.status + " " + this.statusText);
          } 
        } catch (e){
          reject(e.message);
        }
    };
    xhr.onerror = function () {
      reject(this.status + " " + this.statusText);
    };
    xhr.open('GET', src);
    xhr.send();
  });
}

function getFeedback() {
  const promise = ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
  promise.then(function(parsedData){
    console.log(parsedData);
  });
}

getFeedback();

```

1. 補充: resolve 內的值，會對應到 .then(function(parsedData)...)， function 內的(parsedData)值
2. 補充: reject 內的值，會對應到 .catch(function(error)...)， function 內的(error)值，通常用來處理錯誤

```js
function ajax(src) {
  return new Promise(function(resolve, reject){ 
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status == 200) {
          reject(JSON.parse(xhr.responseText));
        }
    };
    xhr.open('GET', src);
    xhr.send();
    });
}
function getFeedback() {
  const promise = ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
  promise.then(function(parsedData){
    console.log(parsedData);
  }).catch(function(error){
    console.log("Error", error);
  });
}

getFeedback();
```

3. 補充: 若要等到兩個非同步的函數，都完成後，再做下一步( result1, result2 同時開始跑 -> 最慢的取得到了 -> 再下一行)，可使用 Promise.all 的語法，會輸出結果的陣列
```js
function getFeedback() {
  const promise1 = ajax('https://api.appworks-school.tw/api/1.0/products/all');
  const promise2 = ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
  Promise.all([promise1, promise2]).then(function(results){
    console.log(results);
  });
}

getFeedback();

```

## GET使用 - 使用 async/await 寫法
1. 前提1: 一定要有之前的某函數，回傳 promise 物件，才可接著使用 await ，否則視為錯誤語法。
2. 前提2: 函數內使用 await ，在宣告函數時要宣告成 async function
3. 函數進行到 await 時，會等待該行做完，才會進到下一行

```js
function ajax(src) {
 return new Promise(function(resolve, reject){ 
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        }
    };
    xhr.open('GET', src);
    xhr.send();
    });
}

async function getFeedback() {
  const parsedData = await ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
  console.log(parsedData);
}

getFeedback();

```
4. 補充: 若要等到兩個非同步的函數，都完成後，再做下一步，可直接操作。但總共會等較久 ( result1 開始運作並取得資料 ->  result2 開始運作並取得資料 -> 再下一行)
```js
function async getFeedback() {
  const result1 = await ajax('https://api.appworks-school.tw/api/1.0/products/all');
  const result2 = await ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
  console.log(result1, result2);
}

getFeedback();

```

5. 補充: 同時發送 ajax ，避免等較久的做法
```js
function async getFeedback() {
  const promise1 = ajax('https://api.appworks-school.tw/api/1.0/products/all');
  const promise2 = ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
  const [result1, result2] = await Promise.all([promise1, promise2]);
  console.log(result1, result2);
}

getFeedback();

```
6. 補充: reject 內的值，可用 try - catch 語法得到

```js
async function getFeedback() {
  try {
    const result1 = await ajax('https://api.appworks-school.tw/api/1.0/products/all');
    const result2 = await ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
    console.log(result1, result2);
  } catch(error) {
    console.log(error);
  }
}
getFeedback();

```
## 使用 async/await ，純控制流程，不回傳值的寫法

```js
 const InitFBLogin = async () => {
       await LoadingFBScript();    //第一執行
       await InitFBSetting();      //第二執行
       await CheckLoginState();    //第三執行
   }
   
InitFBLogin();
```
## 使用 async/await ，及高階函數，處理錯誤的寫法 (包裝 .catch)
```js
// 方法一
function handleError(fn) {
  return function (...params)  {
    return fn(...params).catch(function (err){
        // DO SOMETHING FOR ERROR
        console.error('Oops', err.response);
      }
    )
  }
}
async function getFeedback() {
  const result = await axios.get('https://api.appworks-school.tw/api/1.0/products/all2');
}
const safeGetFeedback = handleError(getFeedback);
safeGetFeedback();

// 方法二，不用 HOC 而是呼叫當下處理
getFeedback().catch(err => console.error("Oops", err.response));
```
# 使用 Promise.then 接連執行與 Promise.all 同時執行
```js
function ajax(src) {
  return new Promise(function(resolve, reject){ 
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      try {
        if (this.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(this.status + " " + this.statusText);
          } 
        } catch (e){
          reject(e.message);
        }
    };
    xhr.onerror = function () {
      reject(this.status + " " + this.statusText);
    };
    xhr.open('GET', src);
    xhr.send();
  });
}

// 使用 Promise.then 的寫法：
function getFeedbackOne() {
  const promise1 = ajax('https://api.appworks-school.tw/api/1.0/products/all');
  promise1.then(function(data){
    console.log("result1", data);
    return ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
  }).then(function(data){
    console.log("result2", data);
  });
}

getFeedbackOne();
// result1 {data: Array(6), next_paging: 1}
// result2 {data: Array(3)}

// 使用 Promise.all 的寫法：
function getFeedbackTwo() {
  const promise1 = ajax('https://api.appworks-school.tw/api/1.0/products/all');
  const promise2 = ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
  Promise.all([promise1, promise2]).then(function(results){
    console.log("inside Promise.all: ",results);
  });
}

getFeedbackTwo();
// inside Promise.all: [{next_paging: 1, data: Array(6)}, {data: Array(3)}]
```

# 使用 Generator 與 Iterator，實作 async/await
```js
function ajax(src) {
  return new Promise(function(resolve, reject){ 
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      try {
        if (this.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(this.status + " " + this.statusText);
          } 
        } catch (e){
          reject(e.message);
        }
    };
    xhr.onerror = function () {
      reject(this.status + " " + this.statusText);
    };
    xhr.open('GET', src);
    xhr.send();
  });
}

// 使用 Generator 與 Iterator 的寫法：
function async(generator){
  const iterator = generator();

  function handle(iteratorResult) {
    if(iteratorResult.done) { return; }
    const iteratorValue = iteratorResult.value;
    if(iteratorValue instanceof Promise) {
      iteratorValue.then(res => handle(iterator.next(res)))
                   .catch(err => iterator.throw(err))
    }
  }
  try {
    handle(iterator.next());
  } catch (e) {
    iterator.throw(e);
  }
}

async(function* (){
  try {
    const data1 = yield ajax('https://api.appworks-school.tw/api/1.0/products/all');
    const data2 = yield ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
    console.log("inside async: ", data1, data2);
    // inside async: {next_paging: 1, data: Array(6)} {data: Array(3)}
  } catch (e) {
    // handle error
  }
});
```
- async/await 實際上的意義：在函式前加 async，意義是，接下來大括號內，不是在寫函式了，是在寫 generator，await 就是 yield。
- 執行 async 函式，既不是執行一般函式，也不是單純執行 generator。 程式會在背後，幫我們先執行 generator ( 把 generator 變成 iterator ) 後，再有個 for-of 迴圈，幫我們的 iterator 持續執行 next，直到沒有 yield

# 原生 XMLHttpRequest 概念說明

1. 可在同一頁面，因使用者行為而讀取更多資料( google 地圖未顯示的部份、下拉網頁更多留言等)，且不會讓網頁停下
2. AJAX = 非同步 JS and XML (XML Request Object)
3. 實作方式: 創 XML Request Object -> 創 function (如: 處理來自 server 的地圖資料顯示在螢幕上) -> open a request -> send a request  
&emsp;Note: 步驟二，創 function，指定的函式名稱後不加括號也沒有參數。這只是簡單的賦值，而非真的呼叫函數。除了指定函式名稱外，你也能用 Javascript 即時定義函式的技巧（稱為〝匿名函數〞）來定一個新的處理函式。當收到伺服器回應時，會觸發onreadystatechange。  
&emsp;Note: 伺服器回應號碼意義: readyState 所有可能的值如下：0（還沒開始）、1（讀取中）、2（已讀取）、3（資訊交換中）4（一切完成）  
  https://developer.mozilla.org/zh-TW/docs/Web/Guide/AJAX/Getting_Started
4. 例子: 在 index.html ，利用 Ajax ，在```<script>```打程式碼，引入資料夾同一層的另一個頁面 sidebar.html
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href='//fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/main.css">
  <title>AJAX with JavaScript</title>
  <script>
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        document.getElementById('ajax').innerHTML = xhr.responseText;
      }
    };
    xhr.open('GET', 'sidebar.html');
    xhr.send();
  </script>
</head>
<body>
  <div class="grid-container centered">
    <div class="grid-100">
      <div class="contained">
        <div class="grid-100">
          <div class="heading">
            <h1>Bring on the AJAX</h1>
          </div>
          <div id="ajax">

          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```
5. 在```<script>```程式碼，加入處理伺服器錯誤的判斷式
```html
  <script>
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status ===200) {
          document.getElementById('ajax').innerHTML = xhr.responseText;
        } else {
          alert(xhr.statusText);
        }
      }
    };
    xhr.open('GET', 'sidebar.html');
    xhr.send();
  </script>
```
6. 讀取 JSON 文件的寫法
```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    var employees = JSON.parse(xhr.responseText);
    }
  };
xhr.open('GET', 'data/employee.jsons');
xhr.send();
```
7. 讀取 JSON 文件後，在創建新的 HTML 的寫法
```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    var employees = JSON.parse(xhr.responseText);
    var statusHTML = "<ul class="bulleted">";
    for (var i =0; i , employees.length ; i++ ) {
      if (employees[i].inoffice === true) {
        statusHTML += '<li class="in">';
      } else {
        statusHTML += '<li class="out">';
      }
      statusHTML += employees[i].name;
      statusHTML += '</li>';
    }
    statusHTML += '</ul>';
    document.getElementById('employeeList').innerHTML = statusHTML;
  }
};
xhr.open('GET', 'data/employee.jsons');
xhr.send();
```
8. 參考說明網頁的標準寫法，在 id="abc" 的``` <p> ```元素內可印出文字
```js
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
 if (xhttp.readyState == 4 && xhttp.status == 200) {
   document.getElementById("abc").innerHTML = xhttp.responseText;
    }
  };
xhttp.open("GET", `https://api.appworks-school.tw/api/1.0/marketing/hots`, true);
xhttp.send();
```
9. 輸出從server取得的物件 marketingHots
```js
let marketingHots ={};
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    marketingHots = JSON.parse(xhttp.responseText);
     }
  };
xhttp.open("GET", `https://api.appworks-school.tw/api/1.0/marketing/hots`, true);
xhttp.send();
```
