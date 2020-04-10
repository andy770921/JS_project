# React-Router

## 加 Quert String 純功能 Component 寫法

```js
import { useHistory } from 'react-router-dom';
import { useEffect, FC } from 'react';

// 使用需注意，引用的 AddQueryString 的 component，外層需被 'react-router-dom' 提供的 <BrowserRouter> 包含

const AddQueryString: FC<{ queryKey: string; queryValue: string }> = ({ queryKey, queryValue }) => {
    const history = useHistory();

    useEffect(() => {
        if (queryKey && queryValue) {
            history.push({ search: `?${queryKey}=${queryValue}` });
        }
    }, [queryKey, queryValue, history]);

    return null;
};

export default AddQueryString;

// 實際用法 <AddQueryString queryKey="someKey" queryValue="someValue" />


```

## -------------- 使用 React Router 功能 ，配合 VSCode live server --------------

## 1. 用 React Router 功能
1. terminal 中，cd 到專案資料夾
2. terminal 中，輸入```npm install react-router-dom```
3. 可在 index.js 檔中，開頭加入```import { BrowserRouter , Route } from 'react-router-dom';```
4. 可接著在 index.js 檔中，加入以下
```js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter , Route } from 'react-router-dom';
import NavbarUi from "./navbarUI";
import AllUi from "./components/allUI";
import OngoingUi from "./components/onGoingUI";
import FinishedUi from "./components/finishedUI";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
            <div>
                <NavbarUi />
                <Route exact path="/" component={AllUi}/>
                <Route path="/ongoing" component={OngoingUi} />
                <Route path="/finished" component={FinishedUi} /> 
            </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));
```
navbarUI.js 檔案如下
```js
import React from "react";

const NavbarUi = () => {
    return (
        <nav>
            <ul>
                <li><a href = "/">All</a></li>
                <li><a href = "/ongoing">On Going</a></li>
                <li><a href = "/finished">Finished</a></li>
            </ul>
        </nav>
    );
}
export default NavbarUi;
```
5. 補充資料```component={AllUi}```的寫法，有三種方式: https://reacttraining.com/react-router/web/api/Route  
6. 若要傳 prop 值進去 component ，可用以下寫法。第一行為傳值寫法，第二行為不傳值寫法    
```js
<Route exact path="/" component={props => <AllUi {...props} extra={this.state.todos} />}/>
<Route path="/ongoing" component={OngoingUi} />
 ```
## 2. 此時會發生問題: 
進入的首頁為 ```http://127.0.0.1:5500/dist/index.html```  
點擊 navbar 的 ongoing 按鈕後，網址換成 ```http://127.0.0.1:5500/ongoing``` ，網頁出現 cannot GET /ongoing  

## 3. 解決流程 - 1 ，讓 navbar 可以運作
將 navbarUI.js 檔案寫成如下。引入 { Link }， a 換成 Link ， href 換成 to  
```js
import React from "react";
import { Link } from "react-router-dom";

const NavbarUi = () => {
    return (
        <nav>
            <ul>
                <li><Link to= "/">All</Link></li>
                <li><Link to= "/ongoing">On Going</Link></li>
                <li><Link to= "/finished">Finished</Link></li>
            </ul>
        </nav>
    );
}
export default NavbarUi;
```
此時仍有，首頁為```http://127.0.0.1:5500/dist/index.html``` ，無法渲染出 {AllUi} 之問題

## 3. 解決流程 - 2 ，換首頁網址

將首頁網址```http://127.0.0.1:5500/dist/index.html```換成```http://127.0.0.1:5500/index.html```  

1. 點選 VS Code 左上角檔案 -> 喜好設定 -> 設定，搜尋 liveServer.settings
2. 點選 在 setting.json 內編輯
3. 將設定由原先
```js
{
    "liveServer.settings.donotShowInfoMsg": true,
}
```
改為
```js
{
    "liveServer.settings.donotShowInfoMsg": true,
    "liveServer.settings.root": "/dist/"
}
```
此時，用 live server 開啟 index.html 首頁，網址為```http://127.0.0.1:5500/index.html```，無法渲染出 {AllUi} 
在```http://127.0.0.1:5500```，以及點擊 navbar 皆可運作
此外，有以下問題仍存在: 直接打網址```http://127.0.0.1:5500/ongoing```網頁會顯示 ```Cannot GET /ongoing```

## 4. 在有 < Route path="...."> 的 Component ，設定重新導向:
```js
props.history.push('/about');
```
## 5. 在無 < Route path="...."> 的 Component 下重新導向:
要先掛高階 component
```js
import { withRouter } from "react-router-dom";

const ABC = (props) => {
  setTimeout(()=> { props.history.push('/about'); }, 2000);
  return (
    <div>hi</div>
  )
}

export default withRouter(ABC);
```

## 6. 重新導向新寫法:
```js

import { Redirect } from "react-router-dom";

class DailyRecord extends React.Component {
 constructor(props) {
   super(props);
 }

 render() {
   const { auth } = this.props;
   if (!auth.uid) return <Redirect to="./member" />;
   }
}
```
## 7. 教學:
https://www.youtube.com/watch?v=XRfD8xIOroA
