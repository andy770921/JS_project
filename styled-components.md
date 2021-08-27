## Styled-components

## JS 原理
https://realdennis.medium.com/javascript-%E8%A8%AD%E8%A8%88%E4%B8%80%E5%80%8B%E6%8E%A5%E5%8F%97%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E5%87%BD%E6%95%B8-20f2ce452c4e

## 搭配 styled-system 使用

- styled-system: https://styled-system.com/
- styled-system 中文介紹: https://cythilya.github.io/2019/11/08/styeld-system/
- GitHub 使用 styled-system + styled-components 開源元件庫: https://primer.style/components/Box
- GitHub 使用 styled-system 用法導讀文: https://medium.com/starbugs/styled-system-is-the-path-to-primer-99b8d7cdecce
- styled-system 使用心得: https://anna-su.com/tech/styled-system-the-next-generation-css-technology/

## 傳變數方法 ( 使用 TypeScript )
```ts
const IconCircle = styled.a<{ circleSize?: number; iconId?: string }>`
    display: flex;
    width: 1em;
    height: 1em;
    border-radius: 0.5em;
    align-items: center;
    justify-content: center;
    box-shadow: 0.03em 0.05em 0.1em 0 rgba(0, 0, 0, 0.25);
    font-size: ${p => (p.circleSize ? `${p.circleSize}px` : '40px')};
    background-color: ${p => {
        switch (p.iconId) {
            case 'fb_page':
                return '#4367b2';
            case 'line':
                return '#00c200';
            case 'ig':
                return '#d72d78';
            case 'fb_messenger':
                return '#0084ff';
            default:
                return 'white';
        }
    }};
`;
```
## keyframes 傳變數方法
https://stackoverflow.com/questions/50802681/how-to-pass-props-to-keyframes-in-styled-component-with-react
## 傳變數進動畫
```ts
const riseAndFall = (yOffset: string) => keyframes`
    0% {
        transform: translateY(${yOffset});
    }
    10% {
        transform: translateY(0px);
    }
    80% {
        opacity: 100;
        transform: translateY(0px);
    }
    100% {
        opacity: 0;
        transform: translateY(${yOffset});
    }
`;

const ToastContent = styled.div<{ animationYOffset: string; animationDuration: number; theme: Theme }>`
    background-color: rgba(44, 46, 65, 0.9);
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.white};
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    animation: ${({ animationYOffset }) => riseAndFall(animationYOffset)}
        ${({ animationDuration }) => animationDuration}s linear;
`;
```
## div 使用 focus 效果 ( 使用 TypeScript )
```ts
import React, { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
    &:hover {
        background: rgb(245, 247, 249);
    }
    &:focus {
        background: rgb(245, 247, 249);
        outline: none;
    }
`;

const KeptFocusedTitle: FC<{ onClick?: MouseEventHandler<HTMLDivElement> }> = ({ onClick }) => {
    return (
        <TitleWrapper onClick={onClick} tabIndex={-1}>
            {children}
        </TitleWrapper>
    );
};

export default KeptFocusedTitle;
```

## 超過兩行多餘字出現點點點，及傳 style 方法 ( 使用 TypeScript )
```js
import * as React from 'react';
import { FC, CSSProperties } from 'react';
import styled from 'styled-components';

const Title = styled.div.attrs(props => ({ style: props.style }))<{ isVertical: boolean }>`
    box-sizing: border-box;
    margin-bottom: 5px;
    height: calc(20px * ${props => (props.isVertical ? 2 : 3)});

    overflow: hidden;
    word-break: break-all;

    font-weight: 700;
    font-size: 13px;
    color: #666666;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: normal;

    display: -webkit-box;
    -webkit-line-clamp: ${props => (props.isVertical ? 2 : 3)};
    -webkit-box-orient: vertical;
`;

interface Props {
    isVertical: boolean;
    customStyle?: { titleStyle?: CSSProperties };
}

const CardTitle: FC<Props> = ({ isVertical, customStyle, children }) => (
    <Title isVertical={isVertical} style={customStyle && customStyle.titleStyle}>
        {children}
    </Title>
);

export default CardTitle;
```

## 樣式繼承並轉換 HTML type

```js
const BaseText = styled.span`
    font-size: 32px;
    color: red;
    line-height: 25px;
`;

const RetryBtn = styled(BaseText).attrs({ as: 'button' })`
    color: blue;
    background-color: unset;
`;
```

## SVG 置中及傳 style ( 使用 TypeScript )
```js
import React, { FC, CSSProperties } from 'react';
import styled from 'styled-components';

const TickSvg = styled.svg<{ customStyle?: CSSProperties }>`
    background-color: red;
    ${({ customStyle }) => (customStyle ? { ...customStyle } : {})}
`;

const TickIcon: FC<{ size?: number; customStyle?: CSSProperties }> = ({ size = 45, customStyle }) => (
    <TickSvg
        width={`${size}px`}
        height={`${size}px`}
        viewBox={`${(45 - size) / 2} ${(45 - size) / 2} ${size} ${size}`}
        customStyle={customStyle}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <g id="loading-copy" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path
                d="M20.9146095,24.2707354 L28.556449,16.4301507 L28.556449,16.4301507 C29.1154451,15.8566164 30.0217568,15.8566164 30.5807529,16.4301507 C31.139749,17.0036849 31.139749,17.9335675 30.5807529,18.5071017 L21.7477303,27.5698493 C21.1887342,28.1433836 20.2824224,28.1433836 19.7234263,27.5698493 L15.4192471,23.1537291 C14.860251,22.5801949 14.860251,21.6503122 15.4192471,21.076778 C15.9782432,20.5032438 16.8845549,20.5032438 17.443551,21.076778 L20.5565471,24.2707354 C20.652917,24.3696116 20.8111952,24.3716434 20.9100714,24.2752735 C20.9116034,24.2737803 20.9131163,24.2722675 20.9146095,24.2707354 Z"
                id="Combined-Shape"
                fill="#FFFFFF"
                fillRule="nonzero"
            />
        </g>
    </TickSvg>
);

export default TickIcon;
// 使用範例
// <TickIcon size={20} customStyle={{ padding: '2px', borderRadius: '50%' }} />
```


## 文字置中，文字過長時出現捲軸，客製卷軸長、寬、長條棒
```ts
const ErrorMessage = styled.div<{ isMobile: boolean }>`
    width: 100%;
    color: ${props => props.theme.darkGreyFour};
    font-size: ${({ theme, isMobile }) => (isMobile ? theme.fontSize.M : theme.fontSize['3XL'])};
    margin-bottom: 6px;
    line-height: normal;
`;

const ErrorMessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 30vh;
`;

const ScrollWrapper = styled.div<{ isMobile: boolean }>`
    overflow-y: scroll;

    ::-webkit-scrollbar {
        -webkit-appearance: none;
    }
    ::-webkit-scrollbar:vertical {
        width: 11px;
    }
    ::-webkit-scrollbar:horizontal {
        height: 11px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 8px;
        border: 2px solid white; /* should match background, can't be transparent */
        background-color: ${({ theme }) => theme.greyThree};
    }
`;


const ErrorComponent: FC<{ isMobile: boolean; message: string; }> = ({ isMobile, message }) => (
    <ErrorMessageWrapper>
        <ScrollWrapper isMobile={isMobile}>
            <ErrorMessage isMobile={isMobile}>{message}</ErrorMessage>
        </ScrollWrapper>
    </ErrorMessageWrapper>
)
```
## 使用 props 控制全有 css 或全無
```ts
import styled from 'styled-components';

const Link = styled.a<{ isEnabled: boolean }>`
    ${({ isEnabled }) => (isEnabled ? {} : { cursor: 'default', 'text-decoration': 'none', color: 'black' })}
`;
```

```ts
const ToastContainer = styled.div<{ customStyle?: CSSProperties; yAxisOrder: number; toastHeight: string }>`
    position: fixed;
    width: 100%;
    height: ${({ toastHeight }) => toastHeight};
    box-sizing: border-box;
    overflow: hidden;
    font-size: 1.3rem;
    padding: 5px 15px;
    left: 0;
    ${({ yAxisOrder, toastHeight }) => `bottom: calc(${yAxisOrder} * ${toastHeight});`}

    ${({ customStyle }) => (customStyle ? { ...customStyle } : {})}
`;
```

## Hover ul 名稱後，後打開 li 列表
```ts
const NavDropDownBox = styled.ul`
    position: absolute;
    top: 75px;
    left: -15px;
    width: 210px;
    display: flex;
    flex-direction: column;
    padding: 25px 20px;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
`;

const NavItem = styled.li`
    position: relative;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content:  
    flex: none;
    padding-right: 25px;
    list-style-type: none;
    cursor: pointer;
    
    &:hover:not(${NavDropDownBox}) {
        ${NavDropDownBox} {
            opacity: 1;
            visibility: visible;
            transition: 0.5s;
        }
    }
`;

const NavInfoList = () => {
    return (
        <NavInfoListWrap>
            <ul>
            {navInfoListConfig.map((navItem) => {
                return (
                    <NavItem key={navItem.name}>   
                        <NavItemTextLink href="https://www.google.com.tw/">
                            {navItem.name}
                        </NavItemTextLink>
                        <NavDropDownBox>
                             <ElementOne />
                             <ElementTwo />
                        </NavDropDownBox>
                    </NavItem> 
                )
            })}
            </ul>
        </NavInfoListWrap>
    )
};

```

## 外層設定 border radius，需要加上 overflow: hidden 才能影響內層 div

```ts
const ManuWrapper = styled.div`
    display: inline-block;

    width: 375px;
    border-radius: 13px;
    overflow: hidden;
    box-shadow: 0 0 50px 10px rgba(153, 153, 153, 0.5);
    background-color: white;
`;

const Item = styled.div`
    background-color: red;
`;

const MenuComponent: FC = () => (
    <ManuWrapper>
        <Item>123</Item>
        <Item>456</Item>
        <Item>789</Item>
    </ManuWrapper>
);
```

## 使用第三方套件，使用 styled component 覆寫已知 class name 的樣式
- Note: 也可參考第三方套件官方文件，使用 API 開出的 props 控制樣式
```ts
import ReactSelect from 'react-select';

const StyledSelect = styled(ReactSelect)`
    & div[class$='control'] {  // 可覆寫 class name 為 css-1j1y3ui-control 的樣式
        border: none;
        box-shadow: none; // This line disable the blue border
        background-color: #f2f2f2;
    }

    & div[class$='control'] > div:first-child {
        // Note: 目標是選出 & div[class$='ValueContainer']
        // 但在 safari 的 class name ，沒有出現字尾是 ValueContainer 的
        padding: 10px 12px;
    }

    & div[class$='placeholder'] {  // 可覆寫 css-zvn2cr-placeholder
        color: rgba(0, 0, 0, 0.4);
    }

    & div[class$='menu'] {  // 可覆寫 css-b8ldur-menu 
        margin-top: 4px;
    }
`;

```

## 提示字在地平線上升起與消失，父層使用 overflow: hidden，子層使用 animation
```ts
import React, { FC, CSSProperties, useContext } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

const riseAndFall = keyframes`
    0% {
        transform: translateY(100px);
    }
    10% {
        transform: translateY(0px);
    }
    80% {
        opacity: 100;
        transform: translateY(0px);
    }
    100% {
        opacity: 0;
        transform: translateY(100px);
    }
`;

const ToastContainer = styled.div<{ yAxisOrder: number }>`
    position: fixed;
    width: 100%;
    height: 13vh;
    bottom: ${({ yAxisOrder }) => `${yAxisOrder * 13}vh`};
    left: 0;
    box-sizing: border-box;
    overflow: hidden;
    font-size: 1.5rem;
    padding: 5px 15px;
`;

const ToastAnimation = styled.div`
    animation: ${riseAndFall} 5s linear;
`;

const ToastContent = styled.div`
    background-color: rgba(44, 46, 65, 0.9);
    width: 100%;
    height: 100%;
    color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 20px;
`;

const PureToast: FC<{ yAxisOrder: number }> = ({ children, yAxisOrder }) => (
    <ToastContainer yAxisOrder={yAxisOrder}>
        <ToastAnimation>
            <ToastContent>
                {children}
            </ToastContent>
        </ToastAnimation>
    </ToastContainer>
);

// 可用 Context 控制 toastState

export const Toast: FC = () => {
    const toastState = [{ id: 1, text: 'test1', yAxisOrder: 0}, { id: 2, text: 'test2', yAxisOrder: 1}];
    const content = toastState.map(toastItem => (
        <PureToast
            key={toastItem.id}
            yAxisOrder={toastItem.yAxisOrder}>
            {toastItem.text}
        </PureToast>
    ));
    if (toastState.length === 0) return null;
    return createPortal(content, document.getElementById('root') || document.body);
};

// 使用 Toast Component 方式

const ChildOne = () => {
    const { publishNewToast } = useContext(ToastProviderContext);

    const handleClick = () => {
        publishNewToast({
            text: '加入成功',
            // toastType: ToastType.SELECT,
        });
    };

    return <button onClick={handleClick}> Click Me </button>;
};

const AppContent = () => (
    <>
        <ChildOne />
        <ChildTwo />
        <Toast />
    </>
);

const App: FC = () => (
    <ToastProvider>
        <AppContent />
    </ToastProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// 補充：Context 控制 toastState 用法
import React, { createContext, useState, FC, useReducer, useMemo, useCallback } from 'react';

export enum ToastType {
    NORMAL = 'NORMAL',
    SELECT = 'SELECT',
    ALERT = 'ALERT',
}

export enum ToastActionType {
    ADD_NEW_TOAST = 'ADD_NEW_TOAST',
    REMOVE_TOAST = 'REMOVE_TOAST',
    REMOVE_ALL_TOAST = 'REMOVE_ALL_TOAST',
}

interface Toast {
    toastState: ToastState[];
    publishNewToast: ({ text, toastType }: { text: string; toastType?: ToastType }) => void;
    removeAllToast: () => void;
}

const toastInitialContextState: Toast = {
    toastState: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    publishNewToast: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    removeAllToast: () => {},
};

export const ToastProviderContext = createContext(toastInitialContextState);
interface ToastState extends AddToastPayload {
    yAxisOrder: number;
}

interface AddToastPayload {
    id: number;
    text: string;
    toastType: ToastType;
    createdTime: number;
    timer: ReturnType<typeof setTimeout>;
}

type Actions =
    | { type: ToastActionType.ADD_NEW_TOAST; payload: AddToastPayload }
    | { type: ToastActionType.REMOVE_TOAST; payload: { id: number } }
    | { type: ToastActionType.REMOVE_ALL_TOAST };

const toastInitialState = [] as ToastState[];

const toastReducer = (state: ToastState[], action: Actions) => {
    switch (action.type) {
        case ToastActionType.ADD_NEW_TOAST: {
            const addedState = [...state, action.payload]
                .sort((toastItemA, toastItemB) => toastItemB.createdTime - toastItemA.createdTime)
                .map((toastItem, index) => ({ ...toastItem, yAxisOrder: index }));
            return addedState;
        }
        case ToastActionType.REMOVE_TOAST: {
            const filteredState = state.filter(toastStatus => toastStatus.id !== action.payload.id);
            return filteredState;
        }
        case ToastActionType.REMOVE_ALL_TOAST:
            return [];
        default:
            return state;
    }
};


export const ToastProvider: FC = ({ children }) => {
    const [toastState, dispatch] = useReducer(toastReducer, toastInitialState);

    const publishNewToast = ({ text, toastType = ToastType.NORMAL }: { text: string; toastType?: ToastType }) => {
        const createdTime = Date.now();
        
       // 設定 Timer 在 5000 ms 後，發送移除 Toast 的 Action
        const timer = setTimeout(() => {
             dispatch({
                    type: ToastActionType.REMOVE_TOAST,
                    payload: { id: createdTime },
                });
            }, 5000);
        
        // 發送新加 Toast 的 Action
        dispatch({
            type: ToastActionType.ADD_NEW_TOAST,
            payload: { id: createdTime, text, toastType, createdTime, timer },
        });
    };

    const removeAllToast = useCallback(() => {
        // 若手動關閉全部 Toasts，先清除所有 Timer，再發送移除所有 Toast 的 Action
        toastState.forEach(toastItem => {
            clearTimeout(toastItem.timer);
        });
        dispatch({ type: ToastActionType.REMOVE_ALL_TOAST });
    }, [toastState]);

    const context = useMemo(
        () => ({
            toastState,
            publishNewToast,
            removeAllToast,
        }),
        [toastState, removeAllToast]
    );
    return <ToastProviderContext.Provider value={context}>{children}</ToastProviderContext.Provider>;
};
```
## 背景圖片模糊，不影響圖片上方文字，使用 before 並將背景圖片配合 filter 寫在裡面
```ts
import React, { FC } from 'react';
import styled from 'styled-components';

const MaskWrapper = styled.div<{ isShow: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    display: ${({ isShow }) => (isShow ? 'flex' : 'none')};
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const CenterText = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0 , 0.7);
    color: white;
    font-size: 17px;
`;

const Mask: FC<{ isShow: boolean; text: string }> = ({ isShow, text }) => (
    <MaskWrapper isShow={isShow}>
        <CenterText>{text}</CenterText>
    </MaskWrapper>
);

const Picture = styled.div<{ url: string; isLighterImgBg?: boolean }>`
    width: 100%;
    padding-top: 100%;
    position: relative;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${({ url }) => url});
        background-size: cover;
        background-color: #f8f9fb;
        filter: ${({ isLighterImgBg }) => (isLighterImgBg ? 'opacity(20%)' : 'unset')};
    }
`;

const PictureWithMask: FC<{
    imgUrl: string;
    isShowMaskAndDisabledBtn?: boolean;
    maskText?: string;
    isLighterImgBg?: boolean;

}> = ({
    imgUrl,
    maskText = '',
    isLighterImgBg = false,
    isShowMaskAndDisabledBtn = false,
}) => (
    <Picture url={imgUrl} isLighterImgBg={isLighterImgBg}>
        <Mask isShow={isShowMaskAndDisabledBtn} text={maskText} />
    </Picture>
);
```
## 桌機滑鼠及手機觸控筆 hover 有效，可使用 `:hover { @media (pointer: fine) { // TODOS  } }`
```js
const ConceptMapWrap = styled.div`
    position: relative;
    left: 0.6vw;
    width: 54.5vw;
    height: 33vw;
    transition: 0.2s;

    // 當 ConceptMapWrap 被 hover 時，會讓 ConceptItem 先「全部先變暗」，接著「被 hover 的 ConceptItem 會才變亮」
    &:hover {
        @media (pointer: fine) {
            ${ConceptItemWrap} {
                cursor: pointer;
                transition: 0.2s;
                filter: brightness(0.6);

                :hover {
                    filter: brightness(1);
                }
            }
        }
    }

    @media screen and (max-width: 1024px) {
        left: -1vw;
    }

    @media screen and (max-width: 414px) {
        left: -0.1vw;
        width: 87vw;
        height: 73vw;
    }
`;
```

## console 出現紅字警告 `React does not recognize the textColor prop on a DOM element.`
- 解法一： use `$propsName`, a dollar sign before your props name and it will be passed to a Styled-component ONLY
- Ref: https://stackoverflow.com/questions/61488512/react-does-not-recognize-the-prop-passed-to-a-styled-component-within-material-u
- 解法二： use `styled(BaseButton).withConfig({ shouldForwardProp: (props) => !['textColor'].includes(props) })` 或 `styled.div.withConfig({// ...})`
- Ref: https://github.com/styled-components/styled-components/releases/tag/v5.1.0
- Ref2: https://github.com/styled-components/styled-components/issues/439
- Ex: 
```ts
const StyledTextButton = styled(BaseButton).withConfig({
    shouldForwardProp: (props) => !['textColor'].includes(props),
})<{ textColor?: string }>`
    ${({ textColor }) => textColor? { color: textColor } : {}}
`;
```

