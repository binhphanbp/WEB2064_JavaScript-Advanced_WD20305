//? ----------- Lấy phần tử theo ID -> getElementById
const h1 = document.getElementById('heading');
console.log(h1);
// h1.innerText = 'Hello thầy Hiện';
console.log(heading);
//! Lưu ý: Khi đặt id cho một thẻ, chính id đó được tự động tạo thành một biến, trả về phần tử đó mà không cần dùng getElementByID. Nhưng không nên dùng, vì nó sẽ gây khó hiểu, nhiều người không biết biến đó sinh ra từ đâu -> dùng getElementByID

//? ----------- Lấy phần tử theo Tag/Class name
//* getElementsByTagName trả về một HTMLCollection (gần giống như Array)

const h2 = document.getElementsByTagName('h2');
console.log(h2); // HTMLCollection
h2[0].innerText = 'Hello anh Nam';
//! Nếu truyền vào một tên thẻ không có trên DOM -> trả về HTMLCollection rỗng

//* getElementsByClassName trả về một HTMLCollection (gần giống như Array)
const subtitle = document.getElementsByClassName('subtile');
console.log(subtitle); // HTMLCollection
//! Nếu truyền vào một tên class không có trên DOM -> trả về HTMLCollection rỗng

//* document.getElementById() -> trả về 1 phần tử
//* document.getElementsByTagName() -> trả về danh sách
//* document.getElementsByClassName() -> trả về danh sách

//? document.querySelector() -> trả về 1 phần tử
//? document.querySelectorAll() -> trả về danh sách

const result = document.querySelector('#heading');
const result1 = document.querySelector('.title');
console.log(result);
