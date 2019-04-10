# VSCode環境建置

## 參考網站  
https://www.youtube.com/watch?v=bcgL1sCjAJA&t=2s&fbclid=IwAR0QeUHlizXDVjmGHZ6c9EegpNe_RUuslQp-ue2eI2yf4A9ddcnVnxSWkR0
https://www.youtube.com/watch?v=ZkDM77ZPkEo

## 預先下載之外掛  
1. 即時呈現類
- Live Server
- Live Sass Compiler
2. 版本控制類
- Gitlens (看到每個人、何時編輯哪行code，多人開發用)
- Gitignore (會找到兩個，要看內容介紹，下載右鍵點擊功能的)
- Git History
- Git-autoconfig (多個Github帳號時切換方便)
3. 存檔自動縮排
- JS, CSS, HTML Formatter
4. Node快速執行
- Node exec
5. 好用小工具
- Path Intellisense 提示檔案路徑
- SCSS Refactoring 快速命名SCSS中的變數
- ESLint 引入國際規範紅底線

## 快捷鍵  

1. F1 可開啟命令輸入欄
2. alt + shift + F 可調整縮排
3. 在html檔案內，打 ! 或 html:5，可呼叫出模板
4. 若安裝Node exec，可在目前.js檔案按 F8 執行， F9取消執行
5. ctrl+`  可開啟終端機
6. 可按html檔內文處，右鍵，選Open with live server即時呈現
7. 檔案名稱按右鍵，在自動生成檔選Add to .gitignore，只記錄自己的編輯檔即可

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
