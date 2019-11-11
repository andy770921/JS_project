# React Note
## 檢查 code 品質
https://app.codacy.com/projects
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
## useEffect
https://overreacted.io/a-complete-guide-to-useeffect/  
https://sebhastian.com/react-hooks-useeffect  
https://stackoverflow.com/questions/53464595/how-to-use-componentwillmount-in-react-hooks  

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


## Isomorphic React App
https://github.com/firebase/functions-samples/tree/master/isomorphic-react-app

## Server Side Rendering
Next.js  
https://nextjs.org/features/server-side-rendering#benefits
React 官方:  
server 端設定```import ReactDOMServer from 'react-dom/server';```:  
https://reactjs.org/docs/react-dom-server.html
client 端加入```ReactDOM.hydrate(element, container[, callback])```:  
https://reactjs.org/docs/react-dom.html#hydrate
