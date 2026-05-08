type TUser = {
  id: number;
  name: string;
  email: string;
  hasCar?: boolean;
};

//Todo: একটি type এর উপর লুপ করে প্রতিটি property কে অ্যাক্সেস করেতে->
type TUser2 = {
  // একটি variable এর name দিলাম K
  // এখানে keyof TUser হচ্ছে: id | name | email
  // একবার K এর value হবেঃ প্রথমবার-> id, তারপর-> name, আরেকবার হবে-> email
  [K in keyof TUser]: TUser[K];
  //K যখন id-> id : TUser[id] -> id:number
  //name:string
  //email:string
};

//Todo: type এর উপর লুপ করে প্রতিটি property কে readonly করে দিতে ->
type TUser3 = {
  readonly [K in keyof TUser]: TUser[K];
  //readonly id: number;
  //readonly name: string;
  //readonly email: string;
};

//Todo: type এর উপর লুপ করে প্রতিটি property কে readonly করে দিতে যার data type null ও হতে পারে ->
type TUser4 = {
  readonly [K in keyof TUser]: TUser[K] | null; // nullable ও হতে পারে
  //readonly id: number | null;
  //readonly name: string | null;
  //readonly email: string | null;
};

//Todo: type এর উপর লুপ করে প্রতিটি property কে optional করতে ->
type TUser5 = {
  [K in keyof TUser]?: TUser[K];
  // id?: number;
  // name?: string;
  // email?: string;
};

//Todo: User type এর উপর লুপ করে প্রতিটি property কে string করতে ->
type TUser6 = {
  [P in keyof TUser]: string;
  // id             : string
  // name           : string
  // email          : string
};

//Todo: User type এর উপর লুপ করে প্রতিটি property এর নামের শেষে ? থাকে তা রিমুভ করতে->
type TUser7 = {
  [P in keyof TUser]-?: TUser[P];
};

//Todo: User type এর উপর লুপ করে প্রতিটি property এর নামের শুরুতে user_ যোগ করতে->
type TUser8 = {
  [P in keyof TUser as `user_${P}`]: TUser[P];
  //                    user_id     : number;
  //                    user_name   : string;
  //                    user_email  : string;
  //                    user_hasCar? : boolean;
};
