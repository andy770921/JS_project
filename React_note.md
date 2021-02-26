# React Note
## 檢查 code 品質
https://app.codacy.com/projects

## Ryan React 筆記
https://hackmd.io/@jackblackevo/SyQEEl0tf#React-Context

## 實作 React
1. https://pomb.us/build-your-own-react/
2. COSCUP: https://youtu.be/fqdOAPLLueo
3. 實作 React-hook: https://www.youtube.com/watch?v=9jWwO7McMbU&feature=youtu.be&t=9480
```js
// useState 取得最新變數 (影片 3.: https://youtu.be/9jWwO7McMbU?t=9928 )
// 以下無效
function useState(initVal){
  let _val = initVal;
  const state = _val; 
  const setState = newVal => {
    _val = newVal;
  }
  return [state, setState];
}

const [count, setCount] = useState(1);
console.log(count); // 1
setCount(2);
console.log(count); // 1

// 以下有效
function useState(initVal){
  let _val = initVal;
  const state = () => _val;
  const setState = newVal => {
    _val = newVal;
  }
  return [state, setState];
}

const [count, setCount] = useState(1);
console.log(count()); // 1
setCount(2);
console.log(count()); // 2
```

```js
// 封裝成 React library，將 useState 的狀態 (_val) 拉到高層，及完成 render 函式
const React = (function (){
  let _val;
  
  function useState(initVal){
    const state = _val || initVal;
    const setState = newVal => {
      _val = newVal;
    }
    return [state, setState];
  }
  
  function render(Component){
    const C = Component();
    C.render();
    return C;
  }
  
  return { useState, render };
})();

function Component(){
  const [count, setCount] = React.useState(1);
  
  return {
    render: () => console.log(count),
    click: () => setCount(count + 1),
  }
}

let App = React.render(Component); // 1
App.click();
App = React.render(Component); // 2
App.click();
App = React.render(Component); // 3
```

```js
// 將 useState 的狀態變成陣列，不同次呼叫 useState 時，可存取到對應的狀態
const React = (function (){
  let hooks = [];
  let idx = 0;
  
  function useState(initVal){
    const state = hooks[idx] || initVal;
    const _idx = idx;
    const setState = newVal => {
      hooks[_idx] = newVal;
    }
    idx++;
    return [state, setState];
  }
  
  function render(Component){
    idx = 0;
    const C = Component();
    C.render();
    return C;
  }
  
  return { useState, render };
})();

function Component(){
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: word => setText(word),
  }
}

let App = React.render(Component); // { count: 1, text: "apple" }
App.click();
App = React.render(Component); // { count: 2, text: "apple" }
App.type("pear");
App = React.render(Component); // { count: 2, text: "pear" }
```

```js
// 完成 useEffect，( 與 React 不同的是，在 render 前執行 )
const React = (function (){
  let hooks = [];
  let idx = 0;

  function useState(initVal){
    const state = hooks[idx] || initVal;
    const _idx = idx;
    const setState = newVal => {
      hooks[_idx] = newVal;
    }
    idx++;
    return [state, setState];
  }

  function useEffect(cb, depArray){
    const oldDep = hooks[idx];
    let hasChanged = true;
    if(oldDep){
      hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDep[i]));
      // Note: console.log(NaN === NaN)  false
      // Note: console.log(Object(NaN, NaN))  true
    }
    if (hasChanged) cb();
    hooks[idx] = depArray;
    idx++;
  }

  function render(Component){
    idx = 0;
    const C = Component();
    C.render();
    return C;
  }
  return { useState, useEffect, render };
})();

function Component(){
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  React.useEffect(()=>{
    console.log("hello world");
  }, [count]);

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: word => setText(word),
  }
}

let App = React.render(Component); // hello world  { count: 1, text: "apple" }
App.click();
App = React.render(Component); // hello world   { count: 2, text: "apple" }
App.type("pear");
App = React.render(Component); // { count: 2, text: "pear" }
```

## React Lazy Evaluation (惰性求值) 的概念
Ref: https://overreacted.io/react-as-a-ui-runtime/#lazy-evaluation  
```js
function A(){
  console.log('A executed')
  return 'AAA'
}

function Page(isLogin, children) {
  if (!isLogin) {
    return 'not login';
  }
  if (typeof children === "function"){
    return children();   // JSX is a function
  }
  return children; 
}

console.log(Page(false, A));   // not login
console.log(Page(false, A())); // A executed   not login
// If we called A() directly, it would execute immediately regardless of whether Page wants to render them or not
```
## useMemo, useCallback, useRef
1. 沒有用 useCallback，函式每次都是不同的 address
2. 有用 useCallback，函式特定條件下才會是不同的 address，特定條件由 useCallback 第二個陣列參數內的值而定  
https://kentcdodds.com/blog/usememo-and-usecallback  
https://overreacted.io/a-complete-guide-to-useeffect/  
3. useMemo 意義：存下運算的結果 ( 緩存計算結果 ) 在特定 react 開給我們的記憶體位置，useMemo 第二個參數的陣列值改變，才重新運算第一個參數的函式。  
4. 兩大適用場景：a. 函式在每次 hook 都要執行，且跑很慢，可將函式運算值記憶。 b. 為了物件和陣列的 referential equality，確保物件或陣列的真實內容不變時，物件或陣列的 reference 跟上一次渲染相同。若這些物件或陣列，會被放在 useEffect 第二個參數的陣列時，需要這樣處理，避免不必要的觸發 useEffect   https://blog.webdevsimplified.com/2020-05/memoization-in-react/  
https://youtu.be/THL1OPn72vo?t=66   
5. useRef 意義：開出記憶體空間儲存某個值，在每次 render 時都會保存這個值，此值的初始值為 useRef 代入之參數，當這個值改變，不會重新渲染畫面。效果很像 useState，差別在不會因為值改變而渲染畫面
6. useRef 使用時機： 
- a. 想要保存前一次狀態，又不希望 react 幫我們值更新後自動重新渲染的話可用 
- b. 取得 HTML DOM element。用法為 useRef 初始化時不代參數，直接 useRef()，並在 JSX 內使用名為 ref 的 props，首次渲染畫面後會將此元件的 HTML DOM element 存在 useRef 的值
- c. 保留前次 state 的值，如下範例
```js
function Component() {
  const [name, setName] = useState('Kyle')
  const previousName = useRef(null)

  useEffect(() => {
    previousName.current = name
  }, [name])

  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      <div>{previousName.current} => {name}</div>
    </>
  )
}
```
https://blog.webdevsimplified.com/2020-05/use-ref/   
https://youtu.be/t2ypzz6gJm0?t=46  
7. Note: functional component 只有使用 useRef 才有辦法在兩次渲染間保留值（不會自動觸發重新渲染的值）。class component 不必使用 useRef，直接在 class 內新增變數即可。
## useLayoutEffect
https://medium.com/@xyz030206/%E9%97%9C%E6%96%BC-uselayouteffect-%E4%BD%A0%E9%9C%80%E8%A6%81%E7%9F%A5%E9%81%93%E7%9A%84%E4%BA%8B-89a0fba46116
## 記憶物件或陣列的 useDeepMemo hook (Ref: React Apollo)
https://github.com/benjamn/wryware/blob/main/packages/equality/src/equality.ts  
https://github.com/apollographql/apollo-client/blob/master/src/react/hooks/utils/useDeepMemo.ts  
https://github.com/apollographql/apollo-client/blob/master/src/react/hooks/utils/useBaseQuery.ts  

## 封裝 fetch API 的 Hook (Dan 文章推薦):
https://www.robinwieruch.de/react-hooks-fetch-data

## 使用 portal，處理 popup
優點:  
- 避免 css 外層 z-index 覆蓋影響到 popup overlay 所在的內層
- 事件傳遞符合虛擬 DOM 的內外層傳遞，真實瀏覽器畫面上不是內外層關係，是看 createPortal 寫的，產生在不同 div
https://www.youtube.com/watch?v=LyLa7dU5tp8

## useReducer + context vs Redux 差別：
https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-interactive-paycard-8ef9fe0d88e0
```
(useReducer + context) 仍然不能夠拿來完全取代 Redux，useReducer 適合用在維護小量的資料，而且不用在很深的元件之間傳遞。畢竟 useReducer 沒有像 react-redux 這麼方便的工具，當你用 Context API 傳遞資料時，所有的元件將會因為某個 Context 的資料改變而被強迫重新渲染。
```

## 使用 useMemo，封裝 context 方法 ( 使用 TypeScript )
1. 如下例，若使用 useMemo，可在 notAdd 函數觸發時，console.log 不會出現 re-render
2. 若打開註解，使用 provider value={{orderBy, setOrderBy}}，在 notAdd 函數觸發時，console.log 會出現 re-render
3. https://codesandbox.io/s/epic-lovelace-tkq8s
```js
import React, { createContext, useState, useMemo, useContext} from "react";

function MainComponent() {
  const {orderBy, setOrderBy} = useContext(OrderByProviderContext);
  console.log('re-render');
  const addX = () => {
    console.log("addX", orderBy);
    const i = orderBy.x + 1;
    setOrderBy({...orderBy, x:i});
  };
  const addY = () => {
    console.log("addY", orderBy);
    const i = orderBy.y + 1;
    setOrderBy({...orderBy, y:i});
  };
  const sameAddress = () => {
    console.log("sameAddress", orderBy);
    setOrderBy(orderBy);
  };
  const notAdd = () => {
    console.log("notAdd", orderBy);
    setOrderBy({...orderBy});
  };

  return (
    <div className="App">
      <h1>x: {orderBy.x}</h1>
      <h1>y: {orderBy.y}</h1>
      <button onClick={addX}>Click 1</button>
      <button onClick={addY}>Click 2</button>
      <button onClick={sameAddress}>Click 3</button>
      <button onClick={notAdd}>Click 4</button>
    </div>
  );
}



const OrderByProviderInitialState = {
    orderBy: '',
    setOrderBy: _orderBy => {},
};

const OrderByProviderContext = createContext(OrderByProviderInitialState);

const OrderByProvider = ({ children }) => {
    const [orderBy, setOrderBy] = useState({x:1, y:2});

    const context = useMemo(
        () => {
          console.log('trigger useMemo');
          return {
            orderBy: {x: orderBy.x, y:orderBy.y},
            setOrderBy,
        }},
        [orderBy.x, orderBy.y]
    );

    console.log('in Context Provider');
    //return <OrderByProviderContext.Provider value={{orderBy, setOrderBy}}>{children}</OrderByProviderContext.Provider>;
    return <OrderByProviderContext.Provider value={context}>{children}</OrderByProviderContext.Provider>;
};

const App = () => (
  <OrderByProvider>
    <MainComponent />
  </OrderByProvider>
);

export default App;
```
```ts
import { createContext, useState, useMemo, useEffect, FC } from 'react';

interface BreadcrumbsPathMapState {
    breadcrumbsPathMap: Map<number, ShopCategoryItem[]>;
    setBreadcrumbsPathMap: (breadcrumbsPathMap: Map<number, ShopCategoryItem[]>) => void;
}

const breadcrumbsPathMapInitialState: BreadcrumbsPathMapState = {
    breadcrumbsPathMap: new Map(),
    setBreadcrumbsPathMap: _breadcrumbsPathMap => {},
};

export const BreadcrumbsPathMapContext = createContext(breadcrumbsPathMapInitialState);

export const BreadcrumbsPathMapProvider: FC = ({ children }) => {
    const [breadcrumbsPathMap, setBreadcrumbsPathMap] = useState(new Map<number, ShopCategoryItem[]>());

    const { data } = useQuery<ShopCategoryList>(SHOP_CATEGORY_LIST, {
        variables: { shopId },
    });
    const {
        shopCategoryList: { categoryList },
    } = data || { shopCategoryList: { categoryList: [] } };

    useEffect(() => {
        setBreadcrumbsPathMap(generateBreadcrumbsPathMap(categoryList));
    }, [categoryList]);

    const context = useMemo(
        () => ({
            breadcrumbsPathMap,
            setBreadcrumbsPathMap,
        }),
        [breadcrumbsPathMap]
    );

    return <BreadcrumbsPathMapContext.Provider value={context}>{children}</BreadcrumbsPathMapContext.Provider>;
};


interface OrderByState {
    orderBy: string;
    setOrderBy: (orderBy: string) => void;
}

const OrderByProviderInitialState: OrderByState = {
    orderBy: '',
    setOrderBy: _orderBy => {},
};

export const OrderByProviderContext = createContext(OrderByProviderInitialState);

export const OrderByProvider: FC = ({ children }) => {
    const [orderBy, setOrderBy] = useState('');

    const context = useMemo(
        () => ({
            orderBy,
            setOrderBy,
        }),
        [orderBy]
    );

    return <OrderByProviderContext.Provider value={context}>{children}</OrderByProviderContext.Provider>;
};

const MainComponent: FC = () => (
    <BreadcrumbsPathMapProvider>
        <OrderByProvider>
            <MainComponent />
        </OrderByProvider>
    </BreadcrumbsPathMapProvider>
);

export default MainComponent;

```

## react-redux Partial
1. partial 是只有用到的那個 property 變了才 update
2. https://kaihao.dev/posts/Stale-props-and-zombie-children-in-Redux?fbclid=IwAR2DzAFYbIn3offrloT1nYX1MXagALLfQ3kSvFghzMaTNfKiqmz52mZ9Khs
3. https://hackmd.io/@jackblackevo/rkcdqrh8-?fbclid=IwAR2NqkGYVGlMOp3g94ElR-gz_rizmLIZ7IPgncJv_gfID6j8HwZiEQ_zPIo#Stale-props-and-zombie-children-in-Redux

## Resize 時，隱藏漢堡選單
```js
componentDidMount = () => {
   this.checkForHeaderStyle();
   window.addEventListener(“resize”, this.checkForHeaderStyle);
 };
 checkForHeaderStyle = () => {
   if (document.body.offsetWidth < Number(1125)) {
     this.setState({ screenMobile: true });
   } else {
     this.setState({ screenMobile: false });
   }
 };
componentWillUnmount = () => {
   window.removeEventListener("resize", this.checkForHeaderStyle);
 };
```
## HOC

- https://www.pluralsight.com/guides/higher-order-composition-typescript-react
- Ex 1:

```js
const HOC = WrappedComponent => {
  const products = [
    {
      id: 90,
      picture:
        "https://diz36nn4q02zr.cloudfront.net/webapi/imagesV3/Cropped/SalePage/6016548/0/173139?v=1",
      name: "MUSTELA~寶寶洗髮沐浴露/Dermo雙潔乳(500ml)【D013520】",
      suggestPrice: 680,
      price: 399
    }
  ];
  return props => <WrappedComponent products={products} {...props} />;
};
const ProductCard = ({ imgSrc, name }) => (
  <div>
    <img src={imgSrc} style={{ width: "100px" }} alt={name} />
    <div>{name}</div>
  </div>
);
class App extends Component {
  render() {
    const { products } = this.props;
    return (
      <>
        {products.map(e => (
          <ProductCard
            id={e.id}
            key={e.id}
            imgSrc={e.picture}
            name={e.name}
          />
        ))}
      </>
    );
  }
}
const WrappedApp = HOC(App);
const rootElement = document.getElementById("root");
ReactDOM.render(<WrappedApp />, rootElement);
```

- Ex 2 (TS):
- Note: `<T extends unknown>` is a [Workaround](https://stackoverflow.com/questions/32308370/what-is-the-syntax-for-typescript-arrow-functions-with-generics)
```ts
import React, { FC, ComponentType } from 'react';

const LocationTaskWithTranslation = <T extends unknown>(WrappedComponent: ComponentType<T>) => {
    const abc = 'ABC';
    const bcd = 'BCD';

    const ComponentWithTranslation: ComponentType<T> = (props: T) => (
        <WrappedComponent
            abc={abc}
            bcd={bcd}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        />
    );
    return ComponentWithTranslation;
};

const LocationTask = LocationTaskWithTranslation(LocationTaskContent);

export default LocationTask;

```

## Render Props 實作

```ts
import React, { ReactType } from 'react';
import styled from 'styled-components';
import theme from '@client/global-theme-variable';

// ...

const Card = ({
    topAreaChildren: TopAreaChildren,
    bottomAreaChildren: BottomAreaChildren,
    topBackgroundColor,
    bottomBackgroundColor,
}: {
    topAreaChildren: ReactType;
    bottomAreaChildren: ReactType;
    topBackgroundColor: string;
    bottomBackgroundColor: string;
}) => (
    <CardWrapper>
        <TopArea backgroundColor={topBackgroundColor}>
            <TopAreaChildren />
        </TopArea>
        <BottomArea backgroundColor={bottomBackgroundColor}>
            <BottomAreaChildren />
        </BottomArea>
    </CardWrapper>
);

export const LightTopWhiteBottomCard = ({
    topAreaChildren: TopAreaChildren,
    bottomAreaChildren: BottomAreaChildren,
}: {
    topAreaChildren: ReactType;
    bottomAreaChildren: ReactType;
}) => (
    <Card
        topAreaChildren={TopAreaChildren}
        bottomAreaChildren={BottomAreaChildren}
        topBackgroundColor={theme.greyTen}
        bottomBackgroundColor={theme.white}
    />
);

export const MemberConnectAndSelfPickCard: FC<{
    title: string;
    iconText: string;
    hintText: string;
    totalNotContactCount: string;
    isNewList: boolean;
    isChecked?: boolean;
}> = ({
    title,
    iconText,
    hintText,
    totalNotContactCount,
}) => {
    return (
            <LightTopWhiteBottomCard
                topAreaChildren={() => (
                    <MemberConnectAndSelfPickCardTitle title={title} iconText={iconText} />
                )}
                bottomAreaChildren={() => (
                    <MemberConnectAndSelfPickCardContent
                        totalNotContactCount={totalNotContactCount}
                        hintText={hintText}
                    />
                )}
            />
    );
};

const MemberConnectAndSelfPickCardTitle: FC<{ title: string; iconText: string; isShowRedIcon: boolean }> = ({
    title,
    iconText,
    isShowRedIcon,
}) => (
    <TopAreaChildrenWrapper>
        <Title>{title}</Title>
        {isShowRedIcon && <RedEllipseIcon>{iconText}</RedEllipseIcon>}
    </TopAreaChildrenWrapper>
);

const MemberConnectAndSelfPickCardContent: FC<{ totalNotContactCount: string; hintText: string }> = ({
    totalNotContactCount,
    hintText,
}) => (
    <BottomAreaChildrenWrapper>
        <HightlightBoldText>{totalNotContactCount}</HightlightBoldText>
        <HintText>{hintText}</HintText>
    </BottomAreaChildrenWrapper>
);
```
## 不用 Render Props，Props 傳 React Node 實作
```ts
interface CommonProps {
    selectionList: { id: string; name: string }[];
    menuSettings?: MenuSettings;
    customMenuStyles?: CustomMenuStyles;
    onSelect: (selectedItem: { id: string; name: string }) => void;
}

interface MenuContentProps extends CommonProps {
    onClose: () => void;
    isLoadingModal?: boolean;
}

const MenuContent: FC<MenuContentProps> = ({
    selectionList,
    menuSettings = {},
    customMenuStyles = {},
    isLoadingModal = false,
    onSelect,
    onClose,
}) => {
    const {
        title,
        leftTopComponent: LeftTopComponent = null,
        rightTopComponent: RightTopComponent = null,
        bottomComponent: BottomComponent = null,
    } = menuSettings;

    const { wrapperStyle, headerStyle, contentStyle, itemStyle } = customMenuStyles;

    const makeSelectHandler = (id: string, name: string) => () => {
        onSelect({ id, name });
    };

    return (
        <MenuWrapper style={wrapperStyle}>
            <MenuHeader style={headerStyle}>
                {LeftTopComponent}
                <MenuTitle>{title}</MenuTitle>
                {RightTopComponent}
            </MenuHeader>
            {isLoadingModal ? (
                <LoadingWrapper>
                    <LoadingGif src={imgUrl} alt="loading..." />
                </LoadingWrapper>
            ) : (
                <MenuBody style={contentStyle}>
                    {selectionList.map(item => (
                        <MenuItem
                            style={itemStyle}
                            type="button"
                            key={item.id}
                            onClick={makeSelectHandler(item.id, item.name)}>
                            {item.name}
                        </MenuItem>
                    ))}
                    {BottomComponent}
                </MenuBody>
            )}
        </MenuWrapper>
    );
};

// 實際用

export const Dropdown: FC<{
    // ...
}> = ({
    menuSettings = {},
    customMenuStyles = {},
    isLoadingModal = false,
    onSelect,
    onClose,
}) => (
  const handleLogout = () => { //... };
  const handleRightTopComponentClick = () => { //... };
  
    return (
      <Wrapper>
          <MenuContent
              selectionList={[
                      { id: '123', name: '員工一' },
                      { id: '456', name: '員工二' },
                  ]}
              isLoadingModal={isLoadingModal}
              onSelect={onSelect}
              onClose={onClose}
              menuSettings={{
                  title: 'MY TITLE',
                  leftTopComponent: null,
                  rightTopComponent: <TextButton text="TEXT IN RIGHT TOP" onClick={handleRightTopComponentClick} />,
                  bottomComponent: <LogoutText onClick={handleLogout} />
              }}
              customMenuStyles={customMenuStyles}
          />
      </Wrapper>
    )
);

```
## React hooks 拆分 fetch 範例 
https://codesandbox.io/s/fetch-optimize-620rt?fbclid=IwAR0H9ugelbNPGju78KcGULyhTGdQiycfygOFBlFfldXV5OG7XKahQnhF1Qg
## React 運作原理
https://overreacted.io/react-as-a-ui-runtime/#memoization
## React Hooks 運作原理
https://www.youtube.com/watch?v=9jWwO7McMbU&feature=youtu.be&t=9480
https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/
## useEffect, Dan
https://overreacted.io/making-setinterval-declarative-with-react-hooks/?fbclid=IwAR18fsppc2BMUUkJIfnk4gfel1sxeevCZbOsK544ZjdWhioNiD75EcmcK3I
## useEffect
https://overreacted.io/a-complete-guide-to-useeffect/  
https://sebhastian.com/react-hooks-useeffect  
https://stackoverflow.com/questions/53464595/how-to-use-componentwillmount-in-react-hooks  
https://medium.com/enjoy-life-enjoy-coding/react-%E7%82%BA%E4%BA%86%E8%88%87-hooks-%E7%9B%B8%E9%81%87-function-components-%E5%8D%87%E7%B4%9A%E8%A8%98-86869d869a45  
## React + GA
https://medium.com/@malith.dev/track-users-in-your-react-app-with-google-analytics-6364ebfcbae8  
https://medium.com/google-cloud/tracking-site-visits-on-react-app-hosted-in-google-cloud-using-google-analytics-f49c2411d398  

## Pure Component
不要被更新影響的 component 若是 class component ，直接繼承 PureComponent 即可  
https://www.youtube.com/watch?v=YCRuTT31qR0  
https://www.youtube.com/watch?v=PXXjkq4A-OU
## Pure Component 在 Hook 中實作
不要被更新影響的 component 若是 hook ，在 export 時用 React.memo()   
上層 component 的函數若是用 hook 寫，且傳進不被影響的 component ，需要加掛 useCallback  
https://iandays.com/2019/06/01/reacthooks/
https://www.youtube.com/watch?v=7TaBhrnPH78

## Reacr-Router urls don't work when refreshing or writing manually
https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually

## 為何 Hook 沒用到 React 還要 import?

1. Ans: Babel 將 JSX 轉成 React.createElement 後，需要 React 接著處理 createElement
2. Babel 負責處理 JSX 的 plug-in ()，可以將 JSX 語法，轉成 React.createElement 
3. React.createElement: JSX 解析後產生出來的 React.createElement(xxx,ooo) 需要被接著處理。xxx ooo 經過 createElement 函式處理後，變成 react 自己用的物件，範例如下  
```js
React.createElement("h3", {style:{ color : "red" }}, "hello react");
// 轉換成
{
    type: 'h3',
    props: {
        children: 'hello react',
        style: {
            color: 'red'
        }
    }
}

```
4. ReactDOM.render: 將 產生出的物件，轉成瀏覽器可以使用的 document.XXX 操作 DOM
5.  Dan: 
```
When we say ReactDOM.render(reactElement, domContainer), we mean: “Dear React, make the domContainer host tree match my reactElement.”
```
6. `<APP />` 與 `App()`，差異在，`<APP />` 會被 Babel 轉成 React.createElement(許多複合參數)，轉換後並未呼叫函數，console.log 結果如下
```js
import React from "react";

function App() {
  const state = { name: "Ryan" };
  const sayHi = () => {
    console.log("hi");
  };
  return (
    <div className="App">
      <h1>{state.name}</h1>
      <button onClick={sayHi}>Click 1</button>
    </div>
  );
}
console.log(<App />);
// Object {type: function App(), key: null, ref: null, props: Object, _owner: null…}
```
7. `App()` 已呼叫函數，console.log 結果如下
```js
console.log(App());
// Object {type: "div", key: null, ref: null, props: Object, _owner: null…}
```
8. what does React do when an element type is a function? It calls your component, and asks what element that component wants to render.
9. Ref: https://overreacted.io/react-as-a-ui-runtime/
## Isomorphic React App
https://github.com/firebase/functions-samples/tree/master/isomorphic-react-app

## Server Side Rendering
Next.js  
https://nextjs.org/features/server-side-rendering#benefits  
React 官方:  
https://blog.techbridge.cc/2016/08/27/react-redux-immutablejs-node-server-isomorphic-tutorial/  
server 端設定```import ReactDOMServer from 'react-dom/server';```:  
https://reactjs.org/docs/react-dom-server.html  
client 端加入```ReactDOM.hydrate(element, container[, callback])```:  
https://reactjs.org/docs/react-dom.html#hydrate  

## 即時更新
https://blog.niclin.tw/2017/10/28/%E7%8D%B2%E5%BE%97%E5%AF%A6%E6%99%82%E6%9B%B4%E6%96%B0%E7%9A%84%E6%96%B9%E6%B3%95polling-comet-long-polling-websocket/  
https://codeburst.io/polling-vs-sse-vs-websocket-how-to-choose-the-right-one-1859e4e13bd9  

## Dan 說明 super 在 React 中的使用
https://overreacted.io/zh-hant/why-do-we-write-super-props/

## 點擊 Component 外部關閉本體的 Hook 寫法
https://stackoverflow.com/questions/54560790/detect-click-outside-react-component-using-hooks

## npm react 相關的第三方套件

1. react-window: https://addyosmani.com/blog/react-window/  
2. react-select
3. react-spring : https://www.react-spring.io/
4. react-visibility-sensor : https://www.npmjs.com/package/react-visibility-sensor
5. react-reveal: [截至 2020/7/20] 不支援 iOS 12 版，及部分功能不支援 iOS 13.15.1
6. 取 API 的 hook - swr: https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-swr-485b8e41ef78

# React  語法使用

## React: 改 JSX inline-css 用法
- style={todo.status===true? {color: 'red', textDecoration: 'line-through'} : {color: 'black'}}
## React: 迴圈渲染用法
```js
    render() {
        let diceImgs = this.state.historyDices.length ? (
            this.state.historyDices.map((element, i) => {
                return (
                    <div key={5000 + i}><img className={`dice-all dice-color-img${i + 1}`} src={`./imgs/${element.color}_${element.number}.png`} key={6000 + i}></img></div>
                )
            })) : (<div></div>)
        // 方法二: 
        // let diceImgs = [];
        //     for (let i = 0; i < this.state.historyDices.length; i++){
        //         const color = this.state.historyDices[i].color;
        //         const number = this.state.historyDices[i].number;
        //         diceImgs.push(<div><img className={`dice-color-img${i+1}`} src={`./imgs/${color}_${number}.png`}></img></div>);
        //     }

        return (
            <div>{diceImgs}</div>
            )
      }
```
## React: setState 用法，避免多個刷新一次更新，非同步
原:
```js
this.setState({
  score: this.state.score +1
});
```
後，加入 callback ，引入前一次狀態，確保上次狀態更新後，才fire本次狀態更新:
```js
this.setState( prevState => {
  return {
    score: prevState.score +1
  };
});
```
簡化寫法，去掉 return 及大括號，在箭頭後加入圓括號
```js
this.setState( prevState => ({
    score: prevState.score +1
}));
```
## React: 輸出的 Class 或 render 函數，開頭避免用小寫，否則跑不出來
原 ( todoUi 開頭不能用小寫，會無法呈現在畫面):
```js
import todoUi from "./todoUI";

class App extends React.Component {
    render () {
        return ( <todoUi /> );
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

後 (import 進來的東西，開頭要用大寫 TodoUi，在 export default 檔案中的函數命名，也要用開頭大寫):
```js
import TodoUi from "./todoUI";

class App extends React.Component {
    render () {
        return ( <TodoUi /> );
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));
```
## React: 新增值用法，避免用 .push()，用 array spread 寫法
原 (不能用，會直接修改到原先的 state ):
```js
state = {
  ninjas: [ { name: "Ryu", age: 30, id: 1 }, { name: "Andy", age: 25, id: 2 } ]
}
addNinja = (newObj) => {
  this.setState( prevState => ({
    ninjas: prevState.ninjas.push(newObj)
  }));
}
```
後，使用 array spread 寫法
```js
state = {
  ninjas: [ { name: "Ryu", age: 30, id: 1 }, { name: "Andy", age: 25, id: 2 } ]
}
addNinja = (newObj) => {
  let newNinjas = [...this.state.ninjas, newObj];
  this.setState({
    ninjas: newNinjas
  });
}
```
配合 prevState ，使用 array spread 寫法
```js
state = {
  ninjas: [ { name: "Ryu", age: 30, id: 1 }, { name: "Andy", age: 25, id: 2 } ]
}
addNinja = (newObj) => {
  this.setState( prevState => ({
    ninjas: [...prevState.ninjas, newObj]
  }));
}
```

## React: 刪除值用法，用 .filter()

```js
state = {
  ninjas: [ { name: "Ryu", age: 30, id: 1 }, { name: "Andy", age: 25, id: 2 } ]
}
deleteNinja = (id) => {
  let newNinjas = this.state.ninjas.filter( ninja => { return ninja.id !== id });
  this.setState({
    ninjas: newNinjas
  });
}
```
配合 prevState ， 寫法如下
```js
state = {
  ninjas: [ { name: "Ryu", age: 30, id: 1 }, { name: "Andy", age: 25, id: 2 } ]
}
deleteNinja = (id) => {
  this.setState( prevState => ({
    ninjas: prevState.ninjas.filter( ninja => { return ninja.id !== id })
  }));
}
```
變更到原陣列、且不能操作陣列中的物件的寫法，不要用
```js
data = [ "Ryu", "Andy"];
deleteData = (item) => {
  if (this.data.indexOf(item) === -1){
    return;
  }
  this.data.splice(this.data.indexOf(item), 1);
}
```
## React: 修改值用法，用 array spread 及 object spread 

- 修改值目標: a. 修改 camels 下，某 id 物件的同一層的 run 值及 boxNum 值，b. 修改 state 下，step 值
- 在 React 下，setState 就算不寫 levelHeight: 1.4 ，levelHeight 的值不會不見，原因為 "setState Updates are Merged"，在 Redux 特性不同， Redux 會直接將新的 state 覆寫，所以在 Redux 寫法需要加上 ```...state```，如 ```return { ...state, camels: newArray, step: 2};```
- Ref: https://www.freecodecamp.org/news/get-pro-with-react-setstate-in-10-minutes-d38251d1c781/

```js
state = {
    camels: [ {camel: "object1", id: 0, run: false, boxNum: 0}, 
              {camel: "object2", id: 1, run: false, boxNum: 0}, 
              {camel: "object3", id: 2, run: false, boxNum: 0}],
    step: 0,
    levelHeight: 1.4
}
changeState = (ID) => {
    this.setState(prevState => ({
         camels: [...prevState.camels.filter(element => (element.id !== ID)), 
                  { ...prevState.camels.find(element => (element.id === ID)), ...{ run: true, boxNum: 1 } }],
         step: 2,
    }));
}
```
## React: 修改值用法 - 2 
```js
this.state = {
    size: 3,
    tileArray: [
         {row:0 , col:0 , value:1},
         {row:0 , col:1 , value:2},
         {row:0 , col:2 , value:3},
         {row:1 , col:0 , value:4},
         {row:1 , col:1 , value:5},
         {row:1 , col:2 , value:6},
         {row:2 , col:0 , value:7},
         {row:2 , col:1 , value:8},
         {row:2 , col:2 , value:9}
       ],
     ranklist: [],
     start: false,
     userName: "",
     useStep: 0
};

this.setState((prestate)=> {
     if(checkTopResult || checkRightResult || checkBottomResult || checkLeftResult){
         // update the value
         const clickval = clickitem.value;
         const emptyItem = prestate.tileArray.filter(item => item.value === 9)[0];
         const emptyIndex = prestate.tileArray.indexOf(emptyItem);
         prestate.tileArray[emptyIndex].value = clickval;
         const itemIndex = prestate.tileArray.indexOf(clickitem);
         prestate.tileArray[itemIndex].value = 9;
       }
        return{
          tileArray: prestate.tileArray,
          useStep: (prestate.useStep + 1)
       }
     },()=>{
     // check win
     if(this.checkWin()){
         alert(this.state.userName + ", you win ٩(^ᴗ^)۶");
         this.endGame();
     }
});

```

## React: 純功能 Component 
```js
import { FC, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dependencies } from '@src/providers/globalVariableProvider';
import { ShopCategoryMapContext } from '../../../desktop/ShopCategory/contexts';

const DocumentTitle: FC = () => {
    const { categoryMap } = useContext(ShopCategoryMapContext);
    const { categoryId: id } = useParams();
    const categoryId = Number(id);

    useEffect(() => {
        const shopName = dependencies?.shopProfile?.ShopBasicInfo?.ShopName || '';
        const { name } = categoryMap.get(categoryId) || { name: '' };
        document.title = `${name} - ${shopName}`;
    }, [categoryId, categoryMap]);

    return null;
};

export default DocumentTitle;


const ShopCategoryContent: FC<{ baseUrl: string; shopCategoryMapContext: Context<ContextType> }> = ({
    baseUrl,
    shopCategoryMapContext,
}) => {
    const { categoryId: id } = useParams();
    const categoryId = Number.isNaN(Number(id)) ? -1 : Number(id);

    const { categoryMap } = useContext(shopCategoryMapContext);
    const { isThereChild } = categoryMap.get(categoryId) || { isThereChild: false };

    const isExist = useSelector((state: RootState) => state.shopCategory.isExist);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(switchCategory({ categoryId, isShowCurator: categoryId !== CATEGORY_ID_ALL_ITEMS && !isThereChild }));
    }, [dispatch, categoryId, isThereChild]);

    useEffect(() => {
        if (categoryId < 0 || !isExist) {
            window.location.replace('/error');
        }
    }, [categoryId, isExist]);

    if (categoryId < 0 || !isExist) {
        return null;
    }

    return (
        <Wrapper>
            <DocumentTitle />
            <Breadcrumbs baseUrl={baseUrl} />
            <Content>
                <MenuWrapper>
                    <Menu baseUrl={baseUrl} />
                </MenuWrapper>
                <ListWrapper>
                    <AdvertisementSection />
                    <PromotionSection />
                    <ShopCategoryMapProvider>
                        <ProductBlock />
                    </ShopCategoryMapProvider>
                </ListWrapper>
            </Content>
        </Wrapper>
    );
};
```
# Next.js

## Tutorial
- https://www.youtube.com/watch?v=Sklc_fQBmcs
