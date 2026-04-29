const STORE_CONTACT = {
  discord: 'bmclanstore',
  whatsapp: '+9640000000000'
}

const products = [
  { id: 1, name: 'Steam Gift Card 10$', category: 'cards', price: 13000, img: 'https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SL1500_.jpg', desc: 'بطاقة Steam رسمية لشحن الحساب.', rating: '4.9 (120)' },
  { id: 2, name: 'PlayStation Gift Card', category: 'cards', price: 19500, img: 'https://m.media-amazon.com/images/I/61h5pHnY+LL._AC_SL1500_.jpg', desc: 'بطاقة PlayStation Store حسب المنطقة.', rating: '4.8 (88)' },
  { id: 3, name: 'Xbox Game Pass', category: 'subscriptions', price: 16000, img: 'https://m.media-amazon.com/images/I/71zP7q7P2PL._AC_SL1500_.jpg', desc: 'اشتراك Xbox Game Pass للألعاب.', rating: '4.7 (64)' },
  { id: 4, name: 'Discord Nitro', category: 'subscriptions', price: 12000, img: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&w=900&q=80', desc: 'اشتراك Discord Nitro.', rating: '4.8 (76)' },
  { id: 5, name: 'Gaming RGB Mouse', category: 'accessories', price: 80000, img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80', desc: 'ماوس ألعاب احترافي بإضاءة RGB.', rating: '4.6 (42)' },
  { id: 6, name: 'Mechanical Keyboard', category: 'accessories', price: 120000, img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=80', desc: 'كيبورد ميكانيكي مناسب للكيمنك.', rating: '4.7 (60)' },
  { id: 7, name: 'Gaming Headset', category: 'accessories', price: 95000, img: 'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=900&q=80', desc: 'سماعة ألعاب بصوت قوي ومايك واضح.', rating: '4.9 (51)' },
  { id: 8, name: 'Gaming Chair', category: 'accessories', price: 450000, img: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=900&q=80', desc: 'كرسي ألعاب مريح للجلسات الطويلة.', rating: '4.9 (85)' }
]

let cart = JSON.parse(localStorage.getItem('bm_cart')) || []
let lastOrderText = ''

const $ = id => document.getElementById(id)

function money(n) {
  return n.toLocaleString('en-US') + ' IQD'
}

function saveCart() {
  localStorage.setItem('bm_cart', JSON.stringify(cart))
}

function showToast(text) {
  $('toast').textContent = text
  $('toast').classList.add('show')
  setTimeout(() => $('toast').classList.remove('show'), 1700)
}

function categoryName(c) {
  if (c === 'cards') return 'بطاقات'
  if (c === 'subscriptions') return 'اشتراكات'
  return 'اكسسوارات'
}

function renderProducts() {
  const q = $('searchInput').value.trim().toLowerCase()
  const c = $('categoryFilter').value

  const filtered = products.filter(p => {
    const matchCategory = c === 'all' || p.category === c
    const matchSearch = p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
    return matchCategory && matchSearch
  })

  $('productGrid').innerHTML = filtered.map(p => `
    <article class="card">
      <div class="photo">
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='assets/logo.webp'">
      </div>
      <div class="cardBody">
        <span class="tag">${categoryName(p.category)}</span>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price">${money(p.price)}</div>
        <div class="rating">★ ${p.rating}</div>
        <button onclick="addToCart(${p.id})">أضف للسلة</button>
      </div>
    </article>
  `).join('')
}

function addToCart(id) {
  const product = products.find(p => p.id === id)
  const found = cart.find(i => i.id === id)
  if (found) found.qty += 1
  else cart.push({ ...product, qty: 1 })
  saveCart()
  renderCart()
  showToast('تمت الإضافة للسلة')
}

function changeQty(id, amount) {
  const item = cart.find(i => i.id === id)
  if (!item) return
  item.qty += amount
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id)
  saveCart()
  renderCart()
}

function renderCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0)
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  $('cartCount').textContent = count
  $('totalPrice').textContent = money(total)

  if (cart.length === 0) {
    $('cartItems').innerHTML = '<p style="color:#b9b0ca">السلة فارغة</p>'
    return
  }

  $('cartItems').innerHTML = cart.map(i => `
    <div class="cartItem">
      <b>${i.name}</b>
      <p>${money(i.price)} × ${i.qty}</p>
      <button onclick="changeQty(${i.id}, 1)">+</button>
      <button onclick="changeQty(${i.id}, -1)">-</button>
    </div>
  `).join('')
}

function buildOrderText() {
  if (cart.length === 0) {
    showToast('السلة فارغة')
    return ''
  }

  const name = $('customerName').value.trim() || 'غير مذكور'
  const contact = $('customerContact').value.trim() || 'غير مذكور'
  const note = $('customerNote').value.trim() || 'لا توجد'
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const orderId = 'BM-' + Date.now().toString().slice(-6)

  const items = cart.map(i => `- ${i.name} × ${i.qty} = ${money(i.price * i.qty)}`).join('\n')

  return `طلب جديد من BM STORE
رقم الطلب: ${orderId}

الاسم: ${name}
التواصل: ${contact}

المنتجات:
${items}

المجموع: ${money(total)}

ملاحظة:
${note}

تواصل المتجر:
Discord: ${STORE_CONTACT.discord}
WhatsApp: ${STORE_CONTACT.whatsapp}`
}

async function copyText(text) {
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    showToast('تم نسخ الطلب')
  } catch (e) {
    $('orderText').value = text
    $('orderText').select()
    document.execCommand('copy')
    showToast('تم نسخ الطلب')
  }
}

$('cartBtn').onclick = () => $('cartPanel').classList.add('open')
$('closeCart').onclick = () => $('cartPanel').classList.remove('open')
$('searchInput').oninput = renderProducts
$('categoryFilter').onchange = renderProducts

$('clearCart').onclick = () => {
  cart = []
  saveCart()
  renderCart()
  showToast('تم تفريغ السلة')
}

$('checkoutBtn').onclick = () => {
  lastOrderText = buildOrderText()
  if (!lastOrderText) return
  $('orderText').value = lastOrderText
  $('orderModal').classList.add('open')
}

$('copyBtn').onclick = () => {
  const text = buildOrderText()
  copyText(text)
}

$('copyOrder').onclick = () => copyText($('orderText').value)
$('closeModal').onclick = () => $('orderModal').classList.remove('open')

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show')
  })
}, { threshold: 0.15 })

document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

renderProducts()
renderCart()
