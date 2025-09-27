//?--------- Spread Operator: rải các phần tử trong mảng ra

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8];

const arrCombined = [...arr1, ...arr2];
console.log(arrCombined);

//?--------- Destructuring
const person = {
  name: 'Bình Phan',
  age: 21,
  address: 'TP.HCM',
};
const { name: myName, address } = person;
console.log(myName, ': ', address);
