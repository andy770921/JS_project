# jest 單元測試流程

## React 環境下，測試 React Component snapshot


1. 透過 npm 安裝 jest
```
npm install --save-dev jest
```
Ref: https://jestjs.io/docs/en/getting-started.html
2. 新增 package.json 檔案下的 script，之後終端機輸入 npm run test 即可測試
```
{
  "name": "XXXX",
  "version": "1.0.0",
  ....
  "scripts": {
    "test": "jest",
    ....
  },
}
```
3. 終端機輸入 npm i react-test-renderer --save-dev，之後 js 檔才能用 import renderer from 'react-test-renderer';

Ref: https://www.valentinog.com/blog/testing-react/

4. 新增 unit_test 資料夾，其下新增檔名為 component.test.js ，需要 .test.js 結尾。檔案內容可如下
```
import React from 'react';
import About from '../src/components/about';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create( <About /> )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```
5. 終端機輸入 npm run test 即可測試，若有 import .css 檔案時報錯，需要在 package.json 檔再新增如下
```
> 1 | import '../css/normalize.css';
        | ^
```

```
{
  "name": "camelup",
  ....
  "jest": {
    "moduleNameMapper": {
      "\\.(css|less|sass|scss)$": "<rootDir>/unit_test/component.test.js"
    }
  }
}
```
6. 若 react component 有加掛 Router 或 Context ，需要在測試時，包在 component 外面，如下
```
import React from 'react';
import About from '../src/components/about';
import renderer from 'react-test-renderer';
import { HashRouter } from 'react-router-dom';

it('renders correctly', () => {
  const tree = renderer
    .create( <HashRouter><About /></HashRouter> )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```
7. 測試成功時，會顯示 pass ，且自動創立 _snapshots_ 資料夾，裡面有.snap 檔，日後都用此檔案當標準比對。
