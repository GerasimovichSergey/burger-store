import {
  modalProduct,
  modalProductTitle,
  modalProductImage,
  modalProductDescription,
  ingredientsList,
  ingredientsCalories,
  modalProductPriceCount
} from './elemets.js';

export function openModal(product) {
  modalProductTitle.textContent = product.title;
  modalProductImage.src = product.image;
  modalProductDescription.textContent = product.description;
  ingredientsCalories.textContent = `${product.weight}г, ккал ${product.calories}`;
  modalProductPriceCount.textContent = product.price;

  ingredientsList.textContent = '';

  const ingredientsListItems = product.ingredients.map((item) => {
    const li = document.createElement('li');
    li.classList.add('.ingredients__item');
    li.textContent = item;

    return li;
  });

  ingredientsList.append(...ingredientsListItems);

  modalProduct.classList.add('modal_open');
}