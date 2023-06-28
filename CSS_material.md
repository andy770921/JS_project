# CSS 素材庫

## 畫 Flow-Chart 網站
https://whimsical.com/

## 取圖片顏色色碼 網站
https://www.ginifab.com/feeds/pms/color_picker_from_image.php

## SVG 處理 網站
https://jakearchibald.github.io/svgomg/

## Icomoon ( Icon font 製作 )
https://icomoon.io/app/#/select

## 色碼排序 網站
https://elektrobild.org/tools/sort-colors

## 檢查 RWD 網站
https://responsively.app/

## 查詢 icon 字型 網站  

https://graphemica.com/%F0%9F%93%9D  

## 3D 翻轉教學

https://3dtransforms.desandro.com/card-flip

## Toggle 教學
https://youtu.be/XCyrzYp3aCY?t=2029

## SVG 箭頭
https://freebiesupply.com/blog/css-arrows/
https://codepen.io/lizmaybury/pen/bVOqbb
https://codepen.io/jreid/pen/HgCwD

## 非 SVG 箭頭

https://codepen.io/anastasialanz/pen/oLXeVp
https://codepen.io/tjdunklee/pen/coqyj

## Loading + styled-component + typescript:

1. tsconfig.json
```js
{
  "compilerOptions": {
  // ...
  "include": [
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./test/**/*.spec.ts",
    "./test/**/*.steps.tsx",
    "./test/**/*.steps.ts", 
    "./src/declaration.d.ts", // 載入 gif 時，需要在 TS declare module, 見註一
  ],
  "exclude": ["node_modules", "dist", "webpack/**/**"]
}

// 註一:
// https://stackoverflow.com/questions/52759220/importing-images-in-typescript-react-cannot-find-module
```
2. webpack.config.js
```js
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.(woff(2)?|ttf|eot|svg|gif)(\?v=\d+\.\d+\.\d+)?$/,
                loaders: ['file-loader']
            }
        ],
    },
};

```
3. src/declaration.d.ts
```js
declare module '*.gif';
```
4. Loading 的 React Component
```js
import React from 'react';
import styled from 'styled-components';
import imgUrl from '../asset/loading.gif';

const LoadingWrapper = styled.div`
    position: fixed;
    width: inherit;
    top: 0;
    bottom: 0;
`;

const LoadingIcon = styled.img`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
`;

const Loading = () => {
    return (
        <LoadingWrapper>
            <LoadingIcon src={imgUrl} alt="loading..." />
        </LoadingWrapper>
    );
};

export default Loading;
```

## SVG 勾勾

```js
import React, { FC } from 'react';
import styled from 'styled-components';

const TickSvg = styled.svg`
    background-color: '#469be5';
    opacity: 0.7;
`;

const TickIcon: FC<{ size?: number }> = ({ size = 45 }) => (
    <TickSvg
        width={`${size}px`}
        height={`${size}px`}
        viewBox={`${(45 - size) / 2} ${(45 - size) / 2} ${size} ${size}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <g id="loading-copy" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path
                d="M20.9146095,24.2707354 L28.556449,16.4301507 L28.556449,16.4301507 C29.1154451,15.8566164 30.0217568,15.8566164 30.5807529,16.4301507 C31.139749,17.0036849 31.139749,17.9335675 30.5807529,18.5071017 L21.7477303,27.5698493 C21.1887342,28.1433836 20.2824224,28.1433836 19.7234263,27.5698493 L15.4192471,23.1537291 C14.860251,22.5801949 14.860251,21.6503122 15.4192471,21.076778 C15.9782432,20.5032438 16.8845549,20.5032438 17.443551,21.076778 L20.5565471,24.2707354 C20.652917,24.3696116 20.8111952,24.3716434 20.9100714,24.2752735 C20.9116034,24.2737803 20.9131163,24.2722675 20.9146095,24.2707354 Z"
                id="Combined-Shape"
                fill="#FFFFFF"
                fillRule="nonzero"
            />
        </g>
    </TickSvg>
);

export default TickIcon;
```
## Collapse 元件，不用 JS
Ref: https://letswrite.tw/css-target-tab-collapse/
```html
<div class="w-480">
  <!-- collapse-->
  <h2>Collapse</h2>
  <div class="collapse">
    <a class="collapse__title" href="#collapse1">Collapse1</a>
    <div class="collapse__content" id="collapse1">
      <p>collapse1</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut neque ab natus quas, enim delectus. Pariatur nemo suscipit repellendus corrupti aliquam aspernatur iste eligendi quis fugit, molestias temporibus dolorem modi?</p>
    </div>
    <a class="collapse__title" href="#collapse2">Collapse2</a>
    <div class="collapse__content" id="collapse2">
      <p>collapse2</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut neque ab natus quas, enim delectus. Pariatur nemo suscipit repellendus corrupti aliquam aspernatur iste eligendi quis fugit, molestias temporibus dolorem modi?</p>
    </div>
    <a class="collapse__title" href="#collapse3">Collapse3</a>
    <div class="collapse__content collapse--content-active" id="collapse3">
      <p>collapse3</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut neque ab natus quas, enim delectus. Pariatur nemo suscipit repellendus corrupti aliquam aspernatur iste eligendi quis fugit, molestias temporibus dolorem modi?</p>
    </div>
  </div>
</div>
```

```css
.w-480 {
  margin-right: auto;
  margin-left: auto;
  padding: 1rem;
  max-width: 480px;
}

.collapse .collapse__title {
  display: block;
  margin-bottom: 0.25rem;
  padding: 0.5rem 1rem;
  background-color: #42A6F7;
  border-radius: 0.25rem;
  text-decoration: none;
  color: #FFF;
}
.collapse .collapse__content {
  padding: 0;
  height: 0;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.4s, padding-top 0.2s, padding-bottom 0.2s;
}
.collapse .collapse__content:target {
  padding: 1rem;
  height: auto;
  opacity: 1;
}
.collapse .collapse--content-active {
  padding: 1rem;
  height: auto;
  opacity: 1;
}
.collapse .collapse__content:target ~ .collapse--content-active {
  padding: 0;
  height: 0;
  opacity: 0;
}
```

## 設計範例

https://dribbble.com/
1. 網頁: https://codepen.io/Dhemie/pen/MpNNLm
2. 網頁: https://codepen.io/tommyhare/pen/mdbMNev
3. 登入: https://codepen.io/mdbootstrap/pen/Yrdjwr
4. 網頁: https://codepen.io/fareedkhan557/pen/yLBGNeM
5. 網頁: https://codepen.io/Noble99/pen/ZeEMVP
6. 圓形圖片效果: https://codepen.io/alinedmelo/pen/mAGbpZ
7. 加入# : https://codepen.io/jvald043/pen/XXoRpX
8. 卷軸滑動效果: https://codepen.io/teckliew/pen/yeomxy
8. 卷軸滑動效果 - 純 JS: https://codepen.io/Gjoko-Bulovski/pen/eoVKGo
9. nav: https://codepen.io/nickelse/pen/yNwPwv
10. 方塊: https://codepen.io/SaraSoueidan/pen/sBELl
11. mobile-like: https://codepen.io/virgilpana/pen/ZYZXgP
12. text-card: https://codepen.io/derekmorash/pen/NjBvdX
13. 底流動: https://codepen.io/liquidcharcoal/pen/rEeYrw
14. 圓點點擊效果: https://codepen.io/chrisgannon/pen/BoXLOJ
15. 純 CSS 點擊星星: https://codepen.io/GeoffreyCrofte/pen/jEkBL
16. 卡片左右選: https://codepen.io/JuniVersal/pen/zNyMRd
17. 水彩效果: https://codepen.io/leusrox/pen/Xaadrx
18. 紙卡: https://codepen.io/tunguska/pen/xGOQwe
19. 網頁: https://codepen.io/ElHumanoide/pen/RmdKzW
20. 網頁: https://codepen.io/dwiki13/pen/BEPapd
21. card; https://codepen.io/mikemang/pen/EZYPXp
22. slider: https://codepen.io/barrel/pen/oBefw
23. card with selection: https://codepen.io/creativetim/pen/EgVBXa
24. 網頁: https://codepen.io/Master-X31/pen/MxprvR
25. card with slider: https://codepen.io/WebSonick/pen/JkLcf
26. 卷軸及介紹: https://codepen.io/DragosBodin/pen/gGIzt
27. 手指: https://codepen.io/thykka/pen/GJQZaV
28. 網頁: https://codepen.io/Joruchan/pen/KEdZmQ
29. 網頁: https://codepen.io/Espree/pen/xmjVmN
30. 人物介紹: https://codepen.io/alexjbrown2/pen/NeMQro
31. 圖片橫幅展開: https://codepen.io/tutsplus/pen/NRjNBr

## 參考連結

1. 找圖網址: https://unsplash.com/
1. 找圖網址 - 2: https://www.digitaling.com/articles/42086.html
1. 找圖網址 - 3: https://www.wallpaperflare.com/
2. slider: https://codepen.io/drygiel/pen/rtpnE
3. slider 套件庫，含 loading 動畫 : https://idangero.us/swiper/get-started/
4. 彩色背景雲霧 : https://codepen.io/drygiel/pen/GleyB
5. 圓圈旋轉環繞 : https://codepen.io/drygiel/pen/jbExNe
6. Menu bar 下拉展開、loading 動畫、按鈕點擊動畫: https://www.edufukunari.com.br/a-collection-of-pure-css-animation-snippets-demos/
7. 404: https://codepen.io/kenchen/pen/vJdGc
8. 404: https://codepen.io/danielcgold/pen/bVMjdg
9. submit: https://codepen.io/auginator/pen/oElzF
10. 滑鼠拖曳: https://codepen.io/suez/pen/emjwvP
11. 點按鈕，接確認視窗: https://codepen.io/hakimel/pen/ZYRgwB
12. 點按鈕，接跳出視窗: https://codepen.io/pix3l/pen/ajwcE
13. 點按鈕，接跳出視窗-2: https://codepen.io/hakimel/pen/wFfGs
14. 點按鈕，換成 loading 圖: https://codepen.io/hakimel/pen/gkeha
15. 漢堡按鈕: https://codepen.io/rss/pen/vIDKH
16. loading動畫: https://codepen.io/hakimel/pen/CxliK
17. 影片開始與結束撥放: https://codepen.io/hakimel/pen/JoNrxq
18. 邊框: https://freefrontend.com/css-border-animations/
19: 404: https://codepen.io/supah/pen/RrzREx
20. 純 CSS 立體方塊旋轉: https://codepen.io/carmerano/pen/LpGfg
21. 純 CSS 動畫: https://codepen.io/TheSmallPicture/pen/RrRmZJ
22. card flip: https://codepen.io/adrianparr/pen/GqLle
23. 純 css slide show: https://codepen.io/zewbz/pen/tnfbr
24. 雪花背景: https://codepen.io/redstapler/pen/REJpxy
25. 百分比進度環: https://codepen.io/dyf234/pen/bvCBr
26. 便利貼: https://codepen.io/tutsplus/pen/dNPReW
27. css flip: https://codepen.io/miquel/pen/niyud
----

1. 震動: https://codepen.io/elrumordelaluz/pen/pHKcC
2. 牛頓圓球來回撞: https://codepen.io/AllThingsSmitty/pen/zxGyXd
3. 點點星空: https://codepen.io/hakimel/pen/bzrZGo
4. RWD: https://codepen.io/hakimel/pen/Eikbv


## 文字相關連結

1. 背景加字: https://codepen.io/fixcl/pen/CHgrn
2. 文字陰影: https://codepen.io/juanbrujo/pen/yGpAK
3. 文字輪播: https://codepen.io/yoannhel/pen/sJpDj
4. 透明文字加背景: https://codepen.io/Jintos/pen/crlxk
5. 警示閃爍: https://codepen.io/moklick/pen/tAlJB
6. 簽名效果: https://codepen.io/ghepting/pen/xnezB
7. 行星環繞效果: https://codepen.io/captainbrosset/pen/JoZabN
8. 潮流字體 + box shadow: https://codepen.io/chriseisenbraun/pen/upmDB
9. https://envato.com/blog/css3-typography-code-snippets/

## 處理 GIF 網站、GIF 素材

1. https://ezgif.com/maker
2. https://loading.io/

## 印章圖片製作 網站
1. https://nenga.yu-bin.jp/hanko/

## 圖片壓縮 網站
https://squoosh.app/

## 處理 sketch to SVG、SVG to font 的 npm 套件

1. sketch to SVG: grunt-extract-sketch-svgs / gulp-sketch
2. SVG to font: grunt-webfont / gulp-iconfont
3. sketch to SVG to font: https://github.com/cognitom/symbols-for-sketch
4. Ref: 
https://www.npmjs.com/package/grunt-extract-sketch-svgs  
https://www.npmjs.com/package/gulp-sketch  
https://www.npmjs.com/package/grunt-webfont  
https://www.npmjs.com/package/gulp-iconfont  
5. sketch to SVG 線上轉 
https://medium.com/sketch-app-sources/how-to-create-font-icons-from-a-sketch-icon-library-e94fe93ed00c
6. 教學:
https://5xruby.tw/posts/sketch-to-icon-font/  
https://wcc723.github.io/tools/2015/11/20/sketch-convert-to-web-icon-fonts/  

## 遊戲相關

1. 骰子: https://codepen.io/tameraydin/pen/CADvB?fbclid=IwAR37xYlz1XViTEKDsmOoCVZl1FzryHNm09qWD5JmTaJWrTbRAey96FbvDB4
2. 牌: https://codepen.io/frank890417/pen/bKdrPV?fbclid=IwAR3VKLeSrBP8MJ3pn2pimCUT5ojYS2AlIzYqx-UZ6m45j4V8JaFTK3fed7A

## 字體圖檔

http://www.akuziti.com/

## 範例網站

1. 卷軸播動畫: https://www.goldmansachs.com/insights/pages/blockchain/
2. 資料 + 動態視覺化 : http://www.r2d3.us/visual-intro-to-machine-learning-part-1/
3. 潮流字體 : https://webflow.com/blog/7-typography-trends-in-web-design

##  box shadow
1. 簡易調整工具: https://www.cssmatic.com/box-shadow
2. https://css-tricks.com/almanac/properties/b/box-shadow/

##  賭博遊戲素材
https://www.shutterstock.com/g/babysofja?page=4&section=1&searchterm=game&search_source=base_gallery&language=en

## JS 取消 key in 雜按鍵:
```js
var ageInput = document.getElementById("age")

ageInput.addEventListener("keydown", function(e) {
  // prevent: "e", "=", ",", "-", "."
  if ([69, 187, 188, 189, 190].includes(e.keyCode)) {
    e.preventDefault();
  }
})
```
## CSS clip:
https://www.oxxostudio.tw/articles/201503/css-clip-path.html


## breakpoint 中斷點的例子

- material design: https://material.io/archive/guidelines/layout/responsive-ui.html#responsive-ui-breakpoints
```
360 / 400 / 480 / 600 / 720 / 840 / 960 / 1024 / 1280 / 1440 / 1600 / 1920 px
```

- material ui: https://material-ui.com/zh/customization/breakpoints/

```
0px     600px    960px    1280px   1920px
```
- ant design: https://ant.design/components/layout/#components-layout-demo-side

```
{
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
}
```

