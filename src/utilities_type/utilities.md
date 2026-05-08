# Utility Type

TypeScript-এর Utility Types হলো আগে থেকে তৈরি কিছু টুল যা বিদ্যমান টাইপগুলোকে মডিফাই বা ট্রান্সফর্ম করতে সাহায্য করে। এগুলো মূলত ইন্টারনালি Mapped Types এবং Conditional Types ব্যবহার করে তৈরি করা হয়েছে।

## Partial<T>

> এটি একটি টাইপের সব প্রোপার্টিকে Optional (?) করে দেয়। সাধারণত ডাটা আপডেট করার সময় এটি বেশি লাগে।

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// নাম বা ইমেইল যেকোনো একটি আপডেট করা যাবে
function updateUser(id: number, fieldsToUpdate: Partial<User>) {
  console.log(`Updating user ${id} with:`, fieldsToUpdate);
}

updateUser(1, { name: "Anis" }); // id বা email দিতেই হবে এমন বাধ্যবাধকতা নেই
```

## Required<T>

> এটি Partial-এর ঠিক উল্টো। এটি সব অপশনাল প্রোপার্টি থেকে ? সরিয়ে তাদের বাধ্যতামূলক করে দেয়।

```typescript
interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 }; // OK
const obj2: Required<Props> = { a: 5 }; // Error: 'b' is missing
```

## ৩. Readonly<T>

> এটি টাইপের সব প্রোপার্টিকে শুধু পাঠযোগ্য করে তোলে। একবার ভ্যালু অ্যাসাইন করার পর আর পরিবর্তন করা যায় না।

```typescript
const config: Readonly<{ api: string }> = {
  api: "https://api.example.com",
};

config.api = "new-url"; // Error: Cannot assign to 'api' because it is a read-only property.
```

## ৪. Record<K, T>

> একটি অবজেক্ট টাইপ তৈরি করার জন্য যেখানে কী (Key) হবে K টাইপের এবং ভ্যালু (Value) হবে T টাইপের। এটি ম্যাপিংয়ের জন্য দারুণ।

```typescript
type Page = "home" | "about" | "contact";

interface PageInfo {
  title: string;
}

const nav: Record<Page, PageInfo> = {
  home: { title: "Home Page" },
  about: { title: "About Us" },
  contact: { title: "Contact Us" },
};
```

## ৫. Pick<T, K>

> একটি বড় টাইপ থেকে শুধুমাত্র নির্দিষ্ট কয়েকটি প্রোপার্টি বাছাই করে নতুন টাইপ তৈরি করা।

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// শুধুমাত্র নাম এবং দাম লাগবে
type ProductPreview = Pick<Product, "name" | "price">;

const item: ProductPreview = {
  name: "Laptop",
  price: 50000,
};
```

## ৬. Omit<T, K>

> Pick-এর উল্টো। এটি নির্দিষ্ট কিছু প্রোপার্টি বাদ দিয়ে বাকিগুলো নিয়ে টাইপ তৈরি করে।

```typescript
// 'description' বাদ দিয়ে বাকি সব
type ProductWithoutDesc = Omit<Product, "description">;

const item2: ProductWithoutDesc = {
  id: 101,
  name: "Mouse",
  price: 500,
};
```

## ৭. Exclude<T, U>

> একটি Union টাইপ থেকে নির্দিষ্ট কিছু টাইপ বাদ দিতে এটি ব্যবহৃত হয়।

```typescript
type Status = "active" | "inactive" | "pending";

type NonPendingStatus = Exclude<Status, "pending">;
// ফলাফল: "active" | "inactive"
```

## ৮. Extract<T, U>

> এটি Exclude-এর বিপরীত। Union টাইপ থেকে কমন টাইপগুলো বেছে নেয়।

```typescript
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
// ফলাফল: "a"
```

## ৯. ReturnType<T>

> কোনো একটি ফাংশনের রিটার্ন টাইপ কী হবে, তা এক্সট্র্যাক্ট করার জন্য এটি ব্যবহৃত হয়।

```typescript
function getUser() {
  return { id: 1, name: "Sakib" };
}

type UserData = ReturnType<typeof getUser>;
// UserData এখন { id: number, name: string }
```

## ১০. NonNullable<T>

> কোনো টাইপ থেকে null এবং undefined বাদ দেওয়ার জন্য এটি ব্যবহৃত হয়।

```typescript
type Data = string | number | null | undefined;

type SafeData = NonNullable<Data>;
// ফলাফল: string | number
```

# TypeScript Utility Types Summary

| ইউটিলিটি টাইপ        | বিবরণ (Description)                                                  | উদাহরণ (Usage)                |
| :------------------- | :------------------------------------------------------------------- | :---------------------------- |
| **`Partial<T>`**     | টাইপের সব প্রোপার্টিকে অপশনাল (`?`) করে দেয়।                         | `Partial<User>`               |
| **`Required<T>`**    | সব অপশনাল প্রোপার্টি থেকে `?` সরিয়ে বাধ্যতামূলক করে।                 | `Required<Props>`             |
| **`Readonly<T>`**    | প্রোপার্টিগুলোকে শুধু পাঠযোগ্য করে (এডিট করা যায় না)।                | `Readonly<Config>`            |
| **`Record<K, T>`**   | নির্দিষ্ট কী (Key) এবং ভ্যালুর (Value) টাইপ দিয়ে অবজেক্ট তৈরি করে।   | `Record<string, number>`      |
| **`Pick<T, K>`**     | একটি বড় টাইপ থেকে শুধুমাত্র নির্দিষ্ট কয়েকটি প্রোপার্টি বেছে নেয়।    | `Pick<User, 'id' \| 'name'>`  |
| **`Omit<T, K>`**     | নির্দিষ্ট কিছু প্রোপার্টি বাদ দিয়ে বাকিগুলো নিয়ে নতুন টাইপ তৈরি করে। | `Omit<User, 'password'>`      |
| **`Exclude<T, U>`**  | Union টাইপ থেকে নির্দিষ্ট কিছু টাইপ বাদ দেয়।                         | `Exclude<'a' \| 'b', 'a'>`    |
| **`Extract<T, U>`**  | Union টাইপ থেকে কমন টাইপগুলো বেছে নেয়।                               | `Extract<Task, 'completed'>`  |
| **`NonNullable<T>`** | কোনো টাইপ থেকে `null` এবং `undefined` সরিয়ে দেয়।                     | `NonNullable<string \| null>` |
| **`ReturnType<T>`**  | কোনো ফাংশনের রিটার্ন টাইপ কী হবে তা এক্সট্র্যাক্ট করে।               | `ReturnType<typeof fn>`       |
| **`Parameters<T>`**  | কোনো ফাংশনের আর্গুমেন্ট বা প্যারামিটারগুলোকে টাপল হিসেবে নেয়।        | `Parameters<typeof fn>`       |

---

> **টিপস:** এই ইউটিলিটি টাইপগুলো ব্যবহার করলে আপনার কোড আরও টাইপ-সেফ (Type-safe) হবে এবং টাইপ রিপিটেশন (DRY Principle) কমে যাবে।
