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
    xhr.onReadyStateChange = function () {
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
