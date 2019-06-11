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
12. ```<img src="img/picture.jpg" alt="abc">``` 可插入圖片，引入後不需要再加closing tag (不需```<img />```)。alt為當圖出不來時的替代文字
13. ```<img title="xxx">``` xxx意為，當滑鼠滑到圖上方靜置時，會出現的文字

## URL
1. 絕對URL: href="網址"
2. 相對URL: href="article.html"，同資料夾下的其他檔案
3. 相對URL: href="A/article.html"，同資料夾下的A資料夾下的其他檔案
4. 相對URL: href="../index.html"，該資料夾上一層的其他檔案
5. 相對URL 延伸: 兩層資料夾時， href="A/B/article.html" ; href="../../index.html"
