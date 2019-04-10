# 使用Webpack開發React JS環境建置


Ref: https://www.youtube.com/watch?v=vyI-Ko6fvKU

## 1. 安裝VSCode
## 2. 下載nvm (管理node JS 版本工具)
  https://github.com/coreybutler/nvm-windows/releases  
  下載nvm-setup.zip
## 3. 用命令提示字元下載與安裝nodeJS  
   a. 輸入nvm list 確認電腦中的NodeJS版本  
   b. 輸入nvm list available 確認網路上可下載的、穩定版(LTS)的NodeJS版本  
   c. 輸入nvm install 10.15.3 下載穩定版(LTS)的NodeJS版本  
   d. 再輸入nvm list 確認電腦中的NodeJS版本  
   e. 輸入nvm use 10.15.3 切換到該版本  
   NOTE: 可按node -v確認有無裝好nodeJS  
   NOTE: 此時也會裝好 npm (node JS 套件管理工具)  
         可按npm -v確認有無版本號出現  
## 4. 創建資料夾"Webpack_demo"  
  用VSCode在資料夾下新增"webpack.config.js"文件  
## 5. 貼上webpack官網文字
   貼上官網https://webpack.js.org/  
   其中的Bundle It下的文字，貼在"webpack.config.js"文件中  
## 6. 照官網流程走
   在VSCode開啟終端機，安裝如下 https://webpack.js.org/guides/getting-started/  
   a. 輸入npm init -y, 在資料夾產生package.json，內含安裝那些套件、用甚麼指令  
   b. 輸入npm install webpack webpack-cli -g, 安裝webpack，並且通用於全域 (npm install webpack webpack-cli --save-dev不通用於全域)  
    結果: i. package.json中，多了webpack使用的版本編號  
            "webpack": "^4.29.6",  
            "webpack-cli": "^3.3.0"   
          ii. "Webpack_demo"資料夾中，多了新資料夾"node_module"，裡面含webpack依賴的第三方套件。通常複製專案時，不會複製此資料夾  
              拿到專案時，重新按npm install重抓即可  
## 7. 切到webpack.config.js文件。
   a. entry為'./src/index.js',意思是一開始的進入點，未來要將高版本的JS寫在此。  
      此時需要自行創建src資料夾、其下創建index.js  
   b. filename: 'bundle.js'  改成 'index.bundle.js'  
      此為輸出檔案的名稱  
   c. path: path.resolve(......)用意為將相對路徑轉成絕對路徑，  
      ....路徑預設為__dirname, 'dist'  
      在VSCode終端機執行指令webpack時，會創造出資料夾'dist'、資料夾下有'index.bundle.js'  
   d. 'index.bundle.js'裡面是index.js經轉換後的檔，已處理/編譯好變數名稱重複等狀況並壓縮後轉成程式碼  
   
## 8. 掛載 Babel
   在VSCode終端機，輸入指令npm install -D babel-loader @babel/core @babel/preset-env webpack  
   Babel loader Ref: https://github.com/babel/babel-loader  
## 9. 照Babel loader網站開發步驟
   貼上Usage下方程式碼至"webpack.config.js"文件，並在output{}後加上逗號  
         module.exports = {
              entry: './src/index.js',
              output: {
                path: path.resolve(__dirname, 'dist'),
                filename: 'index.bundle.js'
              },
              module: {
                rules: [
                         {
                          test: /\.m?js$/,
                          exclude: /(node_modules|bower_components)/,
                          use: {
                                 loader: 'babel-loader',
                                 options: {
                                        presets: ['@babel/preset-env']
                                          }
                               }   
                          }
                        ]
                       }
            };

## 10. 創建index.html文件
   在index.html文件第一行打html:5，生成自動模板  
## 11. 編輯index.html文件
    <body></body>中，插入如下  
    <script src="./dist/index.bundle.js"></script>  
## 12. 其他好用設定: 
   修改package.json裡面的文字，新增npm 腳本功能  
    將  
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1" 
    },  
    換成  
    "scripts": {  
      "watch": "webpack --mode development --watch",
      "start": "webpack --mode development",
      "deploy": "webpack --mode production"
    },  
      Ref: https://medium.com/@Mike_Cheng1208/webpack%E6%95%99%E5%AD%B8-%E5%9B%9B-javascript-%E8%88%87-babel-1d7acd911e63  

   新增指令:   
    npm run watch: 持續執行develope版，存檔時就會bundle，按ctrl+c可中斷執行。Code可讀。如用production版會很慢
    npm run start: 一次性執行 develope版，Code可讀
    npm run deploy (直接打webpack也是這個預設功能): 上線前壓成產品版本，bundle出的code只有一行
    
## 13. 要執行React，還必須進行以下操作  
   Ref: https://ithelp.ithome.com.tw/articles/10200459  
   a.在終端機輸入 npm install react react-dom --save    
   b. 在終端機輸入 npm i @babel/preset-react -D  
   c. 更改"webpack.config.js"文件，將原先的東西取代成['@babel/preset-react']如下    
    module: {
    rules: [
             {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                     loader: 'babel-loader',
                     options: { presets: ['@babel/preset-react'] }
                   }   
              }
            ]
           } 
           
    d.在index.html的 <body> 下，新增 <main id="app"></main>    
     id為js檔案中，getElementById的名稱   
     ReactDOM.render(  
      <Parent /> ,  
     document.getElementById('app'));  
   
## -------------------


Q:
新手提問，每次開發新的專案時都需要npm webpack跟babel然後再做初始化嗎  


A:
你可以存取package.json跟webpack.config.js就好  
然後開始新專案的時候直接 npm install  
它就會幫你安裝好了! 因為package.json已經記錄你所有需要的套件  
所以每次你只要資料夾有我剛剛說的package.json跟webpack.config.js就可以快速安裝了  


