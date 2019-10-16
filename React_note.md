# React Note

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
   window.removeEventListener(“resize”, this.checkForHeaderStyle);
 };
```
## 
