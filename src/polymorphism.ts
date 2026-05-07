//! Polymorphism = বহুরূপী
// Todo: একই method-এর call — ভিন্ন ভিন্ন result। একই মেথড কল করছেন কিন্তু অবজেক্টভেদে আউটপুট আলাদা আসছে—এটাই পলিমরফিজম।

// Parent Class
class Person {
  getSleep() {
    console.log(`I'm a Normal Person. I sleep for 8 hours`);
  }
}

class Student extends Person {
  getSleep() {
    console.log(`I'm a Student. I sleep for 7 hours`);
  }
}

class NextLevelDeveloper extends Person {
  getSleep() {
    console.log(`I'm a NextLevelDeveloper. I sleep for 6 hours`);
  }
}

// আমারা Parent Class কে Type হিসাবে নিতে পারি (param: Person) --->  child এর কাছ থেকে parameter পাঠাবে যা param দিয়ে ধরবো।
const getSleepingHours = (param: Person) => {
  param.getSleep(); // Parent থেকে পেয়েছি getSleep
};

const person1 = new Person();
const person2 = new Student();
const person3 = new NextLevelDeveloper();

console.log(person1); // Person {}
console.log(person2); // Student {}
console.log(person3); //NextLevelDeveloper {}

console.log("------------------------------------");

person1.getSleep(); // Normal Person - > 8 hours
person2.getSleep(); // Normal Person - > 8 hours
person3.getSleep(); // Normal Person - > 8 hours
console.log("------------------------------------");
// Call Function
getSleepingHours(person1); // Normal Person - > 8 hours
getSleepingHours(person2); // Student --> 7 hours
getSleepingHours(person3); // NextLevelDeveloper --> 6 hours
