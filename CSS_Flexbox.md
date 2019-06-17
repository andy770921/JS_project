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
3. 定義flex container 寬高
```
.container {
  display: flex;
  height: 300px;
}
```
4. 改裡面item的排列方向。如flex-direction: column;、row-reverse;。改變item 排列的起始點(從最右或最左開始)，可設定 justify-content:，flex-end 、center、space-between、space-around
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
6. 如需調整item間的空白，或是倒角，可在page.css中調整，	margin: 5px; 為item間的留白 
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
7. 同一列item，區分左右區塊，如logo與nav bar，加入第一個item的 margin-right: auto;
```
.item-1 {
  color: #fff;
  padding: 15px;
  margin: 5px;	
  background: #3db5da;
  border-radius: 3px;
}
```
8. 改變單一item順序，如改變 item-6順序提到最前，order值越負排越前面、越大排越後，未宣告者為0
```
.item-6 {
  order: -1;
}
```
9. 讓item寬度滿版，需設定flex-grow: 1;。當螢幕寬度過於壓縮時，最末元素會換行，且寬度滿版。也可用flex-grow: 2，設定單一item寬度加倍
```
.item {
  flex-grow: 1;
}
.item-3 {
  flex-grow: 2;
}
```
