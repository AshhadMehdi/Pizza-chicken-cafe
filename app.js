const menu = [
  {id:'f1',name:'Family Feast',desc:'3 small pizzas + 1 litre drink',price:1750,category:'deals',emoji:'🍕',tag:'WOW DEAL'},
  {id:'f2',name:'Zinger Party',desc:'3 zinger burgers + large fries + 1L drink',price:1750,category:'deals',emoji:'🍔',tag:'WOW DEAL'},
  {id:'f3',name:'Burger & Piece',desc:'2 zinger burgers + 3 chicken pieces + 1L drink',price:1800,category:'deals',emoji:'🍗',tag:'WOW DEAL'},
  {id:'f4',name:'Pizza & Chicken',desc:'3 medium pizzas + 1.5L drink',price:2800,category:'deals',emoji:'🍕',tag:'WOW DEAL'},
  {id:'d1',name:'Deal 1',desc:'1 medium pizza + 2 zinger burgers + 1.5L drink',price:2100,category:'deals',emoji:'🍕',tag:'DEAL'},
  {id:'d2',name:'Deal 2',desc:'1 small pizza + 1 zinger burger + 500ml drink',price:1120,category:'deals',emoji:'🍔',tag:'DEAL'},
  {id:'d3',name:'Deal 3',desc:'2 zinger burgers + 500ml drink',price:800,category:'deals',emoji:'🍔',tag:'DEAL'},
  {id:'d4',name:'Deal 4',desc:'4 zinger burgers + 2 fries + 1L drink',price:1850,category:'deals',emoji:'🍟',tag:'DEAL'},
  {id:'d5',name:'Deal 5',desc:'1 large pizza + 1 medium pizza + 1.5L drink',price:2750,category:'deals',emoji:'🍕',tag:'DEAL'},
  {id:'d6',name:'Deal 6',desc:'1 medium pizza + 1 small pizza + 1L drink',price:1750,category:'deals',emoji:'🍕',tag:'DEAL'},
  {id:'d7',name:'Deal 7',desc:'2 chicken rolls + 2 chicken shawarmas + fries',price:1100,category:'deals',emoji:'🌯',tag:'DEAL'},
  {id:'d8',name:'Deal 8',desc:'1 small pizza + 2 chicken shawarmas + 500ml drink',price:1050,category:'deals',emoji:'🌯',tag:'DEAL'},
  {id:'d9',name:'Deal 9',desc:'1 large + 1 medium + 1 small pizza',price:3500,category:'deals',emoji:'🍕',tag:'DEAL'},
  {id:'d10',name:'Deal 10',desc:'1 family pizza + 2 small pizzas',price:3500,category:'deals',emoji:'🍕',tag:'DEAL'},
  {id:'p1',name:'Regular Pizza',desc:'Cheesy, saucy and baked fresh',price:650,category:'pizza',emoji:'🍕'},
  {id:'p2',name:'Medium Pizza',desc:'Loaded with your favourite toppings',price:1080,category:'pizza',emoji:'🍕'},
  {id:'p3',name:'Large Pizza',desc:'More slices for the whole family',price:1680,category:'pizza',emoji:'🍕'},
  {id:'p4',name:'XL Pizza',desc:'Extra large, extra cheesy',price:2080,category:'pizza',emoji:'🍕'},
  {id:'c1',name:'Chicken Pieces',desc:'Crispy golden fried chicken',price:300,category:'chicken',emoji:'🍗'},
  {id:'c2',name:'Chicken Roll',desc:'Tender chicken wrapped fresh',price:350,category:'chicken',emoji:'🌯'},
  {id:'c3',name:'Chicken Shawarma',desc:'Creamy, spicy and satisfying',price:300,category:'chicken',emoji:'🌯'},
  {id:'b1',name:'Zinger Burger',desc:'Crispy chicken, cheese and sauce',price:450,category:'burgers',emoji:'🍔'},
  {id:'b2',name:'Chicken Burger',desc:'Classic chicken burger',price:400,category:'burgers',emoji:'🍔'},
  {id:'s1',name:'Fries',desc:'Crispy salted fries',price:250,category:'chicken',emoji:'🍟'},
  {id:'dr1',name:'Cold Drink 500ml',desc:'Chilled and refreshing',price:120,category:'drinks',emoji:'🥤'},
  {id:'dr2',name:'Cold Drink 1 Litre',desc:'Perfect for sharing',price:220,category:'drinks',emoji:'🥤'}
];
let activeCategory='all'; let cart=[];
const money = n => `Rs. ${n.toLocaleString('en-PK')}`;
const menuGrid=document.querySelector('#menuGrid');
function renderMenu(){const list=activeCategory==='all'?menu.filter(x=>!['chicken','burgers','drinks'].includes(x.category)):menu.filter(x=>x.category===activeCategory);menuGrid.innerHTML=list.map(item=>`<article class="menu-card"><div class="food-visual">${item.emoji}</div><div class="menu-info"><h3>${item.name}</h3><p>${item.desc}</p><div class="price-row"><span class="price">${money(item.price)}</span><button class="add-btn" aria-label="Add ${item.name}" data-add="${item.id}">+</button></div></div></article>`).join('');document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>addToCart(b.dataset.add));}
function addToCart(id){const item=menu.find(x=>x.id===id), existing=cart.find(x=>x.id===id);existing?existing.qty++:cart.push({...item,qty:1});renderCart();showToast(`${item.name} added to cart`);}
function renderCart(){const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.price*x.qty,0);document.querySelector('#cartCount').textContent=count;document.querySelector('#drawerCount').textContent=`(${count})`;document.querySelector('#subtotal').textContent=money(total);document.querySelector('#checkoutBtn').disabled=!count;const box=document.querySelector('#cartItems');box.innerHTML=count?cart.map(x=>`<div class="cart-line"><div class="food-visual">${x.emoji}</div><div><h4>${x.name}</h4><p>${money(x.price)} each</p></div><div class="qty"><button data-minus="${x.id}">−</button><b>${x.qty}</b><button data-plus="${x.id}">+</button></div></div>`).join(''):`<div class="empty-cart"><span>🛒</span><h3>Your cart is empty</h3><p>Add something delicious to get started.</p></div>`;document.querySelectorAll('[data-minus]').forEach(b=>b.onclick=()=>changeQty(b.dataset.minus,-1));document.querySelectorAll('[data-plus]').forEach(b=>b.onclick=()=>changeQty(b.dataset.plus,1));}
function changeQty(id,delta){const x=cart.find(i=>i.id===id);if(x){x.qty+=delta;if(x.qty<=0)cart=cart.filter(i=>i.id!==id)}renderCart();}
function showToast(text){const t=document.querySelector('#toast');t.textContent=text;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
function openCart(){document.querySelector('#cartDrawer').classList.add('open');document.querySelector('#cartOverlay').classList.add('open')}
function closeCart(){document.querySelector('#cartDrawer').classList.remove('open');document.querySelector('#cartOverlay').classList.remove('open')}
document.querySelector('#categoryTabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll('#categoryTabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderMenu();document.querySelector('#menu').scrollIntoView({behavior:'smooth',block:'start'});};
document.querySelectorAll('[data-scroll]').forEach(b=>b.onclick=()=>document.querySelector(b.dataset.scroll).scrollIntoView({behavior:'smooth'}));
document.querySelector('#openCart').onclick=openCart;document.querySelector('#closeCart').onclick=closeCart;document.querySelector('#cartOverlay').onclick=closeCart;
document.querySelector('#checkoutBtn').onclick=()=>{closeCart();document.querySelector('#modalBackdrop').classList.add('open')};document.querySelector('#closeModal').onclick=()=>document.querySelector('#modalBackdrop').classList.remove('open');
document.querySelector('#checkoutForm').onsubmit=e=>{e.preventDefault();document.querySelector('#modalBackdrop').classList.remove('open');cart=[];renderCart();showToast('Demo order received — the cafe team will call you shortly!');};
renderMenu();renderCart();
