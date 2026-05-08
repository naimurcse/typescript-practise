type TGenericType<T> = Array<T>;
type TUser = { name: string; age: number | string };
// const userList: TGenericType<{name: string; age: number | string}> = [{},{},{}]
const userList: TGenericType<TUser> = [
  {
    name: "Wasfia",
    age: 6,
  },
  {
    name: "Nailat",
    age: "6",
  },
];
