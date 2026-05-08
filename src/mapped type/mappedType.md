# Mapped Type

TypeScript-এ Mapped Type হলো এমন একটি শক্তিশালী ফিচার যা বিদ্যমান কোনো টাইপের প্রোপার্টিগুলোকে লুপ (loop) করার মাধ্যমে নতুন একটি টাইপ তৈরি করতে দেয়। সহজ কথায়, এটি টাইপ স্ক্রিপ্টের "map" ফাংশন যা ডেটার ওপর নয়, বরং টাইপের ওপর কাজ করে।

```typescript
type MappedType<T> = {
  [K in keyof T]: T[K]; // 'K' is each key, 'T[K]' is the type of that key
};
```

## ১. কীভাবে কাজ করে?

Mapped Type মূলত **in কিওয়ার্ড** ব্যবহার করে একটি ইউনিয়নের (Union) প্রতিটি কী-কে iterates করে।

ধরা যাক, আমাদের একটি User টাইপ আছে। আমরা চাচ্ছি এর **সব প্রোপার্টিকে রিড-অনলি (Readonly)** করতে। ম্যানুয়ালি না করে Mapped Type দিয়ে তা এভাবে করা হয়:

```typescript
type User = {
  id: number;
  name: string;
};

// Mapped Type
type ReadonlyUser = {
  readonly [P in keyof User]: User[P];
};
```
