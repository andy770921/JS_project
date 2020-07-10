# 頁面效能與 SEO

## 頁面效能檢測網站
1. Lighthouse: https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk
2. page speed insights: https://developers.google.com/speed/pagespeed/insights/?hl=zh-TW
3. GTMmetrix: https://gtmetrix.com/
4. Pingdom: https://www.pingdom.com/
5. Sitespeed: https://www.notion.so/Sitespeed-io-05d71c887be140c98ef0d35361eaad2e

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

## SEO 檢測標準
