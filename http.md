# 網路相關筆記

## CORS
- https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS  
- 跨網域取資料，設定 cookie，request method: OPTIONS: https://www.youtube.com/watch?v=PNtFSVU-YTI
- Note: request method: OPTIONS, status code: 204 No Content 叫做 preflight request，會在 PUT 和 DELETE 方法送出時發生
- https://blog.techbridge.cc/2018/08/18/cors-issue/
## cookie 同源的判定:
https://medium.com/%E7%A8%8B%E5%BC%8F%E7%8C%BF%E5%90%83%E9%A6%99%E8%95%89/%E5%86%8D%E6%8E%A2%E5%90%8C%E6%BA%90%E6%94%BF%E7%AD%96-%E8%AB%87-samesite-%E8%A8%AD%E5%AE%9A%E5%B0%8D-cookie-%E7%9A%84%E5%BD%B1%E9%9F%BF%E8%88%87%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%85-6195d10d4441
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
### 無法在 a 網域讀取到 b 網域的 cookie
- https://stackoverflow.com/questions/29474873/third-party-cookies-using-jquery-cookie
## HTTP Cache
https://blog.techbridge.cc/2017/06/17/cache-introduction/
## HTTPS 的加密
https://zhuanlan.zhihu.com/p/43789231  
## Bcrypt 的加密
https://blog.csdn.net/m0_37609579/article/details/100785947
## 浏览器的工作原理：新式网络浏览器幕后揭秘
https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/
