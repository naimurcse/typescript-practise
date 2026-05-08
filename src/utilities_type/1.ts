interface User {
  id: number;
  name: string;
  email: string;
}

const updateUser = (id: number, fieldsToUpdate: Partial<User>) => {
  console.log(id, fieldsToUpdate);
};

updateUser(1, { name: "Anis" }); // id বা email দিতেই হবে এমন বাধ্যবাধকতা নেই
