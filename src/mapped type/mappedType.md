#Mapped Type

```typescript
type MappedType<T> = {
  [K in keyof T]: T[K]; // 'K' is each key, 'T[K]' is the type of that key
};
```
