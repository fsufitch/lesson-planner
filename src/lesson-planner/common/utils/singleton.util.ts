interface ClassWithConstructor<T>{
  new(...args: any[]): T;
  [index: string]: any;
}

export function singleton<T>(class_: ClassWithConstructor<T>, singletonProperty = '_instance') {
  return function(...args: any[]): T {
    let singletonValue: T = class_[singletonProperty];
    if (!singletonValue) {
      singletonValue = class_[singletonProperty] = new class_(...args);
    }
    return singletonValue;
  };
}
