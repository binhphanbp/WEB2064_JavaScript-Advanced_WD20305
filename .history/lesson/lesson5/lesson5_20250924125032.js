//? --------- Truy xuất các phần tử
const arr = [10, 20, 30, 40, 50];

// a) Lấy độ dài mảng
console.log(arr.length); // Output: 5

// b) Lấy phần tử cuối của mảng
console.log(arr[arr.length - 1]); // Output: 50

// c) Phương thức "at"
console.log(arr.at(-1)); // Output: 50

// d) Phương thức findIndex
console.log(arr.findIndex((num) => num === 30));

// e) Dùng for để in ra các phần tử
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// f) Dùng forEach để in ra các phần tử
arr.forEach((item) => console.log(item));

// g) Phương thức find
