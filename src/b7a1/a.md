# TypeScript Generics: ফ্লেক্সিবল এবং টাইপ-সেফ কোড তৈরির সহজ গাইড

## ভূমিকা

ধরি একটা function লিখেছি যেটা একটা array-র প্রথম element return করে। সহজ কথা। কিন্তু সমস্যা হলো — এই function কি `number[]` এর জন্য কাজ করবে? `string[]` এর জন্য? `User[]` এর জন্য?

সাধারণত দুটো পথ থাকে:

- **পথ ১:** প্রতিটা type-এর জন্য আলাদা function লেখা — কিন্তু এটা code duplication।
- **পথ ২:** `any` type ব্যবহার করা — কিন্তু এতে TypeScript-এর সব type safety শেষ।

**Generics** হলো তৃতীয় পথ — এবং সেরা পথ।

**Generics আমাদের এমন component, function, এবং class লিখতে দেয়, যেগুলো যেকোনো type-এর সাথে কাজ করে, অথচ type safety একটুও নষ্ট হয় না।**

---

## পর্ব ১ — Generics কী এবং কেন দরকার?

### সমস্যাটা প্রথমে বুঝার চেষ্টা করি ঃ

```typescript
// ❌ পদ্ধতি ১: একই কাজের জন্য আলাদা আলাদা function
function getFirstNumber(arr: number[]): number {
  return arr[0];
}

function getFirstString(arr: string[]): string {
  return arr[0];
}
```

```typescript
// ❌ পদ্ধতি ২: any ব্যবহার করা
function getFirst(arr: any[]): any {
  return arr[0];
}

const result = getFirst([1, 2, 3]);
result.toUpperCase();
// TypeScript কোনো error দেবে না — কিন্তু runtime-এ ভাঙবে!
// কারণ TypeScript জানে না result কোন type-এর
```

দ্বিতীয় পদ্ধতিতে সব type information হারিয়ে যাচ্ছে। TypeScript-কে ব্যবহারই করা হচ্ছে না।

---

### সমাধান: Generic Function

```typescript
// ✅ Generics দিয়ে — একটা function, সব type, পূর্ণ type safety
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

// TypeScript নিজেই type infer করে নেয়
const firstNum = getFirst([10, 20, 30]); // firstNum: number
const firstStr = getFirst(["a", "b", "c"]); // firstStr: string
const firstBool = getFirst([true, false]); // firstBool: boolean

// এখন ভুল করলেই error!
firstNum.toUpperCase(); // ❌ Error: Property 'toUpperCase' does not exist on type 'number'
firstStr.toFixed(2); // ❌ Error: Property 'toFixed' does not exist on type 'string'
```

`<T>` হলো একটা **type parameter** — placeholder-এর মতো। Function call করার সময় TypeScript বুঝে নেয় `T` আসলে কোন type।

> **মূল কথা:** `T` শুধু একটা convention। আমরা `<Item>`, `<Data>`, `<MyType>` যেকোনো নাম দিতে পারি। তবে single letter (`T`, `K`, `V`) সবচেয়ে বেশি প্রচলিত।

---

## পর্ব ২ — Generic Functions: Real-World উদাহরণ

### উদাহরণ ১: API Response Wrapper

Real project-এ API থেকে data fetch করার সময় response-এর একটা common structure থাকে। Generics দিয়ে এটা perfectly handle করা যায়:

```typescript
// Generic Response type
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

// Generic fetch function
async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  const json = await response.json();
  return {
    data: json as T,
    status: response.status,
    message: response.ok ? "সফল" : "ব্যর্থ",
    timestamp: new Date().toISOString(),
  };
}

// ব্যবহার করার সময়
interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

// TypeScript জানে result.data হলো User type
const userResponse = await fetchData<User>("/api/users/1");
console.log(userResponse.data.name); // ✅ TypeScript জানে .name আছে
console.log(userResponse.data.price); // ❌ Error: User-এ price নেই!

// একই function দিয়ে Product fetch
const productResponse = await fetchData<Product>("/api/products/1");
console.log(productResponse.data.price); // ✅ এখানে .price আছে!
```

---

### উদাহরণ ২: Multiple Type Parameters

একটা function-এ একাধিক Generic type parameter ব্যবহার করা যায়:

```typescript
// দুটো ভিন্ন type-এর value জোড়া লাগানো
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const entry1 = pair("name", "রাহেলা"); // [string, string]
const entry2 = pair(1, true); // [number, boolean]
const entry3 = pair("score", 95.5); // [string, number]

// Object থেকে নির্দিষ্ট key-এর value বের করা
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "করিম", age: 28 };

const name = getProperty(user, "name"); // type: string ✅
const age = getProperty(user, "age"); // type: number ✅
const city = getProperty(user, "city"); // ❌ Error: "city" নেই user object-এ
```

`K extends keyof T` — এই constraint নিশ্চিত করে যে `K` অবশ্যই `T`-এর কোনো একটা valid key হতে হবে।

---

### উদাহরণ ৩: Generic Utility Functions

```typescript
// Array filter করে নতুন array দেবে — সম্পূর্ণ type-safe
function filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const evens = filterArray(numbers, (n) => n % 2 === 0); // evens: number[]

interface Student {
  name: string;
  gpa: number;
}

const students: Student[] = [
  { name: "মেজবা", gpa: 3.8 },
  { name: "সুমাইয়া", gpa: 3.2 },
  { name: "তানভীর", gpa: 3.9 },
];

// TypeScript জানে s হলো Student type
const topStudents = filterArray(students, (s) => s.gpa >= 3.5);
// topStudents: Student[] — type পুরোপুরি preserved!
```

---

## পর্ব ৩ — Generic Classes: Reusable Data Structures

Generic শুধু function-এ না, class-এও ব্যবহার করা যায়। এতে পুরো class-টা type-flexible হয়।

### উদাহরণ ১: Type-Safe Stack

```typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  get size(): number {
    return this.items.length;
  }
}

// Number Stack
const numStack = new Stack<number>();
numStack.push(10);
numStack.push(20);
numStack.push("hello"); // ❌ Error! number stack-এ string চলবে না

// String Stack
const taskStack = new Stack<string>();
taskStack.push("Database migration");
taskStack.push("API integration");
console.log(taskStack.peek()); // "API integration"
console.log(taskStack.size); // 2

// Custom type Stack
interface Task {
  id: number;
  title: string;
  priority: "low" | "medium" | "high";
}

const taskQueue = new Stack<Task>();
taskQueue.push({ id: 1, title: "Bug fix", priority: "high" });
const nextTask = taskQueue.pop();
// nextTask: Task | undefined — TypeScript সব জানে!
```

---

### উদাহরণ ২: Generic Repository Pattern

Real-world backend project-এ Generic repository pattern অনেক জনপ্রিয়:

```typescript
// Base entity — সব model-এর id থাকবে
interface BaseEntity {
  id: number;
}

// Generic Repository
class Repository<T extends BaseEntity> {
  private store: Map<number, T> = new Map();

  save(entity: T): T {
    this.store.set(entity.id, entity);
    return entity;
  }

  findById(id: number): T | undefined {
    return this.store.get(id);
  }

  findAll(): T[] {
    return Array.from(this.store.values());
  }

  delete(id: number): boolean {
    return this.store.delete(id);
  }

  update(id: number, updates: Partial<T>): T | undefined {
    const existing = this.store.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...updates };
    this.store.set(id, updated);
    return updated;
  }
}

// User Repository
interface User extends BaseEntity {
  name: string;
  email: string;
  role: "admin" | "user";
}

// Product Repository
interface Product extends BaseEntity {
  title: string;
  price: number;
  inStock: boolean;
}

const userRepo = new Repository<User>();
userRepo.save({
  id: 1,
  name: "রাহেলা",
  email: "rahela@example.com",
  role: "admin",
});
userRepo.save({
  id: 2,
  name: "করিম",
  email: "karim@example.com",
  role: "user",
});

const foundUser = userRepo.findById(1);
// foundUser: User | undefined — TypeScript জানে সব field
if (foundUser) {
  console.log(foundUser.email); // ✅ "rahela@example.com"
  console.log(foundUser.price); // ❌ Error: User-এ price নেই!
}

const productRepo = new Repository<Product>();
productRepo.save({ id: 101, title: "Laptop", price: 75000, inStock: true });

// একই Repository class — দুটো সম্পূর্ণ আলাদা type, পূর্ণ type safety
const product = productRepo.findById(101);
console.log(product?.price); // ✅ 75000
```

---

## পর্ব ৪ — Generic Constraints: Type-কে নিয়ন্ত্রণ করা

Generic কখনো কখনো অনেক বেশি নমনীয় হয়ে যায়। `extends` দিয়ে constraint দিয়ে বলা যায় — "এই type-টা অবশ্যই এটা থাকতে হবে।"

```typescript
// ❌ সমস্যা: T কী সেটা না জানলে .length access করা যায় না
function getLength<T>(item: T): number {
  return item.length; // Error: Property 'length' does not exist on type 'T'
}

// ✅ Constraint দিয়ে সমাধান
interface HasLength {
  length: number;
}

function getLength<T extends HasLength>(item: T): number {
  return item.length; // ✅ OK — T-এ length থাকাটা guaranteed
}

console.log(getLength("Hello")); // 5  ✅
console.log(getLength([1, 2, 3, 4])); // 4  ✅
console.log(getLength({ length: 10 })); // 10 ✅
console.log(getLength(42)); // ❌ Error: number-এ length নেই

// আরেকটা real-world example
function mergeObjects<T extends object, U extends object>(
  obj1: T,
  obj2: U,
): T & U {
  return { ...obj1, ...obj2 };
}

const merged = mergeObjects(
  { name: "তানভীর", age: 25 },
  { role: "developer", active: true },
);
// merged: { name: string; age: number; role: string; active: boolean }
// TypeScript সব field সম্পর্কে জানে!
console.log(merged.name); // ✅
console.log(merged.role); // ✅
console.log(merged.salary); // ❌ Error: এই field নেই
```

---

## পর্ব ৫ — Generic Interfaces ও Type Aliases

```typescript
// Generic Interface — Pagination-এর জন্য
interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Generic Type Alias — Event handler-এর জন্য
type EventHandler<T> = (event: T) => void;

// ব্যবহার
interface ClickEvent {
  x: number;
  y: number;
  target: string;
}

const handleClick: EventHandler<ClickEvent> = (event) => {
  console.log(`Clicked at (${event.x}, ${event.y})`); // ✅ type-safe
};

// Generic Conditional Type (Advanced)
type NonNullable<T> = T extends null | undefined ? never : T;
// এটা TypeScript-এর built-in utility type-এর মতো

type NotNull = NonNullable<string | null | undefined>; // type: string
```

---

## উপসংহার

Generics TypeScript-এর সবচেয়ে শক্তিশালী feature গুলোর মধ্যে একটি। — কারণ এটা তোমাকে **flexibility এবং type safety একসাথে** দেয়।

**Generics দিয়ে কী পাওয়া যায়:**

| সুবিধা                | ব্যাখ্যা                                              |
| --------------------- | ----------------------------------------------------- |
| **Reusability**       | একটা function/class দিয়ে যেকোনো type handle করা যায় |
| **Type Safety**       | `any` ছাড়াই type flexible code লেখা যায়             |
| **IntelliSense**      | IDE সব method ও property suggest করে                  |
| **Refactor Friendly** | Type বদলালে TypeScript নিজেই সব error দেখায়          |
| **Self-documenting**  | Code দেখলেই বোঝা যায় কোন type expect করা হচ্ছে       |

**মনে রাখার মূল নিয়মগুলো:**

- `<T>` হলো type-এর placeholder — যেকোনো নাম দেওয়া যায়
- `extends` দিয়ে constraint দিয়ে type-কে সীমাবদ্ধ করো
- `keyof` দিয়ে object-এর valid key নিশ্চিত করো
- Multiple type parameters (`<T, K, V>`) দরকারে ব্যবহার করো
- `any` ব্যবহার করার ইচ্ছা হলে Generics ব্যবহার করো

Generics দিয়ে এমন code লিখা যায় যা **scalable, maintainable, এবং bug-resistant।**

---
