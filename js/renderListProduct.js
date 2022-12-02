import { getData } from './getData.js';
import { API_URL, PREFIX_PRODUCT } from './const.js';
import { catalogList } from './elemets.js';
import { createCardProduct } from './createCardProduct.js';

export async function renderListProduct() {
  catalogList.textContent = '';

  const listProduct = await getData(`${API_URL}${PREFIX_PRODUCT}`);
  const listCard = listProduct.map(createCardProduct)

  catalogList.append(...listCard);
}