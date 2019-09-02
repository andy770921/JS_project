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
## 3. src 資料夾下，創 contexts 資料夾， 其下創建 ThemeContext.js 內打如下程式碼，初始化存放庫，與設定傳出狀態。進一步設定，也可傳出函數
- Note: class 可取名為 XxxxxProvider  
- Note: {{...this.state}} is used instead of {this.state} in order to pass event handler to child components along with state. it'll show on Tutorial #6 later.  
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
進一步設定: 
```js
import React, { Component, createContext } from 'react';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
  state = {
    isLightTheme: true,
    light: { syntax: '#555', ui: '#ddd', bg: '#eee' },
    dark: { syntax: '#ddd', ui: '#333', bg: '#555'}
  }
  toggleTheme= () => {
    this.setState({ isLightTheme: !this.state.isLightTheme });
  }
  render() { 
    return (
      <ThemeContext.Provider value={{...this.state}, toggleTheme: this.toggleTheme}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
 
export default ThemeContextProvider;
```
## 4. 子層組件加入 import 及 static contextType = ThemeContext; 利用 this.context 取出資料庫 state 資料，或是取出函數
Navbar.js 內打如下程式碼
```js
import React, { Component } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

class Navbar extends Component {
  static contextType = ThemeContext;
  render() {
    console.log(this.context);
    const { isLightTheme, light, dark, toggleTheme } = this.context;
    const theme = isLightTheme ? light : dark;
    return ( 
      <nav style={{ background: theme.ui, color: theme.syntax }}>
        <h1>Context App</h1>
        <button onClick={toggleTheme}>Toggle the theme</button>
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
看看 console.log 是否如預期出現資料庫的 state
## 5. 取出資料庫 state 資料方法二: 用 <ThemeContext.Consumer>
- 與方法一比較的優點: 1. 可在 fucntion component 使用 2. 可在同個子組件加入不同的 context
```js
import React, { Component } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

class Navbar extends Component {
  // static contextType = ThemeContext;
  render() {
    return ( 
      <ThemeContext.Consumer>{(context) => {
        const { isLightTheme, light, dark } = context;
        const theme = isLightTheme ? light : dark;
        return (
          <nav style={{ background: theme.ui, color: theme.syntax }}>
            <h1>Context App</h1>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </nav>
        )
      }}</ThemeContext.Consumer>
    );
  }
}
 
export default Navbar;
```
