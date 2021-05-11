# React-Apollo Note

## 為什麼需要 BFF 

https://medium.com/starbugs/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC%E8%80%85%E8%A9%B2%E8%B2%A0%E8%B2%AC%E5%AF%AB-api-endpoints-%E5%97%8E-the-backend-for-frontend-pattern-bff-in-microservices-world-1368362c141c

## useQuery 文字說明

在一進入頁面，就取資料回來的情境下，可用 `useQuery` 

使用法如下
```js
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_BOOKS_QUERY = gql`
  {
    books {
      name
      id
    }
  }
`;

function BookList() {
  // const apolloStatusObject = useQuery(GET_BOOKS_QUERY);
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);
  return <p>Test</p>;
}
export default BookList;
```

- 使用 `useQuery` 後，會立刻回傳一個物件。在未來某一個時間點，useQuery 回傳會回傳新的物件，引發 react component 再渲染一次。  
- 物件的內容，可使用 JS 解構賦值的方式，取出內部的狀態 key，對應到的值，比如可以取出 loading ，這個狀態是布林值。
- 首次渲染畫面的時候，useQuery 的狀態分別是：`{ loading: true, error: undefined, data: undefined }` 代表的意義是，useQuery 已發送請求給 graphQL server，並在等待資料回來，在 loading 中
- 未來某一個時間點，資料回來或是收到錯誤，會回傳新的物件，進而讓 react-hook 再次渲染畫面。若正確收到資料，useQuery 的狀態分別是：`{ loading: false, error: undefined, data: dataObject{...} }` 代表的意義是，useQuery 已不在 loading 中，並可讓我們取到 data 物件。若收到錯誤，useQuery 的狀態分別是：`{ loading: false, error: errObject{...} , data: undefined }`，可針對錯誤進行處理
- 以下範例 console.log 可幫助理解，共發生兩次渲染
<div align="center" >
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_apollo/useQuery_1.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_apollo/useQuery_2.png"/>
</div>


## useLazyQuery 文字說明
在一進入頁面不取資料，使用者操作才取資料的情境下，可用 `useLazyQuery` 

使用法如下
```js
import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_BOOK_QUERY = gql`
  query($id: ID!) {
    book(id: $id) {
      name
      genre
      id
      author {
        name
        age
      }
    }
  }
`;

function BookDetails() {
  const [selectedBookId, setSelectedBookId] = useState(null);
  
  // const apolloFnAndStatusArray = useLazyQuery(GET_BOOK_QUERY, { variables: { id: selectedBookId } });
  const [getBookQuery, { error, data: bookQueryData }] = useLazyQuery(GET_BOOK_QUERY, {
    variables: { id: selectedBookId }
  });
  
  const handleChange = e => {
    setSelectedBookId(e.target.value);
    getBookQuery();
  };
  
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <h2> Select Book for Details: </h2>
      <select onChange={handleChange}>
        <option> Select Book </option>
        {[{name: 'book1', id: 1}, {name: 'book2', id: 2}].map(book => (
          <option key={book.id} value={book.id}>
            {book.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BookDetails;
```

- 使用 `useLazyQuery` 後，會立刻回傳一個陣列。未來若依不同情境變更了狀態， useLazyQuery 會回傳新的陣列，引發 react component 再渲染。  
- 陣列的內容，可使用 JS 陣列解構賦值的方式，重新命名陣列元素名稱，陣列的第一個元素為函數、第二個元素為物件，不論取什麼名稱，功能不變。如可以取名為 `[getBookQuery, bookObj]` ，也可取為 `[bananaFn, bananaObject]`。
- 可再將陣列取出來的第二個元素，再解構賦值，如 
```js
const [getBookQuery, { loading, error, data }] = useLazyQuery(GET_BOOK_QUERY, { variables: { id: selectedBookId } });
```
- 首次渲染畫面的時候，上述 `loading, error, data` 分別為 `false, undefined, undefined`
- 當呼叫陣列第一個元素回傳的函式 (`getBookQuery`) 時，開始發送請求給 graphQL server，這時上述 `loading, error, data` 更新為 `true, undefined, undefined`
- 當收到資料或是收到錯誤時，上述 `loading, error, data` 更新為 `false, undefined, dataObject{...}` 或 `false, errObject{...}, undefined`
- 以下範例 console.log 可幫助理解，一進入發生畫面發生了一次渲染，在使用者選完下拉選單後，再發生兩次渲染
<div align="center" >
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_apollo/useLazyQuery_1.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_apollo/useLazyQuery_2.png"/>
</div>

## useMutation 文字說明
- 使用 `useMutation` 後，會立刻回傳一個陣列。未來若依不同情境變更了狀態， useMutation 會回傳新的陣列，引發 react component 再渲染。  
- 陣列的內容，可使用 JS 陣列解構賦值的方式取出，像 useLazyQuery 一樣
- 這個陣列的第一個元素是函式。觸發這個函式，就會開始發送請求給 graphQL server
- 這個陣列的第二個元素是物件。可知道各個時間點的 `loading, error, data` 狀態
<div align="center" >
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_apollo/useMutation_1.png"/>
</div>

## useQuery 帶變數與取得回傳值
若 hook 因為 props 變動或其他變動而多次刷新，並不會每刷新一次就打一次 API
```js
// 封裝 context provider 的範例
const shopId = 100;
export const ShopCategoryMapProvider = ({ children }) => {
    const [categoryMap, setCategoryMap] = useState(new Map());

    const { data } = useQuery(SHOP_CATEGORY_LIST, {
        variables: { shopId },
    });
    const {
        shopCategoryList: { categoryList },
    } = data || { shopCategoryList: { categoryList: [] } };
    const { id: defaultCategoryId } = categoryList[0] || { id: 0 };

    useEffect(() => {
        setCategoryMap(categoryList);
    }, [categoryList]);

    const context = useMemo(
        () => ({
            defaultCategoryId,
            categoryMap,
            setCategoryMap,
        }),
        [defaultCategoryId, categoryMap]
    );

    return <ShopCategoryMapContext.Provider value={context}>{children}</ShopCategoryMapContext.Provider>;
};

// Query 寫法如下

import gql from 'graphql-tag';

export const SHOP_CATEGORY_LIST = gql`
    query ShopCategoryList($shopId: Int!) {
        shopCategoryList(shopId: $shopId) {
            categoryList {
                id
                name
            }
            count
        }
    }
`;

// ApolloClient 完整的 code 如下

import fetch from 'cross-fetch';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';

const apolloClient = new ApolloClient({
    link: createHttpLink({
        uri: `${apiConfig?.xxx}/ooo/graphql?shopId=${shopId}&lang=${locale}`,
        fetch,
        // useGETForQueries: true,  若要設定 http request 是 GET 可加入此設定
    }),
    cache: new InMemoryCache(),
});

const ShopCategory = ({
    moduleId // 部分資料用 props 傳下來
}) => (
    <Router>
        <ApolloProvider client={apolloClient}>
            <ModuleConfigContext.Provider value={{ moduleId }}> // 直接放進 context
                <ShopCategoryMapProvider>   // 對 context 加邏輯處理後的 HOC 
                    <JSXComponent />        // 畫面相關的 Component
                </ShopCategoryMapProvider>
            </ModuleConfigContext.Provider>
        </ApolloProvider>
    </Router>
);

export default ShopCategory;
```
## useQuery 使用 fetchMore 實作無限下拉卷軸，及封裝 useQuery
1. 實際輸出 fetchMoreProducts 給外部使用
2. 在觸發 fetchMore 時，若加入 `notifyOnNetworkStatusChange: true` 設定， 會 a. 改變 networkStatus 號碼變成 `3` b. 改變 loading 變成 `false`
3. 外部可以判斷 loading 狀態決定是否使用 fetchMoreProducts
4. Ref: https://www.apollographql.com/docs/react/data/pagination/
5. Ref: https://github.com/apollographql/apollo-client/blob/master/src/core/networkStatus.ts
6. Ref: https://www.apollographql.com/docs/react/data/queries/
```js

import { useQuery } from '@apollo/react-hooks';
import { SC_LIST, ShopCategory } from '../gqls';

const useFetchProducts = ({
    shopId,
    categoryId,
    orderBy,
}: {
    shopId: number;
    categoryId: number;
    orderBy: string;
}) => {
    const { loading: isFetching, data, fetchMore, networkStatus } = useQuery<ShopCategory>(SC_LIST, {
        variables: { shopId, categoryId, startIndex: 0, fetchCount: 40, orderBy },
        notifyOnNetworkStatusChange: true,
    });

    const {
        shopCategory: {
            salePageList: { salePageList, totalSize, orderByDef, shopCategoryName },
        },
    } =
        data ||
        ({
            shopCategory: { 
                salePageList: { salePageList: [], totalSize: 0, orderByDef: '', shopCategoryName: '' } 
            },
        } as ShopCategory);

    const productList = salePageList.map(({ salePageId: id, salePageCode, ...productData }) => ({
        ...productData,
        id,
        link: `/xxx/ooo/${salePageCode || id}`,
        currency: '$',
    }));

    const fetchMoreProducts = () =>
        fetchMore({
            variables: { startIndex: salePageList.length },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                
                return {
                    ...prev,
                    shopCategory: {
                        ...prev.shopCategory,
                        salePageList: {
                            ...prev.shopCategory.salePageList,
                            salePageList: [
                                ...prev.shopCategory.salePageList.salePageList,
                                ...fetchMoreResult.shopCategory.salePageList.salePageList,
                            ],
                        },
                    },
                };
            },
        });

    return { isFetching, totalSize, productList, shopCategoryName, fetchMoreProducts };
};

export default useFetchProducts;
```

## useMutation 取得回傳值

1. [官方範例，使用起來無法取得data](https://www.apollographql.com/docs/react/api/react-hooks/#usemutation)
2. [社群討論](https://spectrum.chat/apollo/react-apollo/usemutation-always-returns-undefined~d5b587ed-28cf-4d41-804d-000726e0effc)

```js

// 錯用時無法直接取得 feedbackData
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ADD_BOOK_MUTATION = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
      id
      author {
        name
      }
    }
  }
`;


function AddBook() {
  const [addBookMutation, { data: feedbackData }] = useMutation(ADD_BOOK_MUTATION);
  const [bookData, setBookData] = useState({
    name: 'abc',
    genre: 'def',
    authorId: '123'
  });
  const handleSubmit = e => {
    e.preventDefault();
    addBookMutation({
      variables: {
        name: bookData.name,
        genre: bookData.genre,
        authorId: bookData.authorId
      }
    });
    console.log('feedbackData', feedbackData);
  };
  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div>
        {/* .......... */}
      </div>
      <button>+</button>
    </form>
  );
}
export default AddBook;
```

```js

// 可以取得 feedbackData
function AddBook() {
    const [addBookMutation] = useMutation(ADD_BOOK_MUTATION, {
    onCompleted: feedbackData => {
      console.log('feedbackData', feedbackData);
    }
  });
  const [bookData, setBookData] = useState({
    name: 'abc',
    genre: 'def',
    authorId: '123'
  });
  const handleSubmit = e => {
    e.preventDefault();
    addBookMutation({
      variables: {
        name: bookData.name,
        genre: bookData.genre,
        authorId: bookData.authorId
      }
    });
  };
  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div>
        {/* .......... */}
      </div>
      <button>+</button>
    </form>
  );
}
```
3. 無法取得回應 Data 狀況，原因為要掌握 useMatation 更新 hook 的時間點，才能正確取到資料  
  a. 一載入頁面，`data, loading, called` 為 `undefined false false`  
  b. addBookMutation 執行後，會更新 hook，下一次的 hook `data, loading, called` 為 `undefined true true`  
  c. addBookMutation 取得資料回來後，會再更新 hook，`data, loading, called` 為 `{addBook: {…}} false true`  
  d. 若再次執行 addBookMutation，會重複 b.-c.   

```js

function AddBook() {
  const [addBookMutation, { data, loading, called }] = useMutation(ADD_BOOK_MUTATION);
  const [bookData, setBookData] = useState({
    name: 'abc',
    genre: 'def',
    authorId: '123'
  });
  const handleSubmit = e => {
    e.preventDefault();
    addBookMutation({
      variables: {
        name: bookData.name,
        genre: bookData.genre,
        authorId: bookData.authorId
      }
    });
    // 無法直接取得 data
    // console.log('data', data);
  };
  // 未來刷新兩次後，可取得 data
  console.log('data, loading, called ', data, loading, called); 
  // undefined false false  => undefined true true => {addBook: {…}} false true
  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div>
        {/* .......... */}
      </div>
      <button>+</button>
    </form>
  );
}
export default AddBook;

```


## useLazyQuery 在使用者操作後取得值
useLazyQuery 更新 hook 的時間點如下  
1. 一載入頁面，`data, loading, called, selectedId` 為 `undefined false false null`  
2. getBookQuery 執行後，會更新 hook，連同 useState 的 setXXX 更新，一起進入下次的 hook `data, loading, called, selectedId` 為 `undefined true true 2`  
3. getBookQuery 取得資料回來後，會再更新 hook，`data, loading, called, selectedId` 為 `{book: {…}} false true 2`  
4. 若再次執行 getBookQuery，會重複 b.-c.   

```js

import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_BOOK_QUERY = gql`
  query($id: ID!) {
    book(id: $id) {
      name
      genre
      id
      author {
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

function BookDetails() {
  const [selectedId, setSelectedId] = useState(null);
  const [getBookQuery, { called, loading, data }] = useLazyQuery(GET_BOOK_QUERY, {
    variables: { id: selectedId }
  });
  const handleChange = e => {
    setSelectedId(e.target.value);
    getBookQuery();
  };
  console.log('data, loading, called, selectedId', data, loading, called, selectedId);
  // undefined false false null  => undefined true true 2 => {book: {…}} false true 2 
  return (
    <div>
      <h2> Select Book for Details: </h2>
      <select onChange={handleChange}">
        <option> Select Book </option>
        {[{name: "book1", id: "1"}, {name: "book2", id: "2"}].map(book => (
          <option key={book.id} value={book.id}>
            {book.name}
          </option>
        ))}
      </select>
      <div id="book-details">
        {called && !loading ? (
          <>
            <p>Book Name: {data.book.name}</p>
            <p>Book Genre: {data.book.genre}</p>
            <p>Book Author: {data.book.author.name}</p>
            <p>Book Author's age: {data.book.author.age}</p>
            <p>Other Books from the Same Author:</p>
            <ul>
              {data.book.author.books
                .filter(book => book.id !== data.book.id)
                .map(book => (
                  <li key={book.id}>{book.name}</li>
                ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default BookDetails;


```
## SSR 可能出現的 Bug
1. fetch is not found globally and no fetcher passed, to fix pass a fetch => 需要安裝 fetch 但一般的 node-fetch 裝完後會出現 2. 的錯誤
2. Error: unable to locate global object => 已測試出，使用原官方的 apollo-client 加上 cross-fetch 可解決，用 apollo-boost 或 node-fetch 都會有報錯
3. Note: apollo-client 的 new ApolloClient 和 apollo-boost 的 new ApolloClient 不同，來源自 apollo-client 的，可加 link
4. Ref: https://github.com/apollographql/apollo-link/issues/513
```js
// 可用的解法
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import fetch from 'cross-fetch';
import { createHttpLink } from 'apollo-link-http';

const apolloClient = new ApolloClient({
    link: createHttpLink({
        uri: 'http://demo.tw/graphql',
        fetch,
        // useGETForQueries: true,  若要設定 http request 是 GET 可加入此設定
    }),
    cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <JSXComponent /> 
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
```

## useSubscription 和 GraphQL 的 subscription
1. 使用即時聊天室可使用此功能
2. GraphQL 的 subscription: https://www.howtographql.com/graphql-js/7-subscriptions/
3. useSubscription: https://www.apollographql.com/docs/react/data/subscriptions/
