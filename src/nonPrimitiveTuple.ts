// Tuple

let coordinates: [number, number] = [20, 30];
// let coordinates2: [number, number] = [20, 30, 23]; <--- error pattern must be same

let couple: [string, string] = ["Husband", "Wife"];
let student: [string, number] = ["Mehnaz", 317];
student[0] = "Wasfia";
student[1] = 301;
console.log(student);

let destination: [string, string, number] = ["Dhaka", "Gazipur", 3];
destination[1] = "Barisal";

console.log(destination);
