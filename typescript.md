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
## as const
https://stackoverflow.com/questions/55230653/whats-the-difference-between-typescript-const-assertions-and-declarations

## react component 可使用泛型如下
```
<CheckedIconArea<T> />
```
## is 的使用：
- 用於函式輸入型別的補充。如果回傳值是 ture，輸入 params 就會是 is 後的型別
```ts
enum STATE {
  DRAFT = 'draft',
  DONE = 'done',
}

const isQuotationState = (state: any): state is STATE =>
  Object.values(STATE).includes(state);

const a = Math.random() > 0.5 ? 'unknown' : STATE.DONE;
const b = isQuotationState(a) ? a : STATE.DRAFT;

const c = [STATE.DONE, STATE.DRAFT].includes(a);
// 類型 '"unknown" | STATE.DONE' 的引數不可指派給類型 'STATE' 的參數。

const d = [STATE.DONE, STATE.DRAFT].includes(a);
// OK
```
```ts
interface IPerson {
  type: 'person';
  birth_date: string;
}

interface IApple {
  type: 'fruit';
  color: string;
}
const listFromApi =
  Math.random() > 0.5
    ? [{ type: 'person', birth_date: '2000/01/01' }]
    : [{ type: 'fruit', color: 'red' }];

// BAD but working:
const birthDate = ((listFromApi as (IPerson | IApple)[]).find(item => item.type === 'person') as IPerson)?.birth_date;

// GOOD:
const birthDate = (listFromApi as (IPerson | IApple)[]).find(
  (item): item is IPerson => item.type === 'person'
)?.birth_date;
```
## class 擴充語法

- class field 需宣告型別，JS 不用
- class field 在 JS 不需加前綴字，都是 public
```ts
class Node<T> {
  public data: T;
  private next: Node<T> | null;

  constructor(data: T){
    this.data = data;
    this.next = null;
  }
}
```
- constructor 內宣告 instance 的 key，同名可簡寫
- JS 也支援，可用 class field 等號後加預設值，可不必寫在 constructor 內 
```ts
class Node<T> {
  private next: Node<T> | null = null;

  constructor(public data: T){
    this.next = null;
  }
}
```
