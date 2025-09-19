//? Lấy phần tử theo ID -> getElementById
const h1 = document.getElementById('title');
console.log(h1);
// h1.innerText = 'Hello thầy Hiện';
console.log(title);
//! Lưu ý: Khi đặt id cho một thẻ, chính id đó được tự động tạo thành một biến, trả về phần tử đó mà không cần dùng getElementByID. Nhưng không nên dùng, vì nó sẽ gây khó hiểu, nhiều người không biết biến đó sinh ra từ đâu -> dùng getElementByID

//? Lấy phần tử theo Tag/Class name
//* getElementsByTagName trả về một HTMLCollection (gần giống như Array)
const h2 = document.getElementsByTagName('h2');
console.log(h2); // HTMLCollection
