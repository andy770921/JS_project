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
- 用於函式輸入型別的補充。如果回傳值是 true，輸入 params 就會是 is 後的型別
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

const d = [STATE.DONE, STATE.DRAFT].includes(b);
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

## TS config
For TypeScript projects, tsconfig.json is a standard part of the project, yet it is often misunderstood and a cause of major confusion. This document outlines best practices for managing tsconfig.json files. Adhering to these guidelines will help ensure consistency, maintainability, and ease of use across your codebase.

General Recommendations

1. Utilize extends for Modular Configurations

tsconfig.json files have a huge number of options, which cover a wide range of aspects, including:

Build pipeline (e.g. source files and output directory)

Engine configuration (e.g. which runtime will this run on and how this code will be used, etc)

Strictness/styling (e.g. is any allowed, should optional, undefined and null be treated the same, etc)

As a result, we want to follow Single Responsibility Principle we should split each tsconfig.json file into 3 sections and extend existing modular configurations to avoid repeating config:

Engine Configuration: This defines what runtime engine (e.g. Node, React, Svelte, etc) your code is targeting so that appropriate library, module, target and module resolution can be chosen (all of which are very complex and therefore we want to minimize how much we are manually configuring!). Best practice is to extend an appropriate `tsconfig.json` for your runtime environment (e.g., Node.js 20) from , e.g.
```
{
  "extends": "@tsconfig/node20/tsconfig.json"
}
```
Language Strictness: This defines whether you want to use a version of Typescript that is very close to Javascript (e.g. very loose typing and redundant code is allowed) or whether you want to set a very high quality bar (e.g. have to strongly type everything and cannot have unreachable/redundant code). It is recommended to use the strictest settings for new projects and a less strict configuration for existing projects, allowing individual rule violations to be disabled as needed. Best practice is to extend an appropriate tsconfig.json from , e.g. 
```
 {
  "extends": ["@tsconfig/node20/tsconfig.json", "@tsconfig/strictest/tsconfig.json"],
 }
```
Per-project configs: The remainder of the tsconfig file should be specific to this project, including:

Build pipeline ( outDir, include, exclude, etc)

Any per-project overrides from the extended files
```
{
    "$schema": "http://json.schemastore.org/tsconfig",
    "extends": ["@tsconfig/node20/tsconfig.json", "@tsconfig/strictest/tsconfig.json"],
    "compilerOptions": {
        "outDir": "lib",
        "experimentalDecorators": true,
        "exactOptionalPropertyTypes": false
    },
    "include": ["**/*.ts", "eslint.config.js"],
    "exclude": [
        "node_modules",
        "lib"
    ]
}
```
2. Minimize Compiler Options

Reduce the number of compilerOptions in your tsconfig.json files by re-using or creating modular configurations. This reduces duplication and ensures consistency. For example, you might have a recommended `tsconfig.json`:
```
{
  "extends": "./base-tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/app/*"]
    }
  }
}
```
3. Set `$schema` for Validation and IDE Support

Include `$schema` in your `tsconfig.json` to leverage JSON schema validation and IDE hints.
```
{
  "$schema": "<http://json.schemastore.org/tsconfig>"
}
```
4. Document Each Field and Value

Since tsconfig.json supports comments, it is beneficial to document the purpose of each field and value. This helps team members understand the configuration and reasoning behind each setting.
```
{
    "$schema": "http://json.schemastore.org/tsconfig",
    "extends": ["@tsconfig/node20/tsconfig.json", "@tsconfig/strictest/tsconfig.json"],
    "compilerOptions": {
        // Generated code goes here
        "outDir": "lib",
        // We use TS decorators in our SDK
        "experimentalDecorators": true,
        // TechDebt: This is too strict as it errors when trying to pass optional parameters down, so disable until a solution is found (e.g. https://github.com/typestack/class-validator/issues/1642)
        "exactOptionalPropertyTypes": false
    },
    // For .js files that have .ts checking enabled manually via comments, we need to include here
    "include": ["**/*.ts", "eslint.config.js"],
    "exclude": [
        // Our dependencies don't match the same TS standards as our code, so need to exclude
        "node_modules",
        // TechDebt: For some reason, `outDir` needs to be manually excluded
        "lib"
    ]
}
```
Monorepo Configuration

For monorepos, maintain a top-level tsconfig.json to define repo-wide defaults. Each sub-module should then extend this top-level configuration.
```
// Top-level tsconfig.json
{
  "$schema": "http://json.schemastore.org/tsconfig",
  "extends": ["@tsconfig/node20/tsconfig.json", "@tsconfig/strictest/tsconfig.json"],
  "exclude": ["node_modules", "dist"]
}
```
```
// Sub-module tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"]
}
```

