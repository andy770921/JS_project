# AJAX 觀念

## 概念說明

1. 可在同一頁面，因使用者行為而讀取更多資料(google地圖未顯示的部份、下拉網頁更多留言等)，且不會讓網頁停下
2. AJAX = 非同步 JS and XML (XML Request Object)
3. 實作方式: 創XML Request Object -> 創callback function(如: 處理來自server的地圖資料顯示在螢幕上) -> open a request -> send a request
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
