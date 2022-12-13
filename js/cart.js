import { catalogList, countAmount, modalProductBtn, orderCount, orderList, orderTotalAmount } from './elemets.js';
import { getData } from './getData.js';
import { API_URL, PREFIX_PRODUCT } from './const.js';

export function getCart() {
  const cartList = localStorage.getItem('cart');

  if (cartList) {
    return JSON.parse(cartList);
  } else {
    return [];
  }
}

async function renderCartList() {
  const cartList = getCart();
  const allIdProduct = cartList.map(item => item.id);
  const data = cartList.length
    ? await getData(`${API_URL}${PREFIX_PRODUCT}?list=${allIdProduct}`)
    : [];
  const countProduct = cartList.reduce((acc, item) => acc + item.count, 0);

  orderCount.textContent = countProduct;

  const cartItems = data.map(item => {
    const li = document.createElement('li');
    const product = cartList.find(cartItem => cartItem.id === item.id);

    li.classList.add('order__item');
    li.dataset.idProduct = item.id;
    li.innerHTML = `
      <img src="${API_URL}/${item.image}" alt="${item.title}" class="order__image">
      <div class="order__product">
        <h3 class="order__product-title">${item.title}</h3>
        <p class="order__product-weight">${item.weight}г</p>
        <p class="order__product-price">${item.price}₽</p>
      </div>
      <div class="order__product-count count">
        <button class="count__minus" data-id-product="${product.id}">-</button>
        <p class="count__amount">${product.count}</p>
        <button class="count__plus" data-id-product="${product.id}">+</button>
      </div>
    `;

    return li;
  });
  orderList.textContent = '';
  orderList.append(...cartItems);

  orderTotalAmount.textContent = data.reduce((acc, item) => {
    const product = cartList.find(cartItem => cartItem.id === item.id);
    return acc + item.price * product.count;
  }, 0);
}

function updateCart(cartList) {
  localStorage.setItem('cart', JSON.stringify(cartList));
  renderCartList();
}

function addCart(id, count = 1) {
  const cartList = getCart();
  const product = cartList.find((item) => item.id === id);

  if (product) {
    product.count += count;
  } else {
    cartList.push({ id, count });
  }

  updateCart(cartList);
}

function removeCart(id) {
  const cartList = getCart();
  const productIndex = cartList.findIndex((item) => item.id === id);

  cartList[productIndex].count -= 1;

  if (cartList[productIndex].count === 0) {
    cartList.splice(productIndex, 1);
  }

  updateCart(cartList);
}

function cartController() {
  catalogList.addEventListener('click', ({ target }) => {
    if (target.closest('.product__add')) {
      addCart(target.closest('.product').dataset.idProduct);
    }
  });

  modalProductBtn.addEventListener('click', () => {
    addCart(modalProductBtn.dataset.idProduct, Number(countAmount.textContent));
  });

  orderList.addEventListener('click', (event) => {
    const targetPlus = event.target.closest('.count__plus');
    const targetMinus = event.target.closest('.count__minus');

    if (targetPlus) {
      addCart(targetPlus.dataset.idProduct);
    }

    if (targetMinus) {
      removeCart(targetMinus.dataset.idProduct);
    }
  })
}

export function cartInit() {
  cartController();
  renderCartList();
}