# 使用 Webpack 開發 React JS 環境建置


Ref: https://www.youtube.com/watch?v=vyI-Ko6fvKU

## 1. 安裝 VSCode
## 2. 下載 nvm (管理 node JS 版本工具)
  https://github.com/coreybutler/nvm-windows/releases  
  下載 nvm-setup.zip
## 2-2. 下載 nvm (for Mac) 
- https://www.onejar99.com/nvm-install-for-unix-like/ 
- https://github.com/nvm-sh/nvm
## 3. 用命令提示字元下載與安裝 nodeJS  
   a. 輸入 `nvm list` 確認電腦中的 NodeJS 版本  
   b. 輸入 `nvm list available` 確認網路上可下載的、穩定版 ( LTS ) 的 NodeJS 版本  
   c. 輸入 `nvm install 10.15.3` 下載穩定版 ( LTS ) 的 NodeJS 版本  
   d. 再輸入 `nvm list` 確認電腦中的NodeJS版本  
   e. 輸入 `nvm use 10.15.3` 切換到該版本  
   f. 輸入 `nvm alias default v10.19.0` 設定預設版本
   NOTE: 可按 node -v 確認有無裝好 nodeJS  
   NOTE: 此時也會裝好 npm (node JS 套件管理工具)  
         可按npm -v確認有無版本號出現  
## 4. 創建資料夾 "Webpack_demo"  
  用 VSCode 在資料夾下新增 "webpack.config.js" 文件  
## 5. 貼上 webpack 官網文字
   貼上官網https://webpack.js.org/  
   其中的 Bundle It 下的文字，貼在 "webpack.config.js" 文件中  
## 6. 照官網流程走
   在VSCode開啟終端機，安裝如下 https://webpack.js.org/guides/getting-started/  
   a. 輸入 npm init -y, 在資料夾產生 package.json，內含安裝那些套件、用甚麼指令  
   b. 輸入 npm install webpack webpack-cli -g, 安裝 webpack ，並且通用於全域 ( npm install webpack webpack-cli --save-dev 不通用於全域)  
    結果: i. package.json中，多了webpack使用的版本編號  
            "webpack": "^4.29.6",  
            "webpack-cli": "^3.3.0"   
          ii. "Webpack_demo" 資料夾中，多了新資料夾 "node_module" ，裡面含 webpack 依賴的第三方套件。通常複製專案時，不會複製此資料夾  
              拿到專案時，重新按 npm install 重抓即可  
## 7. 切到 webpack.config.js 文件。
   a. entry 為'./src/index.js',意思是一開始的進入點，未來要將高版本的JS寫在此。  
      此時需要自行創建src資料夾、其下創建 index.js  
   b. filename: 'bundle.js'  改成 'index.bundle.js'  
      此為輸出檔案的名稱  
   c. path: path.resolve(......)用意為將相對路徑轉成絕對路徑，  
      ....路徑預設為__dirname, 'dist'  
      在 VSCode 終端機執行指令 webpack 時，會創造出資料夾'dist'、資料夾下有'index.bundle.js'  
   d. 'index.bundle.js'裡面是index.js經轉換後的檔，已處理/編譯好變數名稱重複等狀況並壓縮後轉成程式碼  
   
## 8. 掛載 Babel
   在 VSCode 終端機，輸入指令 npm install -D babel-loader @babel/core @babel/preset-env webpack  
   Babel loader Ref: https://github.com/babel/babel-loader  
## 9. 照Babel loader網站開發步驟
   貼上 Usage 下方程式碼至 "webpack.config.js" 文件，並在 output{} 後加上逗號  
   
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
   在 index.html 文件第一行打 html:5，生成自動模板  
## 11. 編輯index.html文件
   \<body\>\</body\>中，插入如下 

    <script src="./dist/index.bundle.js"></script>  
## 12. 其他好用設定: 
   修改 package.json 裡面的文字，新增npm 腳本功能  
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
    npm run watch: 持續執行 develope 版，存檔時就會bundle，按ctrl+c可中斷執行。 Code 可讀。如用 production 版會很慢
    npm run start: 一次性執行 develope 版， Code 可讀
    npm run deploy (直接打 webpack 也是這個預設功能): 上線前壓成產品版本，bundle 出的 code 只有一行
    
## 13. 要執行 React 及 JSX 法，還必須進行以下操作  
   Ref: https://ithelp.ithome.com.tw/articles/10200459  
   Ref: https://youtu.be/YN2hwa4_ins?t=3535  
   a.在終端機輸入 npm install react react-dom --save    
   b. 在終端機輸入 npm i @babel/preset-react -D  
   c-1實測可不用. 更改 "package.json" 文件， "main":"index.js"下方，加入"babel" : {"presets": [ "env", "react"]},  
   c-2. 更改 "webpack.config.js" 文件，將原先的東西取代成 ['@babel/preset-react'] 如下 
   
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
           
   d.在 index.html 的\<body\>下，新增\<main id="app"\>\</main\>    
   id 為 js 檔案中， getElementById 的名稱
  
     ReactDOM.render(  
      <Parent /> ,  
     document.getElementById('app'));  
   
## -------------------


Q:
新手提問，每次開發新的專案時都需要 npm webpack 跟 babel 然後再做初始化嗎  


A:
你可以存取 package.json 跟 webpack.config.js 就好  
然後開始新專案的時候直接 npm install  
它就會幫你安裝好了! 因為 package.json 已經記錄你所有需要的套件  
所以每次你只要資料夾有我剛剛說的 package.json 跟 webpack.config.js 就可以快速安裝了  

## ------------------- 初始化流程 by 彭彭 -------------------

## 1. 灌好 Webpack

- 操作到  補充: webpack-loader  之前，可灌好 Webpack、設定好 Webpack 的設定檔，決定好進入 js 與輸出的 js 檔名及路徑，以及加入方便使用的終端機指令如 ```npm run watch```
https://hackmd.io/LFKDc8N7TV64AkS0aVNSuw?fbclid=IwAR0Ce_5el6D08bHJpzG7qY45DE95HLuL7pwYm5iTGdvthJ7rjZrRxBpeYrA
- 原官網 Ref: https://webpack.js.org/concepts/

## 2. 灌好 React

終端機打指令 ```npm install react react-dom --save```

## 3. 測試 React

dist 資料夾下，新增檔案 index.html 如下
 ```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>React</title>
</head>
<body>
    <div id="root"></div>
    <script src="main.js"></script>
</body>
</html>
 ```
 
src 資料夾下，新增檔案 index.js 如下
 
```js
import React from "react";
import ReactDOM from "react-dom";

let element = React.createElement("h3", {style:{ color : "red" }}, "hello react");

ReactDOM.render(element, document.querySelector("#root"));
```
  
 按 npm run build，index.html 網頁會出現紅色的 hello react
 
## 4. 設定及灌好 Babel - 1 
 
在終端機打指令 ```npm install --save-dev babel-loader @babel/core```

Ref: https://babeljs.io/setup#installation

## 5. 設定及灌好 Babel - 2

在 webpack.config.js 內，加入 module:{  } 的設定
```js
const path = require('path');

module.exports = {
  entry: './src/index.js',  
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'main.js' 
  },
  module:{}
};
```
再於官網，加入 module 內的物件內容 Ref: https://babeljs.io/setup#installation. 

如下


```js
const path = require('path');

module.exports = {
  entry: './src/index.js',  
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'main.js' 
  },
  module: {
  rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
}
};
```
如果副檔名要用 .jsx，需要調整 module 內的物件內容如下. 

```js
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        resolve: { extensions: ['.js', '.jsx'] }
      }
    ]
  },
```
## 6. 設定及灌好 Babel - 3 ，官網沒有寫安裝 react ，要自己加

 
在終端機打指令 ```npm install @babel/preset-env @babel/preset-react --save-dev```

## 7. 設定及灌好 Babel - 4 

在根目錄下創檔案，檔名是 ```.babelrc```，檔案內文若照著網頁寫，會如下

```js
{
  "presets": ["@babel/preset-env"]
}
```

需要改為

```js
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## 8. 測試灌好的 Babel 

檔案 index.js 內容改為以下，存檔後再於終端機下指令 npm run build ，測試看看能否運作
```js
import React from "react";
import ReactDOM from "react-dom";

let element = <h3>hello react</h3>;
ReactDOM.render(element, document.querySelector("#root"));
```

## 9. 為了 state 的語法，再灌 Babel plug-in

為了 index.js 使用 state = { } 的語法，如下例，要進一步加掛 Babel plug-in
```js
class App extends React.Component {
    state = {
        name: "Ryu",
        age: 30
    }
```
在終端機，打以下指令```npm install @babel/plugin-proposal-class-properties --save-dev```
再在檔案 ```.babelrc```，中，內容改成如下
```js
{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": ["@babel/plugin-proposal-class-properties"]
}

```
## 10. 測試灌好的 Babel plug-in 是否成功

檔案 index.js 內容改為以下，存檔後再於終端機下指令 npm run build ，測試看看能否運作
```js
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    state = {
        name: "Ryu",
        age: 30
    }
    render () {
        return (
            <div>
                <p> My name is { this.state.name } and I am { this.state.age }. </p>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

若成功時 index.html 會出現以下字樣   
```My name is Ryu and I am 30.```

## ------------------- 使用 import css 語法 -------------------
## 1. 終端機輸入指令，灌 css loader 及 style loader  
輸入```npm install --save-dev css-loader```    
再輸入```npm install --save-dev style-loader```   

Ref: https://github.com/webpack-contrib/css-loader  
Ref: https://github.com/webpack-contrib/style-loader  

## 2. 在 webpack.config.js 內，加入 module:{  } 的設定
原:  
```js
module.exports = {
  entry: './src/index.js',  
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'main.js',
  },
  module: {
     rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
```
加入後:    
```js
module.exports = {
  entry: './src/index.js',  
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'main.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}, 
      { test: /\.css$/i, use: [{loader: "style-loader"}, {loader: "css-loader", options: {modules: false}}]}
    ]
  }
};
```
## 3. 確認 package.json 內，是否有灌到 css-loader 及 style-loader
若有灌到，會寫在 "devDependencies" 裡面  
```js
"devDependencies": {
   "css-loader": "^3.2.0",
   "style-loader": "^1.0.0",
 },
```
## 4. 實際使用

可在 src 資料夾下，新增檔案 index.css  

並且可在 index.js 內，第一行加入 ```import './index.css';```  

即可實際使用

## 5. 不加灌 css loader 的其他作法

可在 dist 資料夾下的 index.html ， ```<head></head> ``` 內部加入 ```<link rel="stylesheet" href="css/index.css"> ``` 
  
此時需注意，放 css 檔案的資料夾，需要在 dist 資料夾的目錄下，否則開網頁時無法載入 css ，會有以下錯誤  
  
```Refused to apply style from 'http://xxxx/xxxx/css/index.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.```  

## -------------- 使用 webpack 內建的 server ，不用 live server --------------
## 1. 終端機打指令如下
```npm install --save-dev webpack-dev-server```  
Ref 官方文件左列 Development 下的 Using webpack-dev-server : https://webpack.js.org/guides/development/#using-webpack-dev-server
## 2. webpack.config.js 新增 devServer 如下
```js
module.exports = {
  entry: './src/index.js',  
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'main.js'
  },
  devServer: {
    contentBase: "./dist",
  }
};

```
## 3. package.json 新增 script 指令如下

```js
"scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
      "start": "webpack-dev-server --open",
      "build": "webpack"
    }

```

## 4. 開發時打指令 npm run start 即可運作 server



## --------------- 補充 : 同專案一次製造兩個 Html ---------------

## 1. 下載 html-webpack-plugin
Ref: https://www.npmjs.com/package/html-webpack-plugin  
終端機輸入指令```npm i --save-dev html-webpack-plugin```
## 2. webpack.config.js 新增 plugins、output filename 及 entry 設定如下
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { main: './src/index.js', gameEntry: './src/secondEntry.js'},  
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}, 
      { test: /\.css$/i, use: [{loader: "style-loader"}, {loader: "css-loader", options: {modules: false}}]}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: "Todo's",
      template: './src/template.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'game.html',
      title: 'Game Page Title',
      template: './src/template.html',
      chunks: ['gameEntry']
    })
  ]
  
};
```
說明: 輸出時會用兩份高階 js 檔，各自輸出兩份 低階打包好的 js 檔及 html 檔  
index.js 輸出 main.js 及 index.html  
secondEntry.js 輸出 gameEntry.js 及 game.html  
## 3. src 資料夾下，新增模板 template.html ，內容可設定如下
標題會隨著 webpack.config.js 內的 title 設定而變
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```
## 4. src 資料夾下，新增一份 secondEntry.js ，內容可設定如下
```js
import React, { Component } from "react";
import ReactDOM from "react-dom";

class SecondApp extends Component {
    render() {
        return (
            <div>
                <h1> Game Page </h1>
            </div>
        )
    }
}


ReactDOM.render(<SecondApp />, document.querySelector("#root"));
```
## 5. 終端機輸入指令 npm run build ， 完工

## --------------- 補充 : 使用 async / await 語法 ---------------
https://babeljs.io/docs/en/babel-plugin-transform-runtime#docsNav  

## 1. 終端機輸入如下

```npm install --save-dev @babel/plugin-transform-runtime```

## 2. .babelrc輸入如下

```
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
```
## --------------- 補充 : npm run 設定 ---------------
https://www.tutorialdocs.com/article/npm-scripts-tutorial.html

## ------------------- 依環境變數打 API  -------------------

 - webpack.config.js 內，將 `/api` 之前的網址路徑換成 `https://domain.com`
```js
module.exports = {
  // ...
          devServer: {
            historyApiFallback: true,
            hot: true,
            allowedHosts: ['https://domain.com'],
            proxy: { //***新增此節點***
                '/api': {
                target: 'https://domain.com', //domain
                secure: true,
                changeOrigin: true,
                headers: {
                    'X-Service-Catalog': 'abc',
                    'Authorization': 'Bearer xyz',
                    }
                }
            }
        },
};
```
 - apiPath.js 內
 ```js
 export const API_PATH = `${process.env.DOMAIN_NAME}/api/v2`;
 ```
  - package.json 內
 ```js
{
  "name": "test",
  // ...
  "scripts": {
    "test": "jest --config=./test/jest.config.json",
    "dev": "webpack-dev-server --env.DOMAIN_NAME=http://localhost:8080 --open --mode development --config=./webpack/webpack.config.dev.js ",
    "build:prod": "webpack --env.DOMAIN_NAME=https://production.domain --mode production --config=./webpack/webpack.config.prod.js ",

  },
  // ...
}

 ```
 
 ## ------------------- 發佈至 npm 官網  -------------------
 
 1. 在 npm 官網創帳號：https://www.npmjs.com/
 2. 設定專案的 package.json
  ```js
{
  "name": "react-ts-npm-boilerplate",
  "version": "1.0.0",
  "description": "A template for a React + TypeScript + esLint package",
  "repository": {
    "type": "git",
    "url": "https://github.com/andy770921/react-ts-boilerplate.git"
  },
  "license": "ISC",
  "author": "Andy Chou",
  "main": "./dist/index.html",
  "files": [
    "dist"
  ],
  "keywords": [
    "react",
    "typescript",
    "eslint"
  ],
  "scripts": {
    "build": "webpack --config webpack.prod-config.js",
    "start": "webpack-dev-server --open --config webpack.dev-config.js",
    "watch": "tsc -w",
    "lint": "eslint ./src --ext .js,.jsx,.ts,.tsx"
  },
  "dependencies": {
    // ...
  },
  "devDependencies": {
    // ...
  }
}
 ```
2. 終端機輸入指令：`npm run build` 產生 bundle 後的程式碼

3. 終端機輸入指令：`npm login` 登入自己 npm 帳號
 
4. 終端機輸入指令：`npm publish` 發佈整個 repo 在官網如下圖

5. 終端機輸入指令：`npm unpublish react-ts-npm-boilerplate@1.0.0 -f` 可移除自己上傳的、官網的 package
Ref: https://docs.npmjs.com/unpublishing-packages-from-the-registry
