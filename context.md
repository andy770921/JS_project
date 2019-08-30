# 使用 React Context 

Ref: https://youtu.be/6RhOzQciVwI

## 1. 終端機打指令如下

## 2. src 資料夾下，創 index.js ，內打如下程式碼
```js
import React from 'react';
import ReactDOM from 'react-dom';
import ThemeContextProvider from './contexts/ThemeContext';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
         <Navbar />
      </ThemeContextProvider>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```
src 資料夾下，創 components 資料夾 ，其下創建 Navbar.js 內打如下程式碼
```js
import React, { Component } from 'react';

class Navbar extends Component {
  render() { 
    console.log(this.props);
    return ( 
      <nav>
        <h1>Context App</h1>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    );
  }
}
 
export default Navbar;
```
## 3. src 資料夾下，創 contexts 資料夾， 其下創建 ThemeContext.js 內打如下程式碼，初始化存放庫
Note: class 可取名為 XxxxxProvider  
Note: {{...this.state}} is used instead of {this.state} in order to pass event handler to child components along with state. it'll show on Tutorial #6 later.  
```js
import React, { Component, createContext } from 'react';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
  state = {
    isLightTheme: true,
    light: { syntax: '#555', ui: '#ddd', bg: '#eee' },
    dark: { syntax: '#ddd', ui: '#333', bg: '#555'}
  }
  render() { 
    return (
      <ThemeContext.Provider value={{...this.state}}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
 
export default ThemeContextProvider;
```
## 4. 測試與檢查
看看```console.log```有沒出現存放庫中的state
```js
console.log(this.props);
```
