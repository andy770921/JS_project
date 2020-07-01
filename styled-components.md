## Styled-components

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
## 使用 props 控制全有 css 或全無
```ts
import styled from 'styled-components';

const Link = styled.a<{ isEnabled: boolean }>`
    ${({ isEnabled }) => (isEnabled ? {} : { cursor: 'default', 'text-decoration': 'none', color: 'black' })}
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

