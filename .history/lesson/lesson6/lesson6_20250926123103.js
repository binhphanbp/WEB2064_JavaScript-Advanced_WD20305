//?--------- Spread Operator: rải các phần tử trong mảng ra
//? Array
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8];
const arrCombined = [...arr1, ...arr2, 9, 10];
console.log(arrCombined); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//? Deep Copy
const arr3 = [...arrCombined];
console.log(arr3); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

//? Object
const obj1 = {
  name: 'Bình',
  age: 21,
};
const obj2 = { ...obj1, address: 'TP.HCM' };

//?--------- Destructuring
const person = {
  name: 'Bình Phan',
  age: 21,
  address: 'TP.HCM',
};
const { name: myName, address } = person;
console.log(myName, 'sống ở', address);
