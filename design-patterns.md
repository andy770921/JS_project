# Design Patterns

## All pattern reference:
- https://www.patterns.dev/posts/rendering-patterns/
## Observer Pattern（觀察者模式）
- Ref: https://medium.com/starbugs/%E9%96%8B%E6%BA%90%E5%B0%88%E6%A1%88%E8%AE%80%E8%B5%B7%E4%BE%86-%E5%BE%9E-swr-%E4%BE%86%E7%9C%8B%E7%9C%8B%E5%AF%A6%E5%8B%99%E4%B8%8A%E7%9A%84-observer-pattern-%E8%A7%80%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F-46c16c6fd724
```js
class Subject {
  constructor() {
    this.state = {};
    this.observers = [];
  }

  registerObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(targetObserver) {
    this.observers = this.observers.filter(
      observer => observer !== targetObserver
    );
  }

  updateState(state) {
    this.state = {...this.state, ...state};
    this.broadcastState();
  }

  broadcastState() {
    this.observers.forEach((observer) => {
      observer.onUpdate({...this.state});
    });
  }
}

const observerA = {
  data: [],
  onUpdate: function(data) {
    this.data = data;
  }
}
const observerB = {
  data: [],
  onUpdate: function(data) {
    this.data = data;
  }
}

const subject = new Subject();
subject.registerObserver(observerA);
subject.registerObserver(observerB);
subject.updateState({ message: '資料更新囉！' });

console.log('observerA', observerA.data); // observerA { message: '資料更新囉！' }
console.log('observerB', observerB.data); // observerB { message: '資料更新囉！' }

subject.removeObserver(observerA);
console.log('=== 取消 observerA 的訂閱 ===')
subject.updateState({ message: '更新的資料來囉！' });

console.log('observerA', observerA.data); // observerA { message: '資料更新囉！' }
console.log('observerB', observerB.data); // observerB { message: '更新的資料來囉！' }
```

## Decorator Pattern（裝飾者模式）
- Ref: https://medium.com/starbugs/%E7%94%A8-javascript-%E7%8E%A9%E8%BD%89%E8%A8%AD%E8%A8%88%E6%A8%A1%E5%BC%8F-%E4%B8%80%E5%B1%A4%E5%8F%88%E4%B8%80%E5%B1%A4%E7%9A%84-decorator-pattern-%E8%A3%9D%E9%A3%BE%E8%80%85%E6%A8%A1%E5%BC%8F-afad7581f6e
- Before:
```js
// Original Version
class Printer {
  print(text) {
    console.log(text);
  }
}
const printer = new Printer();
printer.print('something'); // something

// Extend functionality without using Decorator Pattern
class Printer {
  print(text) {
    console.log(`%c${text}`,'color: yellow;font-size: 36px;');
  }
}

const printer = new Printer();
printer.print('something'); // something 黃色大字
```
- After:
```js
// Brief Version
class Printer {
  print(text) {
    console.log(`%c${text}`,'color: yellow;font-size: 36px;');
  }
}
const yellowStyle = (printer) => ({
  ...printer,
  print: (text = '', style = '') => {
    printer.print(text, `${style}color: yellow;`);
  }
});

const boldStyle = (printer) => ({
  ...printer,
  print: (text = '', style = '') => {
    printer.print(text, `${style}font-weight: bold;`);
  }
});

const bigSizeStyle = (printer) => ({
  ...printer,
  print: (text = '', style = '') => {
    printer.print(text, `${style}font-size: 36px;`);
  }
});

const printer = bigSizeStyle(boldStyle(yellowStyle(new Printer())));
printer.print('something'); // something 黃色大字粗體

// Correct Version
const copyObj = (originObj) => {
  const originPrototype = Object.getPrototypeOf(originObj);
  let newObj = Object.create(originPrototype);
   
  const originObjOwnProperties = Object.getOwnPropertyNames(originObj);
  originObjOwnProperties.forEach((property) => {
    const prototypeDesc = Object.getOwnPropertyDescriptor(originObj, property);
     Object.defineProperty(newObj, property, prototypeDesc);
  });
  
  return newObj;
}

const yellowStyle = (printer) => {
  const decorator = copyObj(printer);

  decorator.print = (text = '', style = '') => {
    printer.print(text, `${style}color: yellow;`);
  };

  return decorator;
};
```
- Decorator Pattern HOC example:
```js
const publishArticle = () => {
  console.log('發布文章');
};

const publishFacebook = (publish) => (...args) => {
  publish(args);
  console.log('發 Facebook 通知');
};

const publishIG = (publish) => (...args) => {
  publish(args);
  console.log('發 IG 通知');
};

const publishLine = (publish) => (...args) => {
  publish(args);
  console.log('發 Line 通知');
};

const publishArticleAndFacebookAndIgAndLine = publishFacebook(publishIG(publishLine(publishArticle)));
```

## Chain of Responsibility Pattern（責任鏈模式）
- Ref: https://medium.com/starbugs/%E7%94%A8-javascript-%E7%8E%A9%E8%BD%89%E8%A8%AD%E8%A8%88%E6%A8%A1%E5%BC%8F-%E5%90%84%E5%8F%B8%E5%85%B6%E8%81%B7%E7%9A%84-chain-of-responsibility-pattern-%E8%B2%AC%E4%BB%BB%E9%8F%88%E6%A8%A1%E5%BC%8F-864f394cce13

- Before: 
  違背 Open/close（開放封閉）原則: 如果要增加一個對錯誤碼 405 的處理邏輯（要擴充新功能），那就得直接修改 httpErrorHandler 中的程式碼（修改原本正確的邏輯）
  違背 Single responsibility（單一職責）原則: 把不同錯誤的處理邏輯通通寫在 httpErrorHandler 中，導致我可能在只想要修改對錯誤碼為 400 的邏輯時，還得閱讀一堆不相關的程式碼。
```js
 const httpErrorHandler = (error) => {
   const errorStatus = error.response.status;
   if (errorStatus === 400) {
     console.log('安安，你是不是給了我奇怪的東西？');
   }
   
   if (errorStatus === 401) {
     console.log('先登入行不？');
   }
   
   if (errorStatus === 403) {
     console.log('想偷幹壞事？');
   }
   
   if (errorStatus === 404) {
     console.log('這裡什麼都沒有');
   }
};
```
- After using strategy pattern: 
```js
const response400 = () => {
  console.log('安安，你是不是給了我奇怪的東西？');
};

const response401 = () => {
  console.log('先登入行不？');
};

const response403 = () => {
  console.log('想偷幹壞事？');
};

const response404 = () => {
  console.log('這裡什麼都沒有');
};

const httpErrorHandler = (error) => {
  const errorStatus = error.response.status;
  if (errorStatus === 400) {
    response400();
  }
   
  if (errorStatus === 401) {
    response401();
  }
   
  if (errorStatus === 403) {
    response403();
  }
   
  if (errorStatus === 404) {
    response404();
  }
};
```

- After using Chain of Responsibility Pattern（責任鏈模式）: 
```js
const response400 = (error) => {
  if (error.response.status !== 400) return 'next';
  console.log('安安，你是不是給了我奇怪的東西？');
};

const response401 = (error) => {
  if (error.response.status !== 401) return 'next';
  console.log('先登入行不？');
};

const response403 = (error) => {
  if (error.response.status !== 403) return 'next';;
  console.log('想偷幹壞事？');
};

const response404 = (error) => {
  if (error.response.status !== 404) return 'next';;
  console.log('這裡什麼都沒有（雙手一攤');
};

const httpErrorHandler = (error) => {
  const errorHandlerChain = [
    response400,
    response401,
    response403,
    response404
  ];
  
  for(errorHandler of errorHandlerChain) {
    const result = errorHandler(error);
    if (result !== 'next') break;
  };
};
```

- Final Version:
```js
class Chain {
  constructor(handler) {
    this.handler = handler;
    this.successor = null;
  }

  setSuccessor(successor) {
    this.successor = successor;
    return this;
  }

  passRequest(...args) {
    const result = this.handler(...args);
    if (result === 'next') {
      return this.successor && this.successor.passRequest(...args);
    }
    return result;
  }
}

const httpErrorHandler = (error) => {
  const chainRequest400 = new Chain(response400);
  const chainRequest401 = new Chain(response401);
  const chainRequest403 = new Chain(response403);
  const chainRequest404 = new Chain(response404);

  chainRequest400.setSuccessor(chainRequest401);
  chainRequest401.setSuccessor(chainRequest403);
  chainRequest403.setSuccessor(chainRequest404);

  chainRequest400.passRequest(error);
};
```

- Note: 在 chain of responsibility 裡，鏈中的每個節點仍然可以在不屬於自己的時候先做些什麼，再交給下個節點：
```js
const response400 = (error) => {
  if (error.response.status !== 400) {
    // 先做些什麼事情...
    return 'next';
  }
  console.log('安安，你是不是給了我奇怪的東西？');
};
```
## 疊代器模式 Iterator
- 與責任鏈模式有些相似：https://pjchender.dev/pattern/design-pattern-iterator/

## 策略模式 Strategy
- https://pjchender.dev/pattern/design-pattern-strategy

## Factory
- Error example by TS class: https://www.youtube.com/watch?v=zpwrmMgGz3w
