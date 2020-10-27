# 頁面效能與 SEO

## 頁面效能檢測網站
1. Lighthouse: https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk
2. page speed insights: https://developers.google.com/speed/pagespeed/insights/?hl=zh-TW
3. GTMmetrix: https://gtmetrix.com/
4. Pingdom: https://www.pingdom.com/
5. Sitespeed: https://www.notion.so/Sitespeed-io-05d71c887be140c98ef0d35361eaad2e

## React SSR

https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc

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

- safari 100vh 超出版面出現捲軸：https://dev.to/admitkard/mobile-issue-with-100vh-height-100-100vh-3-solutions-3nae

## SEO 檢測標準

