// Arrow Function
const tinhTong = (a, b) => {
  return a + b;
};

// Backtick
const greeting = (name) => console.log(`Hello ${name}, welcome to my site!`);

// Backtick multi line
const happyNewYear = (message) =>
  console.log(`
        Hello ${name},
        welcome to
        my site!
      `);

// Default Parameters
const greetSite = (userName = 'Guest') => {
  console.log(`Hello ${userName}, welcome to my site!`);
};
greetSite(); // Hello Guest, welcome to my site!
greetSite('Bình Phan'); // Hello Bình Phan, welcome to my site!
// Nếu không có Default Parameters -> Khi gọi hàm mà không truyền tham số nầy thiết lập trên tham số nầy là undefined
