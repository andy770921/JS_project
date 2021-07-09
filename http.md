# 網路相關筆記

## CORS
- https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS  
- 跨網域取資料，設定 cookie，request method: OPTIONS: https://www.youtube.com/watch?v=PNtFSVU-YTI
- Note: request method: OPTIONS, status code: 204 No Content 叫做 preflight request，會在 PUT 和 DELETE 方法送出時發生
## 跨網域傳送 cookie:
- https://ithelp.ithome.com.tw/articles/10251693
- https://www.youtube.com/watch?v=PNtFSVU-YTI
- 前端
```js
fetch("http://localhost:3000/data", { credentials: "include" })
  .then(res => res.json())
  .then(data => console.log(data))
```
- 後端: 要在 Response Header 中加入 Access-Control-Allow-Credentials: true
```js
const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({ origin: "http://127.0.0.1: 5500", credentials: true })
);

app.get("/data", (req, res) => {
  res.json({ name: "Kyle" });
});

app.listen(3000);
```

## HTTP Cache
https://blog.techbridge.cc/2017/06/17/cache-introduction/
## HTTPS的加密
https://zhuanlan.zhihu.com/p/43789231
## 浏览器的工作原理：新式网络浏览器幕后揭秘
https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/
