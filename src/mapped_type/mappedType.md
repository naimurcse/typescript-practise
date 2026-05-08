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
  //key : value
  readonly [P in keyof User]: User[P];
  // readonly id: number
  // readonly name: string
  // readonly email: string
};
```

এখানে keyof User আমাদের id | name দিচ্ছে, আর [P in ...] সেই প্রতিটি কী-র ওপর লুপ চালিয়ে নতুন টাইপ বানাচ্ছে।

## ২. কেন আমাদের এটি প্রয়োজন হয়?

- **DRY (Don't Repeat Yourself):** একই প্রোপার্টি বারবার টাইপ করতে হয় না।
- **Consistency:** মূল টাইপ পরিবর্তন করলে ম্যাপড টাইপগুলো অটোমেটিক আপডেট হয়ে যায়।
- **Transformation:** টাইপকে অপশনাল, রিড-অনলি বা ডাটা টাইপ পরিবর্তন করতে এটি অপরিহার্য।

## ৩. বাস্তবিক কাজের উদাহরণ

### ১. সব প্রোপার্টিকে Optional করা (Partial)

কোনো ফর্ম এডিট করার সময় সব ফিল্ড প্রয়োজন নাও হতে পারে।

```typescript
type Optional<T> = {
  //key: value
  [P in keyof T]?: T[P];
  //name?: string
};
// ব্যবহার: Optional<User>
```

### ২. সব প্রোপার্টিকে Readonly করা

ডেটা ইমিউটেবল রাখার জন্য।

```typescript
type Absolute<T> = {
  readonly [K in keyof T]: T[K];
};
```

### ৩. নির্দিষ্ট টাইপ পরিবর্তন করা

ধরা যাক, একটি অবজেক্টের সব ভ্যালুকে string এ রূপান্তর করতে হবে।

```typescript
type Stringify<T> = {
  [P in keyof T]: string;
};
```

### ৪. Optional প্রোপার্টিকে Required করা (-? ব্যবহার)

যদি কোনো টাইপে ? থাকে, তা রিমুভ করতে -? ব্যবহার হয়।

```typescript
type Concrete<T> = {
  [P in keyof T]-?: T[P];
};
```

### ৫. Getters তৈরি করা (Template Literal Types সহ)

প্রোপার্টি নাম অনুযায়ী অটোমেটিক গেটার ফাংশন টাইপ তৈরি।

```typescript
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};
// User থেকে পাবে: getName(), getId()
```

### ৬. API Response র‍্যাপার

সব ভ্যালুকে একটি ডাটা অবজেক্টের ভেতর রাখা।

```typescript
type Response<T> = {
  [P in keyof T]: { data: T[P]; status: string };
};
```

## ৭. নির্দিষ্ট টাইপ ফিল্টার করা (Pick by Type)

শুধু স্ট্রিং প্রোপার্টিগুলো বেছে নেওয়া।

```typescript
type OnlyStrings<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};
```

### ৮. Permission/Boolean ম্যাপার

ইউজার রোলের ওপর ভিত্তি করে ট্রু/ফলস সেট করা।

```typescript
type Permissions<T> = {
  [P in keyof T]: boolean;
};
```

### ৯. Nullable Type তৈরি করা

সব প্রোপার্টির সাথে null এলাউ করা।

```typescript
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
```

### ১০. API-র জন্য 'Loading' স্টেট ম্যাপার

> প্রতিটি ফিল্ড লোড হচ্ছে কি না তা ট্র্যাক করা।

```typescript
type LoadingStates<T> = {
  [P in keyof T]: "idle" | "loading" | "success" | "error";
};
```
