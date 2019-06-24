# Node JS 觀念

## 取得https網頁的資料流程

1. 連到網頁提供的API的URL (https://teamtreehouse.com/username.json)
2. 讀取資料
3. 解析資料
4. 印出資料
5. 實做法: 先用require函數，導入https模組，再連到網頁提供的API的URL+讀取資料+解析資料，再印出資料
```
const https = require('https');
const username = "andy";

const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
  //console.dir(response);
  let body = "";
  // 讀取資料如下
  response.on ('data', (data) => {
  // 解析資料，如下.toString()。結合分段傳過來的串流資料，如下body +=
    body += data.toString();
  });
  response.on ('end', () => {
  // 印出資料如下
    console.log(body);
    console.log(typeof );
  });
});

function printMessage(username, badgeCount, points){
  const message = ` ${username} has ${badgeCount} total badges and ${points} points in JS.
  console.log('message');
}
```

## 123
1.   
&emsp; Note: students[propName]指的是每個key的值，不能用students.propName
