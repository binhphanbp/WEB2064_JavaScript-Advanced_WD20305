//? --------- Truy xuất các phần tử
const arr = [10, 20, 30, 40, 50];

// 1) Lấy độ dài mảng
console.log(arr.length); // Output: 5

// 2) Lấy phần tử cuối của mảng
console.log(arr[arr.length - 1]); // Output: 50

// 3) Phương thức "at"
console.log(arr.at(-1)); // Output: 50
console.log(arr.at(-2)); // Output: 40

// 4) Phương thức findIndex
console.log(arr.findIndex((num) => num === 30)); // Output: 2

// 5) Dùng for để in ra các phần tử
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// 6) Dùng forEach để in ra các phần tử
arr.forEach((item) => console.log(item));

// 7) Dùng for-of
for (let item of arr) {
  console.log(item);
}

// 8) Phương thức find
console.log(arr.find((num) => num > 28)); // Output: 30

// 9) Thêm phần tử vào cuối mảng
arr.push(60);
console.log(arr); // Output: [10, 20, 30, 40, 50, 60]

// 9) Xoá phần tử vào cuối mảng
arr.pop();
console.log(arr); // Output: [10, 20, 30, 40, 50]

// 10) Thêm phần tử vào đầu mảng
arr.unshift(0);
console.log(arr); // Output: [0, 10, 20, 30, 40, 50]

// 11) Xoá phần tử vào đầu mảng
arr.shift();
console.log(arr); // Output: [10, 20, 30, 40, 50]
