# TypeScript 筆記

## 擴充型別
```ts
type fbqSdkType = typeof window.fbq & {
    (eventType: string, eventName: string, parameters: {}, { external_id: string }): void;
};
```
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
