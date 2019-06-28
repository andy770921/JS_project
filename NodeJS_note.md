# Node JS 觀念

## 取得https網頁的資料流程

1. 連到網頁提供的API的URL (https://teamtreehouse.com/username.json)
2. 讀取資料
3. 解析資料
4. 印出資料
5. 實做法: 先用require函數，導入https模組，再連到網頁提供的API的URL+讀取資料+解析資料(將字串轉成可用的JSON原生物件)，再印出資料。
6. 邏輯: 先用.get方法，去某server網址取得資料。當server有回應時，會取得該server的"response"物件。此物件下有.on方法(函數，on an event)，函數中第一個參數是，甚麼事件被觸發了? data為server傳資料事件(data event)、第二個參數是，串流的斷斷續續的從server來的原始data，資料型態為"buffer物件"，如若干個```<Buffer 37 2e 30 30 30 5a  ... >```，兩位數為16進位，可對應到ascii code的文字 。如果需要使用，要先將斷斷續續的資料累加起來，再轉成字串。當資料都傳完時，end event會被觸發。通常data event一旦發生，結束時就一定會有end event。
```
const https = require('https');
const username = "chalkers";

function printMessage(username, badgeCount, points){
  const message = ` ${username} has ${badgeCount} total badges and ${points} points in JS.
  console.log('message');
}

const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {

  let body = "";
    // 讀取資料如下
  response.on ('data', (data) => {
    // 轉換資料為字串，如下.toString()。結合分段傳過來的串流資料，如下body +=
    body += data.toString();
  });
  response.on ('end', () => {
    // 解析資料，解析成JSON物件，如下
    const profile = JSON.parse(body);
    // 印出資料如下
    printMessage(username, profile.badges.length, profile.points.JavaScript);
  });
});

```

7. 再加入收到error後的警示字樣，如下。用console.error會輸出不同顏色的字。若是url打成email一樣的格式，會在get值時就報錯，不會進到函數中error function。要設計出url錯誤的彈出訊息，要再加入try-catch函數
```
request.on ('error', (error) => { console.error(`Problem with request: ${error.message}`)});
```


```
const https = require('https');
const username = "chalkers";

function printMessage(username, badgeCount, points){
  const message = ` ${username} has ${badgeCount} total badges and ${points} points in JS.
  console.log('message');
}
try {
  const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {

    let body = "";
    // 讀取資料如下
    response.on ('data', (data) => {
    // 轉換資料為字串，如下.toString()。結合分段傳過來的串流資料，如下body +=
      body += data.toString();
    });
    response.on ('end', () => {
    // 解析資料，解析成JSON物件，如下
      const profile = JSON.parse(body);
    // 印出資料如下
      printMessage(username, profile.badges.length, profile.points.JavaScript);
    });
  });
  // 有error時報錯如下
  request.on('error', (error) => { console.error(`Problem with request: ${error.message}`)});
} catch (error) {
  console.error(error.message);
}
```
8. 再加入a. 非回傳JSON物件(非以{ or [ 開頭者 )會報錯，b.伺服器端報錯，輸出號碼與狀態。再獨立一個.js文件，輸出get 函數給其他js文件
```
const https = require('https');
const http = require('http');
const username = "chalkers";

function printMessage(username, badgeCount, points){
  const message = ` ${username} has ${badgeCount} total badges and ${points} points in JS.
  console.log('message');
}
function get(username) {
  try {
    const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
      if (response.statusCode === 200){
        let body = "";
        // 讀取資料如下
        response.on ('data', (data) => {
        // 轉換資料為字串，如下.toString()。結合分段傳過來的串流資料，如下body +=
          body += data.toString();
        });
        response.on ('end', () => {
          try {
          // 解析資料，解析成JSON物件，如下
            const profile = JSON.parse(body);
          // 印出資料如下
            printMessage(username, profile.badges.length, profile.points.JavaScript);
          });
        } catch(error) {
          //若取得的東西，為非標準JSON object時(如Not found文字)，會解析出錯誤。要用此catch抓出
          console.error(error.message);
        }
      });
      } else {
        const message = `there was an error getting the profile for ${username} ${http.STATUS_CODES[response.statusCode]}`;
        const statusCodeError = new Error(message);
        console.error(statusCodeError.message);
      }
    // 有error時報錯如下
    request.on('error', (error) => { console.error(`Problem with request: ${error.message}`)});
    } catch (error) {
    console.error(error.message);
  }
}
// 輸出get函數給其他JS文件，其他JS文件要調用時，要使用getProfile之名稱
module.exports.getProfile = get;
```
```
// 其他JS文件直接使用，可引入
const profile = require('./profile.js');

const users = process.argv.slice(2);
users.forEach(getProfile);
```


## 取出command line指令的尾綴詞
1. command line指令如node app.js AA BB CC，可用console.log(process.argv)，看出尾綴(AA BB CC)會加在陣列第三個元素及其之後
2. 用.slice(2)可取出尾綴元素
3. 可再用.forEach，個別對尾綴元素操作。getProfile是單一變數函數，可將本來如下的寫法省略 users.forEach( username => { getProfile(username); });
```
const users = process.argv.slice(2);
users.forEach(getProfile);
```

&emsp; Note: students[propName]指的是每個key的值，不能用students.propName
&emsp; Note: .argv on the "process object" lists all arguments passed in to the command line
&emsp; Note: process is the global object we can access the current version of node and arguments passed in to the command line

## 使用Express框架
1. 先灌好npm。若需要連github，先建好github repo，再讓VS code可連到github 同步
2. 創建資料夾，在資料夾下創app.js，command line使用cd指令，前往該資料夾下
3. command line使用指令npm init -y，創造出package.json標準檔案
4. command line使用指令npm install express --save，安裝Express模組
5. app.js檔案中，第一行打```const express = require('express');```
6. 在node_module資料夾按右鍵，選擇"Add to .gitignore"。此法要先灌VS外掛套件gitignore
7. 在本地端開始運轉server。在 app.js檔案中，打如下，再在command line使用指令node app.js，再chrome輸入網址為localhost:3000就可找到頁面。
```
const express = require('express');
const app = express();

app.listen(3000);

```
8. 在本地端的server打可以回覆瀏覽器GET指令的code。在 app.js檔案中，打如下，再在終端機按鍵盤crtl + C終止server，再在command line使用指令node app.js，重啟server。
```
const express = require('express');
const app = express();

app.get('/', (request, response)=> {
  response.send('Hello, My Server!');
});
app.listen(3000);

```
9. 下載npm套件，在開啟server時，只需要在終端機打入指令```nodemon```即可，app.js存檔時會自動重啟server。先在終端機打入指令```npm install -g nodemon```按enter，再進入package.json，修改、確認預設的主頁面要是```"main": "app.js",```

10. 新增route，路徑為http://localhost:3000/getData，會回傳文字Lack of Parameter，並加入終端機的易讀狀態console.log，如下

```
const express = require('express');
const app = express();

app.get('/', (req, res)=> {
  res.send('Hello, My Server!');
});
app.get('/getData', (req, res)=> {
  res.send('Lack of Parameter');
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
});

```
11. 模版引擎 Pug之語法

&emsp; Pug: 因div太常用，也可簡寫成```.wrapper```  
```
html(lang="en")
  head
  body
    div.wrapper
    p#mainContent Hi!
```
&emsp; 轉成HTML:
```
<html lang="en">
  <head>
  </head>
  <body>
    <div class="wrapper"></div>
      <p id="mainContent"> Hi!</p>
    </div>
  </body>
```
## 使用模版引擎 Pug
1. 安裝npm Pug套件: 在終端機根目路下，打指令npm install pug --save
2. 在app.js加入程式碼，```app.set('view engine', 'pug');```，此時程式會預設在根目錄下，要有資料夾名稱views，在資料夾下要創檔案index.pug，若不是此資料夾名稱或是不同位置，要自己再加入其他設定更改
3. 在index.pug加入程式碼，如下
```
doctype html
html(lang="en")
  head
    title Landing Page
  body
    h1 Hello
```
4. 在app.js將程式碼```res.send```換成```res.render```，如下

```
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.get('/', (req, res)=> {
  res.render('index');
});
app.get('/getData', (req, res)=> {
  res.send('Lack of Parameter');
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
});
```
5. views資料夾下，新建card.pug，在card.pug加入程式碼，如下
```
doctype html
html(lang="en")
  head
    title Flash Cards
  body
    header
      h1 Flash Cards
    section#content
      h2= prompt
      p
        i Hint: #{hint}
    footer
      p abcd
```
6. app.js加入程式碼，如下。```app.get('/cards', (req, res)=> { res.render('cards', { prompt: "Who is buried?"});});```可拆成兩行寫
```
res.locals.prompt = "Who is buried?";
app.get('/cards', (req, res)=> { res.render('cards');});
```

```
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.get('/', (req, res)=> {
  res.render('index');
});
app.get('/cards', (req, res)=> {
 res.render('cards', { prompt: "Who is buried?", hint: "Think about whose tomb it is."});
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
});
```
