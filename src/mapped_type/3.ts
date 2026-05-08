// একটি ইউজার ইন্টারফেস যেখানে কিছু ডেটা অপশনাল (?)
interface UserProfile {
  id: number;
  name: string;
  email?: string; // অপশনাল
  phoneNumber?: string; // অপশনাল
}

type Concrete<T> = {
  // (?) থেকে প্রশ্নবোধক চিহ্নটি সরিয়ে দেয়
  [P in keyof T]-?: T[P];
};

// এখন 'StrictUser' এর সব প্রোপার্টি বাধ্যতামূলক
type StrictUser = Concrete<UserProfile>;

// ✅ সঠিক ইমপ্লিমেন্টেশন
const user: StrictUser = {
  id: 317,
  name: "Wasfia",
  email: "wasfi@gmail.com",
  phoneNumber: "0176000000",
};

// ❌ এরর দিবে: 'phoneNumber' and 'email' missing
/*
const user2: StrictUser = {
    id: 2,
    name: "Karim",
};
*/
