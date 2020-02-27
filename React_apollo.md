# React-Apollo Note

## useMutation 取得回傳值

1. [官方範例，使用起來無法取得data](https://www.apollographql.com/docs/react/api/react-hooks/#usemutation)
2. [社群討論](https://spectrum.chat/apollo/react-apollo/usemutation-always-returns-undefined~d5b587ed-28cf-4d41-804d-000726e0effc)

```js

// 無法直接取得 feedbackData
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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
  };
  
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

## useSubscription 和 GraphQL 的 subscription
1. 使用即時聊天室可使用此功能
2. GraphQL 的 subscription: https://www.howtographql.com/graphql-js/7-subscriptions/
3. useSubscription: https://www.apollographql.com/docs/react/data/subscriptions/
