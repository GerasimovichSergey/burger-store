import { modalProduct, catalogList, } from './elemets.js';
import { openModal } from './openModal.js';
import { renderListProduct } from './renderListProduct.js';
import { navigationListController } from './navigationListController.js';


const burger = {
  title: 'My burger',
  price: 1000,
  weight: 5000,
  calories: 10000,
  description: 'Best burger in the world',
  image: 'img/megaburger.jpg',
  ingredients: [
    'bylochka',
    'meat',
    'meat',
    'sauce',
    'salad',
  ]
};

catalogList.addEventListener('click', (event) => {
  const target = event.target;

  if (target.closest('.product__detail') || target.closest('.product__image')) {
    openModal(burger);
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
  navigationListController();
}

init();