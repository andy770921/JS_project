# React Note
## 檢查 code 品質
https://app.codacy.com/projects

## Styled-components，傳變數方法 ( 使用 TypeScript )
```ts
const IconCircle = styled.a<{ circleSize?: number; iconId?: string }>`
    display: flex;
    width: 1em;
    height: 1em;
    border-radius: 0.5em;
    align-items: center;
    justify-content: center;
    box-shadow: 0.03em 0.05em 0.1em 0 rgba(0, 0, 0, 0.25);
    font-size: ${p => (p.circleSize ? `${p.circleSize}px` : '40px')};
    background-color: ${p => {
        switch (p.iconId) {
            case 'fb_page':
                return '#4367b2';
            case 'line':
                return '#00c200';
            case 'ig':
                return '#d72d78';
            case 'fb_messenger':
                return '#0084ff';
            default:
                return 'white';
        }
    }};
`;
```
## Resize 時，隱藏漢堡選單
```js
componentDidMount = () => {
   this.checkForHeaderStyle();
   window.addEventListener(“resize”, this.checkForHeaderStyle);
 };
 checkForHeaderStyle = () => {
   if (document.body.offsetWidth < Number(1125)) {
     this.setState({ screenMobile: true });
   } else {
     this.setState({ screenMobile: false });
   }
 };
componentWillUnmount = () => {
   window.removeEventListener("resize", this.checkForHeaderStyle);
 };
```
## HOC

```js
const HOC = WrappedComponent => {
  const products = [
    {
      id: 90,
      picture:
        "https://diz36nn4q02zr.cloudfront.net/webapi/imagesV3/Cropped/SalePage/6016548/0/173139?v=1",
      name: "MUSTELA~寶寶洗髮沐浴露/Dermo雙潔乳(500ml)【D013520】",
      suggestPrice: 680,
      price: 399
    }
  ];
  return props => <WrappedComponent products={products} {...props} />;
};
const ProductCard = ({ imgSrc, name }) => (
  <div>
    <img src={imgSrc} style={{ width: "100px" }} alt={name} />
    <div>{name}</div>
  </div>
);
class App extends Component {
  render() {
    const { products } = this.props;
    return (
      <>
        {products.map(e => (
          <ProductCard
            id={e.id}
            key={e.id}
            imgSrc={e.picture}
            name={e.name}
          />
        ))}
      </>
    );
  }
}
const WrappedApp = HOC(App);
const rootElement = document.getElementById("root");
ReactDOM.render(<WrappedApp />, rootElement);
```
## React hooks 拆分 fetch 範例 
https://codesandbox.io/s/fetch-optimize-620rt?fbclid=IwAR0H9ugelbNPGju78KcGULyhTGdQiycfygOFBlFfldXV5OG7XKahQnhF1Qg
## React 運作原理
https://overreacted.io/react-as-a-ui-runtime/#memoization
## React Hooks 運作原理
https://www.youtube.com/watch?v=9jWwO7McMbU&feature=youtu.be&t=9480
https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/
## useEffect, Dan
https://overreacted.io/making-setinterval-declarative-with-react-hooks/?fbclid=IwAR18fsppc2BMUUkJIfnk4gfel1sxeevCZbOsK544ZjdWhioNiD75EcmcK3I
## useEffect
https://overreacted.io/a-complete-guide-to-useeffect/  
https://sebhastian.com/react-hooks-useeffect  
https://stackoverflow.com/questions/53464595/how-to-use-componentwillmount-in-react-hooks  
https://medium.com/enjoy-life-enjoy-coding/react-%E7%82%BA%E4%BA%86%E8%88%87-hooks-%E7%9B%B8%E9%81%87-function-components-%E5%8D%87%E7%B4%9A%E8%A8%98-86869d869a45  
## React + GA
https://medium.com/@malith.dev/track-users-in-your-react-app-with-google-analytics-6364ebfcbae8  
https://medium.com/google-cloud/tracking-site-visits-on-react-app-hosted-in-google-cloud-using-google-analytics-f49c2411d398  

## Pure Component
不要被更新影響的 component 若是 class component ，直接繼承 PureComponent 即可  
https://www.youtube.com/watch?v=YCRuTT31qR0  
https://www.youtube.com/watch?v=PXXjkq4A-OU
## Pure Component 在 Hook 中實作
不要被更新影響的 component 若是 hook ，在 export 時用 React.memo()   
上層 component 的函數若是用 hook 寫，且傳進不被影響的 component ，需要加掛 useCallback  
https://iandays.com/2019/06/01/reacthooks/
https://www.youtube.com/watch?v=7TaBhrnPH78

## Reacr-Router urls don't work when refreshing or writing manually
https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually

## 為何 Hook 沒用到 React 還要 import?
1. Ans: Babel 將 JSX 轉成 React.createElement 後，需要 React 接著處理 createElement
2. Babel 負責處理 JSX 的 plug-in ()，可以將 JSX 語法，轉成 React.createElement 
3. React.createElement: JSX 解析後產生出來的 React.createElement(xxx,ooo) 需要被接著處理。xxx ooo 經過 createElement 函式處理後，變成 react 自己用的物件，範例如下  
```js
React.createElement("h3", {style:{ color : "red" }}, "hello react");
// 轉換成
{
    type: 'h3',
    props: {
        children: 'hello react',
        style: {
            color: 'red'
        }
    }
}

```
4. ReactDOM.render: 將 產生出的物件，轉成瀏覽器可以使用的 document.XXX 操作 DOM
5.  Dan: 
```
When we say ReactDOM.render(reactElement, domContainer), we mean: “Dear React, make the domContainer host tree match my reactElement.”
```
6. `<APP />` 與 `App()`，差異在，`<APP />` 會被 Babel 轉成 React.createElement(許多複合參數)，轉換後並未呼叫函數，console.log 結果如下
```js
import React from "react";

function App() {
  const state = { name: "Ryan" };
  const sayHi = () => {
    console.log("hi");
  };
  return (
    <div className="App">
      <h1>{state.name}</h1>
      <button onClick={sayHi}>Click 1</button>
    </div>
  );
}
console.log(<App />);
// Object {type: function App(), key: null, ref: null, props: Object, _owner: null…}
```
7. `App()` 已呼叫函數，console.log 結果如下
```js
console.log(App());
// Object {type: "div", key: null, ref: null, props: Object, _owner: null…}
```
## Isomorphic React App
https://github.com/firebase/functions-samples/tree/master/isomorphic-react-app

## Server Side Rendering
Next.js  
https://nextjs.org/features/server-side-rendering#benefits  
React 官方:  
https://blog.techbridge.cc/2016/08/27/react-redux-immutablejs-node-server-isomorphic-tutorial/  
server 端設定```import ReactDOMServer from 'react-dom/server';```:  
https://reactjs.org/docs/react-dom-server.html  
client 端加入```ReactDOM.hydrate(element, container[, callback])```:  
https://reactjs.org/docs/react-dom.html#hydrate  

## 即時更新
https://blog.niclin.tw/2017/10/28/%E7%8D%B2%E5%BE%97%E5%AF%A6%E6%99%82%E6%9B%B4%E6%96%B0%E7%9A%84%E6%96%B9%E6%B3%95polling-comet-long-polling-websocket/  
https://codeburst.io/polling-vs-sse-vs-websocket-how-to-choose-the-right-one-1859e4e13bd9  


