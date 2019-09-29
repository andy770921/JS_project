# 使用 React Context 

Ref: https://youtu.be/6RhOzQciVwI
useEffect 補充: https://overreacted.io/zh-hant/a-complete-guide-to-useeffect/

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
## 6. 可引入用複數 context 資料庫 ， 包兩層 privider、 也可包兩層 consumer
contexts 資料夾， 其下創建 AuthContext.js ，新增如下
```js
import React, { Component, createContext } from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    isAuthenticated: false
  }
  toggleAuth = () => {
    this.setState({ isAuthenticated: !this.state.isAuthenticated });
  }
  render() { 
    return (
      <AuthContext.Provider value={{...this.state, toggleAuth: this.toggleAuth}}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
 
export default AuthContextProvider;
```
App.js ，新增如下，包兩層```<ContextProvider>``` 即可，內外層順序沒差
```js
import React from 'react';
import BookList from './components/BookList';
import Navbar from './components/Navbar';
import ThemeContextProvider from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <AuthContextProvider>
          <Navbar />
          <BookList />
          <ThemeToggle />
        </AuthContextProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
```

# 加上 hook 的使用

## 1. 新專案初始化資料庫及操作資料的函數，在專案新增 contexts 資料夾， 在資料夾下增檔案 BookContext.js 如下
- 要先打指令 ```npm install uuid```，之後可用 隨機 id 產生函數

```js
import React, { createContext, useState } from 'react';
import uuid from 'uuid/v1';

export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, setBooks] = useState([
    {title: 'name of the wind', author: 'patrick rothfuss', id: 1},
    {title: 'the final empire', author: 'brandon sanderson', id: 2},
  ]);
  const addBook = (title, author) => {
    setBooks([...books, {title, author, id: uuid()}]);
  };
  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  }

  return (
    <BookContext.Provider value={{ books, addBook, removeBook }}>
      {props.children}
    </BookContext.Provider>
  );
}
 
export default BookContextProvider;
```
## 2. app.js 修改如下，用 Provider 引入 context 的資料及函數
```js
import React from 'react';
import Navbar from './components/Navbar';
import BookContextProvider from './contexts/BookContext';

function App() {
  return (
    <div className="App">
      <BookContextProvider>
        <Navbar />
      </BookContextProvider>
    </div>
  );
}

export default App;
```

## 3. 在專案新增 components 資料夾， 在資料夾下增檔案 Navbar.js 如下，用 useContext 拉資料進來

```js
import React, { useContext } from 'react';
import { BookContext } from '../contexts/BookContext';

const Navbar = () => {
  const { books } = useContext(BookContext);
  return (
    <div className="navbar">
      <h1>Ninja Reading List</h1>
      <p>Currently you have {books.length} books to get through...</p>
    </div>
  );
}
 
export default Navbar;
```

## 4. 確認資料是否正確傳遞

網頁會出現內容
```
Ninja Reading List
Currently you have 2 books to get through...
```
## 5. 新增資料的做法

App.js 修改如下
```js
import React from 'react';
import Navbar from './components/Navbar';
import BookContextProvider from './contexts/BookContext';
import NewBookForm from './components/NewBookForm';

function App() {
  return (
    <div className="App">
      <BookContextProvider>
        <Navbar />
        <NewBookForm />
      </BookContextProvider>
    </div>
  );
}

export default App;
```
components 下新增 NewBookForm.js 如下
```js
import React, { useContext, useState } from 'react';
import { BookContext } from '../contexts/BookContext';

const NewBookForm = () => {
  const { addBook } = useContext(BookContext);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(title, author);
    addBook(title, author);
    setTitle('');
    setAuthor('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="book title" value={title}
        onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="author name" value={author}
        onChange={(e) => setAuthor(e.target.value)} />
      <input type="submit" value="add book" />
    </form>
  );
}
 
export default NewBookForm;
```
## 6. 使用 Reducer 的做法

BookContext.js 移除不必要的程式碼 ，剩餘如下

```js
import React, { createContext } from 'react';

export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, setBooks] = useState([
    {title: 'name of the wind', author: 'patrick rothfuss', id: 1},
    {title: 'the final empire', author: 'brandon sanderson', id: 2},
  ]);

  return (
    <BookContext.Provider value={{ books }}>
      {props.children}
    </BookContext.Provider>
  );
}
 
export default BookContextProvider;
```

將 useState 改為 useRuducer，重新 import ，修改如下
```js
import React, { createContext, useReducer } from 'react';
import { bookReducer } from '../reducers/bookReducer';

export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, dispatch] = useReducer(bookReducer, [
    {title: 'name of the wind', author: 'patrick rothfuss', id: 1},
    {title: 'the final empire', author: 'brandon sanderson', id: 2},
  ]);
  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
}
 
export default BookContextProvider;
```

src 資料夾下新增 reducers 資料夾， 再新增 bookReducer.js，內容如下
```js
import uuid from 'uuid/v4';

export const bookReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, {
        title: action.book.title, 
        author: action.book.author, 
        id: uuid()}
      ]
    case 'REMOVE_BOOK':
      return state.filter(book => book.id !== action.id);
    default:
      return state;
  }
} 
```


將 components 下的 NewBookForm.js ，修改如下
```js
import React, { useContext, useState } from 'react';
import { BookContext } from '../contexts/BookContext';

const NewBookForm = () => {
  const { dispatch } = useContext(BookContext);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_BOOK', book: { title, author }});
    setTitle('');
    setAuthor('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="book title" value={title}
        onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="author name" value={author}
        onChange={(e) => setAuthor(e.target.value)} />
      <input type="submit" value="add book" />
    </form>
  );
}
 
export default NewBookForm;
```
也可在 JSX 中，用 in-line 寫法，將 dispatch 寫在裡面，如下
```js
<li onClick={() => dispatch({ type: 'REMOVE_BOOK', id: book.id })}>
```

## 7. 將資料存進 localstorage 的做法: a. 剛開始程式時，如果 localstorage 已有值，設定預設值。b. [books] 資料刷新時，重設 localstorage
```js
import React, { createContext, useReducer, useEffect } from 'react';
import { bookReducer } from '../reducers/bookReducer';

export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, dispatch] = useReducer(bookReducer, [], () => {
    const localData = localStorage.getItem('books');
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);
  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
}
 
export default BookContextProvider;
```
