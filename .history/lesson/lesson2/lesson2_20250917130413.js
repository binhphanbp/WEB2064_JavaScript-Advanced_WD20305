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
