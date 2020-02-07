# VSCode環境建置

## 參考網站  
1. https://www.youtube.com/watch?v=bcgL1sCjAJA&t=2s&fbclid=IwAR0QeUHlizXDVjmGHZ6c9EegpNe_RUuslQp-ue2eI2yf4A9ddcnVnxSWkR0
2. https://www.youtube.com/watch?v=ZkDM77ZPkEo
3. https://www.youtube.com/watch?v=SAX6RMEFVM4
4. https://youtu.be/ScDWrogElmo?t=1350

## 預先下載之外掛  
1. 即時呈現類
- Live Server
- Live Sass Compiler
2. 版本控制類
- Gitlens ( 看到每個人、何時編輯哪行 code ，多人開發用 )
- Gitignore ( 會找到兩個，要看內容介紹，下載右鍵點擊功能的 )
- Git History
- Git-autoconfig ( 多個 Github 帳號時切換方便 )
3. 存檔自動縮排
- JS, CSS, HTML Formatter
4. Node快速執行
- Node exec
5. 好用小工具
- Path Intellisense (提示檔案路徑)
- SCSS Refactoring (快速命名SCSS中的變數)
- ESLint (引入國際規範紅底線)
6. React相關
- ES7 React/Redux/GraphQL/React-Native snippets (快速建立 component, 加入 import 等 )
- Sublime Babel (輔助判斷JSX語法是否正確)
- Simple React Snippets ( net ninja 推薦， cc 可快速建立 component, imr 或 imrc 可加入 import 等, sfc 可快速建立 functional component)
## 快捷鍵  

1. F1 可開啟命令輸入欄
2. alt + shift + F 可調整縮排
3. 若安裝Node exec，可在目前.js檔案按 F8 執行， F9取消執行
4. ```ctrl+` ``` 可開啟終端機
5. 終端機執行中時，按ctrl + c 可停止執行
5. 可按html檔內文處，右鍵，選Open with live server即時呈現
6. 檔案名稱按右鍵，在自動生成檔選Add to .gitignore，只記錄自己的編輯檔即可
7. 在html檔案內，打 ! 或 html:5，可呼叫出模板
8. React相關: 輸入rafc創造箭頭函式、rfc 或 rfce 創造函式、rcc創造component
9. ctrl+H，可修改該文件全部相同的字

## Live Server port設定  

1. 若按主畫面下Go Live，無法顯示網頁，要點檔案->喜好設定->設定
2. 搜尋server，找到 在 setting.json 內編輯  
    Live Server › Settings: Port  
    Set Custom Port Number of Live Server. Set 0 if you want random port.  
    在 setting.json 內編輯  
3. 在大括號如下寫，之後存檔，即可用  
  {  
      "liveServer.settings.port":5500  
  }  

## 使用版本控制  

1. 創建資料夾，在終端機打npm init，一路enter到底
2. 在左方點選分岔軌道圖示，再點git圖示初始化存放庫，選自己剛剛建的資料夾
3. 點+(加到git add加到stage)，輸入註解文字，再按勾勾(git commit)
4. 輸入自己的github e-mail及帳號
5. 創新檔案並編輯
6. 點+(加到git add加到stage)，輸入註解文字，再按勾勾(git commit)
7. 按F1，再輸入git history，會出現新分頁，可看到文件commit狀況

## 使用github page  
Ref: https://blog.wawajohn.net/11322.html  

1. 在github下，創建New repository，取名如remote-assignments，可取得github網址，如https://github.com/andy770921/remote-assignments.git
2. 進入VS code的終端機，移動到D槽，想要放code的資料夾下，輸入指令   
git clone https://github.com/andy770921/remote-assignments.git
3. 建子資料夾如week1，在子資料夾下建index.html，用驚嘆號創建模版，並在```<body>```下輸入```<p>hello</p>```  
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <p>hello</p>
</body>
</html>

```
4. 在github網址中，進入Repository的Settings，下拉找到GitHub Pages，Source下拉捲軸從none改成master branch。此時會出現網址https://andy770921.github.io/remote-assignments/
5. 將網址改為子資料夾下，如改成https://andy770921.github.io/remote-assignments/week1
6. 此連結即可開啟week1資料夾下index.html  


## 不裝Webpack直接用React

1. 灌Node JS
2. 建新資料夾
3. 新資料夾下，在VSCode下終端機依序輸入如下指令，可在myapp資料夾下創react專案。此專案已有Git功能   
  npx create-react-app myapp  
  cd myapp  
  npm start  
4. 參考資料: https://github.com/facebook/create-react-app  
   Note: 可先在Gitbub下創立新Repository，得到網址如https://github.com/andy770921/ReactJS_Project.git  
         在myapp資料夾下，連到Github，輸入指令git remote add origin https://github.com/你的帳號/專案名稱.git  
         左方"原始檔控制"分岔圖，點進去，左上角...圖示按右鍵，選推送。再輸入Repository網址及Github帳密即可  
5. 在.scr資料夾下，刪除app.js中的第三行import './App.css';，並刪除檔案App.css  
6. 刪除檔案App.test.js
7. 刪除app.js中的第二行import logo from './logo.svg'、第八行\<img src={logo} className="App-logo" alt="logo" /\>;，並刪除檔案logo.svg
8. 按npm start可開啟預覽
9. 刪除App.js以下文字
    
       <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

## 使用Create-React-App後，npm run build後，無法顯示index.html
1. 狀況: index.html白屏，開發人員工具顯示Failed to load resource: net::ERR_FILE_NOT_FOUND
2. 問題點: homepage路徑錯誤 Ref: https://www.andreasreiterer.at/fix-whitescreen-static-react-app/
3. 解法: at your package.json add "homepage": "."     Ref: https://github.com/facebook/create-react-app/issues/6369

## 使用Create-React-App後，要接著用Router功能
1. terminal中，cd 到專案資料夾
2. terminal中，輸入npm install react-router-dom
3. 可在App.js檔中，加入import { BrowserRouter , Route } from 'react-router-dom';
4. 可接著在App.js檔中，加入以下
```
 function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
      </div>
    </BrowserRouter>
  );
}

export default App;
```

## Git 進階指令

1. `git reset --hard xxx`: 清掉 xxx 之後的 commit ，並且回到 xxx commit，如`git reset 85e7e30`，另一種寫法為 `git reset master^`，在 master 分支倒回一個版本
2. `git reset --hard origin/develop` 在該分支下，若有設定遠端連結 (up-stream) ，捨棄目前本機所有變更，回到遠端連結分支最新版
3. 拉與推不同 repo 的方法: https://marcus116.blogspot.com/2019/04/git-github-sync-fork-repository.html
4. 拉與推不同 repo 的方法二: 使用 `git remote set-url origin https://xxxxx.git` 及 `git remote set-url --push origin https://xxxxx.git`，設定不同拉與推的網址，之後就可以下簡單的 `git pull` 指令
5. 暫存目前未 commit 及未 add 的編輯狀態：使用 `git stash save`
6. 叫出之前的暫存狀態：使用 `git stash pop`
7. 創造新分支並切換：`git checkout -b feature_xxxx`
8. `git remote -v` 查看本機設定拉及推的遠端網址
9. `git branch -a` 查看本機及遠端的所有分支
10. `git push --set-upstream origin feature_xxxx` 推上遠端分支，並順便建立當下分支與遠端分支連結
11. `git rebase develop` 在功能分支下此指令，會將目前所有的新 commit 再 re-commit 一份，逐個解完衝突後，接在 develop 分支後面，結束後，功能分支的指標停在最新的 commit 、 develop 的指標停在原先 的 commit
12. `git rebase -i develop`在功能分支下此指令，新 commit 接在 develop 分支後面，並可以統一處理需要的 (或想移除的) commit 想移除的 pick 換成 drop
13. 單個 commit 解完衝突後要下指令 `git rebase --continue` 繼續解下個 commit 的衝突

## git flow 套件: gitflow

0. 建議配合 VS Code 套件 Git Graph 觀察分支狀況
1. [ 此步驟與 gitflow 套件無關 ] 建空資料夾，用VS code 開啟，再在 github 建新的 repository 
2. [ 此步驟與 gitflow 套件無關 ] 用 VS code 終端機，在資料夾的路徑下，輸入 git init，再輸入 git remote add origin https://github.com/帳號/rep名字.git
3. [ 此步驟與 gitflow 套件無關 ] 資料夾下新建 html 檔，用 VS Code 左列的 "原始檔控制" 圖示，進行 commit 的流程。commit 完後，master branch 就有一個版本紀錄，並將 master 主支，用VS Code 的...圖示下的 " 推送至 " ， 將主支 push 到 github
4. 按 F1 ，輸入 Gitflow: initialize repository for gitflow，找到該指令，一路 Enter 到底，此時會自動創建好 develop 分支，並停留在 master 主支。 
- Note: 可能會跳出 右下角視窗的 bug ，直接重新按 F1 ，再輸入 Gitflow: initialize repository for gitflow，即可初始化。此時會自動創建好 develop 分支。
- Note: 不可在 develop 分支，直接改文件 commit ，否則會碰到，與遠端無法同步的問題，衍伸出要自行 pull 到遠端，同步遠端的狀況
5. 自行切換到 develop 分支，按 F1 ，輸入 Gitflow: Feature: start，找到該指令，此時會自動創建好 feature 的分支 (可自行輸入 feature 的分支名稱)
6. 改好檔案後，正常使用 VS Code 左列的 "原始檔控制" 圖示，進行 commit 的流程，可在該分支下一直 commit 直到功能開發完。
7. 功能開發完後，按 F1 ，輸入 Gitflow: Feature: finish，找到該指令，此時會自動移除 feature 的分支，並將最新 commit 合併進 develop
8.  develop 分支合併進 master 之前，一定要發佈 release 分支，目的為發佈前最後 debug ，此時要按 F1 ，輸入 Gitflow: Release: start，找到該指令，執行後會創建新的 release 分支
- 若創建新的 release 分支時，出現右下角訊息 Branch "develop" has diverged from origin/develop ，代表有最新的 develop 在 github 上，要在本地端先自行 checkout 到本地 develop 分支，再 pull develpo 分支下來，才能繼續開 release 分支。pull 下來後，若檔案無衝突，會合併好，成最新的 develop (包含遠端及本地端的更新)，再 push 回去 github，即可往下操作
9. 可以在此 release 分支，再做修 bug 的 commit。
10. 修完 bug 任務結束後，要按 F1 ，輸入 Gitflow: Release: finish，此時會自動移除 release 的分支，並將最新 commit 合併進 master 及 develop，並自動將目前分支位置，移動到 develop。
11. 此時可以 push 本地端的 develop 分支到 github 。再用 git checkout 切換到 master 分支，再 push 本地端的 master 分支到 github。本地端再用 git checkout 移動到 develop 分支。
12. 按 F1 ，輸入 Gitflow: Feature: start，繼續開發新功能
