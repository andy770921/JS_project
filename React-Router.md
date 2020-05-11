# React-Router


## 點擊後保持 Quert String 寫法
```js
const CategoryMenu: FC = () => {
    const history = useHistory();
    const { search } = useLocation();
    
   // ...
   
    const itemClickHandler = (item) => () => {
        history.push({
            pathname: `${baseUrl}/${item.id}`,
            search,
        });
    };
    return <SubMenu itemClickHandler={itemClickHandler} />;
}
```
## Query String 相關好用函式
```js
// ----取得網址問號後的 Query 字串----
// Node JS 升版後可用其他方式取得 Query 字串
// https://shunnien.github.io/2017/07/03/Get-Query-String-Parameters-with-JavaScript/

export default function getQueryValueByName(name: string, url: string) {
    const safeName = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${safeName}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// var queryStr = '?foo=lorem&bar=&baz';
// var foo = getQueryValueByName('foo', queryStr); // "lorem"
// var bar = getQueryValueByName('bar', queryStr); // "" (present with empty value)
// var baz = getQueryValueByName('baz', queryStr); // "" (present with no value)
// var qux = getQueryValueByName('qux', queryStr); // null (absent)

export function updateUrlParameter(url: string, param: string, value: string) {
    const index = url.indexOf('?');

    if (index > 0) {
        const u = url.substring(index + 1).split('&');
        const params = new Array(u.length);
        let found = false;

        for (let i = 0; i < u.length; i += 1) {
            params[i] = u[i].split('=');
            if (params[i][0] === param) {
                params[i][1] = value;
                found = true;
            }
        }

        if (!found) {
            params.push(new Array(2));
            params[params.length - 1][0] = param;
            params[params.length - 1][1] = value;
        }

        let res = `${url.substring(0, index + 1) + params[0][0]}=${params[0][1]}`;
        for (let i = 1; i < params.length; i += 1) {
            res += `&${params[i][0]}=${params[i][1]}`;
        }
        return res;
    }
    return `?${param}=${value}`;
}
// console.log(updateUrlParameter('https://www.example.com/some.aspx?mid=1&id=2','id','5'));
// => ?mid=1&id=5

// console.log(updateUrlParameter('https://www.example.com/?mid=1&id=2','id','5'));
// => ?mid=1&id=5

// console.log(updateUrlParameter('https://www.example.com/some.aspx','id','5'));
// => ?id=5

export const getQueryString = (name: string, url?: string) => {
    try {
        const match = RegExp(`[?&]${name}=([^&]*)`).exec(url || document.location.search);
        return match && decodeURIComponent(decodeURIComponent(match[1].replace(/\+/g, ' ')));
    } catch (e) {
        return null;
    }
};

// Source code from
// http://stackoverflow.com/questions/6953944/how-to-add-parameters-to-a-url-that-already-contains-other-parameters-and-maybe
export const appendParameter = (url: string, key: string, value: string, atStart = false) => {
    const replaceDuplicates = true;

    // Get url without hash
    let urlhash = '';
    let urlLength = url.length;
    if (url.indexOf('#') > 0) {
        urlLength = url.indexOf('#');
        urlhash = url.substring(url.indexOf('#'), url.length);
    }

    const sourceUrl = url.substring(0, urlLength);

    // Get url search part
    const urlParts = sourceUrl.split('?');
    let newQueryString = '';

    // Get new parameter query string
    if (urlParts.length > 1) {
        const parameters = urlParts[1].split('&');
        for (let i = 0; i < parameters.length; i++) {
            const parameterParts = parameters[i].split('=');
            if (!(replaceDuplicates && parameterParts[0] === key)) {
                if (newQueryString === '') {
                    newQueryString = '?';
                } else {
                    newQueryString += '&';
                }
                newQueryString += `${parameterParts[0]}=${parameterParts[1] ? parameterParts[1] : ''}`;
            }
        }
    }
    if (newQueryString === '') {
        newQueryString = '?';
    }

    // Append to url
    if (atStart) {
        newQueryString = `?${key}=${value + (newQueryString.length > 1 ? `&${newQueryString.substring(1)}` : '')}`;
    } else {
        if (newQueryString !== '' && newQueryString !== '?') {
            newQueryString += '&';
        }
        newQueryString += `${key}=${value || ''}`;
    }
    return urlParts[0] + newQueryString + urlhash;
};

export const removeQueryStringParam = (key: string, sourceURL: string) => {
    let alteredURL = sourceURL.split('?')[0];
    let param: string;
    let paramsArr: string[] = [];
    const queryString = sourceURL.includes('?') ? sourceURL.split('?')[1] : '';
    if (queryString !== '') {
        paramsArr = queryString.split('&');
        for (let i = paramsArr.length - 1; i >= 0; i -= 1) {
            param = paramsArr[i].split('=')[0];
            if (param === key) {
                paramsArr.splice(i, 1);
            }
        }
        alteredURL = `${alteredURL}?${paramsArr.join('&')}`;
    }
    return alteredURL;
};
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
                <NavbarUi />
                <Route exact path="/" component={AllUi}/>
                <Route path="/ongoing" component={OngoingUi} />
                <Route path="/finished" component={FinishedUi} /> 
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
