# CSS Flexbox 觀念

## Flex Box中文影片教學
1. FlexBox 軸線與水平、垂直觀念: https://www.youtube.com/watch?v=lmBM7_OTDBQ
2. FlexBox 子元件寬度(flex-grow、flex-shrink、flex-basis)觀念: https://www.youtube.com/watch?v=0QjOO-M2gs8

## 定義Flex Container

HTML:
```
<body>
	<div class="container">
		<div class="item-1 item">Item 1</div>
		<div class="item-2 item">Item 2</div>
		<div class="item-3 item">Item 3</div>
		<div class="item-4 item">Item 4</div>
		<div class="item-5 item">Item 5</div>
		<div class="item-6 item">Item 6</div>
	</div>
</body>
```

1. 在css資料夾下，創建flexbox.css
2. css下，創建flex container，其下的第一階子物件，會自動變成 block-level的flex item。若要inline，需要打成display: inline-flex;
```
.container {
  display: flex;
}
```
3. 定義flex container 高，定義container內元素的排列方式。 align-items: strench為預設，高度滿height設定值。flex-start;為貼齊上半、底下空間依內容高度而不滿height。center; 為垂直置中，上半及下半空間，依內容高度而不滿height。若要單獨設定item，可在item-1. 下，用 align-self: 
```
.container {
  display: flex;
  height: 300px;
  align-items: center;
}
```
```
.item-1 {
  align-self: flex-start;
}
```

4. 改裡面item的排列方向。如flex-direction: column;、row-reverse;。改變item 排列的起始點(從最右或最左開始)，可設定 justify-content:，flex-end 、center、space-between、space-around。 justify-content: space-between會自動將文字置左、nav bar置右
```
.container {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
}
```
5. 寬度被壓縮時，將item逐一換行，但不要改變Item長寬，用以下寫法 flex-wrap: wrap; 。
```
.container {
  display: flex;
  flex-wrap: wrap;
}
```

## 調整 Flex Item
1. 如需調整item間的空白，或是倒角，可在page.css中調整，margin: 5px; 為item間的留白 
```
.container {
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  margin: 45px auto;
  box-shadow: 0 1.5px 0 0 rgba(0,0,0,0.1);
}
.item {
  color: #fff;
  padding: 15px;
  margin: 5px;	
  background: #3db5da;
  border-radius: 3px;
}
```
2. 同一列item，區分左右區塊，如logo與nav bar，加入第一個item的 margin-right: auto;。 justify-content: space-between會自動將文字置左、nav bar置右，不用加 margin-right: auto
```
.item-1 {
  margin-right: auto;
}
```
3. 改變單一item順序，如改變 item-6順序提到最前，order值越負排越前面、越大排越後，未宣告者為0
```
.item-6 {
  order: -1;
}
```
4. 讓item寬度滿版，需設定flex-grow: 1，此時若該列有兩個以上的元素，元素寬度會被元素內容物多寡決定。當螢幕寬度過於壓縮時，最末元素會換行，且寬度滿版。也可用flex-grow: 2，設定單一item寬度加倍
```
.item {
  flex-grow: 1;
}
.item-3 {
  flex-grow: 2;
}
```
5. 定義item 寬度，用flex-basis。意義為，不論內容物多寡，設定此item起始寬度為flex-basis值，可接受px或百分比、em等單位，扣掉該列元素item起始寬度總合後，該列各元素再平分剩下的空間。若小於此值，item會換行。若兩元素相等flex-basis，則在不換行同列顯示時，會同寬度
```
.item {
  flex-grow: 1;
  flex-basis: 200px;
}
```
6. 可用flex合寫，對應到三值: flex-grow、flex-basis、flex-shrink，最後一個不常用。若沒寫，即為預設值。如下範例，意義為flex-grow為1，flex-basis為0，flex-shrink為0。若flex-basis為0，則壓縮螢幕寬度後不會換行。合寫時若省略不寫flex-basis，如flex: 1，會設定flex-basis = 0，仍會觸發該列元素等寬功用，且不論元素寬度壓縮到多少都不會換行。
```
.item {
  flex: 1;
}
```
## container設定align-items，內部元素垂直狀態會改變:
1. align-items: stretch;，預設為此值，每個內部元素的height延伸至滿寬，內部文字置上
2. align-items: flex-start;，每個內部元素的height未延伸至滿寬，僅剛好為文字寬。元素置上、內部文字無置上置下，因為元素高度剛好
3. align-items: flex-end;，每個內部元素的height未延伸至滿寬，僅剛好為文字寬。元素置下、內部文字無置上置下，因為元素高度剛好
4. align-items: center;，每個內部元素的height未延伸至滿寬，僅剛好為文字寬。元素置中、內部文字無置上置下，因為元素高度剛好
5. align-self: xxx;，可在該元素的css中編寫，改變單一元素的垂直狀態

## 水平及垂直置中
1. 方式一:
```
.container {
  justify-content: center;
  align-items: center;
}
```
2. 方式二:
```
.container {
  justify-content: center;
}
.item {
  align-self: center;
}
```
3. 方式三:
```
.item {
  margin: auto;
}
```

## - 數字 +  之按鈕設計，含水平與垂直置中
1. 需要先建一個container，讓三個元素用1:5:1的比例，不換行、滿版、垂直置中呈現在畫面
2. 需要賦予元素display: flex的特性，讓三個元素內部文字，可以水平置中(justify-content: center)。可想成是，元素內還有一個元素```<p></p>```，需要讓子元素置中，需要再加justify-content: center。但如此設定，會讓文字高度不滿版
3. HTML(文字高度不滿版):
```
<div class="container">
   <div class="minus">－</div>
   <div class="amount">2</div>
   <div class="plus">＋</div>
</div>
```
4. CSS(文字高度不滿版):
```
.container{
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.minus, .plus {
  flex: 1;
  display: flex;
  justify-content: center;
}

.amount {
  flex: 5;
  display: flex;
  justify-content: center;
}
```
5. HTML(文字高度滿版):
```
<div class="container">
    <div class="minus"><p>&#8722;</p></div>
    <div class="amount"><p>2</p></div>
    <div class="plus"><p>＋</p></div>
</div>
```
6. CSS(文字高度滿版):
```
.container{
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.minus, .plus, .amount-3x2 {
  align-items: center;
  justify-content: center;
}

.minus, .plus {
  flex: 1;
  display: flex;
}

.amount-3x2 {
  flex: 3.5;
  display: flex;
}
```
7. 使用Button的最終設定(有滿版且避免點擊出問題-div會點擊成字，不會啟動整個區塊)
8. HTML
```
<div class="container">
   <button class="sign">&#8722;</button>
   <div class="amount">2</div>
   <button class="sign">＋</button>
</div>
```
9. CSS
```
.container {
  margin-top: 30px;
  width: 100%;
  height: 44px;
  border: solid 1px #979797;
  display: flex;
  flex-wrap: nowrap;
}

.sign{
  flex: 1;
  display: flex;
  justify-content: center;
}

.amount {
  align-items: center;
  justify-content: center;
  flex: 3.5;
  display: flex;
}
```
## Navbar綜合設定

1. HTML
```
<header class="main-header">
  <h1 class="name"><a href="#">Best City Guide</a></h1>
  <ul class="main-nav">
    <li><a href="#">ice cream</a></li>
    <li><a href="#">donuts</a></li>
    <li><a href="#">tea</a></li>
    <li><a href="#">coffee</a></li>
  </ul>
</header>
```
2. 與標題不同排顯示的nav-bar CSS
```
.main-header,
.main-nav {
  display: flex;
}

.main-header {
  flex-direction: column;
  align-items: center;
}
```

3. 與標題同排顯示的nav-bar CSS
```
.main-header,
.main-nav {
  display: flex;
}

.main-header {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

```
## 文字並列、三列顯示綜合設定

1. HTML
```
  <div class="row">		
    <div class="primary col">
      <h2>Welcome!</h2>
      <p>... </p>
    </div>
		
  <div class="secondary col">
    <h2>How to get here</h2>
    <p>....</p>
  </div>
</div>
```
2. 寬度相同，並排顯示的 CSS

```
.main-header,
.main-nav,
.col {
  display: flex;
}

.main-header {
  flex-direction: row;
  justify-content: space-around;
}
.col {
  flex: 1;
}

```

3. 寬度2:1，並排顯示的 CSS
```
.main-header {
  flex-direction: row;
  justify-content: space-between;
}

.primary{
  flex: 2;
}
```
4. 兩元素寬度1:1，一元素換行的 CSS
```
.col {
  flex: 1 50%;
}

.row {
  flex-wrap: wrap;
}

```

5. 三元素寬度1:1.4:1 的 CSS，寬度1的secondary元素在最前顯示

```
.col {
  flex-basis: 0;
}

.primary {
  flex-grow: 1;
}
.secondary {
  order: -1;
}
```
## 並列子元素中的按鈕置底
```
.main-header,
.main-nav,
.row, 
.col {
  display: flex;
}
.col {
  flex: 1;
  flex-direction: column;
}
.button {
  margin-top: auto;
  align-self: flex-end;
}
```
## 黏底footer
1. HTML:
```
<body>
<div class="row">		
  <div class="primary col">
    <h2>Welcome!</h2>
    <p>Everything in this city is worth waiting in line for!</p>
  </div>
</div>
	
<footer class="main-footer">
  <div class="footer-inner">
    <span>&copy;2015 Residents of The Best City Ever.</span>
  </div>
</footer>
</body>
```
2. CSS
```
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.row {
  flex: 1;
}

```
