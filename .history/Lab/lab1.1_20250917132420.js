// Tính diện tích hình chữ nhật
const calculateArea = (width, length) => width * length;
calculateArea(10, 20);

// Tính tổng có kiểm tra số lượng đối số
function sumExactlyThree(a, b, c) {
  // Kiểm tra số lượng đối số
  if (arguments.length !== 3) {
    console.error('Cần truyền đúng 3 đối số!');
    return null;
  }

  // Kiểm tra tất cả đối số có phải là số hay không
  if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
    console.error('Tất cả đối số phải là số!');
    return null;
  }

  // Tính tổng
  let sum = a + b + c;
  return sum;
}

// Ví dụ test
console.log(sumExactlyThree(1, 2, 3)); //
console.log(sumExactlyThree(1, 2)); //
console.log(sumExactlyThree(1, '2', 3)); //
