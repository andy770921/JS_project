# 頁面效能與 SEO

## 頁面效能檢測網站
1. Lighthouse: https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk
2. page speed insights: https://developers.google.com/speed/pagespeed/insights/?hl=zh-TW
3. GTMmetrix: https://gtmetrix.com/
4. Pingdom: https://www.pingdom.com/
5. Sitespeed: https://www.notion.so/Sitespeed-io-05d71c887be140c98ef0d35361eaad2e
6. google 的行動裝置相容性測試: https://search.google.com/test/mobile-friendly

## Cache
1. https://oldmo860617.medium.com/%E6%B2%92%E4%BA%86%E8%A7%A3%E9%81%8E-cache-%E5%B0%B1%E5%88%A5%E8%AA%AA%E7%B6%B2%E7%AB%99%E6%80%A7%E8%83%BD%E6%B2%92%E6%95%91%E4%BA%86-6d9d4cfe3291
2. https://blog.techbridge.cc/2017/06/17/cache-introduction/
3. https://ithelp.ithome.com.tw/articles/10225276
4. https://pjchender.dev/webdev/note-http-cache/

## 瀏覽器各個 process 的演進與現況，及渲染引擎

https://medium.com/starbugs/%E8%BA%AB%E7%82%BA-web-%E5%B7%A5%E7%A8%8B%E5%B8%AB-%E4%BD%A0%E6%87%89%E8%A9%B2%E8%A6%81%E7%9F%A5%E9%81%93%E7%9A%84%E7%80%8F%E8%A6%BD%E5%99%A8%E6%9E%B6%E6%A7%8B%E6%BC%94%E9%80%B2%E5%8F%B2-feat-%E6%B8%B2%E6%9F%93%E5%BC%95%E6%93%8E%E9%81%8B%E4%BD%9C%E6%A9%9F%E5%88%B6-6d95d4d960ee

## [偏後端] JS 用 Array 取代 Set, 用雙向指標取代 Map 減低複雜度
https://www.youtube.com/watch?v=oewDaISQpw0


## [實務經驗] Webpqck bundle size 34 MB => 1.9 MB ( 94% reduction )

0. 加入 bundle analyzer 監測
```js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

//...
module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: false
    }),
  ]
}
```
1. webpack.config.js 加入 optimization 設定
```js
const TerserPlugin = require('terser-webpack-plugin');

// ...
module.exports = {
 devtool: isBuildMode ? false : 'inline-source-map',
 optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}
```
2. 使用最精細資料階層 import 語法
NOTE: applying tree shaking but just reduced more than 2mb
```js
// Not use below
import { withStyles } from '@material-ui/core';
// Use below
import withStyles from '@material-ui/core/styles/withStyles';
```
3. 在 AWS CloudFront，10 MB 以下，可用 gzip，目標是壓到每個 JS 在 10 MB 以下
```
File Size Limitations: by default, CloudFront skips compressing files larger than 10MB. Since our JavaScript file is 34MB, it exceeds the size limit, and CloudFront won’t apply compression to it.
```
Ref: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html#compression-skipped

4. webpack.config.js 分割檔案
```js
// ...
module.exports = {
optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin()]
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      minSize: 1000000,
      maxSize: 5000000,
      maxInitialRequests: 5,
      maxAsyncRequests: 5,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name(module, chunks, cacheGroupKey) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
          chunks: 'all',
          maxSize: 5000000,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
```

## React SSR

https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc

## CSR, SSG, SSR

- https://medium.com/starbugs/%E5%88%9D%E6%8E%A2-server-side-rendering-%E8%88%87-next-js-%E6%8E%A8%E5%9D%91%E8%A8%88%E7%95%AB-d7a9fb48a964
- https://shubo.io/rendering-patterns/

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
- [course] 即使通訊與傳輸: https://pjchender.dev/webdev/course-fem-realtime/?fbclid=IwAR2o66-MRHeiZuXRa8QsmZ9AAFaHCAqXu0B7UnkamF3KviyIdQP8CKlbg2o&mibextid=Zxz2cZ

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
https://blog.techbridge.cc/2021/05/15/prevent-xss-is-not-that-easy/  
https://tech-blog.cymetrics.io/posts/huli/xss-history/  

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

## 前端自行解出 JWT 程式碼範例
- JWT 會拆三段，這邊只解出中間的 payload，通常沒有敏感資訊，只有使用者名稱及過期時間
- Ref: https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E9%80%8F%E9%81%8E-jwt-%E5%AF%A6%E4%BD%9C%E9%A9%97%E8%AD%89%E6%A9%9F%E5%88%B6-2e64d72594f8
```ts
import { FC, useEffect } from 'react';
import Cookies from 'js-cookie';
import { decode } from 'jsonwebtoken';

const MyComponent: FC = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = Cookies.get(COOKIE_ACCESS_TOKEN);
    if (token) {
      const payload = decode(token, { json: true });
      if (payload) {
        setUsername(payload.user_name);
      }
    }
  }, [setUsername]);
  
  return <div>hi</div>;
}
```
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
- flexbox 的 height( 或 flex-grow ) 在 safari 要每層定義且不能混用：https://medium.com/@littleDog/%E7%95%B6flexbox%E9%81%87%E5%88%B0height-100-242703fcaab6
- safari 100vh 超出版面出現捲軸，替代方案：https://dev.to/admitkard/mobile-issue-with-100vh-height-100-100vh-3-solutions-3nae
- safari 100vh 超出版面， `html, body { height: 100% }`：https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html
- safari 100vh 超出版面，`html, body { height: 100% }` 外，各方案的限制：https://www.reddit.com/r/Frontend/comments/d1czwl/fix_for_100vh_with_mobile_address_bar_visible/
- safari 100vh 超出版面，用 `position: absolute` 或 `position: fixed` 加上 `top`, `bottom`  https://medium.com/@debbyji/%E8%A7%A3%E6%B1%BA%E9%AB%98%E5%BA%A6100vh%E5%9C%A8safari%E6%89%8B%E6%A9%9F%E4%B8%8A%E7%9A%84%E5%95%8F%E9%A1%8C-7db78417fca1
- safari 100vh 超出版面，用 `fill-available` : https://medium.com/@littleDog/mobile-view-height%E7%9A%84%E9%80%9A%E9%80%8F%E4%B8%96%E7%95%8C-b896ac234ba9
- safari 100vh 替代方案：https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/
- safari 100vh 替代方案：https://github.com/postcss/postcss-100vh-fix

- safari 使用 `document.body.style.overflowY = 'hidden';` 仍可捲動 body 卷軸，解法如下
```ts
// Sol 1:
// reference: https://stackoverflow.com/questions/3047337/does-overflowhidden-applied-to-body-work-on-iphone-safari
import { useEffect } from 'react';

export default function useBlockDocumentScroll(shouldBlockScroll) {
  useEffect(() => {
    if (shouldBlockScroll) {
      const _initialOverflowStyle = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      /* fix for ios safari */
      document.body.style['touch-action'] = 'none';
      document.body.style['-ms-touch-action'] = 'none';
      return () => {
        document.body.style.overflow = _initialOverflowStyle;
        document.body.style['touch-action'] = '';
        document.body.style['-ms-touch-action'] = '';
      };
    }

    return null;
  }, [shouldBlockScroll]);
  return null;
}
```
```ts
// Sol 2:
// reference: https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
import { useEffect } from 'react';

const useFixScroll = (enableFix: boolean) => {
  useEffect(() => {
    const x = window.scrollX;
    const y = window.scrollY;

    const fixScroll = () => {
      window.scrollTo(x, y);
    };

    if (enableFix) {
      document.addEventListener('scroll', fixScroll);
    }
    return () => {
      if (enableFix) {
        document.removeEventListener('scroll', fixScroll);
      }
    };
  }, [enableFix]);
};

export default useFixScroll;
```



## SEO 檢測標準

