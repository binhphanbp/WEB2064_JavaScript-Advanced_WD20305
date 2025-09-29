// ================== CONFIG ==================
const API = 'http://localhost:3000/products';
const vnd = (n) => Number(n || 0).toLocaleString('vi-VN');

// ================== CLASSES ==================
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
        <p class="price">₫${vnd(this.price)}</p>
        ${this.category ? `<p class="category">${this.category}</p>` : ''}
        <a class="btn" href="details.html?id=${this.id}">Xem chi tiết</a>
      </article>
    `;
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
    if (!this.container) return;
    const list = this.products.filter(filterFn);
    const data = limit ? list.slice(0, limit) : list;

    this.container.innerHTML = data
      .map((p) => new Product(p).render(showBadge))
      .join('');
  }
}

// ================== TRANG INDEX ==================
async function initIndexPage() {
  const elFeatured = document.getElementById('product-featured');
  const elPhones = document.getElementById('product-phones');
  const elLaptops = document.getElementById('product-laptops');
  if (!elFeatured || !elPhones || !elLaptops) return;

  const productList = new ProductList(API, null);

  try {
    await productList.fetch();

    // HOT products
    productList.container = elFeatured;
    productList.render({
      filterFn: (p) => p.hot === true,
      limit: 4,
      showBadge: true,
    });

    // Phones
    productList.container = elPhones;
    productList.render({
      filterFn: (p) => (p.category || '').trim().toLowerCase() === 'điện thoại',
      limit: 4,
    });

    // Laptops
    productList.container = elLaptops;
    productList.render({
      filterFn: (p) => (p.category || '').trim().toLowerCase() === 'laptop',
      limit: 4,
    });
  } catch (err) {
    console.error(err);
    const errorHTML = `<p style="color:#ff7979">Không thể tải dữ liệu. Kiểm tra JSON Server.</p>`;
    elFeatured.innerHTML = elPhones.innerHTML = elLaptops.innerHTML = errorHTML;
  }
}

// ================== TRANG PRODUCTS ==================
async function initProductsPage() {
  const elAllProducts = document.getElementById('all-products');
  if (!elAllProducts) return;

  const productList = new ProductList(API, elAllProducts);

  try {
    await productList.fetch();
    productList.render(); // hiển thị tất cả
  } catch (err) {
    console.error(err);
    elAllProducts.innerHTML = `<p style="color:#ff7979">Không thể tải dữ liệu sản phẩm.</p>`;
  }
}

// ================== TRANG DETAILS ==================
async function initDetailsPage() {
  const elDetail = document.getElementById('product-detail');
  const elRelated = document.getElementById('related-products');
  if (!elDetail) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  try {
    const res = await fetch(`${API}/${productId}`);
    if (!res.ok) throw new Error('Không lấy được sản phẩm');
    const product = await res.json();

    // Render detail
    elDetail.innerHTML = `
      <div class="detail-grid">
        <div class="detail-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="detail-info">
          <h1>${product.name}</h1>
          <p class="price">₫${vnd(product.price)}</p>
          <p class="desc">${product.description || 'Không có mô tả'}</p>
          <button class="btn">Thêm vào giỏ</button>
        </div>
      </div>
    `;

    // Render related products
    const resAll = await fetch(API);
    const all = await resAll.json();
    const related = all
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    elRelated.innerHTML = related
      .map((p) => new Product(p).render(true))
      .join('');
  } catch (err) {
    console.error(err);
    elDetail.innerHTML = `<p style="color:#ef4444">Không thể tải chi tiết sản phẩm.</p>`;
  }
}

// ================== AUTO INIT ==================
document.addEventListener('DOMContentLoaded', () => {
  initIndexPage();
  initProductsPage();
  initDetailsPage();
});
