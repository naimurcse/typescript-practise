type Area<T> = {
  //T---> T={ height: number; width: number } ---> T['height'] এর ভালু number, T['width'] এভাবে অ্যাক্সেস করলে width এর ভালু পাবো । . (dot notation) , ['propertyName'], [myVar]
  // keyof T = "height" | "width"
  // key মানে একবার height আরেকবার width
  [key in keyof T]: T[key];

  //Todo:  T[key] = { height: number; width: number }[height] আবার { height: number; width: number }[width]
};

const area1: Area<{ height: number; width: number }> = {
  height: 50,
  width: 40,
};

console.log(area1);
