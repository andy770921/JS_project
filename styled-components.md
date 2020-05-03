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
## Styled-components，div 使用 fouus 效果 ( 使用 TypeScript )
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
