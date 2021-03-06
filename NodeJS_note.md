# Node JS 觀念
## 檔案中註解方式
```js
/**
 * 說明
 * @param { String } shopDomainName - 變數說明
 * @param { Boolean } isClearCache=false - 變數說明
 * @returns { Promise<Object> }
 */
```
## thread
https://www.youtube.com/watch?v=zphcsoSJMvM

## 取得 https 網頁的資料流程

1. 連到網頁提供的API的URL (https://teamtreehouse.com/username.json)
2. 讀取資料
3. 解析資料
4. 印出資料
5. 實做法: 先用require函數，導入https模組，再連到網頁提供的API的URL+讀取資料+解析資料(將字串轉成可用的JSON原生物件)，再印出資料。
6. 邏輯: 先用.get方法，去某server網址取得資料。當server有回應時，會取得該server的"response"物件。此物件下有.on方法(函數，on an event)，函數中第一個參數是，甚麼事件被觸發了? data為server傳資料事件(data event)、第二個參數是，串流的斷斷續續的從server來的原始data，資料型態為"buffer物件"，如若干個```<Buffer 37 2e 30 30 30 5a  ... >```，兩位數為16進位，可對應到ascii code的文字 。如果需要使用，要先將斷斷續續的資料累加起來，再轉成字串。當資料都傳完時，end event會被觸發。通常data event一旦發生，結束時就一定會有end event。
```js
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
```js
request.on ('error', (error) => { console.error(`Problem with request: ${error.message}`)});
```


```js
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
```js
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
```js
// 其他JS文件直接使用，可引入
const profile = require('./profile.js');

const users = process.argv.slice(2);
users.forEach(getProfile);
```


## 取出command line指令的尾綴詞
1. command line指令如node app.js AA BB CC，可用console.log(process.argv)，看出尾綴(AA BB CC)會加在陣列第三個元素及其之後
2. 用.slice(2)可取出尾綴元素
3. 可再用.forEach，個別對尾綴元素操作。getProfile是單一變數函數，可將本來如下的寫法省略 users.forEach( username => { getProfile(username); });
```js
const users = process.argv.slice(2);
users.forEach(getProfile);
```

&emsp; Note: students[propName]指的是每個key的值，不能用students.propName
&emsp; Note: .argv on the "process object" lists all arguments passed in to the command line
&emsp; Note: process is the global object we can access the current version of node and arguments passed in to the command line

## 使用Express框架，加入 .get 功能，使server的資料能被瀏覽器取得
1. 先灌好npm。若需要連github，先建好github repo，再讓VS code可連到github 同步
2. 創建資料夾，在資料夾下創app.js，command line使用cd指令，前往該資料夾下
3. command line使用指令npm init -y，創造出package.json標準檔案
4. command line使用指令npm install express --save，安裝Express模組
5. app.js檔案中，第一行打```const express = require('express');```
6. 在node_module資料夾按右鍵，選擇"Add to .gitignore"。此法要先灌VS外掛套件gitignore
7. 在本地端開始運轉server。在 app.js檔案中，打如下，再在command line使用指令node app.js，再chrome輸入網址為localhost:3000就可找到頁面。
```js
const express = require('express');
const app = express();

app.listen(3000);

```
8. 在本地端的server打可以回覆瀏覽器GET指令的code。在 app.js檔案中，打如下，再在終端機按鍵盤crtl + C終止server，再在command line使用指令node app.js，重啟server。
```js
const express = require('express');
const app = express();

app.get('/', (request, response)=> {
  response.send('Hello, My Server!');
});
app.listen(3000);

```
9. 下載npm套件，在開啟server時，只需要在終端機打入指令```nodemon```即可，app.js存檔時會自動重啟server。先在終端機打入指令```npm install -g nodemon```按enter，再進入package.json，修改、確認預設的主頁面要是```"main": "app.js",```

10. 新增route，路徑為http://localhost:3000/getData，會回傳文字Lack of Parameter，並加入終端機的易讀狀態console.log，如下

```js
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
```html
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
1. 安裝npm Pug套件: 在終端機根目錄下，打指令npm install pug --save
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

```js
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
```js
res.locals.prompt = "Who is buried?";
app.get('/cards', (req, res)=> { res.render('cards');});
```

```js
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
7. 在index.pug，加入從app.js取得的colors陣列
```
ul
  each color in colors
    li= color
```
&emsp; app.js:

```js
const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
];
```
8. 簡化重複的程式碼1: 新創layout.pug檔案，在views資料夾下，貼上重複的程式碼，中段加入```block content```。在index.pug檔案開頭加入```extends layout.pug```，中段加入```block content```

9. 簡化重複的程式碼2: 在views資料夾下，創建includes資料夾，下創建header.pug。layout.pug檔案，加入```include includes/header.pug```。在card.pug檔案開頭加入```extends layout.pug```

## 送出(post) 瀏覽器的資料給server的流程

1. 在終端機根目錄下，打指令npm install body-parser --save。在app.js加入已下程式碼，使其可以解析文字
```js
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded: { (extended: false) });

```
2. 建好模版頁hello.pug後，app.js加入如下程式碼
```js
app.get('/hello', (req, res)=> {
  res.render('hello');
});
app.post('/hello', (req, res)=> {
  console.dir(req.body);
  res.render('hello');
});
```
&emsp; hello.pug:
```
extends layout.pug
block content
  h2 welcome
    label Please enter your name:
      input(type='text', name='username')
    button(type='submit') Submit
```
## Save state方法(儲存瀏覽器使用者提供的資訊) - 使用cookie

1. cookies功能: 在客戶端存下資料，資料類型為「小型文字檔案」。當客戶端送出request給server時，會一併送出cookie給server
2. 在終端機根目錄下，打指令npm install cookie-parser --save。在app.js加入已下程式碼，使其可以解析文字
```js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded: { (extended: false) });

const cookieParser = require('cookie-parser');
app.use(cookieParser());

```
3. 建好模版頁hello.pug後，app.js加入如下程式碼可儲存使用者輸入的username，存入cookie
```js
app.get('/hello', (req, res)=> {
  res.render('hello', name: req.cookies.username);
});
app.post('/hello', (req, res)=> {
  res.cookie('username', req.body.username);
  res.render('hello', {name: req.body.username});
});
```
4. 打完名字後，從/hello重新導向主頁面。app.js加入如下程式碼

```js
app.get('/', (req, res)=> {
  res.render('index', {name: req.cookies.username});
});
app.get('/hello', (req, res)=> {
  res.render('hello');
});
app.post('/hello', (req, res)=> {
  res.cookie('username', req.body.username);
  res.redirect('/');
});
```
5. 若無cookie，主頁面將重新導向/hello。app.js加入如下程式碼
```js
app.get('/', (req, res)=> {
  if (req.cookies.username) {
    res.render('index', {name: req.cookies.username}); 
  } else {
    res.redirect('/hello');
  }
});
```
6. 若有cookie，/hello將重新導向主頁面。app.js加入如下程式碼
```js
app.get('/hello', (req, res)=> {
  if (req.cookies.username) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});
```
7. 加入清除cookie按鈕，在index.pug打如下程式碼
```js
form(action='/goodbye', method='post')
  button(type='submit') Goodbye
```
&emsp; 在app.js打如下程式碼
```js
app.post('/goodbye', (req, res)=> {
  res.clearCookie('username');
  res.redirect('/hello');
});
```

## 中介軟體 Middleware 使用介紹
1. .use，使用閉包的原理，函數內再回傳函數。函數內出現 next()，或是送出response時，即結束此段程式，到下個程式碼
```js
const express = require('express');
const app = express();

app.use(
  return function (req, res, next) {
      console.log("hello");
    next();
});

```
&emsp; 可簡化寫如下
```js
app.use( (req, res, next) => {
    console.log("hello");
    next();
});
```
2. .use直接呼叫其他函式
```js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded: { (extended: false) });
app.use(cookieParser());

```

## 處理Bug的親合頁面

1. 自己創造出error code = 500 的 Bug，並傳出Error原生物件，加入如下程式碼

```js

app.use((req, res, next) => {
    console.log("hello");
    const error = new Error('Oh Noes!');
    error.status = 500;
    next(err);
});

```
2. 當error發生，渲染出error.pug頁面，在app.listen前，加入如下程式碼

```js

app.use((err,req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

```
3. 編輯親合的error.pug頁面

```

extends layout.pug
block content
  h1= error.message
  h2= error.status
  pre= error.stack

```
## 模組化Route
## 調用 Data Base資料

1. 創建data資料夾，下創建flashcardData.json物件

```js
{
    "data": {
        "title": "JavaScript Flashcards",
        "cards": [
            {
                "question": "What language are Express apps written in?",
                "hint": "It starts with a \"J\"",
                "answer": "JavaScript"
            },
            {
                "question": "What is one way a website can store data in a user's browser?",
                "hint": "They are delicious with milk",
                "answer": "Cookies"
            },

            {
                "question": "Which HTML element can contain JavaScript?",
                "hint": "It starts with an \"s\"",
                "answer": "<script>"
            }
        ]
    }
}

```
2. card.js下，加入如下程式碼，讓資料庫的資料，能夠被取得。```const {cards} = data;```，等於```const cards = data.cards;```
```js
const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

router.get('/', (req, res) => {
  res.render('card', {
    prompt: cards[0].question,
    hint: cards[0].hint
  });
});

module.exports = router;
```
3. card.js下，修改程式碼，讓資料庫的資料，能夠與URL的後詞綴相關。如http://localhost:3000/cards/1
```js
const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

router.get('/:id', (req, res) => {
  res.render('card', {
    prompt: cards[req.params.id].question,
    hint: cards[req.params.id].hint
  });
});

module.exports = router;
```
4. card.js下，修改程式碼，讓資料庫的資料，能夠與URL的?後詞綴(query)相關。如http://localhost:3000/cards/1?side=answer、http://localhost:3000/cards/1?side=question
```js
const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const {cards} = data;

router.get('/:id', (req, res) => {
  const {side} = req.query;
  const {id} = req.params;
  const prompt = cards[id][side];
  const {hint} = cards[id];
  const templateData = {prompt, hint}
  res.render('card', templateData );
});

module.exports = router;
```

5. card.pug下，加入重新導向至不同query的連結
```
extends layout.pug
block content
  section#content
  h2= prompt
  if hint
    p
      i Hint: #{hint};
  a(href=`${id}?side=${sideToShow}`) = sideToShowDisplay

```
&emsp; card.js下
```js
router.get('/:id', (req, res) => {
  const {side} = req.query;
  const {id} = req.params;
  const prompt = cards[id][side];
  const {hint} = cards[id];
  const templateData = {id, prompt}
  if (side ==='question') {
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
  } else if(side ==='answer') {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question';
  }
  res.render('card', templateData );
});

module.exports = router;
```
6. card.js下，加入重新導向至不同id的連結
```js
router.get('/', (req, res)=>{
  const numOfCards = cards.length;
  const flashcardId= Math.floor( Math.random() * numOfCards);
  res.redirect( `/cards/${flashcardId}?side=question`)
})
```
7. card.js下，加入非預期網址http://localhost:3000/cards/1時，強迫指定side=question
```js
router.get('/:id', (req, res) => {
  const {side} = req.query;
  const {id} = req.params;
  if (!side){
    return res.redirect(`/cards/${id}?side=question`);
  }
  const prompt = cards[id][side];
  const {hint} = cards[id];
  const templateData = {id, prompt}
  if (side ==='question') {
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
  } else if(side ==='answer') {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question';
  }
  res.render('card', templateData );
});
```
## 創建static asset

1. 根目錄下，建資料夾public，下建資料夾stylesheets，下建檔案style.css
2. app.js，新增如下程式碼
```js
app.use('/static', express.static('public'));
```
3. 在layout.png下，title的下一行，加入如下程式碼
```js
link(rel='stylesheet', href='/static/stylesheets/style.css')
```
