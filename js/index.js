import { modalProduct, catalogList, } from './elemets.js';
import { openModal } from './openModal.js';
import { renderListProduct } from './renderListProduct.js';
import { navigationListController } from './navigationListController.js';
import { cartInit } from './cart.js';

function closeModal(event) {
  if (event.key === 'Escape') {
    modalProduct.classList.remove('modal_open');
    document.removeEventListener('keydown', closeModal);
  }
}

catalogList.addEventListener('click', (event) => {
  const target = event.target;

  if (target.closest('.product__detail') || target.closest('.product__image')) {
    const id = target.closest('.product').dataset.idProduct;

    openModal(id);
    document.addEventListener('keydown', closeModal);
  }
});

modalProduct.addEventListener('click', (event) => {
  const target = event.target;

  if (target.closest('.modal__close') || target === modalProduct) {
    modalProduct.classList.remove('modal_open');
  }
});

function init() {
  renderListProduct();
  navigationListController(renderListProduct);
  cartInit();
}

init();