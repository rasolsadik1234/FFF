const DISCORD_TICKET_LINK='https://discord.gg/YOUR_SERVER_LINK'

const pages=[
  {id:'cards',name:'بطاقات',icon:'💳',desc:'Steam, PlayStation, Xbox وأكثر'},
  {id:'discord',name:'دسكورد',icon:'🎮',desc:'Nitro شهر، شهرين، سنة'},
  {id:'netflix',name:'نتفلكس',icon:'N',desc:'اشتراكات شهر، شهرين، سنة'},
  {id:'balance',name:'رصيد وشحن',icon:'📱',desc:'رصيد وخدمات شحن'},
  {id:'balance',name:'ديدوس',icon:'📱',desc:'ديدوس'},
  {id:'services',name:'خدمات',icon:'🎁',desc:'تفعيل ومساعدة قانونية'}
]

const products=[
  {id:1,page:'cards',name:'Steam Gift Card 10$',price:13000,img:'https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SL1500_.jpg',desc:'بطاقة Steam رسمية.',duration:'كود فوري',details:'الكود يرسل داخل التكت بعد تأكيد الدفع.'},
  {id:2,page:'cards',name:'PlayStation Card 15$',price:19500,img:'https://m.media-amazon.com/images/I/61h5pHnY+LL._AC_SL1500_.jpg',desc:'بطاقة PlayStation حسب المنطقة.',duration:'كود فوري',details:'اذكر منطقة حسابك داخل التكت.'},
  {id:3,page:'cards',name:'Xbox Gift Card 15$',price:20000,img:'https://m.media-amazon.com/images/I/71zP7q7P2PL._AC_SL1500_.jpg',desc:'بطاقة Xbox رسمية.',duration:'كود فوري',details:'حسب المنطقة والمتوفر.'},

  {id:10,page:'discord',name:'Discord Nitro Basic',price:8000,img:'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&w=900&q=80',desc:'اشتراك Nitro Basic.',duration:'شهر',details:'اشتراك قانوني حسب المتوفر.'},
  {id:11,page:'discord',name:'Discord Nitro Full',price:12000,img:'https://images.unsplash.com/photo-1614680376739-414d95ff43df?auto=format&fit=crop&w=900&q=80',desc:'اشتراك Nitro كامل.',duration:'شهر',details:'يتم التسليم داخل التكت.'},
  {id:12,page:'discord',name:'Discord Nitro Full',price:22000,img:'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?auto=format&fit=crop&w=900&q=80',desc:'اشتراك Nitro كامل.',duration:'شهرين',details:'عرض شهرين حسب المتوفر.'},
  {id:13,page:'discord',name:'Discord Nitro Full',price:120000,img:'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&w=900&q=80',desc:'اشتراك Nitro كامل.',duration:'سنة',details:'السعر يتأكد داخل التكت.'},

  {id:20,page:'netflix',name:'Netflix Standard',price:15000,img:'images/netflix_bm_w900_q80.jpg',desc:'اشتراك Netflix قانوني.',duration:'شهر',details:'حسب المتوفر.'},
  {id:21,page:'netflix',name:'Netflix Standard',price:28000,img:'images/netflix_bm_w900_q80.jpg',desc:'اشتراك Netflix قانوني.',duration:'شهرين',details:'يتم تأكيد نوع الاشتراك داخل التكت.'},
  {id:22,page:'netflix',name:'Netflix Premium',price:25000,img:'images/netflix_bm_w900_q80.jpg',desc:'اشتراك Premium.',duration:'شهر',details:'حسب الدولة والمتوفر.'},
  {id:23,page:'netflix',name:'Netflix Premium',price:250000,img:'images/netflix_bm_w900_q80.jpg',desc:'اشتراك Premium.',duration:'سنة',details:'يتم الاتفاق داخل التكت.'},

  {id:30,page:'balance',name:'رصيد زين',price:5000,img:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',desc:'شحن رصيد زين.',duration:'حسب المبلغ',details:'اكتب رقم الهاتف داخل ملاحظة الطلب.'},
  {id:31,page:'balance',name:'رصيد آسياسيل',price:5000,img:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',desc:'شحن رصيد آسياسيل.',duration:'حسب المبلغ',details:'اكتب رقم الهاتف داخل ملاحظة الطلب.'},

  {id:40,page:'services',name:'تفعيل اشتراك',price:5000,img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',desc:'مساعدة تفعيل منتج رسمي.',duration:'مرة واحدة',details:'خدمة قانونية فقط.'},
  {id:41,page:'services',name:'إعداد Gaming PC',price:10000,img:'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=900&q=80',desc:'مساعدة إعدادات جهاز.',duration:'جلسة',details:'بدون برامج غش أو مخالفة.'}
]

let cart=JSON.parse(localStorage.getItem('bm_cart_fixed'))||[]
const $=id=>document.getElementById(id)
let currentPage='home'
function money(n){return 'IQD '+n.toLocaleString('en-US')}
function pageName(id){return (pages.find(p=>p.id===id)||{}).name||id}
function save(){localStorage.setItem('bm_cart_fixed',JSON.stringify(cart))}
function toast(t){$('toast').textContent=t;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),1600)}
function renderNav(){ $('navLinks').innerHTML=`<button onclick="goPage('home')">الرئيسية</button>`+pages.map(p=>`<button onclick="goPage('${p.id}')">${p.name}</button>`).join('') }
function renderCategoryCards(){ $('categoryCards').innerHTML=pages.map(p=>`<article class="catCard" onclick="goPage('${p.id}')"><div class="catIcon">${p.icon}</div><h3>${p.name}</h3><p>${p.desc}</p><b>${products.filter(x=>x.page===p.id).length} منتج ←</b></article>`).join('') }
function goPage(id){
  currentPage = id

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'))
  const page = document.getElementById(id)
  if(page) page.classList.add('active')

  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'))
  ;[...document.querySelectorAll('nav button')]
    .find(b => b.textContent.includes(id === 'home' ? 'الرئيسية' : pageName(id)))
    ?.classList.add('active')

  document.querySelectorAll('.sideIcon[data-page]').forEach(b => b.classList.remove('active'))
  document.querySelector(`.sideIcon[data-page="${id}"]`)?.classList.add('active')

  if(id !== 'home') renderProducts(id)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function productCard(p){return `<article class="product"><div class="photo"><img src="${p.img}" onerror="this.src='assets/logo.webp'"></div><div class="body"><span class="tag">${pageName(p.page)} • ${p.duration}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${money(p.price)}</div><div class="productActions"><button onclick="addToCart(${p.id})">أضف للسلة</button><button class="detailsBtn" onclick="showProduct(${p.id})">تفاصيل</button></div></div></article>`}
function renderProducts(page){
  const grid = document.querySelector(`[data-grid="${page}"]`)
  if(!grid) return

  const input = document.querySelector(`.pageSearch[data-page="${page}"]`)
  const q = input ? input.value.trim().toLowerCase() : ''

  const filtered = products.filter(p => {
    const text = `${p.name} ${p.desc} ${p.duration} ${pageName(p.page)}`.toLowerCase()
    return p.page === page && text.includes(q)
  })

  grid.innerHTML = filtered.length
    ? filtered.map(productCard).join('')
    : '<div style="grid-column:1/-1;color:#aaa3bb;text-align:center;padding:30px">ماكو نتائج</div>'
}

function showProduct(id){const p=products.find(x=>x.id===id);$('productDetails').innerHTML=`<div class="detailsGrid"><img src="${p.img}" onerror="this.src='assets/logo.webp'"><div><span class="tag">${pageName(p.page)} • ${p.duration}</span><h2>${p.name}</h2><p style="color:#aaa3bb">${p.desc}</p><p>${p.details}</p><div class="price">${money(p.price)}</div><button onclick="addToCart(${p.id});$('productModal').classList.remove('open')">أضف للسلة</button></div></div>`;$('productModal').classList.add('open')}
function addToCart(id){const p=products.find(x=>x.id===id);const f=cart.find(x=>x.id===id);f?f.qty++:cart.push({...p,qty:1});save();renderCart();toast('تمت الإضافة')}
function changeQty(id,n){const i=cart.find(x=>x.id===id);if(!i)return;i.qty+=n;if(i.qty<=0)cart=cart.filter(x=>x.id!==id);save();renderCart()}
function renderCart(){$('cartCount').textContent=cart.reduce((s,i)=>s+i.qty,0);$('totalPrice').textContent=money(cart.reduce((s,i)=>s+i.price*i.qty,0));$('cartItems').innerHTML=cart.length?cart.map(i=>`<div class="cartItem"><b>${i.name}</b><p>${pageName(i.page)} • ${i.duration}</p><p>${money(i.price)} × ${i.qty}</p><button onclick="changeQty(${i.id},1)">+</button> <button onclick="changeQty(${i.id},-1)">-</button></div>`).join(''):'<p style="color:#aaa3bb">السلة فارغة</p>'}
function buildOrder(){if(!cart.length){toast('السلة فارغة');return''}const name=$('customerName').value||'غير مذكور';const discord=$('customerDiscord').value||'غير مذكور';const note=$('customerNote').value||'لا توجد';const total=cart.reduce((s,i)=>s+i.price*i.qty,0);const items=cart.map(i=>`- ${i.name} | ${pageName(i.page)} | ${i.duration} × ${i.qty} = ${money(i.price*i.qty)}`).join('\\n');return `🎫 طلب BM CLAN STORE\\n\\n👤 الاسم: ${name}\\n💬 دسكورد: ${discord}\\n\\n🛒 المنتجات:\\n${items}\\n\\n💰 المجموع: ${money(total)}\\n\\n📝 ملاحظة:\\n${note}` }
async function copyText(t){if(!t)return;try{await navigator.clipboard.writeText(t);toast('تم النسخ')}catch(e){$('orderText').value=t;$('orderText').select();document.execCommand('copy');toast('تم النسخ')}}
function openDiscord(){window.open(DISCORD_TICKET_LINK,'_blank')}
$('cartBtn').onclick=()=>$('cartPanel').classList.add('open');$('closeCart').onclick=()=>$('cartPanel').classList.remove('open');$('clearCart').onclick=()=>{cart=[];save();renderCart()};$('checkoutBtn').onclick=async()=>{const t=buildOrder();if(!t)return;$('orderText').value=t;$('orderModal').classList.add('open');await copyText(t);openDiscord()};$('copyOrder').onclick=()=>copyText($('orderText').value);$('openDiscord').onclick=openDiscord;$('closeOrderModal').onclick=()=>$('orderModal').classList.remove('open');$('closeProductModal').onclick=()=>$('productModal').classList.remove('open');document.querySelectorAll('.pageSearch').forEach(i=>i.oninput=()=>renderProducts(i.dataset.page))
renderNav();renderCategoryCards();pages.forEach(p=>renderProducts(p.id));renderCart()


// Side buttons + theme toggle
document.querySelectorAll('.sideIcon[data-page]').forEach(btn => {
  btn.addEventListener('click', () => goPage(btn.dataset.page))
})

function applyTheme(theme){
  document.body.classList.toggle('light', theme === 'light')
  const toggle = document.getElementById('themeToggle')
  if(toggle) toggle.textContent = theme === 'light' ? '☀' : '☾'
  localStorage.setItem('bm_theme', theme)
}

applyTheme(localStorage.getItem('bm_theme') || 'dark')

document.getElementById('themeToggle')?.addEventListener('click', () => {
  const next = document.body.classList.contains('light') ? 'dark' : 'light'
  applyTheme(next)
})

document.getElementById('settingsBtn')?.addEventListener('click', () => {
  toast('الإعدادات: استخدم زر القمر لتغيير الدارك/اللايت')
})


// Fixed sidebar + search controls
document.querySelectorAll('.sideIcon[data-page]').forEach(btn => {
  btn.onclick = () => goPage(btn.dataset.page)
})

document.querySelectorAll('.pageSearch').forEach(input => {
  input.addEventListener('input', () => renderProducts(input.dataset.page))
  input.addEventListener('keyup', () => renderProducts(input.dataset.page))
})

document.getElementById('focusSearchBtn')?.addEventListener('click', () => {
  if(currentPage === 'home'){
    goPage('netflix')
    setTimeout(() => document.querySelector('.pageSearch[data-page="netflix"]')?.focus(), 100)
  } else {
    document.querySelector(`.pageSearch[data-page="${currentPage}"]`)?.focus()
  }
})

goPage('home')
