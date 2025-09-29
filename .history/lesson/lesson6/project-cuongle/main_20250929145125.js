class Product {
  constructor({ id, name, price, image, category, hot, description }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.category = category;
    this.hot = hot;
    this.description = description;
  }

  render(showBadge = false) {
    return `
      <article class="product">
        ${showBadge && this.hot ? `<span class="badge">HOT</span>` : ''}
        <img src="${this.image}" alt="${this.name}">
        <h3>${this.name}</h3>
        <p class="price">₫${Product.vnd(this.price)}</p>
        ${this.category ? `<p class="category">${this.category}</p>` : ''}
        <button>Thêm vào giỏ</button>
      </article>
    `;
  }

  static vnd(n) {
    return Number(n || 0).toLocaleString('vi-VN');
  }
}

class ProductList {
  constructor(api, container) {
    this.api = api;
    this.container = container;
    this.products = [];
  }

  async fetch() {
    const res = await fetch(this.api);
    if (!res.ok) throw new Error('Không lấy được dữ liệu sản phẩm');
    this.products = await res.json();
    return this.products;
  }

  render({ filterFn = () => true, limit, showBadge = false } = {}) {
    const list = this.products.filter(filterFn);
    const data = limit ? list.slice(0, limit) : list;

    this.container.innerHTML = data
      .map((p) => new Product(p).render(showBadge))
      .join('');
  }
}

const API = 'http://localhost:3000/products';

const elFeatured = document.getElementById('product-featured');
const elPhones = document.getElementById('product-phones');
const elLaptops = document.getElementById('product-laptops');
const elAllProducts = document.getElementById('all-products');

const productList = new ProductList(API, null);

(async () => {
  try {
    await productList.fetch();

    productList.container = elFeatured;
    productList.render({
      filterFn: (p) => p.hot === true,
      limit: 4,
      showBadge: true,
    });

    productList.container = elPhones;
    productList.render({
      filterFn: (p) => (p.category || '').trim().toLowerCase() === 'điện thoại',
      limit: 4,
    });

    productList.container = elLaptops;
    productList.render({
      filterFn: (p) => (p.category || '').trim().toLowerCase() === 'laptop',
      limit: 4,
    });

    productList.container = elAllProducts;
    productList.render({
      filterFn: (p) => (p.category || '').trim().toLowerCase() === 'laptop',
      limit: 4,
    });
  } catch (err) {
    console.error(err);
    const errorHTML = `<p style="color:#ff7979">Không thể tải dữ liệu. Kiểm tra JSON Server.</p>`;
    elFeatured.innerHTML = elPhones.innerHTML = elLaptops.innerHTML = errorHTML;
  }
})();
