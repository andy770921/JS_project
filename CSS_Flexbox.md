# CSS Flexbox 觀念

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
2. css下，創建flex container，其下的物件會自動變成 block-level的flex item。若要inline，需要打成display: inline-flex;
```
.container {
  display: flex;
}
```
3. 定義flex container 高，定義container內元素的排列方式。 align-items: strench為預設，高度滿height設定值。flex-start;為貼齊上半、底下空間依內容高度而不滿height。flex-center; 為垂直置中，上半及下半空間，依內容高度而不滿height。若要單獨設定item，可在item-1. 下，用 align-self: 
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
4. 讓item寬度滿版，需設定flex-grow: 1;。當螢幕寬度過於壓縮時，最末元素會換行，且寬度滿版。也可用flex-grow: 2，設定單一item寬度加倍
```
.item {
  flex-grow: 1;
}
.item-3 {
  flex-grow: 2;
}
```
5. 定義item 寬度下限，用flex-basis，若小於此值，item會換行
```
.item {
  flex-grow: 1;
  flex-basis: 200px;
}
```
6. 可用flex合寫，對應到三值: flex-grow、flex-basis、flex-shrink，最後一個不常用。若沒寫，即為預設值。如下範例，意義為flex-grow為1，flex-basis為0，flex-shrink為0。若flex-basis為0，則壓縮螢幕寬度後不會換行
```
.item {
  flex: 1;
}
```

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
## 文字並列顯示綜合設定

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
