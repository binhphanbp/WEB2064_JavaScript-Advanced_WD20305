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

    if (elFeatured) {
      productList.container = elFeatured;
      productList.render({
        filterFn: (p) => p.hot === true,
        limit: 4,
        showBadge: true,
      });
    }

    if (elPhones) {
      productList.container = elPhones;
      productList.render({
        filterFn: (p) =>
          (p.category || '').trim().toLowerCase() === 'điện thoại',
        limit: 4,
      });
    }

    if (elLaptops) {
      productList.container = elLaptops;
      productList.render({
        filterFn: (p) => (p.category || '').trim().toLowerCase() === 'laptop',
        limit: 4,
      });
    }

    if (elAllProducts) {
      productList.container = elAllProducts;
      productList.render();
    }
  } catch (err) {
    console.error(err);
    const errorHTML = `<p style="color:#ff7979">Không thể tải dữ liệu. Kiểm tra JSON Server.</p>`;
    if (elFeatured) elFeatured.innerHTML = errorHTML;
    if (elPhones) elPhones.innerHTML = errorHTML;
    if (elLaptops) elLaptops.innerHTML = errorHTML;
    if (elAllProducts) elAllProducts.innerHTML = errorHTML;
  }
})();

// ========== TRANG CHI TIẾT SẢN PHẨM ==========
async function initDetailsPage() {
  const elDetail = document.getElementById('product-detail');
  const elRelated = document.getElementById('related-products');
  if (!elDetail) return; // Không phải trang details.html thì thoát

  // Lấy id sản phẩm từ URL (?id=...)
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  try {
    const res = await fetch(`${API}/${productId}`);
    if (!res.ok) throw new Error('Không lấy được sản phẩm');
    const product = await res.json();

    // Hiển thị chi tiết
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

    // Lấy danh sách sản phẩm liên quan
    const resAll = await fetch(API);
    const all = await resAll.json();
    const related = all
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    elRelated.innerHTML = related
      .map(
        (p) => `
        <article class="product">
          ${p.hot ? `<span class="badge">HOT</span>` : ''}
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p class="price">₫${vnd(p.price)}</p>
          <a class="btn" href="details.html?id=${p.id}">Xem chi tiết</a>
        </article>
      `
      )
      .join('');
  } catch (err) {
    console.error(err);
    elDetail.innerHTML = `<p style="color:#ef4444">Không thể tải chi tiết sản phẩm.</p>`;
  }
}

// ========== CHẠY TRANG NÀO THÌ GỌI TRANG ĐÓ ==========
document.addEventListener('DOMContentLoaded', () => {
  initIndexPage?.();
  initProductsPage?.();
  initDetailsPage?.();
});
