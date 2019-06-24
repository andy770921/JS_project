# Node JS 觀念

## 取得https網頁的資料流程

1. 連到網頁提供的API的URL (https://teamtreehouse.com/username.json)
2. 讀取資料
3. 解析資料
4. 印出資料
5. 實做法: 先用require函數，導入https模組，再連到網頁提供的API的URL+讀取資料+解析資料(將字串轉成可用的JSON原生物件)，再印出資料。
6. 邏輯: 先用.get方法，去某server網址取得資料。當server有回應時，會取得該server的"response"物件。此物件下有.on方法(函數)，函數中第一個參數是，甚麼事件被觸發了? data為server傳資料事件(data event)、第二個參數是，串流的斷斷續續的從server來的原始data，資料型態為"buffer物件"，如若干個```<Buffer 37 2e 30 30 30 5a  ... >```，兩位數為16進位，可對應到ascii code的文字 。如果需要使用，要先將斷斷續續的資料累加起來，再轉成字串。當資料都傳完時，end event會被觸發。通常data event一旦發生，結束時就一定會有end event。
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

## 123
1.   
&emsp; Note: students[propName]指的是每個key的值，不能用students.propName
