# Redux
## Code structure: Duck Pattern

https://github.com/erikras/ducks-modular-redux  
https://redux.js.org/style-guide/style-guide/#structure-files-as-feature-folders-or-ducks  
https://livebook.manning.com/book/redux-in-action/chapter-11/51  

## Redux 官網 及 Redux in Action 書
```
An example folder structure might look something like:
/src
    index.tsx
/app
    store.ts
    rootReducer.ts
    App.tsx
/common
    hooks, generic components, utils, etc
/features
/todos
    todosSlice.ts
    Todos.tsx

Note: 
/app contains app-wide setup and layout that depends on all the other folders.
/common contains truly generic and reusable utilities and components.

/features has folders that contain all functionality related to a specific feature. In this example, todosSlice.ts is a "duck"-style file that contains a call to RTK's createSlice() function, and exports the slice reducer and action creators
```
<div align="center">
  <img src="https://dpzbhybb2pdcj.cloudfront.net/garreau/Figures/11fig05_alt.jpg"/>
</div>

## 甚麼是 Middleware?

### Middleware 是在 Action 進 Reducer 前，中間的一個階段，通常用函式來實作這功能。  
  
- `Action` 是一個物件，規定一定要有一對 key-value pair 是 `type: "SOMETHING"` 
  
## 為何 Middleware 通常用函式呢？
  
- 函式可以代入 `Action` 物件，輸出另一個新 `Action` 物件，再輸出的新 `Action` 物件，再被 `Reducer` 接收到，依照 `type` 的內容，執行 `Reducer` 更新 `store` 的任務  
    
## 各個 Middleware 套件，怎麼用函式實作呢？    
    
1. `redux-thunk` 的實作方法為，擴展 `dispatch` 函式成為多型函式，讓 `dispatch` 既可以代入 `Action` 物件，也可以代入函式  
  
- 若 `dispatch` 代入物件，則直接進 `Reducer`。   
- 若 `dispatch` 代入函式，則先執行函式，這個函式結束前，再使用 `dispatch` 並代入物件，這時 `dispatch` 函式的執行，就會真正進入 `Reducer`  
  
2. `redux-observable` 的實作方法為，`dispatch` 還是只能接收物件，但是在 `dispatch` 執行之後，一律進入 `redux-observable` 官方自定義的函式
    
- 函式通常取名為 `oneEpic`, `twoEpic` 等  
- 這些 `Epic` 函式會在代入 `Action` 物件的 `dispacth` 函式執行後，自動觸發所有的 `Epic`  
- 因此，每個 `Epic` 在函式的起頭，一定會先過濾出是哪個 `Action` 需要執行以下內容，若符合條件就會接著執行  
- 函式結束前，會再使用 `dispatch` 函式，並代入新的 `Action` 物件  
- 因為又執行了 `dispatch` 函式，又會自動觸發所有的 `Epic` ，檢查是否有 `type` 符合過濾條件，重複以上過程。直到 `Action` 沒有進入任何一個 `Epic` ，才會進入 `Reducer`
  

## -------------- 使用 Redux --------------
## 1. 終端機打指令如下
```npm install redux react-redux```  
官網 Ref: https://redux.js.org/introduction/getting-started  
教學 Ref: https://youtu.be/f87wPQMgF4c  
## 2. 在 index.js 內 import 如下程式碼
```js
import { createStore } from "redux";
```
## 3. 在 index.js 加入如下程式碼，創建新的 store，並引入在 ReactDOM.render 內 (需要再 import)
```js
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore();

class App extends React.Component {.........}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector("#root"));
```
## 4. 在 src 資料夾下，創建新的 reducers 資料夾
資料夾下可裝不只一個 reducer，目前只要在 reducers 資料夾下，新創 rootReducer.js 檔案，內容如下
```js
const initState = {
    todos : [假資料]
};

const rootReducer = ( state = initState, action) => {
    return state;
}

export default rootReducer;
```
## 5. 在 index.js 加入 import 並加入 createStore 括號內的函數
```js
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);
```
## 6. 在有 state 或要 AJAX 取資料的 js 檔，移除 state 並加入如下 connect
移除 js 檔內 class 的內容
```js
class Home extends React.Component {
  state = {........}
  componentDidMount() { axios.get('https://xxxxx').then( res => {this.setstate({ todos: res.data })})}
}
```
新增 js 檔內 import ，及輸出時灌上 higher order component，兩個括號意思是，先用左邊的括號執行 connect 立即函式，執行後才會回傳高階的 component，然後再用右邊的括號，去 wrap 低階的 Home component
```js
import { connect } from "react-redux";

export default connect()(Home);
```

## 7. 在與 6. 同份檔案內，新增如下，可將 store 的 state 取出，抓到 mapStoreToProps 函數內
```js
const mapStoreToProps = (state) => {
  return { todos : state.todos };
}
```


## 8. 傳入 export default
```js
export default connect(mapStoreToProps)(Home);
```
## 9. 在取資料的 js 檔新增 console.log 測試。最終 rootReducer.js 、 index.js 及取資料的 js ，完整內容如下 

rootReducer.js
```js
const initState = {
    todos : [假資料]
};

const rootReducer = ( state = initState, action) => {
    return state;
}

export default rootReducer;
```

index.js
```js
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);

class App extends React.Component {.........}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector("#root"));
```
取資料的 js 檔 ( 比如 Home.js )
```js
import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

class Home extends React.Component {
  render() { console.log(this.props.todos) }
}
const mapStoreToProps = (state) => {
  return { todos : state.todos };
}
export default connect(mapStoreToProps)(Home);
```
看看 console.log 有沒有出現 ```[假資料]```

## 10. 改資料 - 1 : 最高層的 Element ，直接在該 js 檔 class 內新增如下 
比如，刪除 id 是二號的，index.js 檔如下 

```js
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);

class App extends React.Component {
    handleClick = (id) => { store.dispatch({ type: "DELETE_TODO", id : id }) }
    render() {
        return (
           <button onClick={() => (this.handleClick(2))}> Delete </button>
        )
    }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector("#root"));
```
rootReducer.js 檔如下  
```js
const initState = {
    todos : [假資料]
};

const rootReducer = ( state = initState, action) => {
    console.log(action);
    return state;
}

export default rootReducer;
```
測試: 點擊按鈕後，console 會出現```{type: "DELETE_TODO", id: 2}```

## 11. 改資料 - 2 : 子層 Element，可用 connect 在 export 時綁自己，會輸出 prop 給自己。在改資料的 js 檔新增如下 

比如，刪除 id 是一號的，改資料的 js 檔如下  
Note: ```connect(null, mapDispatchToProps)(Home)```寫 ```null``` 是因為使用```mapDispatchToProps```卻沒使用```mapStateToProps```   
若同時使用```mapStateToProps```，要把 ```null``` 換成```mapStateToProps```  
```js
class Home extends React.Component {
  handleClick = () => { this.props.deleteTodo(1) }
  render() { <button onClick={this.handleClick} > Delete </button> }
}

const mapDispatchToProps = (dispatch) => {
    return { deleteTodo : id => { dispatch({ type: "DELETE_TODO", id : id }) } };
}

export default connect(null, mapDispatchToProps)(Home);
```
rootReducer.js 檔新增如下  
```js
const initState = {
    todos : [假資料]
};

const rootReducer = ( state = initState, action) => {
    console.log(action);
    return state;
}

export default rootReducer;
```
測試: 點擊按鈕後，console 會出現```{type: "DELETE_TODO", id: 1}```

## 12. 改資料 - 3 : 調整 rootReducer.js  的內容，看要新增或刪除 store
rootReducer.js 完整範例如下 
```js
const initState = {
    todos: [
        { content: "Buy some milk", isFinished: false, id: 1 },
        { content: "Play games", isFinished: false, id: 2 },
        { content: "Sleep", isFinished: true, id: 3 }
    ]
};

const rootReducer = (state = initState, action) => {
    let newTodoArray = [];
    switch (action.type) {
        case "DELETE_TODO":
            newTodoArray = state.todos.filter(element => (action.id !== element.id));
            break;
        case "CONFIRM_TODO":
            newTodoArray = state.todos.map(element => {
                if (action.id === element.id) {
                    element.isFinished = true;
                    return element;
                } else { return element; }
            });
            break;
        case "ADD_TODO":
            const newObj = { content: action.newTodoContent, isFinished: false, id: parseInt(Math.random() * 1000000) };
            newTodoArray = [...state.todos, newObj];
            break;
        default:
            return state;
    }

    return {
        ...state,
        todos: newTodoArray
    }
}

export default rootReducer;

```

## 13. Redux 使用 action creater
使用目的: 非同步的 code 若寫在 component，會造成資料處理無法分離。寫在 reducer 會無法 return state。故在 dispatch 之前在 action creater 處理資料

## 14. 先安裝 npm
```npm install redux-thunk```

## 15. index.js，新增及修改如下，引入中介層，增強 store 功能，可以在 action creater 回傳函數，此函數可與 store 資料互動
引入 thunk 之後，原本的 dispatch 函數，擴展成為多形功能的函數。餵給它物件可以送指令出去。餵給他函數，可以延後送指令。在餵進去的函數做一些事情之後，再由函數裡面 dispatch 送指令出去
```js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));
```
## 16. 新建 actions 資料夾，其下開 projectActions.js
無中介層的標準寫法，可以直接回傳物件，並讓 dispatch 使用，projectActions.js 如下寫  
```js
export const createProject = (project) => {
  return {type: 'ADD_PROJECT', project: project};
}
```
有中介層，可回傳函數，這裡的 dispatch 是可以派送 action 給 reducer 的函數。getState 可取到 state 
```js
export const createProject = (project) => {
  return (dispatch, getState) => {
    // make async code 
    dispatch({type: 'ADD_PROJECT', project: project});
  }
}
```

## 17. 在改資料的 js 檔新增如下 
```js
import { createProject } from ......
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
    return { deleteTodo : id => { dispatch({ type: "DELETE_TODO", id : id }) },
             createProject : project => { dispatch(createProject(project)) }};
}

export default connect(null, mapDispatchToProps)(Home);
```

## 18. Redux 使用複數的 reducer， rootReducer.js 修改如下
```js
import { combineReducers } from 'redux';
import heroReducer from './heroReducer';
import popupReducer from './popupReducer';

const rootReducer = combineReducers({
    hero: heroReducer,
    popup: popupReducer,
});
export default rootReducer;
```
## 19. Redux 使用 switch 的補充，若 case 內變數重複命名報錯誤，可加上大括號解決
https://medium.com/@e_himmelfarb/use-curly-braces-with-es6-let-and-const-in-switch-blocks-react-redux-reducers-c0b01b37d748



## 20. 資料夾切分的補充
https://github.com/erikras/ducks-modular-redux?fbclid=IwAR2jiwzX1sRET7kLhwr0sDVx0F81yhGZyf8KN_V6eh5kAkqkmJCRebIVRDs
