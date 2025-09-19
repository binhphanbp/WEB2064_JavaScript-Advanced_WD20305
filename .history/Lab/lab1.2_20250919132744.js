// Tính tổng với Default Parameters và Rest Operator
const Sum = (start = 0, ...numbers) => {
  return numbers.reduce((acc, curr) => acc + curr, start);
};

// Ví dụ:
console.log(Sum()); // 0
console.log(Sum(10)); // 10
console.log(Sum(10, 1, 2, 3)); // 16
console.log(Sum(5, 10, 20, 30)); // 65
