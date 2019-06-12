# HTML 觀念

## 常用標籤
1. ```<h1> - <h6>```標題
2. ```<a>``` 錨，通常後面加屬性```href="網址"```或  ```href="#"```，超連結，可連結到網頁中的某位置、外部網頁等。後面加屬性```target="_blank"```意為在新分頁開啟新連結
3. ```<ul>``` unorder list，其下的項目，加入```<li>```才會換行。```<li>```下加入 ```<a>``` 才可用超連結
4. ```<ol>``` order list
5. ```<body>```下，可再切分為```<header>```、```<section>```、```<footer>```三個語意型標籤(semantic tag)
6. ```<section>```下，可加```<article>```語意型標籤，涵蓋小標題```<h3>```與文章段落```<p>```，如部落格的一篇文章。若```<article>```下加入```<aside>```及```<q>```，會換行並自帶雙引號，可在文章中標示重點文句
7. ```<ul>``` 外層可包```<nav>```
8. ```<section>```下，可加```<aside>```語意型標籤，可加入twitter連結、補充連結等，如下

```
<aside>
  <h3>More Article about XXX</h3>
    <ul>
      <li><a href="#">A</a></li>
      <li><a href="#">B</a></li>
      <li><a href="#">C</a></li>
    </ul>
</aside>
```
9. ```<main>```一個網頁只能有一個、```<div>```不含語意
10. ```<blackquote>```可引用。若要加入超連結，可
    a. ```<blackquote cite="網址">```
    b. ```<cite><a href="網址">``` 
11. 除了整頁的版權可用```<footer>```之外，可在```<blackquote>```、```<article>```下加入```<footer>```，成為當下小段落的結尾。當下小段落的標題也可用```<header>```
12. ```<img src="img/picture.jpg" alt="abc">``` 可插入圖片，引入後不需要再加closing tag (不需```</img>```)。alt為當圖出不來時的替代文字
13. ```<img title="xxx">``` xxx意為，當滑鼠滑到圖上方靜置時，會出現的文字。可作為提示用字
14. ```<img>```更完整的語意式寫法為
```
<figure>
  <img src="img/picture.jpg" alt="abc">
    <figcaption>
      圖下顯示的文字。這裡會打入圖片說明，通常可用alt相同的描述，或是不要img後的title，直接寫在此
    </figcaption>
</figure>
```
15. ```<address>```可輸入地址
16. ```<br>```換行，可不用再加另一個closing tag，但可self-closing，寫成```<br />```
17. ```<hr>```英文為"水平規則"，加入水平黑線
18. ```<p>```內加```<strong>```粗體、```<em>```斜體、```<small>```短段落的小字體
19. ```<span>```及```<div>```無語意，```<div>```=block-level element，```<span>```= in-line element，用在字前後

## 絕對URL
1. 絕對URL: href="網址"

## 相對URL
1. href="article.html"，同資料夾下的其他檔案
2. href="A/article.html"，同資料夾下的A資料夾下的其他檔案
3. href="../index.html"，該資料夾上一層的其他檔案
4. 延伸: 兩層資料夾時， href="A/B/article.html" ; href="../../index.html"
5. 實例: href="../../A/picture.jpg"，意為上兩層資料夾後，再進入A資料夾下，找picture.jpg檔案
6. root relative link: href="/"，意為到根目錄(下的index.html檔)
7. root relative link: href="/#about"，意為到根目錄下的index.html檔，id為about的書籤
8. root relative 路徑，只在上傳至網頁上，或是本機執行local server有效，如果直接在電腦雙擊html檔案，會無效  
   " to access the site you're building, you don't open the file using the File > Open menu in the browser.
Instead, you type in a URL, usually using an IP address, which then points to a folder on your computer."  

## 同份HTML內，書籤連結

1. 在要跳轉的部分，設定id如```<section id="xxx">```
2. 設定a的屬性href，保留"#"並加入後面的文字同id  
```
<ul>
      <li><a href="#xxx">A</a></li>
      <li><a href="#">B</a></li>
      <li><a href="#">C</a></li>
</ul>
```

## 超連結到另一份HTML內

1. 在另一份HTML，在要跳轉的部分，設定id如```<article id="xxx">```
2. 在原先HTML，設定a的屬性href，保留"#"並加入後面的文字同id  
```
<ul>
      <li><a href="網址#xxx">A</a></li>
      <li><a href="#">B</a></li>
      <li><a href="#">C</a></li>
</ul>
```
## 點連結寄e-mail設定法
1. 原先文字加入```<a>```如```<p><strong>E-mail:</strong> <a>email to me</a></p>```
2. 用mailto:加入信箱，冒號後不能有空白```<a href="mailto:aaa@gmail.com">```
3. 用?subject=加入信件標題```<a href="mailto:aaa@gmail.com?subject=abcd">```，空白鍵要用%20，如subject=ab%20cd

## 特殊字元
1. 如在文字段落中出現<，要打$it;。版權圖示要打&copy;。加入多餘空白可打&nbsp;。&要打&amp;  
https://dev.w3.org/html5/html-author/charref
2. 如需要引述整段code，可用以下寫法
```
<pre>
      $it;div$gt;
      .....
</pre>
```
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre

## 註解
1. ```<!-- XXXX -->```
2. 滑鼠拖曳選取段落後，按ctrl + /
