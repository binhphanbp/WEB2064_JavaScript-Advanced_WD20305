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
      <article class="product">
      ${showBadge && this.hot ? `<span class="badge">HOT</span>` : ''}
      <img src="${this.image}" alt="${this.name}">
      <h3>${this.name}</h3>
      <p class="price">₫${vnd(this.price)}</p>
      ${this.category ? `<p class="category">${this.category}</p>` : ''}
      <button>Thêm vào giỏ</button>
    </article>
    `;
  }
}

const API = 'http://localhost:3000/products';

// Lấy các container từ HTML
const elFeatured = document.getElementById('product-featured');
const elPhones = document.getElementById('product-phones');
const elLaptops = document.getElementById('product-laptops');

const vnd = (n) => Number(n || 0).toLocaleString('vi-VN');

// Lấy dữ liệu từ JSON Server
async function getProducts() {
  const res = await fetch(API);
  if (!res.ok) throw new Error('Không lấy được dữ liệu sản phẩm');
  return res.json();
}

// Render sản phẩm ra HTML
function render(list, container, { limit, showBadge = false } = {}) {
  const data = limit ? list.slice(0, limit) : list;
  container.innerHTML = data
    .map(
      (p) => `
    <article class="product">
      ${showBadge && p.hot ? `<span class="badge">HOT</span>` : ''}
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">₫${vnd(p.price)}</p>
      ${p.category ? `<p class="category">${p.category}</p>` : ''}
      <button>Thêm vào giỏ</button>
    </article>
  `
    )
    .join('');
}

// Chạy khi load trang
(async () => {
  try {
    const all = await getProducts();

    // Sản phẩm nổi bật: chỉ lấy 4 hot = true
    const hot = all.filter((p) => p.hot === true);
    render(hot, elFeatured, { limit: 4, showBadge: true });

    // Điện thoại: chỉ lấy 4 sản phẩm
    const phones = all.filter(
      (p) => (p.category || '').trim().toLowerCase() === 'điện thoại'
    );
    render(phones, elPhones, { limit: 4 });

    // Laptop: chỉ lấy 4 sản phẩm
    const laptops = all.filter(
      (p) => (p.category || '').trim().toLowerCase() === 'laptop'
    );
    render(laptops, elLaptops, { limit: 4 });
  } catch (err) {
    console.error(err);
    elFeatured.innerHTML =
      elPhones.innerHTML =
      elLaptops.innerHTML =
        `<p style="color:#ff7979">Không thể tải dữ liệu. Kiểm tra JSON Server.</p>`;
  }
})();
