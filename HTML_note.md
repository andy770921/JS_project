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
      <li><a href="#">A<a/></li>
      <li><a href="#">B<a/></li>
      <li><a href="#">C<a/></li>
    </ul>
</aside>
```

  
## 絕對URL
1. href="網址"