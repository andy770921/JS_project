# jest 單元測試流程

## React + Jest 教學

https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/nextjs-testing-tutorial-1-ed4b27563761

## React 環境下，測試 React Component snapshot


1. 透過 npm 安裝 jest
```
npm install --save-dev jest
```
Ref: https://jestjs.io/docs/en/getting-started.html  
2. 新增 package.json 檔案下的 script，之後終端機輸入```npm run test```即可測試
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
3. 終端機輸入```npm i react-test-renderer --save-dev```，之後 js 檔才能用```import renderer from 'react-test-renderer';```
  
Ref: https://www.valentinog.com/blog/testing-react/  

4. 新增 unit_test 資料夾，其下新增檔名為 component.test.js ，需要 .test.js 結尾。檔案內容可如下
```js
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
5. 終端機輸入```npm run test```即可測試，若有 import .css 檔案時報錯，需要在 package.json 檔再新增如下
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
```js
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
```js
import React, {useState} from "react";
import Keyboard from "../components/Keyboard";
import renderer from "react-test-renderer";
import { AppContext } from "../app-context";
it("renders correctly", () => {
   const tree = renderer
       .create(
           <AppContext.Provider value={{
               pressKey:[],
               playNote:[],
               state:{editStaff: ""}}}>
               <Keyboard />
           </AppContext.Provider>)
       .toJSON();
       expect(tree).toMatchSnapshot();
});
it("Validate Treble Keyboard", () => {
   const tree = renderer
       .create(
           <AppContext.Provider value={{
               pressKey:[],
               playNote:[],
               state:{editStaff: "treble"}}}>
               <Keyboard />
           </AppContext.Provider>)
       .toJSON();
       expect(tree).toMatchSnapshot();
});
```
7. 測試成功時，會顯示 pass ，且自動創立 _snapshots_ 資料夾，裡面有.snap 檔，日後都用此檔案當標準比對。

## Jest 設定檔配合 TypeScript

1. 所需要 `npm i -D` 安裝的 packages: jest, ts-jest, @testing-library/react, @testing-library/jest-dom

2. 新增 package.json 檔案下的 script，之後終端機輸入```npm run test```即可測試
```json
{
  "name": "XXXX",
  "version": "1.0.0",
  ....
  "scripts": {
    "test": "jest --config=./test/jest.config.json",
    "test:update": "jest -u --config=./test/jest.config.json",
    "test:coverage": "jest --silent --config=./test/jest.config.json --coverage",
    ....
  },
}
```

3. test 資料夾下新增 jest.config.json 檔案
```json
{
  "rootDir": "../",
  "coverageDirectory": "<rootDir>/test/coverage",
  "moduleFileExtensions": ["js", "json", "ts", "tsx"],
  "preset": "ts-jest",
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "testMatch": ["**/?(*.)steps.(ts|tsx)", "**/?(*.)spec.(ts|tsx)"],
  "coveragePathIgnorePatterns": ["<rootDir>/node_modules/", "<rootDir>/test"],
  "moduleNameMapper": {
    "@client/(.*)": "<rootDir>/src/$1"
  },
  "moduleDirectories": ["node_modules", "src"]
}
```

4. 若要在 `xxx.test..tsx` 擴充 TS 簡寫路徑，如 `import DesktopOnlyHint from '@components/Home/DesktopOnlyHint';`，可在 `jest.config.json` 以下欄位添加

```json
{
  // ...
    "moduleNameMapper": {
        "@asset/(.*)": "<rootDir>/src/asset/$1",
        "@api/(.*)": "<rootDir>/src/api/$1",
        "@components/(.*)": "<rootDir>/src/components/$1",
        "@modules/(.*)": "<rootDir>/src/modules/$1",
        "@pages/(.*)": "<rootDir>/src/pages/$1",
        "@utilities/(.*)": "<rootDir>/src/utilities/$1",
        "@typings/(.*)": "<rootDir>/src/typings/$1",
        "@test/(.*)": "<rootDir>/test/$1"
    },
}
```

5. 若 `xxx.test..tsx` 引用的檔案，有需要支援 `import svgIcon from '@asset/some.svg';`，要下指令安裝 `npm i -D jest-svg-transformer`，並在 `jest.config.json` 以下欄位添加

```json
{
  // ...
    "transform": {
      
      "^.+\\.svg$": "jest-svg-transformer"
    },
}
```
5. tsconfig.json 檔，設定如下
```json
{
  "compilerOptions": {
    
  },
  "include": [
    "./src/**/*.ts",
    "./src/**/*.tsx", 
    "./test/**/*.ts",
    "./test/**/*.tsx",
    "./test/**/*.spec.ts",
    "./test/**/*.spec.tsx",
    "./test/**/*.steps.tsx",
    "./test/**/*.steps.ts", 
  ],
  "exclude": ["node_modules", "dist", "webpack/**/**"]
}
```
## Jest 範例配合 TypeScript
- `it` 可用 `test` 取代: https://stackoverflow.com/questions/45778192/what-is-the-difference-between-it-and-test-in-jest/47399770
```ts
enum productListType {
    TITLE = 'OrderByTitle',
    OUTER_ID = 'OrderByOuterId',
}

interface SalePageProduct {
    SalePageId: number;
    Title: string;
    Price: number;
    SuggestPrice: number;
    Type: string;
    ImageUrl: string;
}

class ListMarkedByType<T> {
    private arr: { type: string; list: T[] }[];

    constructor(array: { type: string; list: T[] }[] = []) {
        this.arr = array.slice();
    }

    moveChildToTopByType(typeName: string) {
        const topItemIndex = this.arr.findIndex(listItem => listItem.type === typeName);
        if (topItemIndex > -1) {
            const topItem = this.arr.splice(topItemIndex, 1)[0];
            this.arr = [topItem, ...this.arr];
        }
        return this;
    }

    filterEmptyChildList() {
        this.arr = this.arr.filter(listItem => listItem.list.length > 0);
        return this;
    }

    get list() {
        return this.arr;
    }
}

const dummyProductListByTitle = [
    {
        SalePageId: 81498,
        Title: 'test 1',
        Price: 1900,
        SuggestPrice: 1900,
        Type: 'Normal',
        ImageUrl: 'link1',
    },
    {
        SalePageId: 81538,
        Title: 'test 2',
        Price: 4500,
        SuggestPrice: 4500,
        Type: 'SoldOut',
        ImageUrl: 'link2',
    },
];

describe('測試 product List 為空陣列的情況', () => {
    const testingDataOne = [
        { type: 'test1', list: [] },
        { type: 'test2', list: [] },
    ];
    const testingDataTwo = [
        { type: productListType.OUTER_ID, list: [] },
        { type: productListType.TITLE, list: dummyProductListByTitle },
    ];

    it('when child lists are all empty', () => {
        const productListsWithMark = new ListMarkedByType<SalePageProduct>(testingDataOne);
        const finalList = productListsWithMark.filterEmptyChildList().list;
        expect(finalList).toEqual([]);
    });

    it('when child lists has one empty array', () => {
        const productListsWithMark = new ListMarkedByType<SalePageProduct>(testingDataTwo);
        const finalList = productListsWithMark.filterEmptyChildList().list;
        expect(finalList).toEqual([{ type: productListType.TITLE, list: dummyProductListByTitle }]);
    });
});
```
## 範本

- https://codepen.io/SitePoint/pen/XXzXLX
- https://codesandbox.io/s/mocha-unit-test-pipe-pgojx?file=/src/index.js
