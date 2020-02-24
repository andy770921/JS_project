# AJAX 觀念
## Cookie
https://medium.com/@hulitw/session-and-cookie-15e47ed838bc
https://blog.miniasp.com/post/2008/02/22/Explain-HTTP-Cookie-in-Detail  
https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/24542/  
https://yu-jack.github.io/2019/06/02/ajax-with-session/  
https://flaviocopes.com/cookies/  
## Fetch 和 Axios 差別
https://medium.com/@thejasonfile/fetch-vs-axios-js-for-making-http-requests-2b261cdd3af5

## 使用 Fetch 處理 Error
https://medium.com/enjoy-life-enjoy-coding/jacascript-fetch-%E8%AE%93-es6-%E6%93%81%E6%9C%89%E4%B8%80%E5%B0%8D%E7%BF%85%E8%86%80-%E5%9F%BA%E7%A4%8E%E6%95%99%E5%AD%B8-2f98efe55ba4

## Axios 使用法
https://ithelp.ithome.com.tw/articles/10212120  
https://github.com/axios/axios  
## 彭彭講 AJAX
https://youtu.be/OkphAk_cWPM?t=362

## 概念說明

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

## callback 使用
```js
function A(fn){
  console.log('first');
  fn();
}
function B(fn){
  console.log('second');
  fn();
}
A(function(){
  B(function(){
      console.log('last');
   })
});
``` 

```js
function A(fn){
  let a = 0; 
  console.log('first');
  setTimeout(()=>{
    a = 100
    fn(a);
  }, 2000);
}

A(function(x){
  console.log('second', x);
  setTimeout(()=>{
    console.log('last', x + 100);
  }, 2000);
});
``` 
## GET 使用

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

## POST 使用

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
  let p = new Promise(function(resolve, reject){ 
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
  let promise = ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
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
  let promise = ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
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
  let promise1 = ajax('https://api.appworks-school.tw/api/1.0/products/all');
  let promise2 = ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
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
  let parsedData = await ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
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
  const result1Promise = ajax('https://api.appworks-school.tw/api/1.0/products/all');
  const result2Promise = ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
  const [result1, result2] = await Promise.all([result1Promise, result2Promise]);
  console.log(result1, result2);
}

getFeedback();

```
6. 補充: reject 內的值，可用 try - catch 語法得到

```js
async function getFeedback() {
  try {
    let result1 = await ajax('https://api.appworks-school.tw/api/1.0/products/all');
    let result2 = await ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns');
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
function handleError(fn) {
  return function (...params)  {
    return fn(...params).catch(function (err){
        // DO SOMETHING FOR ERROR
        console.error('Oops', err)
      }
    )
  }
}
async function getFeedback() {
  const result = await axios.get('https://api.appworks-school.tw/api/1.0/products/all');
}
const safeGetFeedback = handleError(getFeedback);
safeGetFeedback();
```
