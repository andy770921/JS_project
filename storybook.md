## Storybook

## Amy 筆記
https://hackmd.io/@Vrr7hGd0T6KsDCbPdKTb7g/ryVPRtZy8?fbclid=IwAR1nO4gZ1XNBlznWEXg82DzNGrs24JAh9N3YsAnGaHDFIeEoTQvkaAcSXMY  

- Note: 但 addon 現在有新的, Info 被 docs 取代了
## TS 使用 Storybook
1. npm 安裝套件 
```
npm install --save-dev @storybook/react @storybook/addons @storybook/addon-links @storybook/addon-actions
npm install --save-dev tsconfig-paths-webpack-plugin babel-loader
```
Note: 若無安裝 babel-loader 終端機會出現以下錯誤
```
Module not found: Error: Can't resolve 'babel-loader' in '/Users/andychou/Documents/TEST7/react-ts-boilerplate'
```
2. 根目錄創 .storybook 資料夾，裡面的 main.js 檔案，設定如下

```js
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/storybook/*.story.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
      ],
    });
    config.resolve.extensions.push('.ts');
    config.resolve.extensions.push('.tsx');
    config.resolve.extensions.push('.json');

    config.resolve.plugins=[ new TsconfigPathsPlugin({
      configFile: `./tsconfig.json`,
      baseUrl: '.',
    })]
    return config;
  },
};
```
3. package.json 新增以下 script
```
  "scripts": {
    "storybook": "start-storybook -p 9001 -c .storybook"
  },
```
4. 終端機執行指令
```
npm run storybook
```
5. 成功後會終端機會出現以下
```
╭───────────────────────────────────────────────────╮
│                                                   │
│   Storybook 5.3.19 started                        │
│   8.31 s for manager and 8.03 s for preview       │
│                                                   │
│    Local:            http://localhost:9001/       │
│    On your network:  http://10.11.80.170:9001/    │
│                                                   │
╰───────────────────────────────────────────────────╯
```
