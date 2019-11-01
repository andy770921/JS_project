# ES Lint 流程

## Ref (官網, document error, import React error, 加入 Air BnB 規則)
1. https://eslint.org/
2. https://www.freecodecamp.org/forum/t/i-have-a-problem-in-js-im-getting-error-document-is-not-defined-no-undef-document-getelementbyid-ahmed-innerhtml-hello/280879/2
3. https://www.npmjs.com/package/eslint-plugin-react

## 終端機輸入指令

1. ```npm install eslint --save-dev```
2. ```./node_modules/.bin/eslint --init``` 並依照相關需求設定，產生 eslintrc.js 設定檔
3. ```npm i -D eslint eslint-config-airbnb-base eslint-plugin-import``` 安裝完 air BnB 套件

##  eslintrc.js 設定檔新增如下
```js
module.exports = {
    "env": {
        "es6": true,
        "browser": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error"
    },
    "extends": "airbnb-base"
};
```

1. ```"extends": "airbnb-base"``` 為加入 air BnB 規則
2. ```"browser": true```為避免找不到 document 物件報錯
3. ```"react/jsx-uses-react": "error"```為避免```import React```報錯

##  package.json 設定檔新增如下
```js
{
    "name": "abc",
    "version": "1.0.0",
    "scripts": {
      "build": "webpack",
      "start": "webpack-dev-server --open",
      "check": "./node_modules/.bin/eslint",
      "fix": "./node_modules/.bin/eslint --fix"
    },
  }
```
  
## 完成設定，指令說明如下
  
1. 輸入指令 ```npm run check src/components/HeroList.js``` 可檢查 js 文檔
2. 輸入指令 ```npm run fix src/components/HeroList.js``` 可自動修正 js 文檔

## 一次安裝、一次搞定法
https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a?gi=7fab28102769
