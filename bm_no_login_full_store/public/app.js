const DISCORD_TICKET_LINK = 'https://discord.gg/g4v9sZJmHS'

const categories = [
  { id:'all', name:'كل القوائم' },
  { id:'cards', name:'بطاقات شحن' },
  { id:'subscriptions', name:'اشتراكات' },
  { id:'accessories', name:'اكسسوارات' },
  { id:'accounts', name:'حسابات قانونية' },
  { id:'services', name:'خدمات' }
]

const products = [
  {id:1,name:'Steam Gift Card 10$',category:'cards',price:13000,img:'https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SL1500_.jpg',desc:'بطاقة Steam رسمية لشحن الحساب.',rating:'4.9',details:'تسليم الكود عبر دسكورد بعد تأكيد الدفع.'},
  {id:2,name:'PlayStation Gift Card',category:'cards',price:19500,img:'https://m.media-amazon.com/images/I/61h5pHnY+LL._AC_SL1500_.jpg',desc:'بطاقة PlayStation Store حسب المنطقة.',rating:'4.8',details:'تأكد من منطقة الحساب قبل الطلب.'},
  {id:3,name:'Xbox Gift Card',category:'cards',price:20000,img:'https://m.media-amazon.com/images/I/71zP7q7P2PL._AC_SL1500_.jpg',desc:'بطاقة Xbox رسمية.',rating:'4.7',details:'متوفر حسب الكمية والمنطقة.'},
  {id:4,name:'Xbox Game Pass',category:'subscriptions',price:16000,img:'https://m.media-amazon.com/images/I/71zP7q7P2PL._AC_SL1500_.jpg',desc:'اشتراك Xbox Game Pass للألعاب.',rating:'4.8',details:'اشتراك قانوني حسب المتوفر.'},
  {id:5,name:'Discord Nitro',category:'subscriptions',price:12000,img:'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&w=900&q=80',desc:'اشتراك Discord Nitro.',rating:'4.8',details:'يتم التسليم بعد فتح التكت وتأكيد الطلب.'},
  {id:6,name:'YouTube Premium',category:'subscriptions',price:10000,img:'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=80',desc:'اشتراك يوتيوب بريميوم.',rating:'4.6',details:'حسب الدول والحسابات المتوفرة.'},
  {id:7,name:'Gaming RGB Mouse',category:'accessories',price:80000,img:'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80',desc:'ماوس ألعاب احترافي.',rating:'4.6',details:'تأكد من توفر الشحن قبل الطلب.'},
  {id:8,name:'Mechanical Keyboard',category:'accessories',price:120000,img:'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=80',desc:'كيبورد ميكانيكي.',rating:'4.7',details:'ألوان وموديلات حسب المتوفر.'},
  {id:9,name:'Gaming Headset',category:'accessories',price:95000,img:'https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=900&q=80',desc:'سماعة ألعاب.',rating:'4.9',details:'صوت قوي ومايك واضح.'},
  {id:10,name:'حساب لعبة قانوني',category:'accounts',price:25000,img:'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',desc:'حساب قانوني حسب المتوفر.',rating:'4.5',details:'نبيع فقط حسابات قانونية حسب السياسات المتاحة.'},
  {id:11,name:'حساب Discord جاهز',category:'accounts',price:15000,img:'https://images.unsplash.com/photo-1614680376739-414d95ff43df?auto=format&fit=crop&w=900&q=80',desc:'حساب قانوني حسب المتوفر.',rating:'4.4',details:'تفاصيل الحساب داخل التكت.'},
  {id:12,name:'تفعيل اشتراك',category:'services',price:5000,img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',desc:'خدمة تفعيل للمنتجات الرسمية.',rating:'4.9',details:'مساعدة تفعيل فقط للمنتجات القانونية.'},
  {id:13,name:'مساعدة إعداد Gaming PC',category:'services',price:10000,img:'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=900&q=80',desc:'مساعدة إعدادات جهاز للألعاب.',rating:'4.7',details:'تحسين إعدادات عامة بدون غش أو برامج مخالفة.'}
]

let cart = JSON.parse(localStorage.getItem('bm_cart')) || []
let currentCategory='all'
const $=id=>document.getElementById(id)
function money(n){return n.toLocaleString('en-US')+' IQD'}
function saveCart(){localStorage.setItem('bm_cart',JSON.stringify(cart))}
function showToast(t){$('toast').textContent=t;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),1700)}
function getCategoryName(id){const c=categories.find(x=>x.id===id);return c?c.name:id}
function renderCategories(){
  $('categoryFilter').innerHTML=categories.map(c=>`<option value="${c.id}">${c.name}</option>`).join('')
  $('categoryFilter').value=currentCategory
  $('categoryTabs').innerHTML=categories.map(c=>`<button class="tab ${c.id===currentCategory?'active':''}" onclick="setCategory('${c.id}')">${c.name}</button>`).join('')
}
function setCategory(id){currentCategory=id;renderCategories();renderProducts()}
function renderProducts(){
  const q=$('searchInput').value.trim().toLowerCase()
  const filtered=products.filter(p=>(currentCategory==='all'||p.category===currentCategory)&&(p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)))
  $('productGrid').innerHTML=filtered.map(p=>`
    <article class="card">
      <div class="photo"><img src="${p.img}" onerror="this.src='assets/logo.webp'" loading="lazy"></div>
      <div class="cardBody">
        <span class="tag">${getCategoryName(p.category)}</span>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price">${money(p.price)}</div>
        <div class="rating">★ ${p.rating}</div>
        <div class="cardActions">
          <button onclick="addToCart(${p.id})">أضف للسلة</button>
          <button class="detailsBtn" onclick="showProduct(${p.id})">تفاصيل</button>
        </div>
      </div>
    </article>`).join('')
  renderCategories()
}
function showProduct(id){
  const p=products.find(x=>x.id===id)
  $('productDetails').innerHTML=`
    <div class="productDetailsGrid">
      <img src="${p.img}" onerror="this.src='assets/logo.webp'">
      <div>
        <span class="tag">${getCategoryName(p.category)}</span>
        <h2>${p.name}</h2>
        <p style="color:#b9b0ca">${p.desc}</p>
        <p>${p.details}</p>
        <div class="price">${money(p.price)}</div>
        <div class="rating">★ ${p.rating}</div>
        <button onclick="addToCart(${p.id}); document.getElementById('productModal').classList.remove('open')">أضف للسلة</button>
      </div>
    </div>`
  $('productModal').classList.add('open')
}
function addToCart(id){const p=products.find(x=>x.id===id);const e=cart.find(x=>x.id===id);e?e.qty++:cart.push({...p,qty:1});saveCart();renderCart();showToast('تمت الإضافة للسلة')}
function changeQty(id,n){const i=cart.find(x=>x.id===id);if(!i)return;i.qty+=n;if(i.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();renderCart()}
function renderCart(){
  $('cartCount').textContent=cart.reduce((s,i)=>s+i.qty,0)
  $('totalPrice').textContent=money(cart.reduce((s,i)=>s+i.price*i.qty,0))
  $('cartItems').innerHTML=cart.length?cart.map(i=>`<div class="cartItem"><b>${i.name}</b><p>${money(i.price)} × ${i.qty}</p><button onclick="changeQty(${i.id},1)">+</button> <button onclick="changeQty(${i.id},-1)">-</button></div>`).join(''):'<p style="color:#b9b0ca">السلة فارغة</p>'
}
function buildOrderText(){
  if(!cart.length){showToast('السلة فارغة');return ''}
  const name=$('customerName').value.trim()||'غير مذكور'
  const discord=$('customerDiscord').value.trim()||'غير مذكور'
  const note=$('customerNote').value.trim()||'لا توجد'
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0)
  const orderId='BM-'+Date.now().toString().slice(-6)
  const items=cart.map(i=>`- ${i.name} [${getCategoryName(i.category)}] × ${i.qty} = ${money(i.price*i.qty)}`).join('\\n')
  return `🎫 طلب جديد - BM PREMIUM STORE
رقم الطلب: ${orderId}

👤 الاسم: ${name}
💬 دسكورد: ${discord}

🛒 المنتجات:
${items}

💰 المجموع: ${money(total)}

📝 ملاحظة:
${note}

رجاءً افتح تكت وارسل هذا الطلب.`
}
async function copyText(text){if(!text)return;try{await navigator.clipboard.writeText(text);showToast('تم النسخ')}catch(e){$('orderText').value=text;$('orderText').select();document.execCommand('copy');showToast('تم النسخ')}}
function openDiscord(){window.open(DISCORD_TICKET_LINK,'_blank')}
function copyCoupon(){copyText('BM2026')}

$('cartBtn').onclick=()=>$('cartPanel').classList.add('open')
$('closeCart').onclick=()=>$('cartPanel').classList.remove('open')
$('searchInput').oninput=renderProducts
$('categoryFilter').onchange=()=>setCategory($('categoryFilter').value)
$('discordMainLink').href=DISCORD_TICKET_LINK
$('openDiscordHero').onclick=openDiscord
$('clearCart').onclick=()=>{cart=[];saveCart();renderCart();showToast('تم تفريغ السلة')}
$('checkoutBtn').onclick=async()=>{const t=buildOrderText();if(!t)return;$('orderText').value=t;$('orderModal').classList.add('open');await copyText(t);openDiscord()}
$('copyBtn').onclick=()=>copyText(buildOrderText())
$('copyOrder').onclick=()=>copyText($('orderText').value)
$('openDiscord').onclick=openDiscord
$('closeModal').onclick=()=>$('orderModal').classList.remove('open')
$('closeProductModal').onclick=()=>$('productModal').classList.remove('open')

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.15})
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))
renderCategories();renderProducts();renderCart()
