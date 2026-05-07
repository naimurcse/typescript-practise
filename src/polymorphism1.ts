class Shape {
  // return type : number
  getArea(): number {
    return 0;
  }
}
const shape1 = new Shape();
const result = shape1.getArea();
console.log(result);

class Circle extends Shape {
  radius: number;
  constructor(redius: number) {
    super();
    this.radius = redius;
  }

  getArea(): number {
    //Circle Area = Pi(r*r);
    return Math.PI * (this.radius * this.radius);
  }

  // return type : number
  //যদি Mathod এর নাম একই থাকে তবে parameter নেয়ার ক্ষেত্রেও একই সংখার parameter নিতে হবে।
  /*
  getArea(radius: number): number {
    return Math.PI * (radius * radius);
  }
  */
}

class Rectangle extends Shape {
  //Rectangle area = height * width

  height: number;
  width: number;

  constructor(height: number, width: number) {
    super();
    this.height = height;
    this.width = width;
  }

  getArea(): number {
    return this.height * this.width;
  }

  //যদি Mathod এর নাম একই থাকে তবে parameter নেয়ার ক্ষেত্রেও একই সংখার parameter নিতে হবে।
  /*
  getArea(height: number, width: number): number {
    return height * width;
  }
*/
}

const getArea = (param: Shape) => {
  //param এর মধ্যে একটি object কে পাবো
  //myObject.myMethod()
  return param.getArea();
};

//Shape, Rectangle, Circle
const shape2 = new Shape();
const shape2output = getArea(shape1);
console.log(shape2output);

const rectangle1 = new Rectangle(5, 6);
console.log(rectangle1); //Rectangle { height: 5, width: 6 }
const rec1 = getArea(rectangle1);
console.log(rec1);

const circle1 = new Circle(5);
console.log(circle1);
const cir1 = getArea(circle1);
console.log(cir1);
