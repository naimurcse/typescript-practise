//Todo ১. সব প্রোপার্টিকে Optional করা (Partial)
//কোনো ফর্ম এডিট করার সময় সব ফিল্ড প্রয়োজন নাও হতে পারে।

type Optional<T> = {
  [K in keyof T]: T[K];
};

//Todo ২. সব প্রোপার্টিকে Readonly করা
//ডেটা ইমিউটেবল রাখার জন্য।

type Absolute<T> = {
  readonly [K in keyof T]: T[K];
  //readonly key:data_type
};

//Todo: ৩. নির্দিষ্ট টাইপ পরিবর্তন করা
//ধরা যাক, একটি অবজেক্টের সব ভ্যালুকে string এ রূপান্তর করতে হবে।

type Stringify<T> = {
  [K in keyof T]: string;
};

//Todo: ৪. Optional প্রোপার্টিকে Required করা (-? ব্যবহার)
// যদি কোনো টাইপে ? থাকে, তা রিমুভ করতে -? ব্যবহার হয়।

type Concrete<T> = {
  [P in keyof T]?: T[P];
  //property?:data type
};
