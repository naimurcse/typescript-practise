# লার্জ-স্কেল TypeScript প্রজেক্টে OOP-এর চার স্তম্ভ: জটিলতা হ্রাসের চাবিকাঠি

## ভূমিকা

আধুনিক ওয়েব ডেভেলপমেন্টে প্রজেক্টের আকার যত বৃদ্ধি পায়, কোড ম্যানেজ করা ততই কঠিন হয়ে পড়ে। বিশেষ করে বড় মাপের (Large-scale) TypeScript প্রজেক্টে লজিক সাজাতে এবং মেইনটেনেবিলিটি নিশ্চিত করতে Object-Oriented Programming (OOP) এর কোনো বিকল্প নেই। আজ আমরা আলোচনা করব কিভাবে OOP-এর চারটি মূল স্তম্ভ—**Encapsulation** এবং **Abstraction**—আমাদের কোডকে আরও শক্তিশালী ও সুশৃঙ্খল করে তোলে।

## ১. Encapsulation (এনক্যাপসুলেশন): ডেটা সুরক্ষা ও নিয়ন্ত্রণ

এনক্যাপসুলেশন হলো ডেটা এবং সেই ডেটা নিয়ে কাজ করা মেথডগুলোকে একটি 'ক্যাপসুল' বা ক্লাসের মধ্যে সীমাবদ্ধ রাখা। TypeScript-এ `private`, `protected`, এবং `public` মডিফায়ার ব্যবহার করে আমরা নির্ধারণ করতে পারি কোন ডেটা বাইরে থেকে অ্যাক্সেসযোগ্য হবে আর কোনটি হবে না।

**এটি কেন প্রয়োজন?**
বড় প্রজেক্টে কোনো ভেরিয়েবল যদি যেকোনো জায়গা থেকে পরিবর্তন করা যায়, তবে বাগ (bug) ধরা প্রায় অসম্ভব হয়ে পড়ে। এনক্যাপসুলেশন নিশ্চিত করে যে ক্লাসের ভেতরের স্টেট শুধুমাত্র অনুমোদিত মেথডের মাধ্যমেই পরিবর্তিত হবে।

```typescript
class BankAccount {
  private _balance: number;

  constructor(initialBalance: number) {
    this._balance = initialBalance;
  }

  // ব্যালেন্স জমা দেওয়ার জন্য নিয়ন্ত্রিত মেথড
  public deposit(amount: number): void {
    if (amount > 0) {
      this._balance += amount;
      console.log(`Deposited: ${amount}. New Balance: ${this._balance}`);
    }
  }

  // ব্যালেন্স দেখার জন্য গেটার (সরাসরি পরিবর্তন সম্ভব নয়)
  public get balance(): number {
    return this._balance;
  }
}

const myAccount = new BankAccount(1000);
myAccount.deposit(500); // সঠিক পদ্ধতি
// myAccount._balance = 5000; // Error: Property '_balance' is private
```
