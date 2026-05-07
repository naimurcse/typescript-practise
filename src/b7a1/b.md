# TypeScript প্রজেক্টে OOP-এর চার স্তম্ভ

আধুনিক ওয়েব ডেভেলপমেন্টে প্রজেক্টের আকার যত বৃদ্ধি পায়, কোড ম্যানেজ করা ততই কঠিন হয়ে পড়ে। বিশেষ করে বড় মাপের (Large-scale) TypeScript প্রজেক্টে লজিক সাজাতে এবং মেইনটেনেবিলিটি নিশ্চিত করতে Object-Oriented Programming (OOP) এর কোনো বিকল্প নেই। আজ আমরা আলোচনা করব কিভাবে OOP-এর চারটি মূল স্তম্ভ - **Encapsulation**, **Abstraction**, **Inheritance** এবং **Polymorphism** আমাদের কোডকে আরও শক্তিশালী ও সুশৃঙ্খল করে তোলে।

---

## ১. Encapsulation (এনক্যাপসুলেশন): ডেটা সুরক্ষা ও নিয়ন্ত্রণ

এনক্যাপসুলেশন হলো ডেটা এবং সেই ডেটা নিয়ে কাজ করা মেথডগুলোকে একটি 'ক্যাপসুল' বা ক্লাসের মধ্যে সীমাবদ্ধ রাখা। TypeScript-এ `private`, `protected`, এবং `public` মডিফায়ার ব্যবহার করে আমরা নির্ধারণ করতে পারি কোন ডেটা বাইরে থেকে অ্যাক্সেসযোগ্য হবে আর কোনটি হবে না।

**এটি কেন প্রয়োজন?**
বড় প্রজেক্টে কোনো ভেরিয়েবল যদি যেকোনো জায়গা থেকে পরিবর্তন করা যায়, তবে বাগ (bug) ধরা প্রায় অসম্ভব হয়ে পড়ে। Encapsulation নিশ্চিত করে যে ক্লাসের ভেতরের স্টেট শুধুমাত্র অনুমোদিত মেথডের মাধ্যমেই পরিবর্তিত হবে।

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

## ২. Abstraction (অ্যাবস্ট্রাকশন): জটিলতা লুকানো এবং ইন্টারফেস তৈরি

অ্যাবস্ট্রাকশন হলো অপ্রয়োজনীয় ইমপ্লিমেন্টেশন ডিটেইলস লুকিয়ে শুধুমাত্র প্রয়োজনীয় ফিচারগুলো ব্যবহারকারীর সামনে উপস্থাপন করা। TypeScript-এ আমরা `abstract class` এবং `interface` ব্যবহার করে এটি অর্জন করি।

**এটি কেন প্রয়োজন?**
বড় সিস্টেমে যখন অনেকগুলো ক্লাস একই ধরণের কাজ করে, তখন একটি সাধারণ ব্লু-প্রিন্ট বা কন্ট্রাক্ট (Contract) থাকা জরুরি। এটি ডেভেলপারদের ভেতরের জটিল লজিক না জেনেও কোড ব্যবহার করতে সাহায্য করে।

```typescript
abstract class MailService {
  // জটিল ইন্টারনাল লজিক যা ইউজারকে জানার প্রয়োজন নেই
  private connect(): void {
    console.log("Connecting to SMTP server...");
  }

  private authenticate(): void {
    console.log("Authenticating credentials...");
  }

  // ইউজার শুধু এই মেথডটি কল করবে
  public sendEmail(receiver: string, message: string): void {
    this.connect();
    this.authenticate();
    console.log(`Email sent to ${receiver}: ${message}`);
  }
}

class OutlookService extends MailService {
  // এখানে নির্দিষ্ট কোনো লজিক থাকলে যোগ করা যায়
}

const mail = new OutlookService();
mail.sendEmail("user@example.com", "Hello from TypeScript!");
// ইউজারকে শুধু sendEmail কল করতে হচ্ছে, কানেকশন বা অথেন্টিকেশন নিয়ে ভাবতে হচ্ছে না।
```

---

## ৩. Inheritance (ইনহেরিটেন্স): কোডের পুনঃব্যবহারযোগ্যতা

Inheritance হলো এমন একটি প্রক্রিয়া যার মাধ্যমে একটি ক্লাস (Child Class) অন্য একটি ক্লাসের (Parent Class) বৈশিষ্ট্য বা প্রপার্টি এবং মেথডগুলো উত্তরাধিকার সূত্রে পায়।

**এটি কেন প্রয়োজন?**
লার্জ-স্কেল প্রজেক্টে অনেক সময় বিভিন্ন ক্লাসের মধ্যে কিছু কমন লজিক থাকে। Inheritance ব্যবহার করে আমরা সেই কমন লজিকগুলো একবার লিখে বারবার ব্যবহার করতে পারি।

```typescript
class User {
  constructor(
    public name: string,
    public email: string,
  ) {}

  public login(): void {
    console.log(`${this.name} has logged in.`);
  }
}

class Admin extends User {
  public deleteUser(userName: string): void {
    console.log(`Admin ${this.name} deleted user: ${userName}`);
  }
}

const admin = new Admin("Mehnaz", "mehnaz@example.com");
admin.login();
admin.deleteUser("Siam");
```

---

## ৪. Polymorphism (পলিমরফিজম): বহুবিধ রূপ ধারণ

Polymorphism শব্দের অর্থ হলো 'বহুরূপতা'। প্রোগ্রামিংয়ের ভাষায়, একই মেথড যখন ভিন্ন ভিন্ন অবজেক্টের জন্য ভিন্ন ভিন্ন ভাবে কাজ করে, তাকে Polymorphism বলে।

**এটি কেন প্রয়োজন?**
বড় প্রজেক্টে যখন একই ধরণের অ্যাকশন বিভিন্ন ভাবে সম্পাদন করতে হয় (যেমন: বিভিন্ন পেমেন্ট গেটওয়ে), তখন Polymorphism কোডকে অনেক বেশি ফ্লেক্সিবল করে তোলে।

```typescript
class Payment {
  public process(): void {
    console.log("Processing generic payment...");
  }
}

class BkashPayment extends Payment {
  public override process(): void {
    console.log("Processing payment via Bkash with 1.85% charge.");
  }
}

class CardPayment extends Payment {
  public override process(): void {
    console.log("Processing payment via Credit Card.");
  }
}

const payments: Payment[] = [new BkashPayment(), new CardPayment()];
payments.forEach((p) => p.process());
```

---

## কেন এই পদ্ধতিগুলো লার্জ-স্ক্যাল প্রজেক্টে অপরিহার্য?

- **Scalability:** কোডবেস বড় হলেও নির্দিষ্ট মডিউলে পরিবর্তন আনা সহজ হয় কারণ লজিকগুলো আইসোলেটেড থাকে।
- **Reusability:** অ্যাবস্ট্রাকশন ব্যবহার করে জেনেরিক ইন্টারফেস তৈরি করলে কোড বারবার ব্যবহার করা যায়।
- **Security:** এনক্যাপসুলেশনের মাধ্যমে ডেটা ম্যানিপুলেশন রোধ করা যায়, যা বড় টিমে কাজ করার সময় ভুল হওয়ার সম্ভাবনা কমিয়ে দেয়।

---

## উপসংহার

লার্জ-স্ক্যাল TypeScript প্রজেক্টে Encapsulation, Abstraction, Inheritance এবং Polymorphism শুধুমাত্র থিওরি নয়, বরং ক্লিন কোড লেখার বাস্তবসম্মত হাতিয়ার। এনক্যাপসুলেশন আমাদের স্টেট ম্যানেজমেন্টকে নিরাপদ করে এবং অ্যাবস্ট্রাকশন আমাদের সিস্টেমের জটিলতাকে কমিয়ে আনে। এই প্রিন্সিপালগুলো সঠিকভাবে প্রয়োগ করলে আপনার প্রজেক্ট হবে আরও বেশি রোবাস্ট এবং ফিউচার-প্রুফ।
