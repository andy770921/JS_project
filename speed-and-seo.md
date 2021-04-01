# 頁面效能與 SEO

## 頁面效能檢測網站
1. Lighthouse: https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk
2. page speed insights: https://developers.google.com/speed/pagespeed/insights/?hl=zh-TW
3. GTMmetrix: https://gtmetrix.com/
4. Pingdom: https://www.pingdom.com/
5. Sitespeed: https://www.notion.so/Sitespeed-io-05d71c887be140c98ef0d35361eaad2e

## React SSR

https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc

## 前 Facebook JavaScript 優化部門的 Josh Duck 提到的效能優化方向

- https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/reactconf-au-2020-note-part1-2f309361a908

## 圖片 lazy loading:
- demo: https://mingjunlu.github.io/lazy-loading-example/
- code: https://github.com/mingjunlu/lazy-loading-example
- ref: https://medium.com/@mingjunlu/lazy-loading-images-via-the-intersection-observer-api-72da50a884b7
- ref: https://shubo.io/intersection-observer-api/?fbclid=IwAR0LeEKwesJuNS2UjgvH977QFhQTEdJAc9t35nGZLxQ1pAFwBMk5z-sZB7Y
- 原生`<img loading="lazy">` ref: https://web.dev/browser-level-image-lazy-loading/

## 圖片上傳兩方式：
- Content-Type (`application/x-www-form-urlencoded`, `application/json`, `multipart/form-data`) 比較：https://www.cnblogs.com/liangtao999/p/13132446.html
- 使用 `application/json + Base64` 或是 `multipart/form-data`：https://stackoverflow.com/questions/33279153/rest-api-file-ie-images-processing-best-practices
- 使用 form-data 實作範例：https://stackoverflow.com/Questions/5587973/javascript-upload-file
- 使用 form-data，Axios Transform Request 設定： https://blog.csdn.net/Hello_yihao/article/details/91046644

## 不用 iframe 嵌入 YouTube 影片，提升速度的套件

https://github.com/paulirish/lite-youtube-embed

## 錄製 http request 跟 response 網站

https://proxyman.io/

## 產生 http 網址，使用手機開網頁，檢查手機版排版

https://blog.techbridge.cc/2018/05/24/ngrok/

## 輪詢與 Websocket 效能

1. polling / long-polling 
- 缺點是「一直吃重複連線、重複打 api 、重複提取資料的資源」且「不一定是即時更新的」
- 優點是「實現容易、支援度高」

2. websocket （ 與 HTTP 最大的不同是，他是持續的雙向的連線，所以沒有重新連線，可由伺服器端主動傳回資料更即時）
- 缺點是「需要耗費伺服器端的資源」且「支援度相對低（例如 IE 10 以上才支援）」
- 優點是「節省重複連線的資源、更優異的即時性」

3. Ref:
- websocket 官方 ： http://www.websocket.org/quantum.html
- JavaScript - Polling、WebSocket 與 SSE 介紹 https://ithelp.ithome.com.tw/articles/10230335
- 且戰且走HTML5(2) 應用主軸：WebSocket https://ithelp.ithome.com.tw/articles/10102394

## SSO
- https://stackoverflow.com/questions/11434866/automatic-cookie-single-sign-on-on-multiple-domains-like-google?fbclid=IwAR35Uq7H3nfG8yGsmouPBDQrUA0dGGii3mGR286Cf-4Y9zjZ-H-jiOik2dI
- https://yu-jack.github.io/2020/04/06/sso-1/
- https://stackoverflow.com/questions/11434866/automatic-cookie-single-sign-on-on-multiple-domains-like-google
- 說明 youtube 和 google 的作法:
1. 兩個網站一個 api，mail.google.com, account.google.com(這有點像是 api 不是頁面), www.youtube.com
2. mail.google.com 或是 www.youtube.com 一律先 302 導到 account.google.com
3. account.google.com 如果檢查後，如果是登入中，導回原站
4. 導回的如果是同子網域，寫 cookie (沒有跨域寫的問題）比如導回 mail.google.com 可以直接由後端寫 cookie
5. 導回的是跨域的，會加上 query string 如 www.youtube.con/signin?sessionid=123，前端從 query string 寫 cookie 並移除 query string

## 圖片載入優化 - BlurHash

https://www.slideshare.net/kewang/blurhash


## XSS 攻擊介紹

https://www.youtube.com/watch?v=M6N7gEZ-IUQ

## CSRF (Cross Site Request Forgery) 攻擊介紹

- https://blog.huli.tw/2017/03/12/csrf-introduction/
- https://owasp.org/www-community/attacks/csrf

## JWT Token 要放哪?

- JWT Token 不放 Header = `Cookie authentication`，用 use cookies 帶給後端, with the HttpOnly; Secure flags 
- Ref 1: https://stormpath.com/blog/build-secure-user-interfaces-using-jwts
- Ref 2: https://stackoverflow.com/questions/31068888/jwt-authentication-cookie-vs-header
- JWT Token 放 Header = `Token authentication`，勢必要存在 localStorage, sessionStorage, or cookies (當成 stored "out of the box") 
- Ref: https://stackoverflow.com/questions/17000835/token-authentication-vs-cookies
- `Token authentication` 或 `Cookie authentication`，各有優缺
- 存在 localStorage, sessionStorage, or cookies 各有優缺
## Safari debug

https://www.busbud.com/blog/debug-ios-safari-mac/

## 跨瀏覽器 css 樣式
- scroll 要配合 -webkit-overflow-scrolling: touch

```css
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
```
- 外層 display: flex ，若內層高度異常可加 min-height: fit-content
```css
   min-height: fit-content; // 避免 safari 吃錯每列高度
```
- https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/705049/

- safari 100vh 超出版面出現捲軸，替代方案：https://dev.to/admitkard/mobile-issue-with-100vh-height-100-100vh-3-solutions-3nae
- safari 100vh 超出版面， `html, body { height: 100% }`：https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html
- safari 100vh 超出版面，`html, body { height: 100% }` 外，各方案的限制：https://www.reddit.com/r/Frontend/comments/d1czwl/fix_for_100vh_with_mobile_address_bar_visible/
- safari 100vh 超出版面，用 `position: absolute` 或 `position: fixed` 加上 `top`, `bottom`  https://medium.com/@debbyji/%E8%A7%A3%E6%B1%BA%E9%AB%98%E5%BA%A6100vh%E5%9C%A8safari%E6%89%8B%E6%A9%9F%E4%B8%8A%E7%9A%84%E5%95%8F%E9%A1%8C-7db78417fca1
- safari 100vh 超出版面，用 `fill-available` : https://medium.com/@littleDog/mobile-view-height%E7%9A%84%E9%80%9A%E9%80%8F%E4%B8%96%E7%95%8C-b896ac234ba9
- safari 100vh 替代方案：https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/
- safari 100vh 替代方案：https://github.com/postcss/postcss-100vh-fix

## SEO 檢測標準

