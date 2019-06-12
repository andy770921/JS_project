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
because the styles are written inside the HTML file, and 
there could be tens or hundreds of HTML files depending on the project, 
the browser has to download the styles each time a new page is loaded. 
And it also means that we're duplicating a lot of the same styles across 
multiple pages, which defeats the real purpose and convenience behind using CSS.  
3. external style sheet
