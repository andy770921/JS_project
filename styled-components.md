## Styled-components，傳變數方法 ( 使用 TypeScript )
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
## Styled-components，div 使用 focus 效果 ( 使用 TypeScript )
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

## Styled-components，傳 style 方法 ( 使用 TypeScript )
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
