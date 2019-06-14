# CSS 觀念

## 參考連結
1. https://developer.mozilla.org/en-US/docs/Web/CSS   
2. https://webplatform.github.io/docs/css/
3. CSS Data Type: https://developer.mozilla.org/en-US/docs/tag/CSS%20Data%20Type

## 加入自定義CSS方式 (Author Style)
1. inline style: EX: ```<body style="background-color: orange;">```、```<h1 style="color: orange;">```
2. internal style: EX:  
```
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

## 引入外部CSS
1. 加入新檔案名style.css
2. 在HTML加入以下段落。rel=為 relationship between HTML and link document
```
  <head>
    <title>Lake Tahoe</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
```
&emsp; Note: 在index.html 同一層有個資料夾css，資料夾下有檔案style.css

## CSS中再引入另外的CSS (風格模組化)
1. 在style.css中，第一行加入如下文字，可以再引入style.css同一層中的important-style.css
```
   @import "important-style.css";
```
2. 或是直接在HTML中，加入如下```<style>```內文字
```
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
```
* {
  margin: 0;
  padding: 0;
  color: red;
}
```
2. Type selector (or element selector)，用HTML Tag 作為選擇標準。EX:
```
  header {
    background-color: orange;
  }
```
3. ID selector，前面加#，用ID作為選擇標準。一個```<div id="xxx">```中只能有一個id，一個id只能在同一HTML出現一次。EX:
```
  #specific-id {
    border: 3px solid orange;
  }
```
4. Class selector，前面加.，用Class作為選擇標準，如```<div class="xxx">```。在 React JSX中要用```<div className="xxx">```。EX:  
```
  .primary-content {
    background-color: orange;
  }
```
&emsp; Note: 若同時出現ID及Class定義同個property的CSS樣式，ID selector的優先級大於Class selector、Type selector  

5. Descendant selector。和Type selector類似，可指定到下一層HTML Tag 作為選擇標準。如，可指定到header下的span、ul下的li，EX:    
```
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
```
  .main-header span{
    color: white;
    font-size: 26px;
  }
```  
6. 較不建議用Descendant selector，若新增HTML元素時，本來不希望有樣式，但因為CSS加入Descendant selector ( 如```header span{...}```)，HTML新加入的元素(如header下新增了```<span>```)會一起套上樣式。建議直接在HTML要加入樣式的元素，加入class，如```<span class="xxx">```

7. pseudo-class，因使用者互動，而會改變特定元素的偽class。  
&emsp; "pseudo-classes can target elements dynamically based on user interaction, an element's state and more."  
  
&emsp; Ref: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes  
  
&emsp; EX: link pseudo-class: 在HTML，anchor element```<a>```下的link，點擊前、點擊中、點擊後、滑鼠滑過時的顏色設定，可在CSS打如下程式碼。  
```
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

&emsp; EX: link pseudo-class: 在HTML，anchor element```<a>```下的link，在網頁按下Tab時，連結的字會反橘底、改白字
``` 
  a:focus {
    background-color: orange;
    color: white;
  }
``` 
&emsp; EX: CSS取消a:focus的寫法，寫成:focus，效果範圍變成不限於```<a>```，HTML全域可互動的物件通用(也包含本來的```<a>```連結)
``` 
  :focus {
    background-color: orange;
    color: white;
  }
``` 
8. 可相同類別重複宣告(不同屬性)、同時宣告兩者類別。EX:  
```
  .primary-content {
    background-color: orange;
  }
  
  .primary-content,
  .secondary-content {
    width: 60%;
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

## CSS單位說明
1. px 為絕對單位。但非實體pixel之意。比如，相同螢幕長寬，硬體解析度高一倍的螢幕，同px的圖在螢幕中的長寬一樣。
2. % 為相對單位: 相對於父元素中定義的大小，要乘的比例。
3. em 為相對單位: 相對於父元素中定義的大小，要乘的值。150%=1.5em、50%=.5em
4. em會有加成影響。如body(或是body的class屬性)設定font-size: 2em、body下的h1又設定font-size: 5em，最終h1會變成10em
5. rem 為相對單位: 相對於root元素(即```<html>```元素)中定義的大小，要乘的值。不受父元素影響

## CSS顏色編碼說明
1. 常見色直接打英文字
2. RGB 16進位色碼: 如#ff0033 ，ff為R、00為G、33為B
3. RGB 16進位色碼簡寫: RGB若雙碼相同，可簡寫為單碼。如#ff0033可縮為#f03
4. RGB 函數式寫法: 如rgb(255, 169, 73)
5. RGB 函數式寫法加透明度alpha: 如rgba(255, 169, 73, .4) 或rgba(255, 169, 73, 40%)

## CSS文字樣式說明
1. text-align: center; 水平置中
2. text-transform: uppercase; 全大寫
3. text-decoration: none; 去除底線，在link常用，如下
```
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

## CSS行高設定
&emsp; 通常在```<body>```下設定
1. line-height: 1.5; 1.5倍行高，通常設1.5易於閱讀。 雖然也可用px、em等，通常用無單位的，這樣會隨著元素內font size不同而縮放變化。
2. 含行高、字體大小、字型等綜合寫法: font: normal 1em/1.5 "Helvetica Neue"，分別對應font-weight(是否粗體)、字體大小、行高、字型。字體大小、字型必須要定義。可簡略成font: 1em/1.5 "Helvetica Neue"

## CSS邊界設定
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
15. 當Width: 60%時，可以加入敘述margin: auto;，讓左、右留白平衡

## CSS Display設定
1. display: none; 不顯示，可不顯示某個區塊
2. display: block; 將原先inline顯示的(比如link)，轉為block區塊式顯示
