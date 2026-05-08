//! Generic with interface

interface Developer<T> {
  name: string;
  salary: number;
  device: {
    brand: string;
    model: string;
    releasedYear: string;
  };
  smartWatch: T; // Dynamic Value বসবে।
}

const poorDeveloper: Developer<{ heartRate: string; stopWatch: boolean }> = {
  name: "Wasfia",
  salary: 100,
  device: {
    brand: "HP",
    model: "A25",
    releasedYear: "2020",
  },
  smartWatch: {
    heartRate: "200",
    stopWatch: true,
  },
};

// Clean Coding
type ExpensiveWatch = {
  heartRate: string;
  callSupport: boolean;
  calculator: boolean;
};

const richDeveloper: Developer<ExpensiveWatch> = {
  name: "Wasfia",
  salary: 100,
  device: {
    brand: "HP",
    model: "A25",
    releasedYear: "2020",
  },
  smartWatch: {
    heartRate: "200",
    calculator: true,
    callSupport: true,
  },
};
