# AJAX 觀念

## 彭彭講AJAX
https://youtu.be/OkphAk_cWPM?t=362

## 概念說明

1. 可在同一頁面，因使用者行為而讀取更多資料(google地圖未顯示的部份、下拉網頁更多留言等)，且不會讓網頁停下
2. AJAX = 非同步 JS and XML (XML Request Object)
3. 實作方式: 創XML Request Object -> 創 function(如: 處理來自server的地圖資料顯示在螢幕上) -> open a request -> send a request  
&emsp;Note: 步驟二，創 function，指定的函式名稱後不加括號也沒有參數。這只是簡單的賦值，而非真的呼叫函數。除了指定函式名稱外，你也能用 Javascript 即時定義函式的技巧（稱為〝匿名函數〞）來定一個新的處理函式。當收到伺服器回應時，會觸發onreadystatechange。  
&emsp;Note: 伺服器回應號碼意義: readyState 所有可能的值如下：0（還沒開始）、1（讀取中）、2（已讀取）、3（資訊交換中）4（一切完成）  
  https://developer.mozilla.org/zh-TW/docs/Web/Guide/AJAX/Getting_Started
4. 例子: 在index.html，利用Ajax，在```<script>```打程式碼，引入資料夾同一層的另一個頁面sidebar.html
```
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
```
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
6. 讀取JSON文件的寫法
```
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    var employees = JSON.parse(xhr.responseText);
    }
  };
xhr.open('GET', 'data/employee.jsons');
xhr.send();
```
7. 讀取JSON文件後，在創建新的HTML的寫法
```
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
8. 參考說明網頁的標準寫法，在id="abc"的<p>元素內可印出文字
```
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
```
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

  
## GET使用

```

function ajax(src, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status == 200) {
      //如果JSON可讀值，但是回收的JSON錯誤，加入判斷式
      if (JSON.parse(xhr.responseText) == "Wrong Request") {
        //console.log('something wrong in ajax function response');
        //console.log(xhr.responseText);
      } else {
        callback(JSON.parse(xhr.responseText));
      }
    }
  };
  xhr.open('GET', src);
  xhr.send();
}

function setBullet(parsedData) {
  consolo.log(parsedData);
}
ajax('https://api.appworks-school.tw/api/1.0/marketing/campaigns', setBullet);

```

## POST使用

簡潔寫法 Ref: https://gist.github.com/EtienneR/2f3ab345df502bd3d13e
英文說明 Ref: https://www.quora.com/What-is-the-way-to-send-a-JSON-object-via-a-POST-request-in-JavaScript-not-jQuery-or-Nodejs 
中文說明 Ref: https://segmentfault.com/a/1190000004322487
