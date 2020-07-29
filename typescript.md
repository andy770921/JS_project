# TypeScript 筆記

## 擴充型別
```ts
type fbqSdkType = typeof window.fbq & {
    (eventType: string, eventName: string, parameters: {}, { external_id: string }): void;
};
```
## 物件使用 type 或 interface ?
- 若希望被擴充（extends）則用 interface。會使用到 union 或 intersection 則用 type  
https://ithelp.ithome.com.tw/articles/10216626     
- 實際上，ts 的 `union` 是 `OR` 的觀念，`intersection` 是 `AND` 的觀念  
- type 也可擴充，透過 & 達成  
- https://ithelp.ithome.com.tw/users/20120614/ironman/2685
- https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types  
- 官方文件： https://www.typescriptlang.org/docs/handbook/advanced-types.html#interfaces-vs-type-aliases

## 讓 interface 內的 key 可變成 optional：使用 Partial
https://stackoverflow.com/questions/39713349/make-all-properties-within-a-typescript-interface-optional

## 可對第三方定義好的函式，使用 ReturnType 得到型別
```ts
interface Payload {
    id: number;
    timer: ReturnType<typeof setTimeout>;
}
```

## enum 寫法
```ts
enum ValidCase { NOT_ENTER, WRONG, CORRECT };
let [currentState, setCurrentState] =  useState(ValidCase.NOT_ENTER);
//....
if (currentState === ValidCase.NOT_ENTER)
```
