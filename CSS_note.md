# CSS 觀念

## 參考連結
1. https://developer.mozilla.org/en-US/docs/Web/CSS     
2. https://webplatform.github.io/docs/css/  
3. 垂直置中23種方式: http://csscoke.com/2018/08/21/css-vertical-align/  
4. 文字垂直置中2種方式: https://ithelp.ithome.com.tw/articles/10205421
5. CSS動畫相關: https://www.oxxostudio.tw/articles/201803/css-animation.html
6. CSS動畫，在JS設定重新撥放，使用網頁方法4: https://www.jianshu.com/p/4bfc167946f0
7. 展開卡片與收合卡片: https://stackoverflow.com/questions/3508605/how-can-i-transition-height-0-to-height-auto-using-css
8. table: https://ithelp.ithome.com.tw/articles/10195797
9. float: https://ithelp.ithome.com.tw/articles/10194545
10. css 渲染流程：https://cythilya.github.io/2018/07/13/critical-rendering-path/#%E6%96%B9%E6%B3%95%E4%BA%8C%E7%B0%A1%E5%8C%96-css-selector-%E7%9A%84%E8%A4%87%E9%9B%9C%E5%BA%A6
11. 打字特效 css 寫法：https://www.youtube.com/watch?v=w1nhwUGsG6M
12. 純 css 卷軸達成手動輪播效果: https://www.youtube.com/watch?v=pNPkVQD7vlM
13. loading 動畫純 css: https://css-tricks.com/single-element-loaders-the-spinner/

## Box Model & Box-sizing 面試題: 
https://medium.com/change-or-die/css-%E5%85%A5%E9%96%80%E7%AD%86%E8%A8%98-%E4%B8%80-box-model-box-sizing-56ddc49ac89e

## Functional CSS:
https://blog.techbridge.cc/2019/01/26/functional-css/  

## 不該使用 vw, vh
- https://www.youtube.com/watch?v=veEqYQlfNx8
- vw 可能造成問題 ( 橫向卷軸不預期出現 )，原因是 vw 不包括直向選軸寬度
- vh 可能造成在手機使用時，`100vh` 是不加起始畫面最上方網址列的，從網址列下方開始算高，導致底部被下方功能列擋到
- 解法一: 可用 svh 加上 fallback
```
height: 100vh;
height: 100svh;
```
- 解法二: 可用 `height: 100%` 從 html, body 開始每層都加 `height: 100%`
- 其他: `font-size` 不該用 vh, vw，非用不可的話，可用函數如 `gap: min(2rem, 5vw)`, `font-size: clamp(1rem, 5vw + .5rem, 2rem)`

## CSS 使用 var，及 `<a href="#some-position">` 平順滑動:

https://www.youtube.com/watch?v=pKO1ktPQByk

## 使用純 css 配合留言建議的 `:focus-within` 做出 dropdown:

https://www.youtube.com/watch?v=S-VeYcOCFZw

## @media (hover) { //... }

- https://youtu.be/5DEq5cWNYt8?t=2587

- 此大括號內針對 primary pointing device 才生效，比如桌機或可觸控但以滑鼠為主的筆電，如果 primary pointing device 可以 hover ( 即 device 能夠 hover ) ，`card-content` 一進入頁面就加上 `transform: translateY(-65%)`，並在卡片被 hover 到時，再用 `transform: translateY(0)` 覆寫
```css
@media (hover) {
  .card-content {
    transform: translateY(-65%);
  }
  
  .card:hover .card-content {
    transform: translateY(0);
  }
}
```

## 垂直置中與水平置中寫法:
- 說明: https://stackoverflow.com/questions/28080910/what-does-top-0-left-0-bottom-0-right-0-mean
- Outer css `position: absolute; top: 0; ...` expands the element to take parent's full width and height. If parent is a full page element the styled element will take full page.
1. HTML
```html
<body>
  <div class="outer">
    <div class="inner">
      hi
    </div>
  </div>
</body>
```
2. css
```css
.outer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.inner {
  background-color: red;
  width: 200px;
  height: 300px;
  /*  方法一 */
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /*  方法二 */
  /*   position: relative;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%); */
}

```
## position: fixed 的說明
- 是對應到 HTML viewport. Ref: https://css-tricks.com/absolute-relative-fixed-positioining-how-do-they-differ/
```
A fixed position element is positioned relative to the viewport, or the browser window itself. 
```
- 若未設定 `top: 0` 或 `left: 0` ，表現出的行為，像是 *position: static* 的位置但是附加螢幕固定效果，不受滑動卷軸影響
- 若有設定 `top: 0` 或 `left: 0` ，表現出的行為，直接對齊 `<body>` (根元素) 的左上且因 `top`, `left` 的設定而位移，且附加螢幕固定效果
- Note: 有設定 `top: 0` 或 `left: 0` 時，效果不同於 *position: absolute* ，因為 *position: absolute* 會受外層的 *position: relative* 影響，但是 *position: fixed* 不受影響 
- [demo link](https://codepen.io/yf_ashu/pen/yLeLpLp?fbclid=IwAR2SwUfP9jkS0lAeWUm1JH6C5jIHd4LT1p8xcDjtkTE1XsW5lHGTRm9zFfk)

```html
<div class="a">
	<div class="d">
		<div class="b">
		</div>
	</div>
	<div class="c">
	</div>
</div>
```
```css
.a {
	position: relative;
	width: 1000px;
	height: 500px;
	background: red;
	top: 100px;
}
.b {
	position: fixed;
	width: 200px;
	height: 200px;
	background: yellow;
/* 	top: 0; */
}
.c {
	position: absolute;
	width: 300px;
	height: 200px;
	background: blue;
}
.d {
	width: 600px;
	height: 600px;
	background: pink;
/* 	margin-top: 50px; */
}
```
- Note: 在 *position: fixed* 的內層 html element 設定 *position: absolute* 或是 *relative* 或是 *fixed*，效果一樣，都是固定在畫面
```css
.a {
	position: relative;
	width: 1000px;
	height: 800px;
	background: red;
	top: 100px;
}
.b {
	position: relative;
	/* position: absolute; */
	/* position: fixed; */
	width: 200px;
	height: 200px;
	background: grey;
}
.c {
	position: absolute;
	width: 300px;
	height: 200px;
	background: blue;
}
.d {
	position: fixed;
	width: 600px;
	height: 600px;
	background: pink;
}
```
- Note: 外層是 *position: fixed* ，內層若設定 *position: absolute* 加上 *right: 50px*，會以 fixed 為對齊對象
```css
.a {
	position: relative;
	width: 1000px;
	height: 800px;
	background: red;
	top: 50px;
}
.b {
	position: absolute;
	/* position: absolute; */
	/* position: fixed; */
	right: 50px;
  
	width: 200px;
	height: 200px;
	background: grey;
}
.c {
	position: absolute;
	width: 300px;
	height: 100px;
	background: blue;
}
.d {
	position: fixed;
	width: 300px;
	height: 300px;
	background: pink;
}
```

## position: sticky 的說明
- 實作範例與說明：https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/side-project-coscup-2019-conference-schedule-22e609b4f407
- 實際上可用在 header 或 footer: https://medium.com/@elad/css-position-sticky-how-it-really-works-54cd01dc2d46
- 不論卷軸如何捲動，最終希望 sticky element 保持的狀態，可想成將 sticky 改為 fixed 的定位情況

```css
.sticky {
  position: sticky;
  bottom: -10px;
} 
/* 可想成，不論卷軸如何捲動，最終希望保持的狀態是以下 */
.sticky {
  position: fixed;
  bottom: -10px;
} 
```
- sticky 和 fixed 差別在於，sticky 會以有設定 `overflow` 的父層對位，fixed 則是和 viewport
- 當 sticky element 未達到理想的位置 (fixed 的定位) 時，會在畫面中本來的位置，隨卷軸移動
- Note: 心中想像，若保持在本來位置，隨卷軸移動，永遠無法達到 fixed 的定位，就會是 fixed 狀態
- 實驗
```html
<dl>
  <div>
    <dt>A</dt>
    <dd>Andrew W.K.</dd>
    <dd>Apparat</dd>
    <dd>Arcade Fire</dd>
    <dd>At The Drive-In</dd>
    <dd>Aziz Ansari</dd>
  </div>
  <div>
    <dt>C</dt>
    <dd>Chromeo</dd>
    <dd>Common</dd>
    <dd>Converge</dd>
    <dd>Crystal Castles</dd>
    <dd>Cursive</dd>
  </div>
  <div>
    <dt>E</dt>
    <dd>Explosions In The Sky</dd>
  </div>
  <div>
    <dt>T</dt>
    <dd>Ted Leo &amp; The Pharmacists</dd>
    <dd>T-Pain</dd>
    <dd>Thrice</dd>
    <dd>TV On The Radio</dd>
    <dd>Two Gallants</dd>
  </div>
  <dt>G</dt>
</dl>
```

```css
* {
  box-sizing: border-box;
}
dl {
  height: 30vh;
  overflow: auto
}
dl > div {
  background: #FFF;
  padding: 24px 0 0 0;
}

dt {
  background: #B8C1C8;
  border-bottom: 1px solid #989EA4;
  border-top: 1px solid #717D85;
  color: #FFF;
  font: bold 18px/21px Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 2px 0 0 12px;
  position: -webkit-sticky;
  position: sticky;
  top: 50px;
  /* bottom: -10px; */
} 

dd {
  font: bold 20px/45px Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0 0 0 12px;
  white-space: nowrap;
}

dd + dd {
  border-top: 1px solid #CCC;
}
```
## z-index 的說明
https://andyyou.github.io/2016/03/03/z-index/
## unset 的說明
css 樣式有分  
1. 自然繼承的，如 color，自然狀態下，內層會繼承外層
2. 不繼承的，如 border，自然狀態下，只會該層有效
3. 針對 自然繼承的，color: unset 等於 color: inherit
4. 針對 不繼承的，border: unset 等於 border: initial
```html
  <div class='red'>
    <div class='u'>123</div>
  </div>
```
```css
.red {
  color: red;
}
.u {
  color: unset;
  /* 字還是紅色的 */
  /* 若希望字變黑色，要設定 color: initial */
}
```
## height: max-content 的說明
https://stackoverflow.com/questions/51285308/how-do-min-content-and-max-content-work

## height: 100%，safari 無效的說明，與四種解法
https://stackoverflow.com/questions/33636796/chrome-safari-not-filling-100-height-of-flex-parent

## 加入自定義 CSS 方式 (Author Style)
1. inline style: EX: ```<body style="background-color: orange;">```、```<h1 style="color: orange;">```
2. internal style: EX:  
```html
  <head>
    <title>Lake Tahoe</title>
    <style>
      p {
        font-size: 20px;
        font-weight: bold;
      }
    </style>
  </head>
```
&emsp; Note: 20px，數字及px之間不要加空白。20是數字單位、px是長度單位，連起來才有意義  
&emsp; Note: inline 的優先級大於internal style (inline style override internal style)  
&emsp; Note: The downside(缺點) to using this internal style sheet method on larger projects is that 
because the styles are written inside the HTML file
the browser has to download the styles each time a new page is loaded.      
  
3. external style sheet

## 引入外部 CSS
1. 加入新檔案名style.css
2. 在HTML加入以下段落。rel=為 relationship between HTML and link document
```html
  <head>
    <title>Lake Tahoe</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
```
&emsp; Note: 在index.html 同一層有個資料夾css，資料夾下有檔案style.css

## CSS 中再引入另外的 CSS (風格模組化)
1. 在style.css中，第一行加入如下文字，可以再引入style.css同一層中的important-style.css
```js
   @import "important-style.css";
```
2. 或是直接在HTML中，加入如下```<style>```內文字
```html
  <head>
    <title>Lake Tahoe</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
    @import "css/important-style.css";
    </style>
  </head>
```
## 寫CSS的方式
&emsp; 在.css檔案中編輯  
1. Universal selector，效用最強，覆蓋全HTML頁面。EX:
```css
* {
  margin: 0;
  padding: 0;
  color: red;
}
```
2. Type selector (or element selector)，用HTML Tag 作為選擇標準。EX:
```css
  header {
    background-color: orange;
  }
```
3. ID selector，前面加#，用ID作為選擇標準。一個```<div id="xxx">```中只能有一個id，一個id只能在同一HTML出現一次。EX:
```css
  #specific-id {
    border: 3px solid orange;
  }
```
4. Class selector，前面加.，用Class作為選擇標準，如```<div class="xxx">```。在 React JSX中要用```<div className="xxx">```。EX:  
```css
  .primary-content {
    background-color: orange;
  }
```
&emsp; Note: 若同時出現ID及Class定義同個property的CSS樣式，ID selector的優先級大於Class selector、Type selector  

5. Descendant selector。和Type selector類似，可指定到下一層HTML Tag 作為選擇標準。如，可指定到header下的span、ul下的li，EX:    
```css
  header span{
    color: white;
    font-size: 26px;
  }

  ul li{
    background-color: tomato;
    color: white;
    margin-bottom: 5px;
  }
```  
&emsp; 可指定到某class下的span，EX:  
```css
  .main-header span{
    color: white;
    font-size: 26px;
  }
```  
6. 較不建議用Descendant selector，若新增HTML元素時，本來不希望有樣式，但因為CSS加入Descendant selector ( 如```header span{...}```)，HTML新加入的元素(如header下新增了```<span>```)會一起套上樣式。建議直接在HTML要加入樣式的元素，加入class，如```<span class="xxx">```

7. pseudo-class，因使用者互動，而會改變特定元素的偽class。  
&emsp; "pseudo-classes can target elements dynamically based on user interaction, an element's state and more."  
  
&emsp; Ref: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes  
&emsp; Ref: https://stringpiggy.hpd.io/pseudo-element-pseudo-class-difference/  
&emsp; EX: link pseudo-class: 在HTML，anchor element```<a>```下的link，點擊前、點擊中、點擊後、滑鼠滑過時的顏色設定，可在CSS打如下程式碼。  
```css
  a:link {
    color: orange;
  }
  a:active {
    color: lightcoral;
  }
  a:visited {
    color: lightblue;
  }
  a:hover {
    color: forestgreen;
  }

``` 

&emsp; EX: link pseudo-class: 在HTML，anchor element```<a>```下的link，在網頁按下Tab時，連結的字會反橘底、改白字。點擊輸入文字區塊時，區塊底下出現顏色底線
```css
  a:focus {
    background-color: orange;
    color: white;
  }
  input:focus,
  textarea:focus {
    border-color: orange;
  }
``` 
&emsp; EX: CSS取消a:focus的寫法，寫成:focus，效果範圍變成不限於```<a>```，HTML全域可互動的物件通用(也包含本來的```<a>```連結)
```css
  :focus {
    background-color: orange;
    color: white;
  }
``` 
&emsp; li:last-child、:first-child、:only-child、:empty   EX: 
``` css
  li:last-child {
    border: none;
  }
``` 
&emsp; input:disabled 選擇在disable狀態的元素，若刻意需要disable元素，需在HTML加入disabled如```<input class="xxx" disabled>```，之後會取消點擊或輸入功能   EX: 
```css
  input:disabled {
    background: #ddd;
  }
``` 
&emsp; :checked，勾選方框點擊後，出現樣式變化   EX: 
```css
  input[type="checkbox"]:checked + label {
    font-weight: bold;
  }
``` 
&emsp; :nth-child(even)、:nth-child(odd)、:nth-child(3)、:nth-child(2n+3)、:nth-child(-n+3)、div:nth-of-type(4) 
&emsp; :root、:target
&emsp; :not() 可跳過第一個元素，加上後面元素的左邊margin  EX: 
```css
  .col:not(:first-child:) {
    margin-left: 15px;
  }
``` 

8. 可相同類別重複宣告(不同屬性)、同時宣告兩者類別。EX:  
```css
  .primary-content {
    background-color: orange;
  }
  
  .primary-content,
  .secondary-content {
    width: 60%;
  }
  
```
9. Attribute selector、begin-with attribute selector(搜尋起始文字的，加^)、end-with attribute selector(搜尋結尾文字的，加$)、contained attribute selector(搜尋所有內文的，加*)，Ex:
```css
  [class] {
    color: red;
  }
  input[type="text"] {
    font-size: 26px;
  }
  input[placeholder] {
    max-width: 500px;
    margin: auto;
  }
  a[href^="http://"] {
    color: orange;
    text-decoration: none;
  }
  a[href$=".pdf"] {
    background-image: url('../img/icn-pdf.svg');
  }
```  
10. Attribute selector配cursor如下，另外一個方法為再創一個addCursor class並指定HTML的Class
```css
  input[type="button"],
  input[type="reset"],
  input[type="submit"] {
    cursor: pointer;
  }
  input[placeholder] {
    max-width: 500px;
    margin: auto;
  }
```  
11. Child (>), Adjacent Sibling (+), and General Sibling (~) Combinators: 
Adjacent Sibling意義為，當兩個鄰接出現時，要在加號後者的元素，加些甚麼特性。General Sibling不常用
```css
  form > a {
    font-size: .7em;
  }
  .btn + .btn {
    margin-left: 20px;
  }
``` 
12. pseudo-element，偽element，直接在元素內部份元素，實現樣式效果，讓原始HTML更乾淨。標準上要用雙冒號，與pseudo-class區分，但瀏覽器執行上兩者都可以接受
```css
  .intro::first-line {
    font-size: 1.4em;
    font-weight: bold;
  }
  .intro::first-letter {
    float: left;
    font-size: 80px;
    color: white;
    background-color: #384047;
    padding: 5px 10px;
    margin: 10px 10px 0 0;
    border-radius: 5px;
    line-height: 1;
  }
``` 
13. 用::before、::after，生成某些內容，在指定的元素前or後。content後可接著用attr函數，調出HTML該元素的attribite。實際上創建出來的內容，可視為原本元素的child，在原本元素位置之前or之後
```css
  .jpg::before {
    content: "JPG - ";
    font-size: .75em;
  }
  .zip::before {
    content: url(../img/icn-picture.svg);
    margin-right: 8px;
  }
  .d-loads a::after {
    content: attr(title);
    display: inline-block;
    color: initial;
    font-size: .65em;
    margin-left: 5px;
  }
``` 

## CSS的註解寫法
1. ```/*  xxxx  */ ```
2. 可在CSS加入註解如```/*  Type selector  */ ```、```/*  ID selector  */ ```，助於CSS閱讀
3. 可反白要註解的區段，按ctrl + /

## 瀏覽器快取(緩存)觀念補充

1. https://blog.techbridge.cc/2017/06/17/cache-introduction/  
2. https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=zh-tw  
&emsp; external style sheet優點: The style are cached by the browser after the first request  
&emsp; Q: internal styles在大型專案的缺點是啥  
&emsp; A: 1. 載入新html頁面每次都要讀取一次浪費資源 2. 開啟多頁時，花時間重複載入相同的style  

## CSS 單位說明
1. px 為絕對單位。但非實體pixel之意。比如，相同螢幕長寬，硬體解析度高一倍的螢幕，同px的圖在螢幕中的長寬一樣。
2. % 為相對單位: 相對於父元素中定義的大小，要乘的比例。
3. em 為相對單位: 相對於父元素中定義的大小，要乘的值。150%=1.5em、50%=.5em
4. em會有加成影響。如body(或是body的class屬性)設定font-size: 2em、body下的h1又設定font-size: 5em，最終h1會變成10em
5. rem 為相對單位: 相對於root元素(即```<html>```元素)中定義的大小，要乘的值。不受父元素影響

## CSS 顏色編碼說明
1. 常見色直接打英文字
2. RGB 16進位色碼: 如#ff0033 ，ff為R、00為G、33為B
3. RGB 16進位色碼簡寫: RGB若雙碼相同，可簡寫為單碼。如#ff0033可縮為#f03
4. RGB 函數式寫法: 如rgb(255, 169, 73)
5. RGB 函數式寫法加透明度alpha: 如rgba(255, 169, 73, .4) 或rgba(255, 169, 73, 40%)

## CSS 文字樣式說明
1. text-align: center; 水平置中
2. text-transform: uppercase; 全大寫
3. text-decoration: none; 去除底線，在link常用，如下
```css
  a:link {
    color: orange;
    text-decoration: none;
  }
```
4. font-weight: bold; 粗體、font-weight: normal; 將h1-6字體恢復正常、font-weight: 100;、font-weight: 900; 可輸入100~900中的值
5. font-family: sans-serif; 設定字型
6. font-family: Helvetica, Arial, sans-serif, "Helvetica Neue"; 若使用者電腦優先灌有字型Helvetica則優先使用，若沒有，依序搜尋後面的字型，並使用之。雙字的字型要加雙引號
&emsp; 字型Ref: https://www.cssfontstack.com/
6. font-style: italic; 斜體、font-style: oblique; 字型常不支援、font-style: normal; 
7. letter-spacing: .065em;，可設定字元間距
8. 在css引入需要的字型(如Abolition Regular)，可新建一個字體資料夾font將相關字型檔案放入，與css資料夾平行，並在css開頭設定如下
```css
  @font-face {
    font-family: "Abolition Regular";
    ....貼上字體文件夾中的snippet.css，預設的url;
  }
```
9.  文字顏色，直接用color: red; 設定即可

## CSS 行高設定
&emsp; 通常在```<body>```下設定
1. line-height: 1.5; 1.5倍行高，通常設1.5易於閱讀。 雖然也可用px、em等，通常用無單位的，這樣會隨著元素內font size不同而縮放變化。
2. 含行高、字體大小、字型等綜合寫法: font: normal 1em/1.5 "Helvetica Neue"，分別對應font-weight(是否粗體)、字體大小、行高、字型。字體大小、字型必須要定義。可簡略成font: 1em/1.5 "Helvetica Neue"

## CSS 邊界設定
1. padding: 若文字有設定背景顏色，此顏色會延伸出去。分padding-top、padding-bottom、padding-right、padding-left
2. padding: 單一值; 四邊都一樣。如 padding: 100px;
3. padding: 第一值 第二值; 第一值設定上下，第二值設定左右。如 padding: 100px 120px;
4. padding: 第一值 第二值 第三值; 第一值設定上，第二值設定左右，第三值設定下。如 padding: 100px 120px 140px;
5. padding: 第一值 第二值 第三值 第四值; 分別設定上、右、下、左。
6. padding: 18% 24%; 百分比意為，上下寬度佔container的百分之18、左右寬度佔container的百分之24。
7. border-width: 10px; 也可設thin、medium、thick。也可設定兩值，第一值為上下、第二值為左右
8. border-style: solid; 也可設dashed、dotted。也可設定兩文字，第一文字為上下、第二文字為左右
9. border-color: orange; 也可設定兩色，第一色為上下、第二色為左右。若無設定顏色，會自動使用該區塊內的文字顏色，作為預設值
10. border: 10px solid orange; 分別設定width、style、color
11. 可寫完border: ....; 再將需要特別改的，獨立寫，獨立寫的會override過去。如，加入border-bottom-style: dashed; 可將底部樣式變更，其他維持原border:設定
13. margin: ...; 設定原則同padding、border，會空白延伸出去一段空間。...也可設定負的px，會吃掉該區塊外的其他文字
14. margin-bottom: .5em; 若要用em設定，需要將欲設定的px，除以該區塊內字體大小的px
15. 當Width: 60%時，可以加入敘述margin: auto;，讓左、右留白平衡，上下也留白平衡
16. 若設定width: 或height:，除此值外要加上padding才是總高度
17. 若設定width: 或height:，且希望總高度就是這樣，必須加入box-sizing: border-box;，如下
```css
  .primary content {
    width: 960px;
    box-sizing: border-box;
    padding-left: 50px;
    padding-right: 50px;
    margin: auto;
  }
```

## CSS Display 設定
1. display: none; 不顯示，可不顯示某個區塊
2. display: block; 將原先inline顯示的(比如link)，轉為block區塊式顯示
3. display: inline; 將原先block顯示的(比如li)，轉為inline顯示。inline不能用margin(用margin無效)
```css
  li {
    display: inline;
    padding: 0 12px;
  }
```
4. display: inline-block; 將原先block顯示的(比如li)，轉為inline顯示。可用margin
5. 設定超連結之綜合範例
```css
  .callout {
    display: inline-block;
    font-size: 1.25em
    border-bottom: 3px solid;
    padding: 0 9px 3px;
    margin-top: 20px;
  }
```
## CSS img 設定
1. img加入max-width: 100%; 可讓圖片隨視窗大小縮放。若寫max-width: 900px; 意為縮放到寬度900px後，就不會再大
```css
  img {
    max-width: 100%;
  }
```
2. 設定背景圖片，及大小，可如下寫。寫相對路徑，起始位置要從css檔案位置出發推算路徑，不是從html檔案出發。

3. 大小設定百分比，若過小會重複出現，填滿畫面，要再設定background-repeat: ;
```css
.main-header {
    background-color: #ffa949;
    background-image: url("../img/mountains.jpg");
    background-size: 40%;
    background-repeat: no-repeat;
  }
```
4. 大小設定cover，可自動調整大小至塞進container
```css
.main-header {
    background-color: #ffa949;
    background-image: url("../img/mountains.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
```
5. background-repeat: repeat-x; 只有x方向重複出現，y同理。background-repeat: no-repeat; 不重複出現
6. background-position: center top; 背景圖左右置中、上下置上，若四方置中可寫成 background-position: center;
7. 也可設定位置百分比如 background-position: 20% 50%; 
8. 綜合寫如下，分別為顏色、檔案路徑、是否重複、位置、/尺寸。或是顏色、檔案路徑、是否重複、位置，尺寸再加一行background-size: cover;
```css
.main-header {
    padding-top: 170px;
    height: 850px;
    background: #ffa949 url("../img/mountains.jpg") no-repeat center /cover;
  }
```
## 設定 div 並排
1. 先在```<html>```希望並排的兩個```<div>```分別加入class="tips"、class="resorts"
2. 進行如下設定，引入float: ;，完畢後，可能會出現以下問題: a. footer文字飄到兩圖中間空白 b. 父元素設定的height 崩潰
```css
.tips, 
   .resorts {
    width: 46.5%;
  }
  .tips {
    float: right;
  }
  .resorts {
    float: left;
  }
```
3. 修正父元素設定的height 崩潰，可在父元素的css class說明內，加入overflow: auto;，此法缺點a.不同瀏覽器，可能出現非預期的下拉捲軸 b.可能截到content
```css
  .secondary-content {
    padding-top: 80px;
    padding-bottom: 70px;
    border-bottom: 2px solid #dfe2e6;
    overflow: auto;
  }
```
4. [推薦] 修正父元素設定的height 崩潰，可在css，加入.group的說明如下，專門設定clearfix，然後再在```<html>```中的父元素```<div>```加入class="group"
```css
  .group:after {
    content: "";
    display: table;
    clear: both;
  }
```
## 改變 list 前綴符號
1. 在css加入如下，也可取消前綴符號，打為list-style-type: none;
```css
  ul {
    list-style-type: square;
  }
```
2. 在css加入如下，也可編號01 02等
```css
  ol {
    list-style-type: decimal-leading-zero;
  }
```
3. 在css加入如下，可將編號或前綴符號，納入content，並設定最左留白的寬度為0。可順便設定上下margin，將margin-left: 0; 改寫成margin-left: 30px 0;
```css
  ul,
  ol {
    list-style-position: inside;
    padding-left: 0;
    margin-left: 0;
  }
```
4. 在css加入如下，可設定行距
```css
li {
    margin-bottom: 10px;
  }
```
## CSS 文字及區塊修飾
1. 加入文字陰影 text-shadow: 5px 8px 10px #222; 數值分別對應往右長度、往下長度、邊緣模糊程度(模糊半徑)、陰影顏色
2. 加入區塊陰影 box-shadow: 5px 8px 10px #222; 數值意義同上。也可引入第五個參數擴散(spread)半徑，在第四個值，讓四邊都有陰影，也可設定負值創造圖案四週邊緣柔合效果，加入spread設定20px，如box-shadow: 15px 15px 10px 20px #222;
3. 創造圖案四週邊緣柔合效果，可設定如下 box-shadow: inset 0px 0px 50px 10px #222;，inset為向圖的padding內延伸
4. 如要設定多層，需要用逗號間隔如下
```css
.main-header{
  box-shadow: 0px 2px 15px #aaa,
              inset 0px 0px 60px 5px firebrick;
}
```
5. 區塊四邊倒角設定如下，若設定border-radius: 50%; 為圓形效果、border-radius: 100% 25px; 為45度角眼睛形狀效果
```css
.box {
  border-top-left-radius: 20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 10px; 
}
.box {
  border-radius: 20px 10px 20px 10px;
.box {
  border-radius: 20px 10px;
}
.box {
  border-radius: 20px;
}
```
6. 設定雙色漸層，使用函數linear-gradient(to right, steelblue, darkslateblue);或radial-gradient(); 如下
```css
.main-header{
  background-image: radial-gradient(circle at top right, #ffa949, firebrick);
}
```
7. 設定三色漸層，及顏色停止位置，要加上百分比，使用函數radial-gradient(); 如下
```css
.main-header{
  background-image: radial-gradient(circle at top right, #ffa949 0%, firebrick 20%, dodgerblue 120%);
}
```
8. 在背景圖設定透明漸層，如下。有圖層之概念，逗號前的是最上層，漸層要加在此。設定透明90%，意為到寬度90%處，之後就沒有任何漸層，第一層圖層結束
```css
.main-header{
  background: 
    linear-gradient(#ffa949, transparent 90%);
    #ffa949 url("../img/mountains.jpg") no-repeat center;
}
```
## 不同視窗大小/平台，響應式顯示 - media query

1. 在css檔案，打如下code，可讓螢幕或視窗寬度小於等於960px時，顯示藍底白字。括號內會判斷true或false，若true則會引入其下的css
```css
@ media (max-width: 960px) {
  body{
    background: blue;
  }
p{
    color: white;
  }
}
```
2. 若需設定，螢幕或視窗寬度為一範圍時，引入css，可如下設定
```css
@ media (min-width: 481px) and (max-width: 700px) {
  body{
    background: green;
  }
p{
    color: white;
  }
}
```
3. 實用上，若視窗縮小到一定程度(比如小於等於1024px)，要減少最左、最右之留白，可設定如下
```css
@ media (max-width: 1024px) {
  .primary-content,
  .secondary-content{
    width: 90%;
  }
}
```
4. 若視窗再縮小到一定程度(比如小於等於768px)，要減少padding、取消border，可設定如下
```css
@ media (max-width: 768px) {
  .primary-content,
  .secondary-content{
    width: 100%;
    padding: 20px;
    border: none;
  }
}
```
5. 在寬度限制的基礎下，再設定高度及字體大小相關的css、取消並排的css，可設定如下
```css
@ media (max-width: 768px) {
  .primary-content,
  .secondary-content{
    width: 100%;
    padding: 20px;
    border: none;
  }
  .main-header{
    max-height: 380px;
    padding: 50px 25px 0;
  }
  .title{
     font-size: 1.3rem;
     border: none;
   }
   h1{
     font-size: 5rem;
     line-height: 1.1;
   }
   .arror{
     display: none;
   }
   .tips, 
   .resorts {
    float: none;
    width: 100%;
  }
}
```
6. 記得在```<html>```的```<head>```下，加入使用不同電子產品的寬度設定code，如下
```html
  <meta name="viewport" content="width=device-width">
```
7. 手機可能轉成橫向使用(landscape)，可加入設定orientation: landscape，如下範例。逗號意為，當A或B其中一者為真，就觸發大括號內CSS效果。A為only screen and (min-width: 768px)。B為only screen and (min-width: 700px) and (orientation: landscape)
```css
@media only screen and (min-width: 768px),
         only screen and (min-width: 700px) and (orientation: landscape) {
  
    .title {
      float: left;
      font-size: 1.4em;
    }
  }
```
8. 考慮 Android devive 跨裝置兼容， 可用 `min-aspect-ratio: 13/9` 取代 `orientation: landscape`
```css
// it's an alternative of (orientation: landscape) for Android devive
// Android devive will change orientation while keyboard popup 
// ref: https://stackoverflow.com/questions/8883163/css-media-query-soft-keyboard-breaks-css-orientation-rules-alternative-solut/13686041

@media only screen and (max-width: 815px) and (min-aspect-ratio: 13/9) {
    .title {
      float: left;
      font-size: 1.4em;
    }
};  
```
## CSS 補充
1. Cascade(串聯)意思是，當在不同selector重複宣告同一物如color:等特性時，會依優先順序，串列處理，最終決定一個最重要的套用進頁面。避免重複宣告的衝突
2. "最重要"與否的判斷原則: 重要性、特別程度、來源順序
3. 重要性排序: Author styles 大於 User styles 及 User Agent styles(瀏覽器預設的CSS，不同瀏覽器會預設的不太一樣)
4. 若都來自於同重要的CSS(比如都是Author自訂的CSS)，特別程度排序: id selector 大於 class selector 大於 type selector
5. 若都來自於相同的特別程度(比如都是同id selector下的CSS)，來源排序: 後面行數的，會複寫前面行數的
6. HTML中的inline style: EX: ```<body style="background-color: orange;">```，優先序大於external style sheet
7. 繼承: 子元素的特性(property)，比如color:，若無特別宣告，會繼承父元素。若要取消繼承，可加入color: initial;之字樣，回到原始設定值

## position: 說明

1. 若無另外指定其他class為position: relative，則absolute的元素，會被抽離出原先的block，以獨立的圖層，配置在頁面上。上下左右距離，相對於視窗邊界  
HTML:
```html
<header class="main-header">
  <ul class="main-nav">
    <li class="ice-cream"><a href="#">ice cream</a></li>
    <li><a href="#">donuts</a></li>
    <li class="tea"><a href="#">tea</a></li>
    <li><a href="#">coffee</a></li>
  </ul>
</header>
```
&emsp; CSS:
```css
.ice-cream {
  position: absolute;
  top: 100px;
  left: 50px;
}

.tea {
  position: absolute;
  right: 6em;
  bottom: 50%;
}
```
2. 若碰到第一個父元素的class為position: relative，則absolute的元素，會相對於class元素的邊界，設定上下左右距離，如下例，ice-cream及tea的位置相對於```<ul class="main-nav">```配置  
CSS:
```css
.main-nav {
  position: relative;
}
.ice-cream {
  position: absolute;
  top: 100px;
  left: 50px;
}

.tea {
  position: absolute;
  right: 6em;
  bottom: 50%;
}
```
3. position: fixed; 為凍結窗格。可讓nav bar總是置頂，不論卷軸是否下拉。上下左右位置，總是相對於視窗邊界。須調整body上方padding，避免凍結窗格擋到header內容。須加入z-index: 1;，越大圖層優先度越大，未設定者為0，設定1，圖層可壓過所有未設定者。
```css
.body {
  padding-top: 68px;
}
.main-header {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 1;
}
```
4. z-index:可處理所有position圖層的先後

## 開始實作 CSS Layout 流程
1. 不同瀏覽器，會有預設的字體大小與邊界寬等，先消除之，避免不同瀏覽器影響自己的網頁。複製normalize.css檔案(或code)，到css資料夾下  
&emsp; normalize.css Ref:https://necolas.github.io/normalize.css/
2. 在index.html的```<head>```下，引入normalize.css，如下
```html
    <link rel="stylesheet" href="css/normalize.css">
```
3. 設定style.css，可能需要加入index.html中的```<div class="xx">```調整樣式。比如，希望上header滿版且左右留有背景色，要在html加如下
```css
    <header class="main-header">
        <div class="container">
		......
        </div>
    </header>
```
&emsp; 要在css加如下。外層設定顏色、內層設定margin: 0 auto;置中，才能顏色滿版
```css
.main-header {
  background: #3acec2;
  margin-bottom: 30px;
}
.container {
  width: 70%;
  margin: 0 auto;
}
```
4. 修正最上方不滿版問題: collapsing margin，即標題(h1)字的margin超過了標題的content。由於h1與body中間沒有其他物件，h1的margin上緣與body的上緣貼齊  
  解法一: 修正h1的上margin  
```css
  h1 {
  top-margin: 0;
  }
```  
&emsp;&ensp;   解法二: 修正main-header clsss的上padding
```css
  .main-header {
  background: #3acec2;
  padding: 1em 0;
  }
```
5. 可先做出小螢幕的layout，single-block content(各區塊接續往下排列)較簡單，code不複雜，之後再@media 加入breakpoint做大螢幕的layout。(mobile-first layout)  
小螢幕如下
```css
.container {
    padding-left: 1em;
    padding-right: 1em;
    margin: 0 auto;
}
```
&emsp; 大螢幕@media 如下
```css
@media (min-width: 769px) {
  .container {
    width: 70%;
    margin: 0 auto;
    max-width: 1000px;
  }
}
```
6. 加入box-sizing: border-box;全域宣告，避免layout總長寬，再加上padding，而超乎自己預期
```css
  * {
    box-sizing: border-box;
  } 
```
7. 將footer置底，避免下緣留白。留白之原因: 中央內文較短，比瀏覽器視窗的高度還短，內文後馬上接到footer，導致footer未貼底。解法: 設定內文寬度一定大於螢幕高度，設定法如下，先在Html設定新class，包住body除了footer以外的部分:
```css
  <div class="wrap">
    <header class="main-header">
    </header>
    <section>
    </section>
  </div>
```
&emsp; 再設定css如下。100vh意為100% viewport height，89px為footer高度，扣掉後才不會高度過高出現下拉捲軸
```css
  .wrap {
    min-height: calc(100vh - 89px);
  }
```
8. 調整nav bar，設定如下
display: block;可讓整個content都可點擊
```css
  .name a,
  .main-nav a {
    padding: 10px 15px;
    display: block;
}
```
&emsp; display: inline-block; 可避免nav bar換行
```css
  .name,
  .main-nav,
  .main-nav li{
    display: inline-block;
  }
```
9. 去除inline-block或是inline之間的空白，空白起因為，瀏覽器判斷此物件為文字，文字之間會有預設空白。解法一: 改寫html的li寫法。解法二: css加入負margin
```css
.main-nav li {    
  margin-right: -4px;
}
```
10. 雙colomn顯示法-1:  
HTML:
```html
<div class="container">	
  <div class="primary col">
  </div>		
  <div class="secondary col">
  </div>	
</div>
```
&emsp; CSS:
```css
.col {    
  display: inline-block;
  width: 50%; 
  margin-right: -4px;
  vertical-align: top;
  padding-left: 1em;
  padding-right: 1em;
}
```
11. float之使用- 圖片在左、文字在右，希望留圖及文字之間的空白，不能直接加文字的margin-right，如此這般無法拉大圖文間的空間，會拉大視窗邊界與文字邊界。正解: 要增加圖的margin-right  
12. float之使用2- 標題在左、Nav. Bar在右，若float設定一左、一右，會導致上方顏色高度崩潰。  
解法一:在有顏色的部份(main-header)加入overflow: hidden;或overflow: auto;，但可能會有藏到不該藏的內容，或是出現非預期下拉捲軸之問題
```css
.main-header {
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  background: #3acec2;
  margin-bottom: 30px;
  overflow: hidden;
}
.main-nav {
  float: right;
}

.main-nav li {
  float: left;
  margin-left: 12px;
}

.name {
  float: left;
}
```
&emsp; 解法二: 在html與container同層的 class，加入```<div class="container clearfix">```，並將clearfix補進css
```css
.clearfix::after {
    content: "";
    display: table;
    clear: both;
  }
```
&emsp; 解法三: 開發者再不用使用 clearfix 這種取巧（ CSS-hack ）的方法了，因為我們可以直接在承載 float 元素的容器中（ .container ）採用 display:flow-root，效果跟 clearfix 一樣但更簡單。  
13. 雙colomn顯示法-2:  
&emsp; HTML:  
```html
<div class="container clearfix">	
  <div class="secondary col">
  </div>			
  <div class="primary col">
  </div>	
</div>
```
&emsp; CSS:
```css
.col {    
  float: left;
  padding-left: 1em;
  padding-right: 1em;
}
.primary { 
  width: 60%; 
}
.secondary { 
  width: 40%; 
}
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
```

## 文字過長換行
- Ref: https://shubo.io/word-wrap-vs-word-break/
- `word-break: break-all` 容易讓過多的英文單詞斷在中間，造成閱讀不適。
- `overflow-wrap` 屬性的作用是告訴瀏覽器，如果詞斷行後的結果還是會溢出容器元素，該如何處理。
- `word-wrap` 就是 `overflow-wrap` 的別名。
- 結論 : 用以下的設定，就可以讓連結或是長文字不會造成跑版 

```css
overflow-wrap: break-word;
```
## text-overflow 設定 - 文字過長，最後出現點點點:

1. 需要同時設定 ```overflow, width (or max-width), display, and white-space```  
Ref: https://stackoverflow.com/questions/7993067/text-overflow-ellipsis-not-working  
```css
span {
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100px;
    display: block;
    overflow: hidden
}
```

2. 若多行，要使用非標準屬性如下
```css
span {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /*
  
  break: break-word;
  line-height: 33px;
  */
}
```
## 客製 css 卷軸:
```css
.list-content {
   height: 100%;
   overflow-y: auto;

   &::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 11px;
      height: 11px;
    }
    &::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      border: 2px solid #f1f1f1;
      border-radius: 8px;
      background-color: #bbb;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #888;
    }
}
```
## 跨裝置 css 滿頁面調整:

1. body `position: relative` 拿掉，因為如果 body 內元件下 `position: absolute`，若找不到上層的 position: relative，就會以 body 為對齊的父元素
2. `position: fixed` 或 `position: absolute` 的情況要記得加 `padding-bottom: calc(原本預設 padding + env(safe-area-inset-bottom));`
3. `position: fixed, top: 0, bottom: 0; right: 0, left: 0`
4. Ref: https://buy.line.me/

## margin collapse:

- ref: https://www.w3.org/TR/css-flexbox-1/#flex-containers
- 元素只有分 block-level 和 inline-level
- margin collapse 只發生在 block-level 的元素
- display 設定可影響是什麼 level
- `display: flex` 會將元素轉成 `block-level`
- `display: inline-block` 及 `display: inline-flex` 會將元素轉成 `inline-level`
 
HTML:  
```html
<body>	
  <div class='a'>a
  </div>
  <div class='b'>b
  </div>	
</body>
```
CSS:  
&emsp; 實驗 1 ( 以下有 margin collapse ):
```css
.a {
  width: 100%;
  display: flex;
  margin-bottom: 100px;
  background-color: red;
}

.b {
  width: 100%;
  display: flex;
  margin-top: 100px;
  background-color: blue;
}
```
&emsp; 實驗 2 ( 以下無 margin collapse ):
```css
.a {
  width: 100%;
  display: inline-block;
  margin-bottom: 100px;
  background-color: red;
}

.b {
  width: 100%;
  display: inline-block;
  margin-top: 100px;
  background-color: blue;
}
```

## div 預設的 width 是 -webkit-fill-available;
- Ref: https://www.cnblogs.com/xiaohuochai/p/7210540.html
- 若要 `<div>` 改寫成 `<button>`，需要在 button 加入兩項 css 設定
```css
    width: -webkit-fill-available;
    display: block;
```
- 相關設定加完後如下，但缺點是 `-webkit-fill-available` 會[不兼容 IE 及 Edge](https://stackoverflow.com/questions/62299546/how-to-use-webkit-fill-available-on-edge-and-ie11)，在 2020/6 仍不兼容
```css
    width: -webkit-fill-available;
    width: -moz-available;
    width: stretch;
```
- 解法是較大幅度改動 css ，元素本身使用加 `padding` 方式，排版不一處，調整父層 `margin`

- 前綴補充
```
這些瀏覽器引擎前綴(Vendor Prefix)主要是各種瀏覽器用來試驗或測試新出現的CSS3屬性特徵。可以總結為以下 3 點：
1. 試驗一些還未成為標準的的CSS屬性——也許永遠不會成為標準
2. 對新出現的標準的 CSS3 屬性特徵做實驗性的實現
3. 對 CSS3 中一些新屬性做等效語義的個性實現

這些前綴並非所有都是需要的，但通常你加上這些前綴不會有任何害處 ——— 只要記住一條，把不帶前綴的版本放到最後一行：
-moz-border-radius: 10px;
-webkit-border-radius: 10px;
-o-border-radius: 10px;
border-radius: 10px;
```
## height: 0 配合 padding-bottom 做出等比例縮放:

https://stackoverflow.com/questions/35814653/automatic-height-when-embedding-a-youtube-video

## 取消 input 元素的 autofill:
1. Ref: https://stackoverflow.com/questions/2781549/removing-input-background-colour-for-chrome-autocomplete
2. 方法一：取消背景 = 背景變成透明
```css
input:-webkit-autofill {
    background-clip: text;
     -webkit-background-clip: text;
}
```
3. 方法二：透過 `box-shadow` 覆蓋背景設定成白色（無法透明）
```css
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active
{
 -webkit-box-shadow: 0 0 0 30px white inset !important;
}
```
## 修正 input 元素在 safari ios 的 disable 樣式:
- https://codepen.io/mr72/pen/BadbarJ

## css var 和主題:
- https://zpl.io/aRk0OMN
- https://zpl.io/awlxKqn

## 面試實作題:
1. 設計動畫，紅圓形在畫面右上，移到中間，再上下晃動
- `animation: name | duration | timing-function | delay | iteration-count | direction | fill-mode | play-state;`
- ex: `animation: 0.5s centerBall, 0.1s 0.5s infinite alternate bumpBall;` 
1. 播放 centerBall 名稱的動畫持續 0.5 秒，(預設) 播放 1 次
2. 再播放 bumpBall 名稱的動畫持續 0.1 秒，延時 0.5 秒後開始播放，無限重複，正反轉輪流播放，奇數次為 0% 到 100%，偶數次為 100% 到 0%
- ex: `animation: move 2s infinite;`
```css
@keyframes move {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  50% {
    transform: translate3d(200px, 0, 0) rotate(360deg);
  }
  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
}
```
- Ref: https://developer.mozilla.org/en-US/docs/Web/CSS/animation
- Ans:
```html
<body>
  <div class="ball"></div>
</body>
```
```css
.ball {
  background-color: red;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  animation: 5s move-to-center, 1s 5s infinite alternate vibrate;
}
@keyframes move-to-center{
  0% {
      top: 0;
      right: 0;
  }
  90% {
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
  }
  100% {
      transform: translate(50%, -70%);
  }
}

@keyframes vibrate {
  from {
    transform: translate(50%, -70%);
  }
  to {
    transform: translate(50%, -30%);
  }
}
```
Ans 2:
```css
.ball {
  width: 100px;
  height: 100px;
  background-color: red;
  border-radius: 50px;
  position: absolute;
  top: 0px;
  right: 0px;
  animation: 0.5s centerBall, 0.1s 0.5s infinite alternate bumpBall;
}

:root {
  --center-x: calc(-50vw + 50px);
  --center-y: calc(50vh - 50px);
  --ball-up: calc(49vh - 50px);
  --ball-down: calc(51vh - 50px);
}

@keyframes centerBall{
  from {
    transform: translate(0px, 0px);
  }
  to {
    transform: translate(var(--center-x), var(--center-y));
  }
}

@keyframes bumpBall {
  from {
    transform: translate(var(--center-x), var(--ball-up));
  }
  to{
    transform: translate(var(--center-x), var(--ball-down));
  }
}
```
- Ans 3:
```css
.ball {
  background-color: red;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 50px);
  right: calc(50% - 50px);
  animation: 0.5s move-to-center, 0.1s 0.5s infinite alternate bumpBall;
}
@keyframes move-to-center{
  from {
    top: 0;
    right: 0;
  }
  to {
    top: calc(50% - 50px);
    right: calc(50% - 50px);
  }
}

@keyframes bumpBall {
  from {
    transform: translateY(-10px);
  }
  to{
    transform: translateY(10px);
  }
}
```
