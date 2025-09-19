// Tính diện tích hình chữ nhật
const calculateArea = (width, length) => width * length;
calculateArea(10, 20);

// Tính tổng có kiểm tra số lượng đối số
function sumExactlyThree(a, b, c) {
  console.log(arguments);
  if (arguments.length !== 3) {
    console.error('Cần truyền đúng 3 đối số');
    return null;
  }

  if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
    console.error('Tất cả đối số phải là số');
    return null;
  }

  let sum = a + b + c;
  return sum;
}

console.log(sumExactlyThree(1, 2, 3)); // 6
console.log(sumExactlyThree(1, 2)); // null
console.log(sumExactlyThree(1, '2', 3)); // null
