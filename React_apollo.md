# React-Apollo Note

## useMutation 取得回傳值

1. [官方範例，使用起來無法取得data](https://www.apollographql.com/docs/react/api/react-hooks/#usemutation)
2. [社群討論](https://spectrum.chat/apollo/react-apollo/usemutation-always-returns-undefined~d5b587ed-28cf-4d41-804d-000726e0effc)

```js
// 無法取得 feedbackData
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
      console.log('fff', feedbackData);
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
  b. addBookMutation 執行後，會立刻更新 hook，`data, loading, called` 為 `undefined true true`  
  c. addBookMutation 取得資料回來後，會再更新 hook，`data, loading, called` 為 `{addBook: {…}} false true`  
  d. 若再次執行 addBookMutation，會重複 b.-c.   

```js
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
  
  console.log('data, loading, called ', data, loading, called); // undefined false false  => 
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
