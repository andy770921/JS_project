# HTML 觀念

## 常用參考連結
1. https://developer.mozilla.org/en-US/docs/Web/CSS   
2. https://webplatform.github.io/docs/css/

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
  Note: inline 的優先級大於internal style (inline style override internal style)  
  Note: The downside(缺點) to using this internal style sheet method on larger projects is that 
because the styles are written inside the HTML file
the browser has to download the styles each time a new page is loaded.      
  
3. external style sheet

## external style sheet
1. 加入新檔案名style.css
2. 在HTML加入以下段落。rel=為 relationship between HTML and link document
```
  <head>
    <title>Lake Tahoe</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
```
Note: 在index.html 同一層有個資料夾css，資料夾下有檔案style.css
