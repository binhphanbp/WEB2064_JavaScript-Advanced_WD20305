//? 1. Arrow Function
const tinhTong = (a, b) => {
  return a + b;
};

//? 2. Backtick
const greeting = (name) => console.log(`Hello ${name}, welcome to my site!`);

// Backtick multi line
const happyNewYear = (message) =>
  console.log(`
        Hello ${name},
        welcome to
        my site!
      `);

//? 3. Default Parameters
const greetSite = (userName = 'Guest') => {
  console.log(`Hello ${userName}, welcome to my site!`);
};
greetSite(); // Hello Guest, welcome to my site!
greetSite('Bình Phan'); // Hello Bình Phan, welcome to my site!
//! Nếu không có Default Parameters -> Khi gọi hàm mà không truyền tham số này thiết lập trên tham số này là undefined

//? 4. Rest Parameters
const sum = (...arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};
console.log(sum(3, 6, 20, 8)); // Output: 37

//? 5. Creating Functions Inside of Functions

//? 6. Understanding Callback Functions
const fetchData = (callback) => {
  setTimeout(() => {
    callback('Data Fetched');
  }, 1000);
};

console.log(1);

function inSo(callback) {
  setTimeout(() => {
    console.log(2);
  });
}

console.log(3);

//? 7. call() và apply()
