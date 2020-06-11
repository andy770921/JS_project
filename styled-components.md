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

## Styled-components，超過兩行多餘字出現點點點，及傳 style 方法 ( 使用 TypeScript )
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
## Styled-components，SVG 置中及傳 style ( 使用 TypeScript )
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
## Styled-components 使用 props 控制全有 css 或全無
```ts
import styled from 'styled-components';

const Link = styled.a<{ isEnabled: boolean }>`
    ${({ isEnabled }) => (isEnabled ? {} : { cursor: 'default', 'text-decoration': 'none', color: 'black' })}
`;
```
