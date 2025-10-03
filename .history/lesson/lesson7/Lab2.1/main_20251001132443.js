const content = document.getElementById('content');

//class sản phẩm
class Product {
  constructor(id, name, price, image, category, hot, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.category = category;
    this.hot = hot;
    this.description = description;
  }
  render() {
    return `
            <div class="product">
            <img src="${this.image}" alt="${this.name}">
            <h4>${this.name}</h4>
            <p class="price">${this.price.toLocaleString()} đ</p>
            <button class="buy-now">Mua Ngay</button>
            <button class="add-cart">Thêm giỏ hàng</button>
            </div>
        `;
  }
}

const renderProduct = (array, selector) => {
  let html = '';
  array.forEach((item) => {
    const product = new Product(
      item.id,
      item.name,
      item.price,
      item.image,
      item.category,
      item.hot,
      item.description
    );
    html += product.render();
  });
  selector.innerHTML = html;
};

//Show trang chủ
const productHot = document.getElementById('product-hot');
const productPhone = document.getElementById('product-phone');
const productLaptop = document.getElementById('product-laptop');
if (productHot) {
  fetch('http://localhost:3000/products')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //Show mảng data vào trong thẻ content
      const dataHot = data.filter((p) => p.hot == true);
      const dataLaptop = data.filter((p) => p.category === 'laptop');
      const dataPhone = data.filter((p) => p.category === 'điện thoại');
      // Show sản phẩm nổi bật
      renderProduct(dataHot, productHot);
      let html = '';
      dataHot.forEach((item) => {
        const product = new Product(
          item.id,
          item.name,
          item.price,
          item.image,
          item.category,
          item.hot,
          item.description
        );
        html += product.render();
      });
      productHot.innerHTML = html;
      // Show sản phẩm laptop
      renderProduct(dataLaptop, productLaptop);
      html = '';
      dataLaptop.forEach((item) => {
        const product = new Product(
          item.id,
          item.name,
          item.price,
          item.image,
          item.category,
          item.hot,
          item.description
        );
        html += product.render();
      });
      productLaptop.innerHTML = html;
      // show sản phẩm điện thoại
      renderProduct(dataPhone, productPhone);
      html = '';
      dataPhone.forEach((item) => {
        const product = new Product(
          item.id,
          item.name,
          item.price,
          item.image,
          item.category,
          item.hot,
          item.description
        );
        html += product.render();
      });
      productPhone.innerHTML = html;
    });
}

// show trang sản phẩm
const productAll = document.getElementById('all-product');
if (productAll) {
  fetch('http://localhost:3000/products')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Show sản phẩm nổi bật
      let html = '';
      data.forEach((item) => {
        const product = new Product(
          item.id,
          item.name,
          item.price,
          item.image,
          item.category,
          item.hot,
          item.description
        );
        html += product.render();
      });
      productAll.innerHTML = html;
    });
}
