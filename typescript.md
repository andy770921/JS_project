# TypeScript 筆記

## 擴充型別
```ts
type fbqSdkType = typeof window.fbq & {
    (eventType: string, eventName: string, parameters: {}, { external_id: string }): void;
};

```
