// Implicit
let bazarList = ["eggs", "milk", "chicken", "beef"]; // string[]

// Explicit
let shoppingList: string[] = ["book", "dress", "glasses"]; // string[]

// array related সকল method suggestion এ দেখাবে।
bazarList.push("chips");
// bazarList.push(123); <----- error কারণ type হচ্ছে string
// bazarList.push(true); <----- error element গুলো শুধুমাত্র string হতে হবে।
console.log(bazarList);

//TODO: একই array এর মধ্যে বিভিন্ন type এর data দরকার হলে, সেটা বলে দিতে হবে।
let mixArray: (string | number)[] = ["Event", 561, "Cat", 51];
mixArray.push(317);
mixArray.unshift("Mehnaz");
// mixArray.push(undefined); <----- error শুধু string and number are allowed
console.log(mixArray);
