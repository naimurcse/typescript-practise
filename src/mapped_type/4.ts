// !ধরুন আপনার একটি Configuration Object আছে, যেখানে ইউজার চাইলে কিছু সেটিংস ফাঁকা রাখতে পারে (Defaults)। কিন্তু আপনার অ্যাপ্লিকেশনের ভেতরে এমন একটি ফাংশন আছে যা নিশ্চিত করতে চায় যে সব সেটিংস ভ্যালু সেখানে উপস্থিত আছে।

interface AppConfig {
  theme?: "light" | "dark";
  notifications?: boolean;
  fontSize?: number;
}

type Concrete<T> = {
  // (?) থেকে প্রশ্নবোধক চিহ্নটি সরিয়ে দেয়
  [P in keyof T]-?: T[P];
};

// এই ফাংশনটি শুধু Concrete টাইপ গ্রহণ করে যাতে কোনো রানটাইম এরর না হয়
function initializeApp(config: Concrete<AppConfig>) {
  config.theme = "dark";
  console.log(`Setting theme to ${config.theme.toUpperCase()}`);
  // যেহেতু Concrete ব্যবহার করা হয়েছে, config.theme এখানে কখনোই undefined হবে না।
}
